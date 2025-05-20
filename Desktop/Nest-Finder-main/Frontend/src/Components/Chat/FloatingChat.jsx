import React, { useEffect, useState } from 'react';
import Contact from './Contact';
import ChatSection from "./ChatSection"
import { backend, isLoggedin } from '../../Helper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { addContacts } from '../../Redux/chatSlice';
import { addProfile } from '../../Redux/userSlice';
import { Rnd } from 'react-rnd';

function FloatingChat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const chatSecOpen = useSelector((state) => state.msg.chatIsOpen);

  const chatRedux = useSelector((state) => state.chat.contacts);

  const UserRedux = useSelector((state) => state.user.profile);

  const [dimensions, setDimensions] = useState({
    width: 400,
    height: 650,
    x: window.innerWidth - 418, 
    y: window.innerHeight - 713, 
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions((prev) => ({
        ...prev,
        x: Math.min(prev.x, window.innerWidth - prev.width),
        y: Math.min(prev.y, window.innerHeight - prev.height),
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const retrieveData = async () => {
    try {
      const response = await axios.get(`${backend}/chat/allUserChat`, {
        withCredentials: true,
      });
      dispatch(addContacts(response.data.conversations));
    } catch (error) {
      console.error('Error in fetching Chats', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatRedux.length === 0) retrieveData();
  }, [chatRedux, dispatch]);

  const dataRetriever = async () => {
    try {
      const response = await axios.get(`${backend}/user/userInfo`, {
        withCredentials: true,
      });
      dispatch(addProfile(response.data.user));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (Object.keys(UserRedux).length === 0) {
      dataRetriever();
    }
  }, [UserRedux, dispatch]);

  useEffect(() => {
    if (!isLoggedin()) {
      navigate('/');
      return;
    }
  }, [isLoggedin]);

  return (
    <div > 
      {/* for big screen */}
      <div className='hidden md:block md:fixed md:z-50'>
        <Rnd
          size={{ width: dimensions.width, height: dimensions.height }}
          position={{ x: dimensions.x, y: dimensions.y }}
          onDragStop={(e, d) => setDimensions((prev) => ({ ...prev, x: d.x, y: d.y }))}
          onResizeStop={(e, direction, ref, delta, position) => {
            setDimensions({
              width: parseInt(ref.style.width, 10),
              height: parseInt(ref.style.height, 10),
              ...position,
            });
          }}
          enableResizing={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: false,
            topLeft: false,
          }}
          bounds="window"
          minWidth={300} // Minimum width
          minHeight={400} // Minimum height
          maxWidth={600} // Maximum width
          maxHeight={700}
          className="md:absolute md:rounded-md"
          style={{
            zIndex: 1000,
          }}
        >
          <div className="w-full h-full overflow-hidden">
            {/* Loading Spinner */}
            {isLoading && <Loading />}
            <div className={`w-full h-full ${chatSecOpen ? 'hidden' : 'block'}`}>
              <Contact />
            </div>
            <div className={`w-full h-full ${chatSecOpen ? 'block' : 'hidden'}`}>
              <ChatSection />
            </div>
          </div>
        </Rnd>
      </div>
    </div>


  );
}

export default FloatingChat;
