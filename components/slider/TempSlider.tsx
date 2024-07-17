'use client'

import * as Slider from '@radix-ui/react-slider';
import { useState, useEffect } from 'react';
import axios from 'axios';

async function colorTemprature(sku, device, value) {
  try {
    const req = await axios.post("http://localhost:8000/temp", {
      sku, 
      device,
      value
    });
    console.log('Response:', req.data);
  } catch (error) {
    if (error.response) {
      alert(`Error: ${error.response.status} - ${error.response.data}`);
    } else {
      alert('Error toggling the light');
    }
    console.error(error);
  }
}


export default function TempSlider({ sku, device, value, onChange }) {
  const [volume, setVolume] = useState(50);
  const [color, setColor] = useState('rgba(255,204,151,1)');

  useEffect(() => {
    setColor(getColorFromPosition(volume));
  }, [volume]);

  const getColorFromPosition = (position) => {
    const startColor = [255, 223, 191]; // rgba(255,204,151,1)
    const midColor = [255, 255, 255]; // rgba(255,255,255,1)
    const endColor = [196, 229, 235]; // rgba(136,203,215,1)
    
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
    console.log(v[0]);
    setVolume(v[0]);
    const newColor = getColorFromPosition(v[0]);
    const mappedValue = 2000 + (v[0] / 100) * (9000 - 2000); // Map 0-100 to 2000-9000
    colorTemprature(sku, device, mappedValue);
    setColor(newColor);
    onChange(newColor); 
  };

  return (
    <div className="flex flex-col items-center">
      <Slider.Root
      min={0}
      max={100}
        value={[volume]}
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
      {/* <div
        className="w-full h-10 mt-4"
        style={{ backgroundColor: color }}
      /> */}
      {/* <div className="mt-2">
        Current Color: <span style={{ color: color }}>{color}</span>
      </div> */}
      <div>{volume}</div>
    </div>
  );
}
