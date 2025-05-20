import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Basic from '../Components/EditProperty/Basic'
import Details from '../Components/EditProperty/Details'
import Media from '../Components/EditProperty/Media'
import Pricing from '../Components/EditProperty/Pricing'
import Confirmation from '../Components/EditProperty/Confirmation'
import { backend } from '../Helper'

function Edit() {
  const [data,setData] = useState(null)
  const {propertyId} = useParams()

  // fetching property data
  useEffect(()=>{
    const retrievePropertyData = async () => {
      try {
        const response = await axios.get(`${backend}/property/listSingleProperty/${propertyId}`)
        setData(response.data.property)
      } catch (error) {
        console.error(error)
      }
    }
    retrievePropertyData()
  },[])
  
  return (
    <div className='md:ml-64 px-2 md:px-20 py-5 flex flex-col gap-y-5' >
      <div className='text-2xl lg:text-4xl font-bold dark:text-white'>Edit Your Property &rarr;</div>
      <div >
        { data &&
          <div className=' flex flex-col gap-y-7'>
            <Basic data={data}/>
            <Details data={data}/>
            <Media data={data}/>
            <Pricing data={data}/>
            <Confirmation data={data}/>
          </div>
        }
      </div>
    </div>
  )
}

export default Edit