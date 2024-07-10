'use client'
import { useState, useRef, useEffect } from "react";
import { motion } from 'framer-motion';

const Items = ["31", "fsd 2", "bulb 3", 'fado', 'lauters', 'tagarp'];

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={position}
      className='absolute z-0 text-3xl p-2 rounded-full bg-custom-main'
    >.</motion.li>
  );
}

const Tab = ({ item, setPosition }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width, left } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          left,
          opacity: 1
        });
      }}
      className='z-10 relative block cursor-pointer text-custom-main mix-blend-difference text-3xl rounded-full p-2 px-6'>
      {item}
    </li>
  );
}

function Navigation() {
  const [position, setPosition] = useState({
    left: 8,
    width: 100,
    opacity: 1
  });

  return (
    <div className='pb-60'>
      <ul 
        onMouseLeave={() => {
          setPosition((pv) => ({
            ...pv, 
            opacity:0,
          }))
        }}
        className='flex relative border w-fit gap-4 rounded-full p-2'>
        <Cursor position={position} />
        {Items.map((item, index) =>
          <Tab setPosition={setPosition} key={index} item={item} />
        )}
      </ul>
    </div>
  );
}

export default Navigation;
