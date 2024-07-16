import React from 'react'
import { PiPlusThin } from "react-icons/pi";
import CheckBox from '@/components/common/CheckBox';

function GroupForm() {
  return (
    <div>
        <div className="flex gap-4 border rounded-full">
            <div className=" border-custom-main rounded-full h-min w-min">
            <PiPlusThin size={30}/>
        </div>
            <h1 className='text-xl'>Add a Bulb</h1>
        </div>
    </div>
  )
}

export default GroupForm