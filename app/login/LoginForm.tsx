'use client'
import React, { useEffect, useState } from 'react';
import axios from '@/utils/axiosConfig';
import Button from '@/components/common/Button/index';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [button, setButton] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    async function submitLogin(e) {
        e.preventDefault();
        try {
            const response = await axios.post("/api/login", { username, password });
            // localStorage.setItem('access_token', response.data.access);
            // localStorage.setItem('refresh_token', response.data.refresh);
            setMessage("You are now logged in!");
            setError('');
        } catch (err) {
            if (err.response && err.response.data) {
                const { detail } = err.response.data.error;
                setError(JSON.stringify(detail));
            } else {
                setError('An unknown error occurred.');
            }
            setTimeout(() => {
              setError('');
              setMessage(''); 
            }, 5000);
        }
    }

    async function getUserInfo(e) {
        e.preventDefault();
        try {
            const response = await axios.get("/api/user/");
            setMessage(`Current user: ${response.data.username}`);
            setError('');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.error);
            } else {
                setError('An unknown error occurred.');
            }
            setTimeout(() => {
              setError('');
              setMessage(''); 
            }, 5000);
        }
    }

    return (
        <div>
            <h2 className='text-4xl pb-4' onClick={getUserInfo}>User Info</h2>
            <h2 className='text-4xl pb-4'>Log In</h2>
            <form onSubmit={submitLogin}>
                {error && <div className='mb-4 text-red-500'>{error}</div>}
                {message && <div className='mb-4'>{message}</div>}
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
                <button type="submit">
                    <div className='border border-custom-main rounded-full w-fit mb-4'>
                        <Button isActive={button} setIsActive={setButton}>
                            <p className='px-8'>Log In</p>
                        </Button>
                    </div>
                </button>
            </form>
        </div>
    )
}

export default LoginForm;
