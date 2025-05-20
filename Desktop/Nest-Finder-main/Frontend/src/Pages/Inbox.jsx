import React, { useEffect, useState } from 'react';
import Contact from '../Components/Chat/Contact';
import ChatSection from '../Components/Chat/ChatSection';
import { backend, isLoggedin } from '../Helper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { addContacts } from '../Redux/chatSlice';
import { addProfile } from '../Redux/userSlice';
import { Rnd } from 'react-rnd';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const chatSecOpen = useSelector((state) => state.msg.chatIsOpen);

  const chatRedux = useSelector((state) => state.chat.contacts);

  const UserRedux = useSelector((state) => state.user.profile);

  const [isMdOrLarger, setIsMdOrLarger] = useState(false);

  // Function to check screen size using matchMedia
  const checkScreenSize = () => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    setIsMdOrLarger(mediaQuery.matches);
    mediaQuery.addEventListener('change', (e) => setIsMdOrLarger(e.matches));
  };

  useEffect(() => {
    checkScreenSize();
    return () => {
      // Clean up listener
      window.removeEventListener('change', checkScreenSize);
    };
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

    if (isMdOrLarger) {
      navigate('/'); // Redirect to home page
    }
  }, [isLoggedin(), isMdOrLarger, navigate]);

  return (
    <div>
      {/* for small screen */}
      <div className='md:hidden'>
        <div
          className={`w-full h-screen ${chatSecOpen ? 'hidden' : 'block'}`}
        >
          <Contact />
        </div>

        <div
          className={`w-full h-screen ${chatSecOpen ? 'block' : 'hidden'}`}
        >
          <ChatSection />
        </div>
      </div>
    </div>
  );
}

export default App;
