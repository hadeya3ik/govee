'use client'
import { useState , useEffect} from "react";
import { motion } from "framer-motion";
import LightControls from '@/components/controls/LightControls';
import { parseColor } from '@react-stately/color';
import BulbDisplay from '@/components/controls/BulbDisplay';

const NavigationBar = ({ tabs, activeTab, setActiveTab }) => {
  const activeTabText = tabs.find(tab => tab.id === activeTab)?.text;

  return (
    <>
      <div className="flex space-x-1 border-2 w-fit rounded-full border-custom-main p-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${
              activeTab === tab.id ? "" : "hover:text-white"
            } relative rounded-full px-3 py-1.5 text-custom-main text-3xl`}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-10 bg-custom-main mix-blend-difference"
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab.text}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div key={tab.id}>
            {activeTab === tab.id && <Widget/>}
            {tab.text}
          </div>
        ))}
    </>
  );
};

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

export default NavigationBar;
