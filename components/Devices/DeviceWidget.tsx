'use client'
import React, {useState} from 'react'
import Slider from '@/components/CustomSlider';
import { PiPlusThin } from "react-icons/pi";
import ResizablePanel from '@/components/ResizablePanel'
const colors = ['bg-purple-200', 'bg-orange-200', 'bg-blue-300', 'bg-red-100', 'bg-green-200', 'bg-yellow-200', 'bg-pink-300']
import ColorSlider from '@/components/ColorSlider'
import {parseColor} from '@react-stately/color';
import Button from '@/components/Button/index'
import {motion} from 'framer-motion'

function Example() {
  let [color, setColor] = React.useState(
    parseColor('#7f007f')
  );
  return (
    <>
      <ColorSlider
        channel="red"
        value={color}
        onChange={setColor}
      />
      <ColorSlider
        channel="green"
        value={color}
        onChange={setColor}
      />
      <ColorSlider
        channel="blue"
        value={color}
        onChange={setColor}
      />
      <ColorSlider
        channel="alpha"
        value={color}
        onChange={setColor}
      />
    </>
  );
}

function Example1() {
  let [color, setColor] = React.useState(
    parseColor('hsl(0, 100%, 50%)')
  );
  return (
    <>
      <ColorSlider
        channel="hue"
        value={color}
        onChange={setColor}
      />
      <ColorSlider
        channel="saturation"
        value={color}
        onChange={setColor}
      />
      <ColorSlider
        channel="lightness"
        value={color}
        onChange={setColor}
      />
      <ColorSlider
        channel="alpha"
        value={color}
        onChange={setColor}
      />
    </>
  );
}

const itemVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.9 } },
  exit: { opacity: 0, transition: { duration: 0.9 } }
};

const containerVariants = {
  animate: { 
    transition: { 
      staggerChildren: 0.3 
    } 
  }
};

const WidgetControls = () => {
    let [expand, setExpand] = useState(false);
    
    return (
        <motion.div 
          className='flex flex-col justify-around gap-4 pt-4'
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div className="border-4 border-blue-500"
              variants={itemVariants}
            >
            <Slider/>
          </motion.div>
          <motion.div className="border-4 border-blue-500"
              variants={itemVariants}
            >
            <Slider/>
          </motion.div>

          <motion.div variants={itemVariants}>
            <ColorSlider channel="hue" defaultValue="hsl(0, 100%, 50%)">
            <ColorSlider channel="hue" defaultValue="hsl(0, 100%, 50%)" />
            </ColorSlider>
            <ColorSlider defaultValue="#7f0000" channel="red" />
          </motion.div>

          <motion.div variants={itemVariants} className='grid grid-cols-4'>
                {colors.map((col, index) => <div key={index} className={`rounded-full w-[66px] h-[66px] ${col}`}> </div>)}
                <div 
                    onClick={() => setExpand(!expand)}
                    className='border flex justify-center items-center border-custom-main rounded-full w-[66px] h-[66px]' >
                      {/* <Button></Button> */}
                    <PiPlusThin size={60}/>
                </div>
          </motion.div>
          <ResizablePanel>
                {expand && (
                  <motion.div variants={itemVariants}>
                    <Example/>
                    <Example1/>
                  </motion.div>
                )}
          </ResizablePanel>
        </motion.div>
        
    )
}

export default WidgetControls
