import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@/components/common/Button/index';
import ResizablePanel from '@/components/common/ResizablePanel';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [button, setButton] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    async function submitLogin(e) {
        e.preventDefault();
        try {
            const response = await axios.post("/api/login", { email, password });
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

    return (
        <div>
            <h2 className='text-4xl pb-4'>Log In</h2>
            <form onSubmit={submitLogin}>
                {error && <div className='mb-4 text-red-500'>{error}</div>}
                {message && <div className='mb-4'>{message}</div>}
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
        </div>
    )
}

export default LoginForm