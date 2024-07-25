'use client'
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Widget from '@/components/Kanban/Widgets';
import { getDevices } from '@/api/index';

export default function Devices() {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        async function fetchDeviceState() {
            try {
                const response = await getDevices();
                const deviceData = response.data.map((device, index) => ({
                    deviceName: device.deviceName,
                    index: index + 1,
                    sku: device.sku,
                    device: device.device,
                }));
                setDevices(deviceData);
            } catch (error) {
                console.error('Error fetching initial device state:', error);
            }
        }
        fetchDeviceState();
    }, []);

    return (
        <div className='pb-60'>
            <h1 className='text-6xl pb-4'>Devices</h1>
            <hr className='pb-4' />
            <div className='flex flex-col sm:flex-row sm:gap-4'>
                <div className='flex-1 xl:flex gap-4'>
                    <div className='flex-1 gap-4'>
                        {devices.filter((_, index) => index % 4 === 0).map((device, index) => (
                            <motion.div layout key={index} className='h-fit mb-4'>
                                <Widget deviceName={device.deviceName} sku={device.sku} device={device.device} />
                            </motion.div>
                        ))}
                    </div>
                    <div className='flex-1 gap-4'>
                        {devices.filter((_, index) => index % 4 === 1).map((device, index) => (
                            <motion.div layout key={index} className='h-fit mb-4'>
                                <Widget deviceName={device.deviceName} sku={device.sku} device={device.device} />
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className='flex-1 xl:flex gap-4'>
                    <div className='flex-1 gap-4'>
                        {devices.filter((_, index) => index % 4 === 2).map((device, index) => (
                            <motion.div layout key={index} className='h-fit mb-4'>
                                <Widget deviceName={device.deviceName} sku={device.sku} device={device.device} />
                            </motion.div>
                        ))}
                    </div>
                    <div className='flex-1 gap-4'>
                        {devices.filter((_, index) => index % 4 === 3).map((device, index) => (
                            <motion.div layout key={index} className='h-fit mb-4'>
                                <Widget deviceName={device.deviceName} sku={device.sku} device={device.device} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const DEFAULT_DEVICES = [
    {
        "deviceName": "FADO",
        "index": 1,
        "sku": "H6008",
        "device": "86:5C:60:74:F4:D7:E1:3E",
    },
    {
        "deviceName": "LAUTERS",
        "index": 2,
        "sku": "H6008",
        "device": "B5:71:60:74:F4:D4:2A:EE",
    },
    {
        "deviceName": "TÅGARP",
        "index": 3,
        "sku": "H6008",
        "device": "68:B8:60:74:F4:D7:8E:7C",
    },
];
