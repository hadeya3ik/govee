"use client";
import Link3D from "../common/Link3D/index";
import Switch from "@/components/common/Switch";
import ResizablePanel from "@/components/common/ResizablePanel";
import CheckBox from "@/components/common/CheckBox";
import Controls from "@/components/Groups/Controls/Controls";
import NavigationBar from "@/components/common/NavigationBar";
import { useState , useEffect} from "react";
import { motion } from "framer-motion";
import LightControls from '@/components/controls/LightControls';
import { parseColor } from '@react-stately/color';
import BulbDisplay from '@/components/controls/BulbDisplay';

function GroupContent({ name , bulbItems }) {
  const [expand, setExpand] = useState(true);
  const [items, setItems] = useState(bulbItems);
  const [activeTab, setActiveTab] = useState(items[0].id);

  return (
    <div className="">
      <div className="flex justify-between items-center pb-4">
        <h2 className="text-5xl">{name}</h2>
        <div className="flex gap-4">
          <Switch />
          <div
            onClick={() => setExpand(!expand)}
            className="text-3xl border rounded-full h-min p-2 px-6"
          >
            <Link3D>edit</Link3D>
          </div>
        </div>
      </div>
      <ResizablePanel>
        {expand && (
          <div>
            <NavigationBar tabs={items} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        )}
      </ResizablePanel>
      <hr className="pb-4 w-full" />
    </div>
  );
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


export default GroupContent;
