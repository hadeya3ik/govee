'use client'
import dynamic from 'next/dynamic';
import React from 'react';

const DynamicClock = dynamic(() => import('@/components/common/Clock'), { ssr: false });


function Hero() {
  return (
    <div className='pb-60'>
        <DynamicClock/>
    </div>
  )
}

export default Hero