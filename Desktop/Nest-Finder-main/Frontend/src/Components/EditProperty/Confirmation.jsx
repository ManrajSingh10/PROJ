import React,{useState, useEffect} from 'react'
import { backend } from '../../Helper';
import axios from 'axios';

function Confirmation({data}) {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    msgThroughEmail: data?.msgThroughEmail || false,
    msgThroughPhone: data?.msgThroughPhone || false,
    phone: data?.phone || '',
    email: data?.email || '',
    negotiability: data?.negotiability || '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === 'checkbox') {
      setFormData((prevState) => {
        const updatedData = {
          ...prevState,
          [name]: checked, 
        };
        
        if (!checked) {
          if (name === 'msgThroughEmail') {
            updatedData.email = ''; 
          }
          if (name === 'msgThroughPhone') {
            updatedData.phone = ''; 
          }
        }
        
        return updatedData;
      });
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === 'radio' ? value === 'true' : value,
      }));
    }
  };  

  const handleEditClick = () => {
    if (isEditing) {
      handleSubmit()
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = async() => {
    if (formData.msgThroughEmail && !formData.email) {
      setMessage("All Fields are required")
      return 
    }
    if (formData.msgThroughEmail && !formData.email) {
      setMessage("All Fields are required")
      return 
    }
    setMessage("Applying Changes")
    try {
      const response = await axios.patch(
        `${backend}/property/editContactInfo/${data._id}`,
        {formData},
        {withCredentials : true}
      )
      setMessage("Details Updated Successfully")
      window.location.reload()
    } catch (error) {
      console.error("Error in Updating Pricng of property",error)
      setMessage(error?.response?.data?.message || "Error in Updating Details")
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700">Contact Info</h2>
        <button
          onClick={handleEditClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
  
      <div className="flex flex-col gap-y-5">
        {/* Checkbox for Email */}
        <div className='flex flex-col gap-y-2'>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="msgThroughEmail"
              name="msgThroughEmail"
              checked={formData.msgThroughEmail}
              onChange={handleChange}
              disabled={!isEditing}
              className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="msgThroughEmail" className="text-sm font-medium text-gray-600">
              Email
            </label>
          </div>
    
          {/* Conditional Email Input Field */}
          {formData.msgThroughEmail && (
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
              />
            </div>
          )}
        </div>
  
        {/* Checkbox for Phone */}
        <div className='flex flex-col gap-y-2'>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="msgThroughPhone"
              name="msgThroughPhone"
              checked={formData.msgThroughPhone}
              onChange={handleChange}
              disabled={!isEditing}
              className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="msgThroughPhone" className="text-sm font-medium text-gray-600">
              Phone
            </label>
          </div>
    
          {/* Conditional Phone Input Field */}
          {formData.msgThroughPhone && (
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
              />
            </div>
          )} 
        </div>
      </div>
  
      {/* Message Display */}
      {message && <div className='text-center text-blue-600'>{message}</div>}
    </div>
  );
  
}

export default Confirmation