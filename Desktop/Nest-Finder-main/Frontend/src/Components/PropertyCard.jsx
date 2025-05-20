import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegEnvelope, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CiHeart } from "react-icons/ci";
import { FaParking } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import {useDispatch} from 'react-redux'
import { addFavProperty, removeFavProperty } from '../Redux/favouriteSlice';
import { editLikedProp } from '../Redux/dataSlice';
import InitialMsgBox from './InitialMsgBox';
import { isLoggedin, backend } from '../Helper';
import {changeMsg} from "../Redux/userSlice"
import LoadingComponent from '../Components/LoadingComponent'

function PropertyCard({ property, Edit=false, userFav=null, isFv = false }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFav,setIsFav] = useState(property?.isLiked || isFv)
  const dispatch = useDispatch()
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false)
  const [loading, setLoading] = useState(false)


  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % property.media.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + property.media.length) % property.media.length
    );
  };

  const handleFavChange = async() => {
    if(!isLoggedin()) {
      dispatch(changeMsg("Login Required!!!"))
      return
    }

    if(isFav) {
      dispatch(removeFavProperty(property._id))
    }
    else {
      const newProp = {...property, favourite : property.favourite + 1}
      dispatch(addFavProperty(newProp))
    }
    dispatch(editLikedProp(property._id))
    setIsFav(!isFav)
    try {
      const response = await axios.put(`${backend}/favourite/update/${property._id}`,{},{ withCredentials: true })
    } catch (error) {
      console.error("error in updating favourite",error)
    }
  }

  const handleMessage = () => {
    if(!isLoggedin()) {
      dispatch(changeMsg("Login Required!!!"))
      return
    }
    setDialogBoxOpen(true)
  }

  const handleDelete = async() => {
    try {
      setLoading(true)
      dispatch(changeMsg("Deleting your property..."))
      const response = await axios.delete(
        `${backend}/property/delete/${property._id}`,
        {withCredentials : true}
      )
      window.location.reload()
    } catch (error) {
      console.error("Error in deleting property", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-full w-full bg-white shadow-md rounded-md overflow-hidden border border-gray-300">
      <div className="lg:grid lg:grid-cols-2 p-4">
        {/* Image Section */}
        <div className="relative w-full lg:w-11/12 3xl:w-7/12 h-60 lg:h-80 overflow-hidden group  flex items-center rounded-md">  
          <div
            className="flex items-center transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {property?.media.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={property?.title}
                className="w-full h-full object-cover rounded-md"
              />
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition-colors z-10 lg:opacity-0 lg:group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
          >
            <FaChevronLeft size={20} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition-colors z-10 lg:opacity-0 lg:group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
          >
            <FaChevronRight size={20} />
          </button>

          {/* Listing Type */}
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
            For {property?.listingType.toUpperCase()}
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-between py-3 w-full 3xl:w-5/12">
          <h3 className="text-lg font-semibold text-gray-900">{property?.title}</h3>
          <p className="text-xl font-bold text-gray-800">
            {property?.currency.toUpperCase()} {property?.amount}{' '}
            {property?.listingType === 'rent' && property?.paymentTerms}
          </p>
          <p className="text-sm text-gray-600">
            {property?.address} | {property?.neighborhood} | {property?.city} |{' '}
            {property?.state}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {property?.bedrooms} Beds | {property?.propAge} Age | {property?.area} sqft
          </p>

          {/* Additional Info */}
          <div className="mt-2 flex space-x-4">
            {property?.parkingAvailable && (
              <span className="inline-flex items-center text-sm text-gray-500">
                <FaParking size={20} className='mr-1 text-blue-500'/>
                Parking
              </span>
            )}
            <span className="inline-flex items-center text-sm text-gray-500">
            <GiSofa size={20} className='mr-1 text-blue-500'/>
              {property?.furnishingStatus.charAt(0).toUpperCase() +
                property?.furnishingStatus.slice(1)}
            </span>
            {property?.pool && (
              <span className="inline-flex items-center text-sm text-gray-500">
                <svg
                  className="w-5 h-5 mr-1 text-blue-500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 3v18h14V3H5zm12 14H7V5h10v12z"
                  />
                </svg>
                Pool
              </span>
            )}
            {property?.balcony && (
              <span className="inline-flex items-center text-sm text-gray-500">
                <svg
                  className="w-5 h-5 mr-1 text-blue-500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 3v18h14V3H5zm12 14H7V5h10v12z"
                  />
                </svg>
                Balcony
              </span>
            )}
          </div>

          {/* Negotiability */}
          <div className="mt-2 text-sm text-gray-500">
            {property?.negotiability
              ? 'Negotiable Price'
              : 'Non Negotiable Price'}
          </div>

          {/* User Information */}
          <div className="mt-4 flex items-center">
            <img
              src={property?.owner.avatar}
              alt={property?.title}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm text-gray-700">{property?.owner.fullName} | Owner</span>
          </div>

          {/* Action Buttons */}
          { !Edit &&
            <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => navigate(`/property/${property._id}`)}
              className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
            >
              View Details
            </button>

            <div className="flex items-center justify-end gap-x-10">
              <div className='flex items-center justify-center gap-x-1 '>
                <div className='mt-2'>
                  {!isFav && <button
                    onClick={handleFavChange}
                    className="text-black hover:text-red-700 "
                  >
                    <CiHeart size={20} />
                  </button> }
                  {isFav && <button
                    onClick={handleFavChange}
                    className="text-red-600 hover:text-red-700"
                  >
                    <FaHeart size={20} /> 
                  </button> }
                </div>
                <div>{property?.favourite}</div>
              </div>

              <button
                onClick={() => handleMessage()}
                className="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <FaRegEnvelope size={24} className="mr-2" />
                <span className="hidden md:inline">Message Owner</span>
              </button>
            </div>
          </div>}

          {/*  Edit */}
          { Edit &&
            <div className="flex flex-row gap-6 items-center justify-start mt-3">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300" onClick={()=>(navigate(`/property/${property._id}`))}>
                Preview
              </button>
              <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-300" onClick={()=>(navigate(`/edit/${property._id}`))}>
                Edit
              </button>
              <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300" onClick={handleDelete}>
                Delete
              </button>
            </div>
          }
        </div>

        {
          dialogBoxOpen &&
          <InitialMsgBox data={property} setOpen={setDialogBoxOpen}/>
        }
      </div>
      {loading && <LoadingComponent/>}
    </div>
  );
}

export default PropertyCard;
