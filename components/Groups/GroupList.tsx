"use client";
import React, {useState} from "react";
import Link3D from "../common/Link3D/index";
import Switch from "@/components/common/Switch";
import ResizablePanel from '@/components/common/ResizablePanel'
import GroupContent from '@/components/Groups/GroupContent'
import { PiPlusThin } from "react-icons/pi";
import Button from '@/components/common/Button/index';
import GroupForm from '@/components/Groups/GroupForm'

function GroupList() {
  const [expand, setExpand] = useState(false);
  return (
    <div className='pb-60'>
        <h1 className='text-6xl pb-4'>Groups</h1>
        <hr className='pb-16'/>
        <div className='flex flex-col gap-4'>
            {LightBulbs.map((lightBulb, index) => <GroupHeading key={index} name={lightBulb.name} isLast={index === LightBulbs.length - 1} /> )}
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

const LightBulbs = [
  {name: 'Bedroom', model : 'H6008'},
  {name: 'Office', model : 'H6008'},
  {name: 'Kitchen', model : 'H6008'}, 
  {name: 'Living Room', model : 'H6008'},
]

const GroupHeading = ({name, isLast}) => {
  const [expand, setExpand] = useState(false);
  return (
      <div className=''>
          <div className='flex justify-between items-center pb-4'>
             <h2 className='text-5xl'>{name}</h2>
             <div className='flex gap-4'>
                  <Switch/>
                  <div 
                    onClick={()=>setExpand(!expand)}
                    className='text-3xl border rounded-full h-min p-2 px-6'>
                    <Link3D>edit</Link3D>
                  </div> 
              </div>
          </div>
          <ResizablePanel>
              {expand && (
               <GroupContent></GroupContent>
              )}
          </ResizablePanel>
          <hr className='pb-4 w-full'/>
      </div>
  )
}

export default GroupList