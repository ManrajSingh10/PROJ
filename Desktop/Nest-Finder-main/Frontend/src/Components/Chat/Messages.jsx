import { useEffect, useRef, useState } from 'react';

const ChatMessages = ({ messages, user }) => {
  const messagesEndRef = useRef(null);
  const unreadMsgEndRef = useRef(null);
  const mainMsgEndRef = useRef(null);
  const isFirstRender = useRef(true); 

  // Scroll to the right place (either unread messages or bottom)
  useEffect(() => {
    // On initial render, check if there are unread messages
    if (isFirstRender.current) {
      isFirstRender.current = false; 
      if (unreadMsgEndRef.current) {
        unreadMsgEndRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); 

  // Time/date formatter
  const formatTimeOrDate = (createdAt) => {
    const currentDate = new Date();
    const messageDate = new Date(createdAt);
    if (
      currentDate.getDate() === messageDate.getDate() &&
      currentDate.getMonth() === messageDate.getMonth() &&
      currentDate.getFullYear() === messageDate.getFullYear()
    ) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  // Find index of the first unread message
  const insertIndex = messages && messages.findIndex(item => item.status === "Sent" && item.reciever === user?._id);

  return (
    <div className="flex-1 overflow-auto p-4 space-y-4 chat-messages-container">
      {messages &&
        messages.map((msg, index) => (
          <div key={index}>
            {/* Display unread message section */}
            {index === insertIndex && (
              <div className="flex justify-center my-4" ref={unreadMsgEndRef}>
                <div className="px-4 py-2 bg-gray-100 rounded-full shadow-md inline-block">
                  <span className="text-xs text-gray-600">Unread Messages</span>
                </div>
              </div>
            )}

            {/* Message */}
            <div className={`flex ${msg.sender === user?._id ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`px-4 py-2 min-w-24 max-w-xs lg:max-w-md flex flex-col rounded-lg ${
                  msg.sender === user?._id ? 'bg-[#e782b5] text-white items-end' : 'bg-gray-300 text-gray-800'
                }`}
              >
                {msg.msg}
                <div className="text-xs text-zinc-500 mt-1 flex items-center justify-between w-full">
                  <span>{formatTimeOrDate(msg.createdAt)}</span>
                  {msg.sender === user?._id && (
                    <span className="ml-2 text-sm font-semibold">{msg.status}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

      {/* This empty div is to keep the scroll at the bottom */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;