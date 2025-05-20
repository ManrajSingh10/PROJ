import React, { useEffect, useRef, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { backend, isLoggedin } from '../Helper';
import { FaPencilAlt } from "react-icons/fa";
import {addUserSaleProp, addUserRentedProp, addProfile, changeUserAvatar, changeMsg} from "../Redux/userSlice"
import {useDispatch, useSelector} from 'react-redux'

function Profile() {
  const navigate = useNavigate()
  const [data,setData] = useState(null)
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setName] = useState("")
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [message,setMessage] = useState("")
  // const samplePhoto = "https://i.pinimg.com/236x/c1/01/27/c10127cfeefd05a9bc1c337b421395c7.jpg"
  const [rentedProperty,setRentedProperty] = useState(null)
  const [saleProperty,setSaleProperty] = useState(null)
  const fileInput = useRef()
  const dispatch = useDispatch()
  const rentPropRedux = useSelector((state) =>  state.user.userRentedProp)
  const salePropRedux = useSelector((state) =>  state.user.userSaleProp)
  const UserRedux = useSelector((state) => state.user.profile)

  // for fetching user data
  const dataRetriever = async() => {
    try {
      const response = await axios.get(`${backend}/user/userInfo`,{withCredentials : true})
      setData(response.data.user)
      dispatch(addProfile(response.data.user))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    if (Object.keys(UserRedux).length) {
      setData(UserRedux)
      setName(UserRedux.fullName || "")
      setEmail(UserRedux.email || "")
      setPhone(UserRedux.phone || "")
      setDob(UserRedux.dob || "")
    } else {
      dataRetriever()
    }
  },[UserRedux, dispatch])

  // for editing user info
  const handleEditClick = async () => {
    if(isEditing){
      if(!dob || !email || !phone || !fullName){
        setMessage("All Field Required")
        return
      }
      setIsEditing(!isEditing)
      try {
        const response = await axios.patch(
          `${backend}/user/updatePersonalInfo`,
          {
            email,phone,dob,fullName
          },
          {
            withCredentials : true
          }
        )
        dispatch(addProfile(response.data.user))
        setMessage(response.data.message)
      } catch (error) {
        setMessage(error.response.data.message)
        console.error(error.response.data.message,error)
      }
    } else {
      setIsEditing(!isEditing);
    }
  };

  useEffect(()=>{
    if(!isLoggedin()) navigate("/login")
  },[isLoggedin])
  

  // for fetching Rented Properties
  const retrieveListedRentedProperty = async() => {
    try {
      const response = await axios.get(`${backend}/property/listRentedProperty`,{withCredentials : true})
      setRentedProperty(response.data.rentedProperties)
      dispatch(addUserRentedProp(response.data.rentedProperties))
    } catch (error) {
      console.error(error.response.data.message,error)
    }
  }
  
  useEffect(()=>{
    if(!isLoggedin()) return
    if (rentPropRedux.length) {
      setRentedProperty(rentPropRedux[0])
    } else {
      retrieveListedRentedProperty()
    }
  },[dispatch, rentPropRedux])

  // for fetching Sale Properties
  const retrieveListedSaleProperty = async() => {
    try {
      const response = await axios.get(`${backend}/property/listSaleProperty`,{withCredentials : true})
      setSaleProperty(response.data.saleProperties)
      dispatch(addUserSaleProp(response.data.saleProperties))
    } catch (error) {
      console.error(error.response.data.message,error)
    }
  }

  useEffect(()=>{
    if(!isLoggedin()) return
    if (salePropRedux.length) {
      setSaleProperty(salePropRedux[0])
    } else {
      retrieveListedSaleProperty()
    }
  },[salePropRedux, dispatch])

  // for changing avatar
  const handleFileChange = async(event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData()
      formData.append('avatar',file)
      formData.append('prevImage',data.avatar)
      dispatch(changeMsg("Updating Avatar"))
      try {
        const response = await axios.patch(`${backend}/user/updateAvatar`,formData,{withCredentials:true})
        dispatch(changeUserAvatar(response.data.avatar))
      } catch (error) {
        console.error("error in updating profile/avatar", error)
      }
    }
  }

  return (
    <div>
      {  data &&
        <div className='md:ml-64 px-10'>
        <div className="py-6 flex flex-col gap-y-7">
  
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row md:justify-center md:gap-x-10 lg:gap-x-20 items-center gap-6 border border-gray-300 rounded-xl shadow-lg p-6 md:w-2/3 md:m-auto">
            
            {/* Profile Image */}
            <div className="relative">
              <img
                src={data.avatar}
                alt={data.userName}
                className="h-48 md:h-64 w-48 md:w-64 object-cover rounded-full border-4 border-gray-200 shadow-md"
              />
              <div className="absolute top-0 left-0 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition border border-black" onClick={() => fileInput.current.click()}>
                <FaPencilAlt className="text-gray-700 text-xl" />
              </div>
              <input type="file" ref={fileInput} className='hidden' accept="image/*" onChange={handleFileChange} />   {/* hidden file input */ }
            </div>

            
            {/* Profile Information */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left mt-4 md:mt-0 gap-y-4">
              <div className="text-2xl md:text-3xl font-medium text-gray-700">Hi,</div>
              <div className="text-4xl md:text-5xl font-bold text-gray-900">{data.fullName}</div>
              <div className="text-xl md:text-2xl text-gray-600">@{data.userName}</div>
            </div>
          </div>
  
          {/* Personal Information Section */}
          <div className="py-6">
            <div className="border border-gray-300 rounded-xl shadow-lg p-6 md:w-2/3 md:m-auto">
              {/* Section Header */}
              <div className="flex flex-row justify-between items-center mb-6">
                <div className="text-xl md:text-2xl font-semibold text-gray-800">Personal Information</div>
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition duration-200"
                >
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </div>

              {/* Name Field */}
              <div className={`mb-4 flex flex-col md:flex-row justify-between ${!isEditing && 'hidden'}`}>
                <div className="text-lg font-medium text-gray-700">Name</div>
                {isEditing ? (
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setName(e.target.value)}
                    className="text-gray-900 border border-gray-300 rounded-md p-2"
                  />
                ) : (
                  <div className="text-xl text-gray-900">{fullName}</div>
                )}
              </div>
  
              {/* Email Field */}
              <div className="mb-4 flex flex-col md:flex-row justify-between">
                <div className="text-lg font-medium text-gray-700">Email</div>
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-gray-900 border border-gray-300 rounded-md p-2"
                  />
                ) : (
                  <div className="text-xl text-gray-900">{email}</div>
                )}
              </div>
              
              {/* Phone Field */}
              <div className="mb-4 flex flex-col md:flex-row justify-between">
                <div className="text-lg font-medium text-gray-700">Phone</div>
                {isEditing ? (
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className=" text-gray-900 border border-gray-300 rounded-md p-2"
                  />
                ) : (
                  <div className="text-xl text-gray-900">{phone }</div>
                )}
              </div>
              
              {/* Date of Birth Field */}
              <div className="mb-4 flex flex-col md:flex-row justify-between">
                <div className="text-lg font-medium text-gray-700">Date of Birth</div>
                {isEditing ? (
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className=" text-gray-900 border border-gray-300 rounded-md p-2"
                  />
                ) : (
                  <div className="text-xl text-gray-900">{dob}</div>
                )}
              </div>
            
              {
                message && 
                <div className='flex justify-center'>
                  <div className='text-blue-600 font-medium'>{message}</div>
                </div>
              }    
            </div>
          </div>
  
  
          {/* My Listing Section */}
          <div className="py-8">
            <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-xl shadow-lg p-6">
              {/*  Section Title  */}
              <h2 className="text-2xl font-semibold text-gray-800">My Property Listings</h2>
  
              {/*  Properties for Sale  */}
              { saleProperty && saleProperty.length>0 &&
                <div className="mt-6 border border-black p-2 rounded-md">
                <div className="text-lg font-semibold text-gray-700">Properties Listed For Sale</div>
                <div className="mt-2 text-gray-600">Total: {saleProperty.length}</div>
                <div className="flex mt-4 space-x-6">
                  <div className="flex-1">
                    <div className="font-medium text-gray-700">Recent Listing</div>
                    <div className="flex items-center mt-2 space-x-4">
                      <img className="w-16 h-16 object-cover rounded-lg" src={saleProperty[saleProperty.length-1]?.media[0]} alt="Property Image" />
                      <div>
                        <div className="font-semibold text-gray-800">{saleProperty[saleProperty.length-1]?.title}</div>
                        <div className="text-sm text-gray-600">Price : {saleProperty[saleProperty.length-1]?.currency} {saleProperty[saleProperty.length-1]?.amount}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={()=>navigate("/listSale")}>
                  View All
                </button>
              </div>}
  
              {/*  Properties for Rent  */}
              { rentedProperty && rentedProperty.length>0 &&
                <div className="mt-6 border border-black p-2 rounded-md">
                <div className="text-lg font-semibold text-gray-700">Properties Listed For Rent</div>
                <div className="mt-2 text-gray-600">Total: {rentedProperty?.length}</div>
                <div className="flex mt-4 space-x-6">
                  <div className="flex-1">
                    <div className="font-medium text-gray-700">Recent Listing</div>
                    <div className="flex items-center mt-2 space-x-4">
                      <img className="w-16 h-16 object-cover rounded-lg" src={rentedProperty[rentedProperty.length-1]?.media[0]} alt="Property Image" />
                      <div>
                        <div className="font-semibold text-gray-800">{rentedProperty[rentedProperty.length-1]?.title}</div>
                        <div className="text-sm text-gray-600">Rent : {rentedProperty[rentedProperty.length-1]?.currency} {rentedProperty[rentedProperty.length-1]?.amount} {rentedProperty[rentedProperty.length-1]?.paymentTerms}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={()=>navigate("/listRent")}>
                  View All
                </button>
              </div>}

              {/* If No Property is Listed */}
              {
                (!saleProperty || saleProperty.length===0) && (!rentedProperty || rentedProperty.length===0) &&
                <div className='flex flex-col justify-center items-center mt-4 space-y-4'>
                  <div className='text-lg font-semibold text-gray-700'>You haven't listed any properties yet.</div>
                  <button className='px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200' onClick={()=>navigate("/list-property")}>
                    List Your Property
                  </button>
                </div>
              }
              
            </div>
          </div>
  
          {/* Setting Section */}
          {/* <div className="py-8">
            <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>
  
            </div>
          </div> */}
  
  
  
        </div>
      </div>}
    </div>
  );
}

export default Profile;
