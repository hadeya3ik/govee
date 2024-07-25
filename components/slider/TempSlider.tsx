'use client'

import * as Slider from '@radix-ui/react-slider';
import { useState, useEffect } from 'react';
import {setDeviceTemperature} from '@/api/index';

export default function TempSlider({ sku, device, value,  onChange }) {
  const [color, setColor] = useState('rgba(255,204,151,1)');

  useEffect(() => {
    setColor(getColorFromPosition((value - 2000) * 100 / (9000 - 2000)));
  }, [value]);

  const getColorFromPosition = (position) => {
    const startColor = [255, 223, 191];
    const midColor = [255, 255, 255]; 
    const endColor = [196, 229, 235];
    
    let color;
    if (position < 50) {
      const ratio = position / 50;
      color = startColor.map((start, i) => Math.round(start + (midColor[i] - start) * ratio));
    } else {
      const ratio = (position - 50) / 50;
      color = midColor.map((mid, i) => Math.round(mid + (endColor[i] - mid) * ratio));
    }
    return `rgb(${color.join(',')})`;
  };

  const handleChange = (v) => {
    onChange(v[0]);
    // Map the initial temperature value (2000-9000) to the slider value (0-100)
    const x = (v[0] - 2000) * 100 / (9000 - 2000);
    const newColor = getColorFromPosition(x);
    console.log(newColor)
    setDeviceTemperature(sku, device, v[0]);
    setColor(newColor);
  };

  return (
    <div className="flex flex-col items-center">
      <Slider.Root
      min={2000}
      max={9000}
        value={[value]}
        onValueChange={handleChange}
        className="relative flex w-full grow cursor-grab touch-none items-center active:cursor-grabbing"
      >
        <div className="flex h-[40px] grow">
          <Slider.Track className="relative grow border border-custom-main rounded-full white-gradient">
            <Slider.Range className="absolute h-full" />
          </Slider.Track>
        </div>
        <Slider.Thumb className="w-[30px] h-[30px] rounded-full z-9 border-2 border-1 border-custom-invert flex grow outline-none focus:outline-none" />
      </Slider.Root>
    </div>
  );
}
