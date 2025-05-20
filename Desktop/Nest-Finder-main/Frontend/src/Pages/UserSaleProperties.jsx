import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import PropertyCard from '../Components/PropertyCard.jsx'
import {backend, isLoggedin} from "../Helper"
import { useDispatch, useSelector } from 'react-redux'
import { addUserSaleProp } from '../Redux/userSlice.js'
import axios from 'axios'

function UserSaleProperties() {
  
  const [data,setData] = useState(null)
  const [search, setSearch] = useState("")
  const [filtereData, setFilteredData] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dataRedux = useSelector((state) =>  state.user.userSaleProp)
  
  const retrieveListedSaleProperty = async() => {
    try {
      const response = await axios.get(`${backend}/property/listSaleProperty`,{withCredentials : true})
      setData(response.data.saleProperties)
      dispatch(addUserSaleProp(response.data.saleProperties))
    } catch (error) {
      console.error(error.response.data.message,error)
    }
  }
  
  // for fetching sale Properties
  useEffect(() => {
    if(!isLoggedin()) {
      navigate("/login")
      return
    }
    if(dataRedux.length) {
      setData(dataRedux[0])
    } else {
      retrieveListedSaleProperty()
    }
  },[dispatch, dataRedux])

  useEffect(() => {
    if(!data || !search) {
      setFilteredData(data)
      return
    }
    const filterData = data.filter((item) =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(search.toLowerCase())  
      )
    );
    setFilteredData(filterData)
  },[search, data])
  
  return (
    <div className='md:ml-64 px-2 md:px-20 py-5 flex flex-col gap-y-5'>
      {/* Heading and Search Bar */}
      <div>
        <h1 className="text-2xl lg:text-4xl font-bold dark:text-white">Your Listed Properties For Sale &rarr;</h1>
        <div className="relative mt-4">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} required />
        </div>     
      </div>

      {/* Cards */}
      <div className='flex flex-col gap-y-5'>
        {filtereData && filtereData.length > 0 ? (
          filtereData.map((property) => (
            <PropertyCard key={property._id} property={property} Edit={true} />
          ))
        ) : (
          <p className='mx-auto p-4 px-20 mt-10 text-xl border border-black rounded-md max-w-fit'>No properties found</p> 
        )}
      </div>

    </div>
  )
}

export default UserSaleProperties