'use client'
import React, { useState, useEffect } from 'react';
import { PiPowerThin } from "react-icons/pi";
import { PiArrowDownRightThin } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";
import ResizablePanel from '@/components/ResizablePanel';
import Button from '@/components/Button/index';
import LightControls from '@/components/Widgets/LightControls';
import { parseColor } from '@react-stately/color';
import BulbDisplay from '@/components/BulbDisplay';

const LightBulbs = [
    { name: 'Tagarp', model: 'H6008', count: 0 }, 
    { name: 'Tagarp', model: 'H6008', count: 1 },
    { name: 'Tagarp', model: 'H6008', count: 2 },
    { name: 'Tagarp', model: 'H6008', count: 3 },
];

const Widget = ({ name, model }) => {
    const [color, setColor] = useState(parseColor('hsl(329, 75%, 56%)'));
    const [temp, setTemp] = useState(parseColor('rgba(255,204,151,1)'));
    const [expand, setExpand] = useState(false);
    const [bulbSwitch, setSwitch] = useState(false);
    const [lastUpdated, setLastUpdated] = useState('color');
    const [volume, setVolume] = useState(50); 

    useEffect(() => {
        if (!bulbSwitch) {
            setExpand(false);
        }
    }, [bulbSwitch]);

    useEffect(() => {
        setLastUpdated('color');
    }, [color]);

    useEffect(() => {
        setLastUpdated('temp');
    }, [temp]);

    return (
        <div className='p-4 flex flex-col border justify-between rounded'>
            <div>
                <h2 className='text-5xl pb-4'>{name}</h2>
                <h2 className='text-xl'>{model}</h2>
            </div>
            <div className='flex justify-between'>
                <motion.div 
                    className='items-center self-center rounded-full h-[150px] w-[150px]'>
                    <AnimatePresence>
                        {bulbSwitch && (
                            <BulbDisplay color={lastUpdated === 'color' ? color : temp} volume={volume} />
                        )}
                    </AnimatePresence>
                </motion.div>
                <div className='justify-self-end self-end'>
                    <div className='border border-custom-main rounded-full w-fit mb-4'
                        onClick={() => setSwitch(!bulbSwitch)}>
                        <Button isActive={bulbSwitch} setIsActive={setSwitch}>
                            <PiPowerThin size={60} />
                        </Button>
                    </div>
                    <div
                        className='border rounded-full w-fit'
                        onClick={() => setExpand(!expand)}>
                        <Button isActive={expand} setIsActive={setExpand}>
                            <PiArrowDownRightThin size={60} />
                        </Button>
                    </div>
                </div>
            </div>
            <ResizablePanel>
                {expand && (
                    <LightControls color={color} setColor={setColor} temp={temp} setTemp={setTemp} volume={volume} setVolume={setVolume}/>
                )}
            </ResizablePanel>
        </div>
    );
}

export default Widget;
