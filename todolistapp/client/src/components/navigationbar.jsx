import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between w-full h-20 bg-gradient-to-r from-slate-700 to-slate-800 top-0 left-0 fixed'>
      <h1 className='text-2xl ml-5'><a href='/'>Task Manager App</a></h1>
      <div className="flex items-center justify-start">
        <Link to='/task'>
          <button className='mr-10 cursor-pointer text-sl mt-auto mb-auto h-12 w-100 text-center flex items-center justify-center'>
            Create Task
          </button>
        </Link>
        <Link to={'/register'}>
          <button className='mr-10 cursor-pointer text-sl mt-auto mb-auto h-12 w-100 text-center'>
            User Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
  