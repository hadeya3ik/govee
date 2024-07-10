'use client'
import React, {useState} from 'react'
import Link3D from '@/components/Link3d/index'
import Button from '@/components/Button/index'

function play() {
  const [a,seta] = useState(false);
  return (
    <main className='h-screen'>
      <h1 className='text-[20vw]'>govee</h1>
      <Link3D >LINK</Link3D>
      <div className='w-[300px] h-[50px]'>
        <Button>
          <h1 className='p-4'>BUTTON
          </h1></Button>
      </div>
    </main>
  )
}

export default play
