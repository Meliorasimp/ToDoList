import { useState } from 'react';
import { message } from 'react-message-popup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', {
        username: username,
        email:email,
        password:password
      });
      console.log('User Registered!');
      message.success('User Registered Successfully!');
      setUsername('');  
      setEmail('');
      setPassword('');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error registering user:', error);
      message.error('Registration Failed!');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900'>
      <div className='flex flex-col justify-center items-center gap-6 w-1/3 m-auto bg-gray-700 pt-10 pb-10 rounded-xl shadow-2xl'>
        <h2 className="font-mono mb-4 text-xl md:text-2xl lg:text-3xl text-center">Registration Form</h2>
        <form className='flex flex-col items-center w-full' onSubmit={handleRegister}>
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='bg-white h-9 w-3/4 text-black rounded-sm mb-4'
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-white h-9 w-3/4 text-black rounded-sm mb-4'
          />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-white h-9 w-3/4 text-black rounded-sm mb-4'
          />
          <button type='submit' className='w-3/4 mt-5 bg-blue-500 py-2 rounded-md text-white hover:bg-blue-600'>
            Register
          </button>
          <h4 className='mt-4 text-white'>Already have an account? <a href='/login' className='text-blue-300 hover:underline'>Login</a></h4>
        </form>
      </div>
    </div>
  );
};

export default UserPage;
