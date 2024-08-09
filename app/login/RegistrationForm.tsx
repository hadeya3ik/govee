'use client';
import React, { useState } from 'react';
import axios from '@/utils/axiosConfig';
import Button from '@/components/common/Button/index';
import { AxiosError } from 'axios';

function RegistrationForm() {
    const [apiKey, setApiKey] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [button, setButton] = useState<boolean>(true);

    async function submitRegistration(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await axios.post("/api/register", { email, username, password, api_key: apiKey });
            setMessage("Account successfully created");
            setError('');
        } catch (err: unknown) {
            const error = err as AxiosError;
            if (error.response && error.response.data) {
                const { detail } = error.response.data as { detail: string };
                setError(JSON.stringify(detail));
            } else {
                setError('An unknown error occurred.');
            }
            setTimeout(() => {
              setError('');
            }, 5000);
        }
    }

    return (
        <div>
            <h2 className='text-4xl pb-4'>Register</h2>
            <form onSubmit={submitRegistration} className='w-[500px]'>
                {error && <div className='mb-4 text-red-500'>{error}</div>}
                {message && <div className='mb-4'>{message}</div>}
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
                <div className='mb-4 border border-x-custom-main p-4 rounded-full'>
                    <label>API Key:</label>
                    <input
                        className='bg-custom-invert appearance-none focus:outline-none px-4'
                        type='password' value={apiKey} onChange={e => setApiKey(e.target.value)} />
                </div>
                <button type="submit">
                    <div className='border border-custom-main rounded-full w-fit mb-4'>
                        <Button isActive={button} setIsActive={setButton}>
                            <p className='px-8'>Register</p>
                        </Button>
                    </div>
                </button>
            </form>
        </div>
    );
}

export default RegistrationForm;
