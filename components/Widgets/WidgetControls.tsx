'use client'
import React, { useState } from 'react'
import Slider from '@/components/CustomSlider';
import { PiPlusThin } from "react-icons/pi";
import ResizablePanel from '@/components/ResizablePanel'
const colors = ['bg-purple-200', 'bg-orange-200', 'bg-blue-300', 'bg-red-100', 'bg-green-200', 'bg-yellow-200', 'bg-pink-300']
import ColorSlider from '@/components/ColorSlider'
import Button from '@/components/Button/index'
import { motion, AnimatePresence } from 'framer-motion'

const itemVariants = {
  initial: { 
    opacity: 0,
    y: 50,
    transition: { 
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5,
      y: { 
        type: "spring",
        stiffness: 200,
        damping: 20,
        velocity: 2,
      },
    },
  },
  exit: { 
    opacity: 0,
    y: 50,
    transition: { 
      duration: 0.02,
    }
  }
};

const containerVariants = {
  animate: { 
    transition: { 
      staggerChildren: 0.08 
    } 
  }
};

const WidgetControls = ({ color, setColor }) => {
    let [expand, setExpand] = useState(false);
    return (
        <motion.div 
          className='flex flex-col justify-around gap-4 pt-4'
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div
              variants={itemVariants}
            >
            <Slider/>
          </motion.div>
          <motion.div
              variants={itemVariants}>
            <Slider/>
          </motion.div>
          <motion.div
            variants={itemVariants}>
            <ColorSlider
                channel="hue"
                value={color}
                onChange={setColor}
            />
          </motion.div>
          <motion.div
            variants={itemVariants}>
            <ColorSlider
                channel="lightness"
                value={color}
                onChange={setColor}
            />
          </motion.div>
          <motion.div
            variants={itemVariants}>
            <ColorSlider
                channel="saturation"
                value={color}
                onChange={setColor}
            />
          </motion.div>
          <motion.div variants={itemVariants} className='grid grid-cols-4'>
                {colors.map((col, index) => <div key={index} className={`rounded-full w-[66px] h-[66px] ${col}`}> </div>)}
                <div 
                    onClick={() => setExpand(!expand)}
                    className='border flex justify-center items-center border-custom-main rounded-full w-[66px] h-[66px]' >
                    <PiPlusThin size={60}/>
                </div>
          </motion.div>
          <ResizablePanel>
                <AnimatePresence>
                    {expand && (
                      <motion.div 
                      >
                      </motion.div>
                    )}
                </AnimatePresence>
          </ResizablePanel>
        </motion.div>
    )
}

export default WidgetControls
