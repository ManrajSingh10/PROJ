import React, { useState } from 'react';
import { toWords } from 'number-to-words';

function Pricing({ property, handleChange, handleSubmit }) {
  const [price, setPrice] = useState('');
  const [priceInWords, setPriceInWords] = useState('');
  const [currency,setCurrency] = useState("USD")

  const handlePriceChange = (e) => {
    if (price) {
      setPriceInWords(toWords(value));  
    } else {
      setPriceInWords('');
    }
  };

  const formatNumber = (num) => {
    return num.toLocaleString()
  }

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value)
  }

  return (
    <div className='px-20 py-10 h-screen md:ml-64 sm:m-auto'>
      <form onSubmit={handleSubmit}>
        <div className="w-full mx-auto mb-10">
          {property.listingType === "Sale" ? (
            // For Sale
            <div className="flex flex-col space-y-4">

              {/* price */}
              <div className='flex flex-col lg:flex-row lg:gap-x-20'>
                <div className=' w-full lg:w-1/2'>
                  <label className="text-lg font-semibold">Price</label>
                  <div className="flex flex-col sm:flex-row items-center space-x-2">
                    {/* Currency Select Dropdown */}
                    <select 
                      className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      name='currency'
                      value={property.currency}  // Add currency state to track the selected value
                      onChange={handleChange}  // Add handler to manage currency change
                    >
                      <option value="USD">USD</option>
                      <option value="INR">INR</option>
                    </select>

                    {/* Price Input */}
                    <input
                      type="number"
                      placeholder="Enter sale price"
                      value={property.amount}
                      name='amount'
                      min="0"
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Display the Price in Words */}
                
                <div className="w-full lg:w-1/2">
                  <label className="text-lg font-semibold">Price in Words</label>
                  <input
                  type="text"
                  placeholder="Enter sale price"
                  value={(property.amount && toWords(property.amount).toUpperCase()) || "Enter Amount"}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                />
                </div>
                
              </div>

              {/* Negotiability Section */}
              <div className="flex flex-col space-y-4 mt-4">
                <label className="text-lg font-semibold">Negotiability</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="negotiability"
                      value="true"  // radio button value
                      checked={property.negotiability === true}  // ensure "Yes" is selected if property.negotiability is true
                      onChange={handleChange}  // handles the change
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="negotiability"
                      value="false"  // radio button value
                      checked={property.negotiability === false}  // ensure "No" is selected if property.negotiability is false
                      onChange={handleChange}  // handles the change
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

            </div>
          ) : (
            // For Rent
            <div className="flex flex-col space-y-4">

              {/* Payment Terms */}
              <div>
                <label className="text-lg font-semibold">Payment Terms</label>
                <select id='paymentTerms' name="paymentTerms" className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} value={property.paymentTerms}>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>

              {/* Amount */}
              <div className='flex flex-col lg:flex-row lg:gap-x-20'>
                <div className=' w-full lg:w-1/2'>
                  <label className="text-lg font-semibold">Amount</label>
                  <div className="flex flex-col sm:flex-row items-center space-x-2">
                    {/* Currency Select Dropdown */}
                    <select 
                      className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      name='currency'
                      value={property.currency}  // Add currency state to track the selected value
                      onChange={handleChange}  // Add handler to manage currency change
                    >
                      <option value="USD">USD</option>
                      <option value="INR">INR</option>
                    </select>

                    {/* Price Input */}
                    <input
                      type="number"
                      placeholder="Enter Amount"
                      value={(property.amount)}
                      min="0"
                      name='amount'
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Display the Price in Words */}
                
                <div className="w-full lg:w-1/2">
                  <label className="text-lg font-semibold">Price in Words</label>
                  <input
                  type="text"
                  value={(property.amount && toWords(property.amount).toUpperCase()) || "Enter Amount"}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                />
                </div>
                
              </div>

              {/* Security Deposit */}
              <div className='flex flex-col lg:flex-row lg:gap-x-20'>
                <div className=' w-full lg:w-1/2'>
                  <label className="text-lg font-semibold">Security Deposit</label>
                  <div className="flex flex-col sm:flex-row items-center space-x-2">
                    {/* Currency Select Dropdown */}
                    <select 
                      className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      name='currency'
                      value={property.currency}  // Add currency state to track the selected value
                      onChange={handleChange}  // Add handler to manage currency change
                    >
                      <option value="USD">USD</option>
                      <option value="INR">INR</option>
                    </select>

                    {/* Price Input */}
                    <input
                      type="number"
                      placeholder="Enter Security Deposit Amount"
                      name='securityDeposit'
                      value={property.securityDeposit}
                      min="0"
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Display the Price in Words */}
                
                <div className="w-full lg:w-1/2">
                  <label className="text-lg font-semibold">Price in Words</label>
                  <input
                  type="text"
                  placeholder="Enter sale price"
                  value={(property.securityDeposit && toWords(property.securityDeposit).toUpperCase()) || "Enter Security Deposit Amount"}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                />
                </div>
                
              </div>

              {/* Negotiability Section */}
              <div className="flex flex-col space-y-4 mt-4">
                <label className="text-lg font-semibold">Negotiability</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="negotiability"
                      value="true"  // radio button value
                      checked={property.negotiability === true}  // ensure "Yes" is selected if property.negotiability is true
                      onChange={handleChange}  // handles the change
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="negotiability"
                      value="false"  // radio button value
                      checked={property.negotiability === false}  // ensure "No" is selected if property.negotiability is false
                      onChange={handleChange}  // handles the change
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
              
            </div>
          )}
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

export default Pricing;
