import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {backend, isLoggedin} from "../Helper"
import PropertyCard from '../Components/PropertyCard'
import { useSelector, useDispatch } from 'react-redux'
import { setFavouriteData } from '../Redux/favouriteSlice'
import { useNavigate } from 'react-router-dom'

function Favourite() {
  const [data,setData] = useState(null)
  const dataFromRedux = useSelector(state => state.favourite.favouriteData)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const retrieveData = async() => {
    try {
      const response = await axios.get(`${backend}/favourite/getFavPropDetails`,{withCredentials : true})
      setData(response.data.favProperty)
      dispatch(setFavouriteData(response.data.favProperty))

    } catch (error) {
      console.error("error in fetching user favourite Properties",error)
    }
  }

  useEffect(()=>{
    if (dataFromRedux.length !== 0) {
      setData(dataFromRedux[0])
    } else {
      retrieveData()
    }
  },[dispatch, data, dataFromRedux])

  useEffect(()=> {
    if(!isLoggedin())
      navigate('/login')
  },[isLoggedin])

  return (
    <div className='md:ml-64 px-2 md:px-20 py-5 flex flex-col gap-y-5'>
      {data && data.length !== 0 && <h1 className=' text-4xl font-bold dark:text-white'>
        Favourites &rarr;
      </h1>}

      <div className='flex flex-col gap-y-5'>
        {
          data && [...data].reverse().map((prop)=>(
            <PropertyCard key={prop?._id} property={ prop } isFv={true}/>
          ))
        }
        {
          (!data || data?.length === 0) && 
          <div className="flex items-center justify-center pt-40">
            <div className="text-center text-4xl font-bold text-gray-600 bg-gray-100 p-12 rounded-xl border-4 border-gray-300 shadow-2xl">
            Your Favorites List is Empty.
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Favourite