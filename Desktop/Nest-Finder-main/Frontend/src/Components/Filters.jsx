import React, { useState } from 'react';
import { ImCross } from "react-icons/im";
import axios from 'axios';
import { backend } from '../Helper';

function FilterBox({ 
  setIsOpen,
  setData
}) {
  const [filters, setFilters] = useState({
    bedrooms: '',
    minArea: 0,
    maxArea: 50000,  
    listingType: 'all', 
    furnishingStatus: '', 
    minAmount: 0,
    maxAmount: 10000000,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFilters((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'radio' || type === 'select-one') {
      setFilters((prev) => ({ ...prev, [name]: value }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: Number(value) }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${backend}/property/filterProperty`, { params: filters }); 
      setData(response.data.properties);
    } catch (error) {
      console.error("Error in fetching filtered Properties", error);
    }
    setIsOpen(false); 
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg md:w-1/3 z-30">
          <div className='flex justify-between items-center mb-4'>
            <h2 className="text-xl font-semibold text-gray-800">Filter Properties</h2>
            <div onClick={() => setIsOpen(false)}><ImCross /></div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Bedrooms */}
            <div className='w-full'>
              <label htmlFor="bedrooms" className="block text-gray-700">BHK</label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="0">BHK</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
              </select>
            </div>

            {/* Rent/Sale */}
            <div className="w-full ">
              <label className="block text-gray-700">Property Type</label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="rent"
                    name="listingType"
                    value="Rent"
                    checked={filters.listingType === 'Rent'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="rent" className="text-gray-700">For Rent</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="sale"
                    name="listingType"
                    value="Sale"
                    checked={filters.listingType === 'Sale'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="sale" className="text-gray-700">For Sale</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="all"
                    name="listingType"
                    value="all"
                    checked={filters.listingType === 'all'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="all" className="text-gray-700">Any</label>
                </div>
              </div>
            </div>

            {/* Area */}
            <div className="w-full">
              <label className="block text-gray-700">Area (in sqft)</label>
              <div className="flex flex-col justify-between items-center mt-2 px-5">
                <div className="flex space-x-4">
                  {/* Min Area Input */}
                  <input
                    type="number"
                    name="minArea"
                    value={filters.minArea}
                    min={0}
                    max={filters.maxArea}
                    onChange={(e) => setFilters((prev) => ({
                      ...prev,
                      minArea: Number(e.target.value),  
                    }))}
                    className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Min Area"
                  />
                  {/* Max Area Input */}
                  <input
                    type="number"
                    name="maxArea"
                    value={filters.maxArea}
                    min={filters.minArea}
                    onChange={(e) => setFilters((prev) => ({
                      ...prev,
                      maxArea: Number(e.target.value),  
                    }))}
                    className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Max Area"
                  />
                </div>
                <div className="flex justify-between w-full mt-2">
                  <span>Min: {filters.minArea} sqft</span>
                  <span>Max: {filters.maxArea} sqft</span>
                </div>
              </div>
            </div>

            {/* Furnishing Status */}
            <div>
              <label className="block text-gray-700">Furnishing Status</label>
              <select
                id="furnishingStatus"
                name="furnishingStatus"
                value={filters.furnishingStatus}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select furnishing Status</option>
                <option value="Fully-Furnished">Fully-Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>

            {/* Amount */}
            <div className="w-full">
              <label className="block text-gray-700">Amount</label>
              <div className="flex flex-col justify-between items-center mt-2 px-5">
                <div className="flex space-x-4">
                  {/* Min Amount Input */}
                  <input
                    type="number"
                    name="minAmount"
                    value={filters.minAmount}
                    min={0}
                    max={filters.maxAmount}
                    onChange={(e) => setFilters((prev) => ({
                      ...prev,
                      minAmount: Number(e.target.value),
                    }))}
                    className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Min Amount"
                  />
                  {/* Max Amount Input */}
                  <input
                    type="number"
                    name="maxAmount"
                    value={filters.maxAmount}
                    min={filters.minAmount}  
                    max={50000000}
                    onChange={(e) => setFilters((prev) => ({
                      ...prev,
                      maxAmount: Number(e.target.value), 
                    }))}
                    className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Max Amount"
                  />
                </div>
                <div className="flex justify-between w-full mt-2">
                  <span>Min: ₹{filters.minAmount}</span>
                  <span>Max: ₹{filters.maxAmount}</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Apply Filters
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FilterBox;
