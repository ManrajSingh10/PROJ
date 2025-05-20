import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { backend } from '../Helper';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toggleLogin, changeMsg } from '../Redux/userSlice';
import LoadingComponent from '../Components/LoadingComponent';

function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(null); // For storing avatar image file
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  

  useEffect(() => {
    setMessage('');
  }, [userName, email, fullName, password, confirmPassword, avatar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName.trim() || !email.trim() || !fullName.trim() || !password.trim() || !confirmPassword.trim()) {
      setMessage('All fields are required.');
      return;
    }

    
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    
    if (password.length < 6) {
      setMessage("Password should contain at least 6 characters.");
      return
    }
    if (!avatar) {
      setMessage('Avatar is required.');
      return;
    }
    setLoading(true)
    setMessage("Registering...")
    try {
      const formData = new FormData();
      formData.append('userName', userName);
      formData.append('email', email);
      formData.append('fullName', fullName);
      formData.append('password', password);
      formData.append('avatar', avatar); 

      const response = await axios.post(
        `${backend}/user/register`,
        formData,
        { withCredentials: true }
      );

      setMessage(response.data.message);
      dispatch(toggleLogin());
      dispatch(changeMsg('Registration successful!'));
      navigate('/profile');
    } catch (error) {
      console.error(error.response.data);
      setMessage(error.response.data.message);
    } finally {
      setLoading(false)
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  return (
    <section className="dark:bg-gray-900 px-4 md:px-0 md:ml-64 md:mt-10">
      <div className="flex justify-center items-center h-screen">
        <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your Username
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="johnDoe"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="youremail@example.com"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Avatar (Required)
              </label>
              <input
                type="file"
                onChange={handleAvatarChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                accept="image/*"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Register
            </button>

            {message && <div className="text-red-700 font-normal text-center">{message}</div>}

            <div className="text-sm font-medium text-gray-900 dark:text-white">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-500">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
      {loading && <LoadingComponent/>}
    </section>
  );
}

export default Register;
