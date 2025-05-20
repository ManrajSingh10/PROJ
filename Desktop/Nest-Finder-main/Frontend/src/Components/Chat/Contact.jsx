import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactProfile from './ContactProfile';
import Loading from '../Loading';
import Notification from '../Notification';
import { useSelector, useDispatch } from 'react-redux';
import { ImCross } from "react-icons/im";
import { toggleChatOpen } from '../../Redux/userSlice';

function Contact() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const contacts = useSelector((state) => state.chat.contacts)[0];
  const dispatch = useDispatch();

  const handleNotification = () => {
    setNotification("");
  };

  // Search functionality
  useEffect(() => {
    if (contacts) {
      const filtered = contacts.filter((contact) =>
        contact?.participants[0]?.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact?.participants[0]?.userName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  }, [searchQuery, contacts]);

  return (
    <div className="h-full w-full bg-[#3B1C32] flex flex-col md:rounded-xl md:rounded-br-none">
      {/* Header */}
      {isLoading && <Loading />}
      {notification && <Notification message={notification} onClose={handleNotification} />}

      <div className="bg-[#1A1A1D] p-4 flex items-center justify-between text-white rounded-t-md">
        <h1 className="text-xl font-semibold flex items-center">
          <div>Inbox</div>
        </h1>
        <div className=' cursor-pointer hidden md:block' onClick={() => dispatch(toggleChatOpen())}><ImCross /></div>
      </div>


      {/* Search Bar */}
      <div className="p-4 bg-[#3B1C32] border-t border-b border-zinc-500 flex flex-col items-center gap-y-4">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#643954] focus:border-[#643954]"
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-3">
          {filteredContacts && filteredContacts.length > 0 ? (
            filteredContacts.map((chat, index) => (
              <ContactProfile key={index} data={chat.participants[0]} property={chat.property} chat={chat} unreadCount={chat?.unreadCount} />
            ))
          ) : (
            <div className="text-white text-center border p-2 rounded-md">No contacts found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
