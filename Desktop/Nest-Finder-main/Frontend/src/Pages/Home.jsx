import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropertyCard from '../Components/PropertyCard';
import axios from "axios"
import { backend, isLoggedin } from '../Helper';
import {useSelector, useDispatch} from "react-redux"
import { addProperties, addHomePropertiesWithUserLikes } from '../Redux/dataSlice';
import Filters from '../Components/Filters';
import LoadingComponent from '../Components/LoadingComponent';

function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [propType,setPropType] = useState("All Categories")
  const [data,setData] = useState(null)
  const dispatch = useDispatch()
  const dataFromRedux = useSelector((state) => state.data.homeProperties);   // fetching from redux store
  const dataLikesRedux = useSelector((state) =>  state.data.homePropertiesWithUserLikes)
  const [search, setSearch] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [lastId, setLastId] = useState(null)
  const [hasLeft, setHasLeft] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  // Fetching Properties Data
  const retrieveProperties = async (api, variable) => {
    try {
      const response = await axios.get(api,{withCredentials : true})
      setData(response.data.properties)
      dispatch(variable(response.data.properties))
      setLastId(response.data.nextId)
    } catch (error) {
      console.error("error in fetching properties data",error)
    }
  }

  // without login
  useEffect(() => {
    if(isLoggedin()) 
      return
    if (dataFromRedux.length === 0) {
      retrieveProperties(`${backend}/property/listAllProperty`, addProperties)
    } else {
      setData(dataFromRedux[0])
    }
  },[dispatch, dataFromRedux])

  // with login
  useEffect(() => {
    if (!isLoggedin()) 
      return 
    if (dataLikesRedux.length === 0) {
      retrieveProperties(`${backend}/favourite/userfavPlusProperties`, addHomePropertiesWithUserLikes)
    } else {
      setData(dataLikesRedux[0]);
    }
  },[dispatch, data, dataLikesRedux])


  const handleLoadMore = async() => {
    try {
      const response = await axios.get(
        `${backend}/property/listAllProperty?lastId=${lastId}`,
        {withCredentials : true}
      )
      setData((prev) => [...prev, ...response.data.properties])
      setLastId(response.data.nextId)
    } catch (error) {
      setHasLeft(false)
      console.error("error in fetching properties data",error)
    }
  }

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  }

  // Filters --->
  
  // PropType
  const handlePropType = (str) => {
    setPropType(str)
    setIsDropdownOpen(false)
    if (!filteredData) {
      return
    }
    if (str === "All Categories") {
      setFilteredData(data)
      return
    }
    const filter = filteredData.filter((item) => str.includes(item.listingType))
    setFilteredData(filter)
  }

  useEffect(() => {
    setFilteredData(data)
    if (!data || !search)
      return
    const filterData = data.filter((item) =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(search.toLowerCase())  
      )
    );
    setFilteredData(filterData)
  }, [search, data])


  return (
    <div className='md:ml-64 px-2 md:px-20 py-5 flex flex-col gap-y-5'>
      {/* Filter Bar */}
      <div>
        <div className="flex relative">

          <button
            id="dropdown-button"
            type="button"
            onClick={toggleDropdown}
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            {propType}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div
              id="dropdown"
              className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700 cursor-pointer"
              style={{
                top: '110%', 
                left: '0',   
              }}
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <div
                    onClick={()=>handlePropType("All Categories")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    All Categories
                  </div>
                </li>
                <li>
                  <div
                    onClick={()=>handlePropType("For Sale")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    For Sale
                  </div>
                </li>
                <li>
                  <div
                    onClick={()=>handlePropType("For Rent")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    For Rent
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => {setIsOpen(true);setIsDropdownOpen(false)}}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    More Filters
                  </div>
                </li>
              </ul>
            </div>
          )}

          {/* Search Input */}
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}
            />
          </div>

        </div>
      </div>

      {isOpen && <Filters setIsOpen={setIsOpen} setData={setFilteredData} />}

      {/* Cards  */}
      <div className='flex flex-col gap-y-5'>
        {
          !filteredData &&
          <LoadingComponent/>
        }
        { filteredData && filteredData.length !== 0 &&
          ([...filteredData].reverse().map((property,index)=>(
            <PropertyCard key={property._id} property={property} />
          )))
        } 
        {
          filteredData && filteredData.length === 0 && 
          <p className="mx-auto p-6 mt-10 text-xl text-center bg-blue-100 border border-blue-500 text-blue-700 rounded-lg shadow-lg max-w-md">
            No properties found matching your search.
          </p>
        }
          
      </div>

      {hasLeft && data && data.length > 10 &&
        <div
          className="bg-blue-600 text-white rounded-md py-2 px-6 mx-auto cursor-pointer transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md hover:shadow-lg"
          onClick={handleLoadMore}
        >
          Load More
        </div>
      }
    </div>
  );
}

export default Home;
