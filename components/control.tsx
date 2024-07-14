'use client'
import React, {useState, useEffect} from 'react'
import { PiPowerThin } from "react-icons/pi";
import { PiArrowDownRightThin } from "react-icons/pi";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";
import LightControls from '@/components/Widgets/LightControls'
import { parseColor } from '@react-stately/color';

function Control() {
    const [color, setColor] = useState(parseColor('hsl(0, 0%, 100%)'));
    const gradient = `radial-gradient(${color.toString('css')}, #1E1E1E)`;
  return (
    <div>
        <div>
            <motion.div 
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                id="bulb" 
                className='items-center self-center rounded-full h-[150px] w-[150px] ' 
                style={{ background: gradient }}>
            </motion.div>
        </div>
        <LightControls color={color} setColor={setColor} />
    </div>
  )
}

export default Control