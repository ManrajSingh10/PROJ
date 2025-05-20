import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backend, isLoggedin } from '../Helper';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {changeMsg} from '../Redux/userSlice'
import { toggleChatOpen } from '../Redux/userSlice';
import LoadingComponent from '../Components/LoadingComponent'

function Request() {
  const [current, setCurrent] = useState("Received");
  const navigate = useNavigate()
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setRecievedRequest] = useState([]);
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)


  const dataRetriever = async() => {
    try {
      setLoading(true)
      const response = await axios.get(`${backend}/request/getRequest`,{withCredentials : true})
      setRecievedRequest(response.data.requestReceived)
      setSentRequests(response.data.requestSent)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(!isLoggedin()) {
      navigate("/login")
      return
    }
    
    dataRetriever()
  }, [])

  const handleTabClick = (tab) => {
    setCurrent(tab);
  };

  // Render based on sent/recieved
  const renderRequests = (type) => {
    const requests = type === "Sent" ? sentRequests : receivedRequests;
  
    if (!requests || requests.length === 0) {
      return (
        <div className="text-center text-gray-600 font-medium py-4">
          {type === "Sent" ? "No requests sent yet." : "No requests received."}
        </div>
      );
    }
  
    return [...requests].reverse().map((request, index) => (
      <div
        key={index}
        className="flex flex-col md:flex-row bg-white w-full md:w-2/3 mx-auto shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-xl"
      >
        {/* Image */}
        <img 
          src={request?.property.media[0]} 
          alt={request.property.title} 
          className="w-24 h-24 object-cover rounded-md border border-gray-200 mb-4 md:mb-0 md:mr-6"
        />
        
        <div className="flex-1">
          <h3
            className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition-colors mb-2 cursor-pointer"
            onClick={() => navigate(`/property/${request.property._id}`)}
          >
            {request.property.title}
          </h3>
          <label>Message: </label>
          <p className="text-gray-600 mb-3 border p-3 rounded-tr-md rounded-b-lg border-zinc-700 max-w-full overflow-hidden whitespace-pre-wrap break-words">
            {request.msg}
          </p>
    
          <div className="flex items-center space-x-3 text-md">
            <span className="font-semibold">{type === "Sent" ? "Owner" : "Sender"}:</span>
            {/* Full Name */}
            <div className="font-medium text-gray-800">
              {request.reciever?.fullName || request.sender?.fullName}
            </div>
            {/* Avatar */}
            <img
              src={request.reciever?.avatar || request.sender?.avatar}
              alt={request.reciever?.fullName || request.sender?.fullName}
              className="w-10 h-10 object-cover rounded-full border border-gray-300"
            />
          </div>
        </div>
    
        {type !== "Sent" && (
          <div className="flex flex-col space-y-3 ml-4 my-auto md:w-1/3">
            <button
              className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
              onClick={() => handleAccept(request._id, request.sender._id, request.property._id)}
            >
              Accept
            </button>
            <button
              className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200"
              onClick={() => handleReject(request._id, request.sender._id, request.property._id)}
            >
              Decline
            </button>
          </div>
        )}
    
        {type === "Sent" && (
          <div className="flex flex-col space-y-3 ml-4 my-auto md:w-1/3">
            <button
              className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
              onClick={() => handleReject(request._id, request.sender._id, request.property._id)}
            >
              Withdraw
            </button>
          </div>
        )}
      </div>
    ));
    
  };

  const handleAccept = async(id, senderId, propertyId) => {
    try {
      dispatch(changeMsg("Request granted!!"))
      const response = await axios.post(
        `${backend}/request/accept`,
        {
          requestId : id,
          senderId,
          propertyId
        },
        {withCredentials : true}
      )
      dataRetriever()
      dispatch(toggleChatOpen())
    } catch (error) {
      console.error("error in accepting request", error)
    }
  }

  const handleReject = async(id, senderId) => {
    try {
      dispatch(changeMsg("Request rejected!!"))
      const response = await axios.post(
        `${backend}/request/reject`,
        {requestId : id},
        {withCredentials : true}
      )
      dataRetriever()
    } catch (error) {
      console.error("error in accepting request", error)
    }
  }

  return (
    <div className="md:ml-64 mt-6 px-4 md:px-0">
      <div className="h-12 w-2/3 mx-auto bg-gray-100 rounded-lg shadow-md flex mt-20 md:mt-28">
        {/* Sent Tab */}
        <div
          className={`flex-1 text-center py-3 cursor-pointer transition-all duration-300 ease-in-out rounded-l-lg ${current === "Sent" ? "bg-blue-500 text-white scale-105" : "text-gray-700 hover:bg-blue-100 hover:text-blue-500"}`}
          onClick={() => handleTabClick("Sent")}
        >
          Sent
        </div>

        {/* Received Tab */}
        <div
          className={`flex-1 text-center py-3 cursor-pointer transition-all duration-300 ease-in-out rounded-r-lg ${current === "Received" ? "bg-blue-500 text-white scale-105" : "text-gray-700 hover:bg-blue-100 hover:text-blue-500"}`}
          onClick={() => handleTabClick("Received")}
        >
          Received
        </div>
      </div>


      <div className="mt-6">
        {renderRequests(current)}
      </div>
      {loading && <LoadingComponent/>}
    </div>
  );
}

export default Request;
