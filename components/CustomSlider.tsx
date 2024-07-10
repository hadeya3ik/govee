'use client'

import * as Slider from '@radix-ui/react-slider';
import { useState } from 'react';

export default function CustomSlider() {
  let [volume, setVolume] = useState(50);

  return (
          <div className="">
            <Slider.Root 
              value={[volume]}
              onValueChange={(v) => setVolume(v[0])}
              className="relative flex w-full grow cursor-grab touch-none items-center active:cursor-grabbing"
            >
              <div className="flex h-[55px] grow">
                <Slider.Track className="relative grow border border-custom-main overflow-hidden rounded-full">
                  <Slider.Range className="absolute h-full bg-custom-main" />
                </Slider.Track>
              </div>
              <Slider.Thumb className="" />
              {/* <Slider.Thumb className="w-6 h-6 bg-white border-2 border-gray-400 rounded-full shadow-lg  focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white" /> */}
            </Slider.Root>
          </div>
  );
}
