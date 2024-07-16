"use client";
import React, { useState, useEffect } from 'react';
import { parseColor } from '@react-stately/color';
import LightControls from '@/components/controls/LightControls';
import BulbDisplay from '@/components/controls/BulbDisplay';

function Controls({ items, activeTab }) {
  const [color, setColor] = useState(parseColor('hsl(329, 75%, 56%)'));
  const [temp, setTemp] = useState(parseColor('rgba(255,204,151,1)'));
  const [lastUpdated, setLastUpdated] = useState('color');
  const [brightness, setBrightness] = useState(50); 

  useEffect(() => {
    setLastUpdated('color');
  }, [color]);

  useEffect(() => {
    setLastUpdated('temp');
  }, [temp]);

  useEffect(() => {
    // Reset state when switching to a different bulb
    setColor(parseColor('hsl(329, 75%, 56%)'));
    setTemp(parseColor('rgba(255,204,151,1)'));
    setBrightness(50);
  }, [activeTab]);

  return (
    <div>
      <LightControls 
        color={color} 
        setColor={setColor} 
        temp={temp} 
        setTemp={setTemp} 
        brightness={brightness} 
        setBrightness={setBrightness} 
      />
      <BulbDisplay color={lastUpdated === 'color' ? color : temp} brightness={brightness} />
    </div>
  );
}

export default Controls;
