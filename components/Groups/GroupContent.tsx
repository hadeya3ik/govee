'use client'

import { useState } from "react";
import TabNavigation from '../common/NavigationBar';

const tabsData = [
  { id: "1", label: "Bulb 1", color: "red" },
  { id: "2", label: "Bulb 2", color: "red" },
  { id: "3", label: "Bulb 3", color: "red" },
  { id: "4", label: "Bulb 4", color: "red" },
  { id: "5", label: "Bulb 5", color: "red" },
];

export default function GroupContent() {
  const [tabs, setTabs] = useState(tabsData);
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div>
       <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
