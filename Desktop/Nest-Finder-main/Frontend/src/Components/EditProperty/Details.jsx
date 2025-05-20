import axios from 'axios';
import React, { useState } from 'react';
import { backend } from '../../Helper';

function Details({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    area: data?.area || '',
    bedrooms: data?.bedrooms || '',
    floor: data?.floor || '',
    parkingAvailable: data?.parkingAvailable || false,
    furnishingStatus: data?.furnishingStatus || '',
    propAge: data?.propAge || '',
    description: data?.description || '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditClick = () => {
    if (isEditing) {
      handleSubmit();
    } 
    setIsEditing(!isEditing);
  };

  const handleSubmit = async() => {
    if (!formData.area || !formData.bedrooms || !formData.floor || !formData.furnishingStatus || !formData.propAge || !formData.description) {
      setMessage("All Fields are Required")
      return
    }
    setMessage("Applying Changes")
    try {
      const response = await axios.patch(
        `${backend}/property/editDetailsInfo/${data._id}`,
        {formData},
        {withCredentials : true}
      )
      setMessage("Details Updated Successfully")
      window.location.reload()
    } catch (error) {
      setMessage(error?.response?.data?.message || "Error in Updating Details")
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700">Property Details</h2>
        <button
          onClick={handleEditClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Area */}
        <div className="flex flex-col">
          <label htmlFor="area" className="text-sm font-medium text-gray-600">
            Area (sq.ft)
          </label>
          <input
            type="number"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          />
        </div>

        {/* Bedrooms */}
        <div className="flex flex-col">
          <label htmlFor="bedrooms" className="text-sm font-medium text-gray-600">
            Bedrooms
          </label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={ formData.bedrooms }
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          />
        </div>

        {/* Floor */}
        <div className="flex flex-col">
          <label htmlFor="floor" className="text-sm font-medium text-gray-600">
            Floor
          </label>
          <input
            type="text"
            id="floor"
            name="floor"
            value={ formData.floor }
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          />
        </div>

        {/* Parking Available */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="parkingAvailable"
            name="parkingAvailable"
            checked={ formData.parkingAvailable }
            onChange={handleChange}
            disabled={!isEditing}
            className="focus:ring-2 focus:ring-blue-500 rounded"
          />
          <label htmlFor="parkingAvailable" className="text-sm font-medium text-gray-600">
            Parking Available
          </label>
        </div>

        {/* Furnishing Status */}
        <div className="flex flex-col">
          <label htmlFor="furnishingStatus" className="text-sm font-medium text-gray-600">
            Furnishing Status
          </label>
          <select
            id="furnishingStatus"
            name="furnishingStatus"
            value={ formData.furnishingStatus }
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          >
            <option value="" disabled>
              Select Furnishing Status
            </option>
            <option value="Unfurnished">Unfurnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Fully-Furnished">Fully-Furnished</option>
          </select>
        </div>

        {/* Property Age */}
        <div className="flex flex-col">
          <label htmlFor="propAge" className="text-sm font-medium text-gray-600">
            Property Age (Years)
          </label>
          <input
            type="number"
            id="propAge"
            name="propAge"
            value={ formData.propAge }
            onChange={handleChange}
            disabled={!isEditing}
            min={1}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col xl:col-span-2">
          <label htmlFor="description" className="text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={ formData.description }
            onChange={handleChange}
            disabled={!isEditing}
            rows="4"
            maxLength={300}
            className="mt-1 px-3 py-2 border resize-none border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          />
        </div>
      </div>

      {message && <div className='text-center text-blue-600'>{message}</div>}
    </div>
  );
}

export default Details;
