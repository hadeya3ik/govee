'use client'
import React, { useState, useEffect } from 'react';
import { PiPowerThin } from "react-icons/pi";
import { PiArrowDownRightThin } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";
import ResizablePanel from '@/components/common/ResizablePanel';
import Button from '@/components/common/Button/index';
import LightControls from '@/components/controls/LightControls';
import { parseColor } from '@react-stately/color';
import BulbDisplay from '@/components/controls/BulbDisplay';
import {toggleLight} from '@/api/index'

const Widget = ({ deviceName, device, sku, }) => {
    const [color, setColor] = useState(parseColor('hsl(329, 75%, 56%)'));
    const [temp, setTemp] = useState(parseColor('rgba(255,204,151,1)'));
    const [expand, setExpand] = useState(false);
    const [bulbSwitch, setSwitch] = useState(false);
    const [lastUpdated, setLastUpdated] = useState('color');
    const [brightness, setBrightness] = useState(50); 
    
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

    const handleSwitch = () => {
        setSwitch(!bulbSwitch);
        toggleLight(sku,device, bulbSwitch ? 0 : 1 );
    }

    const lightProps = {device, sku, color, setColor, temp, setTemp, brightness, setBrightness};

    return (
        <div className='p-4 flex flex-col border justify-between rounded'>
            <div>
                <h2 className='text-5xl pb-4'>{deviceName}</h2>
                <h2 className='text-xl'>{sku}</h2>
            </div>
            <div className='flex justify-between'>
                <motion.div 
                    className='items-center self-center rounded-full h-[150px] w-[150px]'>
                    <AnimatePresence>
                        {bulbSwitch && (
                            <BulbDisplay color={lastUpdated === 'color' ? color : temp} brightness={brightness} />
                        )}
                    </AnimatePresence>
                </motion.div>
                <div className='justify-self-end self-end'>
                    <div className='border border-custom-main rounded-full w-fit mb-4'
                        onClick={() => handleSwitch()}>
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
                    <LightControls {...lightProps}/>
                )}
            </ResizablePanel>
        </div>
    );
}

export default Widget;
