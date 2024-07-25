'use client'
import React, { useState, useEffect, use } from 'react';
import { PiPowerThin } from "react-icons/pi";
import { PiArrowDownRightThin } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";
import ResizablePanel from '@/components/common/ResizablePanel';
import Button from '@/components/common/Button/index';
import LightControls from '@/components/controls/LightControls';
import { parseColor } from '@react-stately/color';
import BulbDisplay from '@/components/controls/BulbDisplay';
import {setDeviceLight, getDeviceState} from '@/api/index'
import { rgbaToHsva, hsvaToHsla} from '@uiw/color-convert';

function getRGBFromNumber(number) {
    const r = (number >> 16) & 0xFF;
    const g = (number >> 8) & 0xFF;
    const b = number & 0xFF;
    return { r, g, b };
  }

const getColorFromPosition = (position) => {
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

function mapValueToRange(position, inMin, inMax, outMin, outMax) {
    return (position - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

const Widget = ({ deviceName, device, sku, }) => {
    const [color, setColor] = useState(parseColor('hsl(329, 75%, 56%)'));
    const [temp, setTemp] = useState(parseColor('rgba(255,204,151,1)'));
    const [tempLevel, setTempLevel] = useState(50);
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
        setDeviceLight(sku,device, bulbSwitch ? 0 : 1 );
    }

    const lightProps = {device, sku, color, setColor, temp, setTemp, brightness, setBrightness};

    // useEffect(() => {
    //     const { r, g, b } = getRGBFromNumber(8512060);
    //     const hsla = hsvaToHsla(rgbaToHsva({r,g,b, a:1}));
    //     setColor(parseColor(`hsl(${hsla.h},${hsla.s}%,${hsla.l}%)`));
    // }, []);

    useEffect(() => {
        async function fetchDeviceState() {
          try {
            const capabilities = await getDeviceState(sku, device, 0);

            console.log(device); 
            capabilities.forEach(cap => {
              console.log(`Instance: ${cap.instance}, Value: ${cap.state.value}`);
            });
    
            // Initialize state with fetched data
            
            const initialColor = capabilities.find(cap => cap.instance === 'colorRgb')?.state.value;
            const initialTemp = capabilities.find(cap => cap.instance === 'colorTemperatureK')?.state.value;
            const initialBrightness = capabilities.find(cap => cap.instance === 'brightness')?.state.value;
            const initialPower = capabilities.find(cap => cap.instance === 'powerSwitch')?.state.value;

            if (initialColor) { 
                const { r, g, b } = getRGBFromNumber(initialColor);
                const hsla = hsvaToHsla(rgbaToHsva({r,g,b, a:1}));
                setColor(parseColor(`hsl(${hsla.h},${hsla.s}%,${hsla.l}%)`));
            }
            
            // if (initialColor) setColor(parseColor(`#${initialColor.toString(16).padStart(6, '0')}`));
            const tempRgb = getColorFromPosition(mapValueToRange(initialTemp, 2000, 9000, 0, 100))
            if (initialTemp) setTemp(parseColor(`rgba(${tempRgb[0]}, ${tempRgb[1]}, ${tempRgb[2]}, 1)`));

            if (initialBrightness) setBrightness(initialBrightness);
            if (initialPower !== undefined) setSwitch(!!initialPower);

          } catch (error) {
            console.error('Error fetching initial device state:', error);
          }
        }
        fetchDeviceState()
      }, []);
    

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
