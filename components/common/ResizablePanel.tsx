'use client'
import React from 'react'
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";

function ResizablePanel({children}) {
    let [ref, { height }] = useMeasure();
  
    return (<motion.div
            animate={{ height }}
            className="overflow-hidden">
            <AnimatePresence>
                <motion.div 
                    ref={ref} 
                    initial={{ opacity: 0 , transition: { duration: 0.05 } }}
                    animate={{ opacity: 1, transition: { duration: 0.05 } }}
                    exit={{ opacity: 0, transition: { duration: 0.05} }}
                    >
                    {children}
                </motion.div>
            </AnimatePresence>
        </motion.div>) 
}

export default ResizablePanel