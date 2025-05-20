import axios from 'axios';
import React, { useState } from 'react';
import { backend } from '../../Helper';

function Basic({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [message,setMessage] = useState("")
  const [formData, setFormData] = useState({
    title: data?.title || '',
    propType: data?.propType || '',
    listingType: data?.listingType || '',
    address: data?.address || '',
    neighborhood: data?.neighborhood || '',
    city: data?.city || '',
    state: data?.state || '',
    zip: data?.zip || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditClick = async() => {
    if(isEditing){
      if(!formData.title || !formData.propType || !formData.listingType || !formData.address || !formData.neighborhood || !formData.city || !formData.state || !formData.zip) {
        setMessage("All Fields are Required")
        return
      }
      setMessage("Applying Changes")
      try {
        const response = await axios.patch(
          `${backend}/property/editBasicInfo/${data._id}`,
          {
           formData
          },
          {
            withCredentials : true
          }
        )
        setMessage(response.data.message)
        window.location.reload()
      } catch (error) {
        console.error(error)
        setMessage(error?.response?.data?.message)
      } 
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700">Basic Info</h2>
        <button
          onClick={handleEditClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={ formData.title }
            onChange={handleChange}
            disabled={!isEditing}
            maxLength={65}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          />
        </div>

        {/* Property Type - Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="propType" className="text-sm font-medium text-gray-600">
            Property Type
          </label>
          <select
            id="propType"
            name="propType"
            value={formData.propType}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          >
            <option value="" disabled>
              Select a property type
            </option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Studio">Studio</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Listing Type - Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="listingType" className="text-sm font-medium text-gray-600">
            Listing Type
          </label>
          <select
            id="listingType"
            name="listingType"
            value={formData.listingType}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          >
            <option value="" disabled>
              Select a listing type
            </option>
            <option value="Sale">Sale</option>
            <option value="Rent">Rent</option>
          </select>
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label htmlFor="address" className="text-sm font-medium text-gray-600">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          />
        </div>

        {/* Neighborhood */}
        <div className="flex flex-col">
          <label htmlFor="neighborhood" className="text-sm font-medium text-gray-600">
            Neighborhood
          </label>
          <input
            type="text"
            id="neighborhood"
            name="neighborhood"
            value={ formData.neighborhood }
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          />
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label htmlFor="city" className="text-sm font-medium text-gray-600">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={ formData.city }
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          />
        </div>

        {/* State */}
        <div className="flex flex-col">
          <label htmlFor="state" className="text-sm font-medium text-gray-600">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={ formData.state }
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          />
        </div>

        {/* Zip */}
        <div className="flex flex-col">
          <label htmlFor="zip" className="text-sm font-medium text-gray-600">
            Zip
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={ formData.zip }
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          />
        </div>
      </div>

      {message && <div className='text-center text-blue-600'>{message}</div>}
    </div>
  );
}

export default Basic;
