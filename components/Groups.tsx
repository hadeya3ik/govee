"use client";
import React from "react";
import Link3D from "./Link3d/index";
import { Switch as AriaSwitch } from "react-aria-components";

function Switch() {
  return (
    <AriaSwitch
      className="group touch-none"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div className="group-data-[selected]:bg-custom-main group-data-[focus-visible]:ring-2 h-12 w-20 cursor-pointer rounded-full border border-custom-main transition duration-200 p-2 ">
        <div className="group-data-[selected]:ml-8 group-data-[selected]:group-data-[pressed]:ml-6  group-data-[pressed]:w-10 block h-full w-8 origin-right rounded-full border border-custom-main bg-custom-invert transition-all duration-200" />
      </div>
    </AriaSwitch>
  );
}

const LightBulbs = [
    {name: 'Bedroom', model : 'H6008'},
    {name: 'Office', model : 'H6008'},
    {name: 'Kitchen', model : 'H6008'}, 
    {name: 'Living Room', model : 'H6008'},
]

const Group = ({name, isLast}) => {
    return (
        <div className=''>
            <div className='flex justify-between items-center pb-4'>
               <h2 className='text-5xl'>{name}</h2>
               <div className='flex gap-4'>
                    <Switch/>
                    
                    <div className='text-3xl border rounded-full h-min p-2 px-6'>
                      <Link3D>edit</Link3D>
                    </div> 
                    
                </div>
            </div>
            {!isLast && <hr className='pb-4 w-full'/>}
        </div>
    )
}

function Groups() {
  return (
    <div className='pb-60'>
        <h1 className='text-6xl pb-4'>Groups</h1>
        <hr className='pb-16'/>
        <div className='flex flex-col gap-4'>
            {LightBulbs.map((lightBulb, index) => <Group key={index} name={lightBulb.name} isLast={index === LightBulbs.length - 1} /> )}
        </div>
    </div>
  )
}

export default Groups