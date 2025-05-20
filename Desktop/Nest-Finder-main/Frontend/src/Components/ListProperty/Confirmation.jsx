import React, { useState } from 'react';

function Confirmation({
  property,
  handleChange,
  handleSubmit
}) {
  return (
    <div className='px-20 py-10 h-screen md:ml-64 sm:m-auto'>
      <h2 className="text-2xl font-semibold mb-4">How would you like to be contacted?</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Checkboxes for contact methods */}
        <div className="flex flex-col space-y-2">
          <label className="flex items-center">
            <input 
              type="checkbox" 
              name="msgThroughApp" 
              checked={property.msgThroughApp}
              onChange={handleChange} 
              className="mr-2"
            />
            In-app messages
          </label>
          <label className="flex items-center">
            <input 
              type="checkbox" 
              name="msgThroughPhone" 
              checked={property.msgThroughPhone}
              onChange={handleChange} 
              className="mr-2"
            />
            Phone
          </label>
          <label className="flex items-center">
            <input 
              type="checkbox" 
              name="msgThroughEmail" 
              checked={property.msgThroughEmail}
              onChange={handleChange} 
              className="mr-2"
            />
            Email
          </label>
        </div>

        {/* Conditionally render additional fields based on selections */}
        {property.msgThroughPhone && (
          <div className="mt-4">
            <label className="block text-lg font-semibold">Enter Phone Number:</label>
            <input 
              type="tel" 
              placeholder="Enter your phone number" 
              name='phone'
              value={property.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
        
        {property.msgThroughEmail && (
          <div className="mt-4">
            <label className="block text-lg font-semibold">Enter Email Address:</label>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              name='email'
              value={property.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}

export default Confirmation;
