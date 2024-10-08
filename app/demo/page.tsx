'use client'
import React from 'react'
import { motion } from "framer-motion";
import DummyWidget from '@/components/Kanban/DummyWidget';
const DynamicClock = dynamic(() => import('@/components/common/Clock'), { ssr: false });
import dynamic from 'next/dynamic';
function play() {
  
  return (
    <main className='h-screen'>
        <DynamicClock/>
        <div className='pt-20 pb-60'>
            <h1 className='text-6xl pb-4'>Devices</h1>
            <hr className='pb-4' />
            <div className='flex flex-col sm:flex-row sm:gap-4'>
                <div className='flex-1 xl:flex gap-4'>
                    <div className='flex-1 gap-4'>
                        {DEFAULT_DEVICES.filter((_, index) => index % 4 === 0).map((device, index) => (
                            <motion.div layout key={index} className='h-fit mb-4'>
                                <DummyWidget deviceName={device.deviceName} sku={device.sku} device={device.device} />
                            </motion.div>
                        ))}
                    </div>
                    <div className='flex-1 gap-4'>
                        {DEFAULT_DEVICES.filter((_, index) => index % 4 === 1).map((device, index) => (
                            <motion.div layout key={index} className='h-fit mb-4'>
                                <DummyWidget deviceName={device.deviceName} sku={device.sku} device={device.device} />
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className='flex-1 xl:flex gap-4'>
                    <div className='flex-1 gap-4'>
                        {DEFAULT_DEVICES.filter((_, index) => index % 4 === 2).map((device, index) => (
                            <motion.div layout key={index} className='h-fit mb-4'>
                                <DummyWidget deviceName={device.deviceName} sku={device.sku} device={device.device} />
                            </motion.div>
                        ))}
                    </div>
                    <div className='flex-1 gap-4'>
                        {DEFAULT_DEVICES.filter((_, index) => index % 4 === 3).map((device, index) => (
                            <motion.div layout key={index} className='h-fit mb-4'>
                                <DummyWidget deviceName={device.deviceName} sku={device.sku} device={device.device} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default play

const DEFAULT_DEVICES = [
  {
      "deviceName": "FADO",
      "index": 1,
      "sku": "n/a",
      "device": "n/a",
  },
  {
      "deviceName": "LAUTERS",
      "index": 2,
      "sku": "n/a",
      "device": "n/a",
  },
  {
      "deviceName": "TÅGARP",
      "index": 3,
      "sku": "n/a",
      "device": "n/a",
  },
];
