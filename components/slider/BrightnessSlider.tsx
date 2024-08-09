'use client'

import * as Slider from '@radix-ui/react-slider';
import { setDeviceBrightness } from '@/api/index';

interface SliderProps {
  sku: string; 
  device: string; 
  value: number; 
  onChange: (value: number) => void; 
}

export default function BrightnessSlider({sku, device, value, onChange} : SliderProps) {

  const handleChange = (v : number[]) => {
    setDeviceBrightness(sku, device, v[0])
    onChange(v[0])
  }

  return (
    <div className="flex items-center">
      <Slider.Root 
        value={[value]}
        min={0}
        max={100}
        onValueChange={(v) => handleChange(v)}
        className="relative flex w-full grow cursor-grab touch-none items-center active:cursor-grabbing"
      >
        <div className="flex h-[40px] grow">
          <Slider.Track className="relative grow border border-custom-main overflow-hidden rounded-full">
            <Slider.Range className="rounded-full absolute h-full bg-custom-main" />
          </Slider.Track>
        </div>
      </Slider.Root>
    </div>
  );
}
