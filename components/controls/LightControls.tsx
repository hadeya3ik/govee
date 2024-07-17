'use client'
import React, { useState } from 'react'
import TempSlider from '@/components/slider/TempSlider';
import BrightnessSlider from '@/components/slider/BrightnessSlider';
import ColorSlider from '@/components/slider/ColorSlider'
import { hslaToHsva, hsvaToRgba} from '@uiw/color-convert';
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios';

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

async function colorSaturation(sku, device, r, g, b) {
  try {
    const req = await axios.post("http://localhost:8000/color", {
      sku, 
      device,
      value: ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | ((b & 0xFF) << 0)
    });
    console.log('Response:', req.data);
  } catch (error) {
    if (error.response) {
      alert(`Error: ${error.response.status} - ${error.response.data}`);
    } else {
      alert('Error toggling the light');
    }
    console.error(error);
  }
}

// hue
// : 
// 309
// lightness
// : 
// 56
// saturation
// : 
// 21

const LightControls = ({ device, sku, color, setColor, temp, setTemp, brightness, setBrightness }) => {
  
  const handleColorChange = (newColor) => {
    setColor(newColor);
    console.log(newColor)
    const hsvaColor = hslaToHsva({ h: newColor.hue, s: newColor.saturation, l: newColor.lightness, a: 1 });
    const { r, g, b } = hsvaToRgba(hsvaColor);
    console.log(r, g, b);
    // const [r, g, b] = hslToRgb(newColor.h / 360, newColor.s / 100, newColor.l / 100);
    colorSaturation(sku, device, r, g, b);
  };

  return (
    <motion.div 
      className='flex flex-col justify-around gap-4 pt-4'
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={itemVariants}>
        <BrightnessSlider device={device} sku={sku} value={brightness} onChange={setBrightness}/>
      </motion.div>
      <motion.div variants={itemVariants}>
        <TempSlider device={device} sku={sku} value={temp} onChange={setTemp}/>
      </motion.div>
      <motion.div variants={itemVariants}>
        <ColorSlider channel="hue" value={color} onChange={handleColorChange}/>
      </motion.div>
      <motion.div variants={itemVariants}>
        <ColorSlider channel="saturation" value={color} onChange={handleColorChange}/>
      </motion.div>
    </motion.div>
  )
}

export default LightControls;
