import React, { useEffect, useState, useRef } from 'react';
import { axiosClient } from '../utils/axiosClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';

document.title = 'Login';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const ref = useRef(null);

  // Prevent login again if already logged in
  useEffect(() => {
    if (localStorage.getItem('User')) {
      navigate('/');
    }
  }, [navigate]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      ref.current.staticStart();
      const response = await axiosClient.post('/auth/login', {
        email,
        password,
      });
      if (response.data.statusCode !== 201) {
        toast.error(response.data.message);
        return;
      }
      toast.success('Successfully Logged In!!');
      localStorage.setItem('User', JSON.stringify(response.data.message));
      ref.current.complete();
      navigate('/');
    } catch (error) {
      toast.error('Error logging in, please try again.');
      ref.current.complete();
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 w-screen h-screen flex flex-row">
      <LoadingBar color="orange" ref={ref} />
      <div className="left w-2/5 h-screen flex justify-center items-center">
        <h1 className="text-white font-thin text-7xl leading-tight text-center">
          <span className="font-medium text-yellow-500">Expense</span>
          <br />
          Tracker App!!
        </h1>
      </div>
      <hr className="w-0.5 h-3/4 mt-24 bg-white" />
      <div className="flex justify-center items-center w-3/5 h-screen">
        <div className="flex flex-col gap-7 w-3/5 h-2/3 pt-28 items-center">
          <h1 className="text-4xl text-white font-bold mb-6">Login</h1>

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-96 h-12 pl-6 rounded-2xl bg-white text-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-96 h-12 pl-6 rounded-2xl bg-white text-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />

          <button
            onClick={submitForm}
            className="w-96 h-12 justify-center text-lg rounded-2xl bg-yellow-600 text-center flex items-center font-bold hover:bg-yellow-500 transition-all"
          >
            Submit
          </button>

          <p className="text-white mt-4">
            New User? Go to <a href="/signup" className="text-indigo-200 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;