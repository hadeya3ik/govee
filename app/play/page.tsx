'use client'
import React, {useState} from 'react'
import { motion } from "framer-motion";
import Link3D from '@/components/common/Link3D/index'
import Button from '@/components/common/Button/index'
import Control from '@/components/control'
const itemIds = [0, 1, 2, 3, 4];
const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];


const variants1 = {
  open: {
    // y: 0,
    opacity: 1,
    // transition: {
    //   y: { stiffness: 1000, velocity: -100 }
    // }
  },
  closed: {
    // y: 50,
    opacity: 0,
    // transition: {
    //   y: { stiffness: 1000 }
    // }
  }
};

const MenuItem = ({ i }) => {
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <motion.li
      variants={variants}
    >
      <div className="text-placeholder" style={style} />
    </motion.li>
  );
};


function play() {
  // const [a,seta] = useState(false);
  return (
    <main className='h-screen'>
      <h1 className='text-[20vw]'>govee</h1>
      <Link3D >LINK</Link3D>
      <div className='w-[300px] h-[50px]'>
        <Button>
          <h1 className='p-4'>BUTTON
          </h1></Button>
      </div>
      <Control/>
    </main>
  )
}

export default play
