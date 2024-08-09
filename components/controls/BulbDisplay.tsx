'use client'
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Color } from '@react-stately/color';

interface BulbDisplayProps{
  color : Color, 
  brightness : number
}

const BulbDisplay = ({ color, brightness } : BulbDisplayProps) => {
  const gradient = `radial-gradient(#1E1E1E, ${color.toString('css')})`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        id="bulb"
        className='items-center self-center rounded-full h-[150px] w-[150px]'
        style={{ 
          background: gradient, 
          filter: `brightness(${(brightness / 100 +  0.3)})` 
        }}
      />
    </>
  );
};

export default BulbDisplay;
