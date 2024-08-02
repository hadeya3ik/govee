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
    client.get("/api/user")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);

  function submitRegistration(e) {
    e.preventDefault();
    client.post("/api/register", { email, username, password })
    .then(function(res) {
      client.post("/api/login", { email, password })
      .then(function(res) {
        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e) {
    e.preventDefault();
    client.post("/api/login", { email, password })
    .then(function(res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post("/api/logout")
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
            <Button isActive={button} setIsActive={setButton}>
            {currentUser ? 
            <p className='px-8'>logout</p>
             : 
             <p className='px-8'>login</p>
            }
            </Button>
            </div>
        </div>
        
        
        {/* <form onSubmit={submitLogout}>
          <div className='border border-custom-main rounded-full w-fit mb-4'>
            <p className='px-8'>Logout</p> 
          </div>
        </form> */}
        
        {/* {!currentUser &&
        <div className='border border-custom-main rounded-full w-fit mb-4'>
            <p className='px-8'>{registrationToggle ? 'create account' : 'Login with existing account'}</p>
        </div>
        } */}

      </div>

      {/* {!currentUser && !registrationToggle &&
      <form onSubmit={submitLogin}>
        <div className='mb-4'>
          <label>Email:</label>
          <input type='email' value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className='mb-4'>
          <label>Password:</label>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <Button isActive={false} setIsActive={setCurrentUser}>
          <p className='px-8'>Login</p>
        </Button>
      </form>
      } */}

      {/* {!currentUser && registrationToggle &&
      <form onSubmit={submitRegistration}>
        <div className='mb-4'>
          <label>Email:</label>
          <input type='email' value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className='mb-4'>
          <label>Username:</label>
          <input type='text' value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div className='mb-4'>
          <label>Password:</label>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <Button isActive={false} setIsActive={setCurrentUser}>
          <p className='px-8'>Register</p>
        </Button>
      </form>
      } */}

    </div>
  )
}

export default UserNav;
