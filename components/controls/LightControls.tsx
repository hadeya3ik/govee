'use client'
import React, { useState } from 'react'
import TempSlider from '@/components/slider/TempSlider';
import BrightnessSlider from '@/components/slider/BrightnessSlider';
import ColorSlider from '@/components/slider/ColorSlider'
import { hslaToHsva, hsvaToRgba} from '@uiw/color-convert';
import { motion, AnimatePresence } from 'framer-motion'
import {itemVariants, containerVariants} from '@/lib/anim'
import { colorSaturation } from '@/api/index';


const LightControls = ({ device, sku, color, setColor, temp, setTemp, brightness, setBrightness }) => {
  const handleColorChange = (newColor) => {
    setColor(newColor);
    console.log(newColor)
    const hsvaColor = hslaToHsva({ h: newColor.hue, s: newColor.saturation, l: newColor.lightness, a: 1 });
    const { r, g, b } = hsvaToRgba(hsvaColor);
    console.log(r, g, b);
    colorSaturation(sku, device, r, g, b);
  };

  const modelProps = {device, sku}

  return (
    <motion.div 
      className='flex flex-col justify-around gap-4 pt-4'
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={itemVariants}>
        <BrightnessSlider {...modelProps} value={brightness} onChange={setBrightness}/>
      </motion.div>
      <motion.div variants={itemVariants}>
        <TempSlider {...modelProps}  value={temp} onChange={setTemp}/>
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
