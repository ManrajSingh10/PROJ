import React from 'react'
import { useDispatch } from 'react-redux'
import {removeNotification} from '../../Redux/chatSlice'
import { updateChatUser, toggleChatIsOpen } from '../../Redux/msgSlice'

function ContactProfile({
  data=null,
  unreadCount = 0,
  chat,
  property
}) 
{
  const dispatch = useDispatch()
  
  const handleClick = () => {
    dispatch(removeNotification(chat._id))
    dispatch(updateChatUser(data))
    dispatch(updateChatUser({ ...data, chatId: chat._id, property : property }))
    dispatch(toggleChatIsOpen())
  }

  return (
    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer transition-colors" onClick={handleClick}>
      <img
        src={property?.media[0]}
        alt={data?.userName}
        className="rounded-full w-10 h-10 object-cover"
      />
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{property?.title}</h4>
        <p className="text-gray-600 text-sm">Sender: {data?.fullName}</p>
      </div>
      {unreadCount > 0 && (
        <div className="bg-pink-500 text-white text-xs rounded-full px-2 py-1">
          {unreadCount}
        </div>
      )}
    </div> 
  )
}

export default ContactProfile