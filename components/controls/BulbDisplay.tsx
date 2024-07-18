'use client'
import { useEffect } from "react";
import { motion } from "framer-motion";

const BulbDisplay = ({ color, brightness }) => {
  const gradient = `radial-gradient(#1E1E1E, ${color.toString('css')})`;
  // const gradient = `radial-gradient(${color.toString('css')}, #1E1E1E)`;

  // useEffect(() => {
  //   console.log(color.toString('css'));
  // }, [color]);

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
