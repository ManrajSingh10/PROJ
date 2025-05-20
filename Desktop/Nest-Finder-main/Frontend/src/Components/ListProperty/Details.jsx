import React from 'react';

function Details({
  property,
  handleChange,
  handleSubmit
}) {

  return (
    <div className='px-20 py-10 h-screen md:ml-64 sm:m-auto'>
      <form onSubmit={handleSubmit}>
        {/* Area */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Area (in sq ft)</label>
          <input
            type="Number"
            id="area"
            name="area"
            value={property.area || ''}
            onChange={handleChange}
            min="1"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g. 1200"
            required
          />
        </div>

        {/* Bedrooms */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bedrooms</label>
          <input
            type="Number"
            id="bedrooms"
            name="bedrooms"
            value={property.bedrooms || ''}
            onChange={handleChange}
            min={1}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g. 3"
            required
          />
        </div>

        {/* Floor */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Floor Number</label>
          <input
            type="Number"
            id="floor"
            name="floor"
            value={property.floor || ''}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g. 5"
            required
          />
        </div>

        {/* Parking Available */}
        <div className="mb-6 flex items-center">
          <label htmlFor="parkingAvailable" className="mr-3 text-sm font-medium text-gray-900 dark:text-white">Parking Available</label>
          <input
            type="checkbox"
            id="parkingAvailable"
            name="parkingAvailable"
            checked={property.parkingAvailable || false}
            onChange={handleChange}
            className="h-5 w-5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Furnishing Status */}
        <div className="mb-6">
          <label htmlFor="furnishingStatus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Furnishing Status</label>
          <select
            id="furnishingStatus"
            name="furnishingStatus"
            value={property.furnishingStatus || ''}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="" disabled>Select Furnishing Status</option>
            <option value="Fully-Furnished">Furnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>
        </div>

        {/* Property Age */}
        <div className="mb-6">
          <label htmlFor="propAge" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Property Age (in years)</label>
          <input
            type="Number"
            id="propAge"
            name="propAge"
            value={property.propAge || ''}
            onChange={handleChange}
            min={1}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g. 2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <textarea
            id="description"
            name="description"
            value={property.description || ''}
            onChange={handleChange}
            rows="4"
            maxLength={300}
            className="bg-gray-50 border border-gray-300 text-gray-900 resize-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Provide a detailed description of the property"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center"
        >
          Next
          <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default Details;
