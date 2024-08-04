'use client'
import React, { useEffect, useState } from 'react';
import axios from '@/utils/axiosConfig';
import Button from '@/components/common/Button/index';
import ResizablePanel from '@/components/common/ResizablePanel';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';


function Page() {
  const [currentUser, setCurrentUser] = useState(false);
  const [registrationToggle, setRegistrationToggle] = useState(true);
  const [loginToggle, setLoginToggle] = useState(false);
  const [apiToggle, setApiToggle] = useState(false);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    axios.get("/api/user")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, [loginToggle]);

  function submitLogout(e) {
    e.preventDefault();
    axios.post("/api/logout")
    .then(function(res) {
      setCurrentUser(false);
    });
  }

  function Collapse () {
    setLoginToggle(!loginToggle)
    setRegistrationToggle(!registrationToggle)
  }

  return (
    <div className='pb-12 h-screen flex flex-col items-centerjustify-center'>
      <h2 className='text-4xl pb-4'>{currentUser}</h2>
      <button className='self-end' onClick={submitLogout}>
        <h2 className='text-4xl pb-4'>LOGOUT</h2>
      </button>
      <ResizablePanel> 
        {loginToggle && <>
            <LoginForm/>
            <p className='cursor-pointer underline underline-offset-1' onClick={Collapse}>Make an Account</p>
          </>
        }
      </ResizablePanel>
      <ResizablePanel> 
        {registrationToggle && <>
        <RegistrationForm/>
          <p className='cursor-pointer underline underline-offset-1' onClick={Collapse}>Already have an Account</p>
          <p className='cursor-pointer underline underline-offset-1'  onClick={() => setApiToggle(!apiToggle)}>Where to find API Key</p>
          <ResizablePanel> {apiToggle && 
          <div className='flex pt-8 flex-col'>
            <h2 className='text-xl'>Applying for your API key</h2>
            <ul>
              <li>1. Open the Govee Home mobile app and register for an account</li>
              <li>2. Go to the account Settings, and select `Apply for API key`</li>
              <li>3. Fill out your name and your reason (e.g. `to demo home automation`) and submit</li>
              <li>4. You will receive an email with your API key to the email address you entered when registering a Govee account.</li>
            </ul>
          </div> } 
          </ResizablePanel></>}
          </ResizablePanel>
      </div>)
}

export default Page;
