'use client'
import React, { useState, useEffect, use } from 'react';
import { PiArrowDownRightThin, PiBluetooth, PiPowerThin } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";
import ResizablePanel from '@/components/common/ResizablePanel';
import Button from '@/components/common/Button/index';
import LightControls from '@/components/controls/LightControls';
import { parseColor } from '@react-stately/color';
import BulbDisplay from '@/components/controls/BulbDisplay';
import {setDeviceLight, getDeviceState} from '@/api/index'
import { rgbaToHsva, hsvaToHsla} from '@uiw/color-convert';

interface widgetProps {
    deviceName: string, 
    device : string, 
    sku : string,
}

interface Capability {
    instance: string;
    state: {
      value: any;
    };
}


function getRGBFromNumber(number : number) {
    const r = (number >> 16) & 0xFF;
    const g = (number >> 8) & 0xFF;
    const b = number & 0xFF;
    return { r, g, b };
  }

const getColorFromPosition = (position : number) => {
    const startColor = [255, 223, 191];
    const midColor = [255, 255, 255]; 
    const endColor = [196, 229, 235];
    
    let color;
    if (position < 50) {
      const ratio = position / 50;
      color = startColor.map((start, i) => Math.round(start + (midColor[i] - start) * ratio));
    } else {
      const ratio = (position - 50) / 50;
      color = midColor.map((mid, i) => Math.round(mid + (endColor[i] - mid) * ratio));
    }
    return color;
  };

function mapValueToRange(position : number, inMin : number, inMax : number, outMin : number, outMax : number ) {
    return (position - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

const Widget = ({ deviceName, device, sku, } : widgetProps) => {
    const [color, setColor] = useState(parseColor('hsl(329, 75%, 56%)'));
    const [tempColor, setTempColor] = useState(parseColor('rgba(255,224,194,1)'));
    const [tempLevel, setTempLevel] = useState(50);
    const [expand, setExpand] = useState(false);
    const [bulbSwitch, setSwitch] = useState(false);
    const [brightness, setBrightness] = useState(50); 
    const [lastUpdated, setLastUpdated] = useState('color');
    const [connection, setConnection] = useState(true);

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
    }, [tempLevel]);

    const handleSwitch = () => {
        setSwitch(!bulbSwitch);
        setDeviceLight(sku,device, bulbSwitch ? 0 : 1 );
    }

    const lightProps = {device, sku, color, setColor, tempLevel, setTempLevel, brightness, setBrightness};

    useEffect(() => {
        const x = mapValueToRange(tempLevel, 2000, 9000, 0, 100);
        const newColor = getColorFromPosition(x);
        setTempColor(parseColor(`rgba(${newColor[0]}, ${newColor[1]}, ${newColor[2]}, 1)`));
    }, [tempLevel]);
    
    useEffect(() => {
        async function fetchDeviceState() {
          try {
            const capabilities: Capability[] = await getDeviceState(sku, device, 0);
            const initialColor = capabilities.find(cap => cap.instance === 'colorRgb')?.state.value;
            const initialTemp = capabilities.find(cap => cap.instance === 'colorTemperatureK')?.state.value;
            const initialBrightness = capabilities.find(cap => cap.instance === 'brightness')?.state.value;
            const initialPower = capabilities.find(cap => cap.instance === 'powerSwitch')?.state.value;
            const initialConnection = capabilities.find(cap => cap.instance === 'online')?.state.value;

            setConnection(initialConnection)

            if (initialColor) { 
                const { r, g, b } = getRGBFromNumber(initialColor);
                const hsla = hsvaToHsla(rgbaToHsva({r,g,b, a:1}));
                setColor(parseColor(`hsl(${hsla.h},${hsla.s}%,${hsla.l}%)`));
            }
            
            if (initialTemp) setTempLevel(initialTemp);
            if (initialBrightness) setBrightness(initialBrightness);
            if (initialPower !== undefined) setSwitch(!!initialPower);
          } 
          catch (error) {
            console.error('Error fetching initial device state:', error);
          }
        }
        fetchDeviceState()
    }, []);

    return (
        <div className='p-4 flex flex-col border justify-between rounded'>
            <div>
                <h2 className='text-5xl pb-4'>{deviceName}</h2>
                <div className='pb-4 display: flex items-center gap-4'>
                    <h2 className='text-xl'>{sku}</h2>
                    {connection && <PiBluetooth size={20}/>}
                </div>
            </div>
            <div className='flex justify-between'>
                <motion.div 
                    className='items-center self-center rounded-full h-[150px] w-[150px]'>
                    <AnimatePresence>
                        {bulbSwitch && connection && (
                            <BulbDisplay color={lastUpdated === 'color' ? color : tempColor} brightness={brightness} />
                        )}
                    </AnimatePresence>
                </motion.div>
                {connection && 
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
             </div>}
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
