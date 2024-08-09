import React, { useState, Dispatch, SetStateAction } from 'react';
import TempSlider from '@/components/slider/TempSlider';
import BrightnessSlider from '@/components/slider/BrightnessSlider';
import ColorSlider from '@/components/slider/ColorSlider';
import { hslaToHsva, hsvaToRgba } from '@uiw/color-convert';
import { motion } from 'framer-motion';
import { itemVariants, containerVariants } from '@/lib/anim';
import { setDeviceColor } from '@/api/index';
import { Color } from '@react-stately/color';

interface LightControlsProps {
  device: string;
  sku: string;
  color: Color;
  setColor: Dispatch<SetStateAction<Color>>;
  tempLevel: number;
  setTempLevel: Dispatch<SetStateAction<number>>;
  brightness: number;
  setBrightness: Dispatch<SetStateAction<number>>;
}

const LightControls = ({ device, sku, color, setColor, tempLevel, setTempLevel, brightness, setBrightness }: LightControlsProps) => {

  const handleColorChange = (newColor: Color) => {
    setColor(newColor);
    console.log(newColor);

    const hue = newColor.getChannelValue('hue');
    const saturation = newColor.getChannelValue('saturation');
    const lightness = newColor.getChannelValue('lightness');

    const hsvaColor = hslaToHsva({ h: hue, s: saturation, l: lightness, a: 1 });
    const { r, g, b } = hsvaToRgba(hsvaColor);
    console.log(r, g, b);
    setDeviceColor(sku, device, r, g, b);
  };

  const modelProps = { device, sku };

  return (
    <motion.div
      className='flex flex-col justify-around gap-4 pt-4'
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={itemVariants}>
        <BrightnessSlider {...modelProps} value={brightness} onChange={setBrightness} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <TempSlider {...modelProps} value={tempLevel} onChange={setTempLevel} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <ColorSlider channel="hue" value={color} onChange={handleColorChange} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <ColorSlider channel="saturation" value={color} onChange={handleColorChange} />
      </motion.div>
    </motion.div>
  );
}

export default LightControls;
