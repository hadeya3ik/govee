'use client';
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Widget from '@/components/Kanban/Widgets';
import { getDevices } from '@/api/index';

interface Device {
  deviceName: string;
  index: number;
  sku: string;
  device: string;
}

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    async function fetchDeviceState() {
      try {
        const response = await getDevices();
        const deviceData: Device[] = response.data.map((device: any, index: number) => ({
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
