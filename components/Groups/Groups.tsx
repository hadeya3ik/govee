"use client";
import React, {useState} from "react";
import Link3D from "../common/Link3D/index";
import Switch from "@/components/common/Switch";
import ResizablePanel from '@/components/common/ResizablePanel'
import GroupContent from '@/components/Groups/GroupContent'
import { PiPlusThin } from "react-icons/pi";
import Button from '@/components/common/Button/index';
import GroupForm from '@/components/Groups/Forms/GroupForm'

const GroupList = [
  {name: 'Bedroom', model : 'H6008', 
  items: [
    { id: '1', text: 'Bulb 1', checked: true },
    { id: '2', text: 'Bulb 2', checked: false },
    { id: '3', text: 'Bulb 3', checked: true },
  ],},
  {name: 'Office', model : 'H6008', 
  items: [
    { id: '4', text: 'Bulb 1', checked: true },
    { id: '5', text: 'Bulb 2', checked: true },
    { id: '6', text: 'Bulb 3', checked: true },
  ],
  },
  {name: 'Kitchen', model : 'H6008', 
  items: [
    { id: '7', text: 'Bulb 1', checked: false },
  ],
  }, 
  {name: 'Living Room', model : 'H6008', 
  items: [
    { id: '8', text: 'Bulb 1', checked: false },
    { id: '9', text: 'Bulb 2', checked: false },
    { id: '10', text: 'Bulb 3', checked: false },
  ],
  },
]

export default function Groups() {
  const [expand, setExpand] = useState(false);
  return (
    <div className='pb-60'>
        <h1 className='text-6xl pb-4'>Groups</h1>
        <hr className='pb-16'/>
        <div className='flex flex-col gap-4'>
            {GroupList.map((group, index) => <GroupContent key={index} name={group.name} bulbItems={group.items} /> )}
        </div>
        <div className="flex gap-4 items-center justify-end" onClick={() => setExpand(!expand)}>
          <Button isActive={expand} setIsActive={setExpand}>
            <div className="flex gap-4 border rounded-full">
               <div className=" border-custom-main rounded-full h-min w-min">
              <PiPlusThin size={30}/>
              </div>
              <h1 className='text-xl'>Add a Group</h1>
            </div>
          </Button>
        </div>
        <ResizablePanel>
                {expand && (
                    <GroupForm></GroupForm>
                )}
        </ResizablePanel>
    </div>
  )
}

