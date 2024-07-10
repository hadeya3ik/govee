'use client'
import React from 'react'
import { PiPowerThin } from "react-icons/pi";
import { PiArrowDownRightThin } from "react-icons/pi";
import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";
import DeviceControls from './DeviceControls'
import ResizablePanel from '@/components/ResizablePanel'
import Button from '@/components/Button/index'

const LightBulbs = [
    {name: 'Tagarp', model : 'H6008', count : 0}, 
    {name: 'Tagarp', model : 'H6008', count : 1},
    {name: 'Tagarp', model : 'H6008', count : 2},
    {name: 'Tagarp', model : 'H6008', count : 3},
    // {name: 'Tagarp', model : 'H6008', count : 4},
    // {name: 'Tagarp', model : 'H6008', count : 5},
    // {name: 'Tagarp', model : 'H6008', count : 6},
    // {name: 'Tagarp', model : 'H6008', count : 7},
]

const Device = ({name, model}) => {
    let [expand, setExpand] = useState(false);
    
    return (
        <div className='p-4 flex flex-col border justify-between rounded'>
            <div>
               <h2 className='text-5xl pb-4'>{name}</h2>
                <h2 className='text-xl'>{model}</h2> 
            </div>
            <div className='justify-self-end self-end'>
            <div className='border border-custom-main rounded-full w-fit mb-4'>
                <Button>
                    <PiPowerThin size={60}/>
                </Button>   
                </div>
                <div
                    className='border rounded-full w-fit'
                    onClick={() => setExpand(!expand)}>
                    <Button>
                        <PiArrowDownRightThin size={60} />
                    </Button>
                    
                </div>
            </div>
            <ResizablePanel>
                {expand && (
                <DeviceControls></DeviceControls>
                )}
            </ResizablePanel>
        </div>
    ) 
}

function Devices() {
    return (
      <div className='pb-60'>
          <h1 className='text-6xl pb-4'>Devices</h1>
          <hr className='pb-4'/>
          <div className='flex flex-col sm:flex-row sm:gap-4'>
            <div className='flex-1 xl:flex gap-4'>
                <div className='flex-1 gap-4'>
                {LightBulbs.filter((_, index) => index % 4 === 0).map((lightBulb, index) => (
                    <motion.div layout key={index} className='h-fit mb-4'>
                        <Device name={lightBulb.name} model={lightBulb.model} />
                    </motion.div>
                ))}
                </div>
                <div className='flex-1 gap-4 '>
                {LightBulbs.filter((_, index) => index % 4 === 1).map((lightBulb, index) => (
                    <motion.div layout key={index} className='h-fit mb-4'>
                        <Device name={lightBulb.name} model={lightBulb.model} />
                    </motion.div>
                ))}
                </div>
            </div>
            <div className='flex-1 xl:flex gap-4'>
                <div className='flex-1 gap-4'>
                    {LightBulbs.filter((_, index) => index % 4 === 2).map((lightBulb, index) => (
                        <motion.div layout key={index} className='h-fit mb-4'>
                            <Device name={lightBulb.name} model={lightBulb.model} />
                        </motion.div>
                    ))}
                </div>
                <div className='flex-1 gap-4'>
                    {LightBulbs.filter((_, index) => index % 4 === 3).map((lightBulb, index) => (
                        <motion.div layout key={index} className='h-fit mb-4'>
                            <Device name={lightBulb.name} model={lightBulb.model} />
                        </motion.div>
                    ))}
                </div>
            </div>
          </div>
      </div>
    )
  }

export default Devices
