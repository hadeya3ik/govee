'use client'
import React from 'react'
import Link3D from './common/Link3D/index'

const LightBulbs = [
    {name: 'Welcome Home', hr : '20', min : '5 5'},
    {name: 'Good Night', hr : '12', min : '3 0'},
]

const Automation = ({name, hr, min}) => {
    return (
        <div className='p-4 flex border justify-between rounded w-[800px] h-[400px]'>
            <div className='flex items-center'>
                <div>
                    <h2 className='text-5xl pb-4'>{hr}</h2>
                    <h2 className='text-4xl pb-4'>{min}</h2>
                </div>
            </div>
            
            <div className='flex flex-col justify-between flex-1'>
                <h2 className='text-5xl pb-4'>{name}</h2>
                <div className='justify-self-end self-end text-3xl bg-custom-main text-custom-invert rounded-full h-min p-2 px-6'>
                <Link3D>edit</Link3D>
                </div> 
            </div>
            
        </div>
    )
}

function Automations() {
    return (
        <div className='pb-60'>
            <h1 className='text-6xl pb-4'>Groups</h1>
            <hr className='pb-16'/>
            <div className='flex gap-4'>
                {LightBulbs.map((lightBulb, index) => <Automation key={index} name={lightBulb.name} hr={lightBulb.hr} min={lightBulb.min}  /> )}
            </div>
        </div>
      )
}

export default Automations