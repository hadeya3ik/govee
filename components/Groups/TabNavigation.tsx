'use client'

import { motion } from "framer-motion";

const TabNavigation = ({ tabs, activeTab, setActiveTab }) => {
  return (
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
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
