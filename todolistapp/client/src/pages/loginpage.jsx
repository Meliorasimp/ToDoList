import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: email,
        password: password
      });
      console.log('Successfully logged in:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/task');
      
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900'>
      <div className='flex flex-col justify-center items-center gap-6 w-1/3 m-auto bg-gray-700 pt-10 pb-10 rounded-xl shadow-2xl'>
        <h2 className="font-mono mb-4 text-xl md:text-2xl lg:text-3xl text-center">Login</h2>
        {error && <div className="text-red-500">{error}</div>}
        <form className='flex flex-col items-center w-full' onSubmit={handleLogin}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-white h-9 w-3/4 text-black rounded-sm mb-4'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-white h-9 w-3/4 text-black rounded-sm mb-4'
          />
          <button type='submit' className='w-3/4 mt-5 bg-blue-500 py-2 rounded-md text-white hover:bg-blue-600'>
            Login
          </button>
          <h4 className='mt-12'>Don't have an account? <a href='/register' className='text-blue-300 hover:underline'>Create one.</a></h4>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
