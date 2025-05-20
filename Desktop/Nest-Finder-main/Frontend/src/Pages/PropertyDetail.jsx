import React, { useEffect, useState } from 'react';
import { FaHeart, FaPhoneAlt, FaRegEnvelope, FaEnvelope, FaComment } from 'react-icons/fa'; // Icons for heart and contact
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { backend } from '../Helper';
import Map from '../Components/Map';

function PropertyDetail() {
  const [property,setProperty] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0);
  const {propertyId} = useParams()

  // Handle next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % property?.media.length);
  };

  // Handle previous image
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + property?.media.length) % property?.media.length
    );
  };

  // fetching property data
  useEffect(()=>{
    const retrievePropertyData = async () => {
      try {
        const response = await axios.get(`${backend}/property/listSingleProperty/${propertyId}`)
        setProperty(response.data.property)
      } catch (error) {
        console.error(error)
      }
    }
    retrievePropertyData()
  },[])

  return (
    <div>
      {property &&
      <div className=" md:ml-64 mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="relative 2xl:flex">

          {/* Image Section */}
          <div className='2xl:w-1/2'>
            <div className="carousel w-full lg:h-[50vh] relative">
              <img
                src={property?.media[currentIndex]}
                alt={property?.title}
                className="w-full h-full object-cover rounded-lg transition-all duration-500 ease-in-out"
              />
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition-colors z-10 "
              >
                &lt;
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition-colors z-10 "
              >
                &gt;
              </button>
            </div>

            {/* Thumbnail navigation */}
            <div className="flex justify-center mt-4">
              {property?.media.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Thumbnail"
                  className={`w-10 h-10 md:w-20 md:h-20 object-cover rounded-lg cursor-pointer mx-2 ${index===currentIndex?"scale-110":""}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Title and Summary */}
          <div className="mt-6 2xl:mt-0 text-center 2xl:w-1/2 2xl:flex 2xl:flex-col 2xl:p-10">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900">
              {property?.title}
            </h1>

            {/* Property Details */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mt-3">
              {property?.furnishingStatus} {property?.propType} for <span className='text-red-700'>{property?.listingType}</span> in 
              <br/>
              <span className="font-semibold text-gray-800">{property?.neighborhood}</span>, 
              <span className="font-semibold text-gray-800">{property?.city}</span>, 
              <span className="font-semibold text-gray-800">{property?.state}</span>
            </p>

            {/* Description */}
            <p className="mt-4 text-gray-700 text-base sm:text-lg lg:text-xl px-4 md:px-0">
              {property?.description}
            </p>

            {/* Owner Info */}
            <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4">
              <img
                src={property?.owner.avatar}
                alt={`${property?.owner.fullName} avatar`}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-300"
              />
              <div className="text-sm sm:text-base font-medium text-gray-800">
                {property?.owner.fullName} | Owner
              </div>
            </div>
          </div>

        </div>
        
        {/* Sticky Section */}
        <div className="w-full border border-blue-300 bg-gray-100 text-black py-6 px-4 sm:px-6 lg:px-8 rounded-xl shadow-lg sticky top-20 mt-4 z-30">
          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-semibold mb-0">Price & Payment Details</h2>

          {/* Conditional Display for Sale vs Rent */}
          {property?.listingType.toLowerCase() === "sale" ? (
            <div className="space-y-3 2xl:flex 2xl:items-center 2xl:justify-start 2xl:gap-x-32">
              <div className="flex justify-between text-base sm:text-lg hidden">
                <span className="font-medium">Amount:</span>
                <span>{property?.currency} {property?.amount}</span>
              </div>
              <div className="flex justify-between text-base sm:text-lg gap-x-2">
                <span className="font-medium">Amount:</span>
                <span>{property?.currency} {property?.amount}</span>
              </div>
              <div className="flex justify-between text-base sm:text-lg gap-x-2">
                <span className="font-medium">Negotiable:</span>
                <span>{property?.negotiability ? "YES" : "NO"}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3 2xl:flex 2xl:items-center 2xl:justify-between">
              {/* Rent */}
              <div className="flex justify-between items-center text-base sm:text-lg hidden">
                <span className="font-medium">Rent:</span>
                <span>{property?.currency} {property?.amount}</span>
              </div>
              
              {/* Rent (duplicate, adjust accordingly) */}
              <div className="flex justify-between items-center text-base sm:text-lg gap-x-2">
                <span className="font-medium">Rent :</span>
                <span>{property?.currency} {property?.amount}</span>
              </div>
              
              {/* Security Deposit */}
              <div className="flex justify-between items-center text-base sm:text-lg gap-x-2">
                <span className="font-medium">Security Deposit :</span>
                <span>{property?.currency} {property?.securityDeposit}</span>
              </div>

              {/* Payment Terms */}
              <div className="flex justify-between items-center text-base sm:text-lg gap-x-2">
                <span className="font-medium">Payment Terms :</span>
                <span>{property?.paymentTerms}</span>
              </div>

              {/* Negotiable */}
              <div className="flex justify-between items-center text-base sm:text-lg gap-x-2">
                <span className="font-medium">Negotiable :</span>
                <span>{property?.negotiability ? "Yes" : "No"}</span>
              </div>
            </div>
          )}

          {/* Contact Details */}
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800 mt-2">Contact Details</h2>

          {/* Contact Options */}
          <div className="space-y-2 2xl:flex 2xl:items-center 2xl:gap-x-7">
            {property.msgThroughApp && (
              <div className="flex items-center space-x-2 text-sm sm:text-base text-gray-700 hidden">
                <FaComment className="text-blue-500" />
                <span>Msg Through App</span>
              </div>
            )}

            <div className="flex items-center space-x-2 text-sm sm:text-base text-gray-700 cursor-pointer">
              <FaComment className="text-blue-500" />
              <span>Msg Through App &rarr;</span>
            </div>

            {property.msgThroughPhone && (
              <div className="flex items-center space-x-2 text-sm sm:text-base text-gray-700">
                <FaPhoneAlt className="text-green-500" />
                <span>{property.phone}</span>
              </div>
            )}

            {property.msgThroughEmail && (
              <div className="flex items-center space-x-2 text-sm sm:text-base text-gray-700">
                <FaEnvelope className="text-red-500" />
                <span>{property.email}</span>
              </div>
            )}
          </div>

        </div>

        {/* Key Property Information */}
        <div className="lg:grid lg:grid-cols-2 lg:w-2/3 m-auto gap-8 mt-8 px-4 sm:px-6 lg:px-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
              Property Overview
            </h2>

            {/* Property Details List */}
            <ul className="space-y-4 text-gray-700">
              <li className="flex justify-between">
                <span className="font-medium">Listing Type:</span>
                <span>{property?.listingType}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Property Type:</span>
                <span>{property?.propType}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Floor:</span>
                <span>{property?.floor}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Property Age:</span>
                <span>{property?.propAge} years</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Area:</span>
                <span>{property?.area} sqft</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Bedrooms:</span>
                <span>{property?.bedrooms}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Parking:</span>
                <span>{property?.parkingAvailable ? 'Available' : 'Not Available'}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Furnishing Status:</span>
                <span>{property?.furnishingStatus}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Amenities and Features */}
        <div className="lg:grid lg:grid-cols-2 lg:w-2/3 m-auto gap-8 mt-8 px-4 sm:px-6 lg:px-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
              Amenities & Features
            </h2>

            {/* Amenities List */}
            <ul className="space-y-4 text-gray-700">
              <li className="flex justify-between">
                <span className="font-medium">Furnishing:</span>
                <span>{property?.furnishingStatus}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Parking:</span>
                <span>{property?.parkingAvailable ? 'Available' : 'Not Available'}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Neighborhood:</span>
                <span>{property?.neighborhood}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Property Age:</span>
                <span>{property?.propAge} years</span>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className='mt-10 border border-black rounded-md mx-4 md:w-fit md:mx-auto shadow-gray-400 shadow-md'>
          <Map property={property} />
        </div> */}
        
      </div>}
    </div>
  );
}

export default PropertyDetail;
