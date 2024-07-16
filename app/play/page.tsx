'use client'
import React, {useState, useEffect} from 'react'
import { motion } from "framer-motion";
import Link3D from '@/components/common/Link3D/index'
import Button from '@/components/common/Button/index'
import NavigationBar from '@/components/common/NavigationBar';
import LightControls from '@/components/controls/LightControls';
import { parseColor } from '@react-stately/color';
import BulbDisplay from '@/components/controls/BulbDisplay';

const items = [
  { id: '8', text: 'Bulb 1', checked: false },
  { id: '9', text: 'Bulb 2', checked: false },
  { id: '10', text: 'Bulb 3', checked: false },
];

function play() {
  const [activeTab, setActiveTab] = useState(items[0].id);
  
  return (
    <main className='h-screen'>
      <NavigationBar tabs={items} activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* <Widget/> */}
    </main>
  )
}

const Widget = () => {
  const [color, setColor] = useState(parseColor('hsl(329, 75%, 56%)'));
  const [temp, setTemp] = useState(parseColor('rgba(255,204,151,1)'));
  const [expand, setExpand] = useState(false);
  const [bulbSwitch, setSwitch] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('color');
  const [brightness, setBrightness] = useState(50); 

  useEffect(() => {
      if (!bulbSwitch) {
          setExpand(false);
      }
  }, [bulbSwitch]);

  useEffect(() => {
      setLastUpdated('color');
  }, [color]);

  useEffect(() => {
      setLastUpdated('temp');
  }, [temp]);

  return (
    <>
      <LightControls color={color} setColor={setColor} temp={temp} setTemp={setTemp} brightness={brightness}  setBrightness={setBrightness}/>
      <BulbDisplay color={lastUpdated === 'color' ? color : temp} brightness={brightness} />
    </>
  )
}


export default play
