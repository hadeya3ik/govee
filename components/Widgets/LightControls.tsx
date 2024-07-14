'use client'
import React, { useState } from 'react'
import Slider from '@/components/CustomSlider';
import ResizablePanel from '@/components/ResizablePanel'
import ColorSlider from '@/components/ColorSlider'
import Button from '@/components/Button/index'
import { motion, AnimatePresence } from 'framer-motion'
import WhiteSlider from '@/components/WhiteSlider'

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

const LightControls = ({ color, setColor, temp, setTemp, volume, setVolume }) => {
    return (
        <motion.div 
          className='flex flex-col justify-around gap-4 pt-4'
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div
              variants={itemVariants}>
            <Slider volume={volume} setVolume={setVolume}/>
          </motion.div>
          <motion.div
              variants={itemVariants}
            >
            <WhiteSlider 
            value={temp}
            onChange={setTemp}
            />
          </motion.div>
          <motion.div
            variants={itemVariants}>
            <ColorSlider
                channel="hue"
                value={color}
                onChange={setColor}
            />
          </motion.div>
          {/* <motion.div
            variants={itemVariants}>
            <ColorSlider
                channel="lightness"
                value={color}
                onChange={setColor}
            />
          </motion.div> */}
          <motion.div
            variants={itemVariants}>
            <ColorSlider
                channel="saturation"
                value={color}
                onChange={setColor}
            />
          </motion.div>
        </motion.div>
    )
}

export default LightControls
