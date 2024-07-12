'use client'
import React, {useState, useEffect} from 'react'
import { PiPowerThin } from "react-icons/pi";
import { PiArrowDownRightThin } from "react-icons/pi";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";
import ResizablePanel from '@/components/ResizablePanel'
import Button from '@/components/Button/index'
import WidgetControls from '@/components/Widgets/WidgetControls'
import { parseColor } from '@react-stately/color';

const LightBulbs = [
    {name: 'Tagarp', model : 'H6008', count : 0}, 
    {name: 'Tagarp', model : 'H6008', count : 1},
    {name: 'Tagarp', model : 'H6008', count : 2},
    {name: 'Tagarp', model : 'H6008', count : 3},
]

const Widget = ({name, model}) => {
    const [color, setColor] = useState(parseColor('hsl(0, 0%, 100%)'));
    const [expand, setExpand] = useState(false);
    const [bulbSwitch, setSwitch] = useState(false);
    
    const gradient = `radial-gradient(${color.toString('css')}, #1E1E1E)`;

    useEffect(() => {
        // Automatically collapse the widget when the bulb switch is turned off
        // if (!bulbSwitch) {
        //     setExpand(false);
        // }
        if (!bulbSwitch) {
            setExpand(false);
        }
    }, [bulbSwitch]);

    
    return (
        <div className='p-4 flex flex-col border justify-between rounded'>
            <div>
               <h2 className='text-5xl pb-4'>{name}</h2>
                <h2 className='text-xl'>{model}</h2> 
            </div>
            <div className='flex justify-between'>
                <motion.div 
                    className='items-center self-center rounded-full h-[150px] w-[150px] ' >
                <AnimatePresence>
                { bulbSwitch &&
                    <motion.div 
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        exit={{opacity:0}}
                        id="bulb" 
                        className='items-center self-center rounded-full h-[150px] w-[150px] ' 
                        style={{ background: gradient }}>
                    </motion.div>
                }
                </AnimatePresence>
                </motion.div>
                <div className='justify-self-end self-end'>
                    <div className='border border-custom-main rounded-full w-fit mb-4'
                    onClick={() => setSwitch(!bulbSwitch)}>
                        <Button isActive={bulbSwitch} setIsActive={setSwitch}>
                            <PiPowerThin size={60}/>
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
                 <WidgetControls color={color} setColor={setColor} />
                )}
            </ResizablePanel>
        </div>
    ) 
}

export default Widget
