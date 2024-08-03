'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@/components/common/Button/index';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

function UserNav() {
  const [currentUser, setCurrentUser] = useState(false);
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [button, setButton] = useState(true);

  useEffect(() => {
    axios.get("/api/user")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);

  function submitRegistration(e) {
    e.preventDefault();
    axios.post("/api/register", { email, username, password })
    .then(function(res) {
        axios.post("/api/login", { email, password })
      .then(function(res) {
        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e) {
    e.preventDefault();
    axios.post("/api/login", { email, password })
    .then(function(res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    axios.post("/api/logout")
    .then(function(res) {
      setCurrentUser(false);
    });
  }

  return (
    <div className='pb-12'>
      <div className='flex'>
        <div className='flex'>
            <p className='px-8'>{currentUser ? `hello ${username}` : "login to continue" }</p>
            <div className='border border-custom-main rounded-full w-fit mb-4'>
            <Button isActive={button} setIsActive={setButton} onClick={submitLogout}>
            {currentUser ? 
            <p className='px-8'>logout</p>
             : 
             <p className='px-8'>login</p>
            }
            </Button>
            </div>
        </div>
      </div>
      <h2 className='text-4xl pb-4'>Log In</h2>
      <form onSubmit={submitLogin}>
        <div className='mb-4 border border-x-custom-main p-4 rounded-full'>
          <label>Email:</label>
          <input 
          className='bg-custom-invert appearance-none focus:outline-none px-4'
          type='email' value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className='mb-4 border border-x-custom-main p-4 rounded-full'>
          <label>Password:</label>
          <input 
          className='bg-custom-invert appearance-none focus:outline-none px-4'
          type='password' value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">
            <div className='border border-custom-main rounded-full w-fit mb-4'>
                <Button isActive={button} setIsActive={setButton}>
                    <p className='px-8'>log in</p>
                </Button>
            </div>
        </button>
      </form>
      
      <h2 className='text-4xl pb-4'>Register</h2>
      {!currentUser && registrationToggle }
      <form onSubmit={submitRegistration}>
        <div className='mb-4 border border-x-custom-main p-4 rounded-full'>
          <label>Email:</label>
          <input 
          className='bg-custom-invert appearance-none focus:outline-none px-4'
          type='email' value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className='mb-4 border border-x-custom-main p-4 rounded-full'>
          <label>Username:</label>
          <input 
          className='bg-custom-invert appearance-none focus:outline-none px-4'
          type='text' value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div className='mb-4 border border-x-custom-main p-4 rounded-full'>
          <label>Password:</label>
          <input 
          className='bg-custom-invert appearance-none focus:outline-none px-4'
           type='password' value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {/* <button type="submit">login</button> */}
        <button type="submit">
            <div className='border border-custom-main rounded-full w-fit mb-4'>
                <Button isActive={button} setIsActive={setButton}>
                    <p className='px-8'>register</p>
                </Button>
            </div>
        </button>

      </form>
      </div>
  )
}

export default UserNav;
