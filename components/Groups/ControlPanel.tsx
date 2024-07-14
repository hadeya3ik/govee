'use client'

import LightControls from '@/components/Widgets/LightControls';
import { parseColor } from '@react-stately/color';
import { useState, useEffect } from "react";

const ControlPanel = ({ tabs, activeTab, setTabs }) => {
  const activeTabObject = tabs.find(tab => tab.id === activeTab);
  const [color, setColor] = useState(parseColor('hsl(0, 0%, 100%)'));

  useEffect(() => {
    const updatedTabs = tabs.map(tab =>
      tab.id === activeTab ? { ...tab, color: color.toString('css') } : tab
    );
    setTabs(updatedTabs);
  }, [color]);

  return (
    <div>
      <div>{activeTabObject.color}</div>
      <LightControls color={color} setColor={setColor} />
    </div>
  );
};

export default ControlPanel;
