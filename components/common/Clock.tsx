'use client';
import React, { useState, useEffect } from 'react';

const Clock = () => {
    const date = new Date();
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options).toUpperCase().replace(',', '');
    const [time, setTime] = useState(new Date());
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const formatTime = (date) => {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };
  
    return (
      <div>
        <h1 className='text-2xl'>
        {formattedDate}
      </h1>
        <h1 className='text-xl'>{formatTime(time)}</h1>
      </div>
    );
  };

export default Clock;
