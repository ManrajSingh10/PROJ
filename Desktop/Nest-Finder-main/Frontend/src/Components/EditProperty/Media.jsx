import React, { useEffect, useRef, useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import axios from 'axios';
import {backend} from '../../Helper';
import {useDispatch} from 'react-redux'
import {changeMsg} from '../../Redux/userSlice'

function Media({ data }) {
  const [index, setIndex] = useState("");
  const [media, setMedia] = useState(data.media); 
  const fileInputRef = useRef()
  const dispatch = useDispatch()

  const handleClick = (indexImage) => {
    setIndex(indexImage)
    fileInputRef.current.click()
  };

  // Function to handle file selection
  const handleFileChange = async(event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData()
      formData.append("image",file)
      formData.append("index",index)
      dispatch(changeMsg("Updating media..."))
      try {
        const response = await axios.patch(
          `${backend}/property/editImageInfo/${data._id}`,
          formData,
          {withCredentials:true}
        )
        setMedia(response.data.media)
      } catch (error) {
        console.error("error in updating image",error)
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* heading */}
      <h2 className="text-xl font-semibold text-gray-700">Media</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {media.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img}
              alt={`media-${index}`}
              className="w-full h-64 object-cover rounded-lg shadow-md"
              
            />
            <div className='absolute top-2 left-2  border-2 border-white rounded-full text-white p-2 shadow-lg bg-zinc-900' onClick={() => handleClick(index)}>
              <FaPencilAlt size={20} className=''/>
            </div>
          </div>
        ))}
        {
          media.length < 6 && 
            <div className="w-full h-64 object-cover rounded-lg shadow-md flex justify-center items-center text-zinc-900 gap-x-2 cursor-pointer" onClick={() => handleClick(media.length)}>
              <div className='flex gap-x-1'>
                <IoIosAddCircle size={25} />
                Add New Image  
              </div>
            </div>
        }
      </div>

      <div>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className='opacity-0'/>
      </div>

    </div>
  );
}       

export default Media;
