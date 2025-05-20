import React from 'react';

function Basic({
  property,
  handleChange,
  handleSubmit
}) {
  

  return (
    <div className='px-20 py-10 h-screen md:ml-64 sm:m-auto'>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={property.title}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="i.e. 3BHK Apartment"
            required
          />
        </div>

        {/* Property Type */}
        <div className="mb-6">
          <label htmlFor="propType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Property Type</label>
          <select
            id="propType"
            name="propType"
            value={property.propType}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="" disabled>Select a property type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Studio">Studio</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Listing Type */}
        <div className="mb-6">
          <label htmlFor="listingType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Listing Type</label>
          <select
            id="listingType"
            name="listingType"
            value={property.listingType}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="Rent">For Rent</option>
            <option value="Sale">For Sale</option>
          </select>
        </div>

        {/* Full Address */}
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Property Location</label>
        <div className="grid gap-6 mb-6 md:grid-cols-2 border border-black p-4 rounded-md">
          <div>
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Street Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={property.address}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="123 Main St"
              required
            />
          </div>
          <div>
            <label htmlFor="neighborhood" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Neighborhood</label>
            <input
              type="text"
              id="neighborhood"
              name="neighborhood"
              value={property.neighborhood}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Downtown"
            />
          </div>
          <div>
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={property.city}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Los Angeles"
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={property.state}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="California"
              required
            />
          </div>
          <div>
            <label htmlFor="zip" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ZIP Code</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={property.zip}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="90001"
              required
            />
          </div>
        </div>

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

export default Basic;