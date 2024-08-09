'use client'
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface IndexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

export default function Index({ children, isActive, setIsActive, ...attributes }: IndexProps) {
  const circle = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  let timeoutId: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (circle.current) {
      timeline.current = gsap.timeline({ paused: true });
      timeline.current
        .to(circle.current, { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" }, "enter")
        .to(circle.current, { top: "-150%", width: "125%", duration: 0.25 }, "exit");
    }
  }, []);

  const manageMouseEnter = () => {
    if (!isActive) {
      if (timeoutId) clearTimeout(timeoutId);
      if (timeline.current) {
        timeline.current.tweenFromTo('enter', 'exit');
      }
    }
  };

  const manageMouseLeave = () => {
    if (!isActive) {
      timeoutId = setTimeout(() => {
        if (timeline.current) {
          timeline.current.play();
        }
      }, 300);
    }
  };

  const handleClick = () => {
    setIsActive(!isActive);
    if (!isActive) {
      gsap.to(circle.current, { top: "50%", left: "50%", width: "100%", height: "100%", x: "-50%", y: "-50%", duration: 0.4, ease: "power3.in" });
    } else {
      gsap.to(circle.current, { top: "100%", left: "0%", width: "100%", height: "150%", x: "0%", y: "0%", duration: 0.4, ease: "power3.in" });
    }
  };

  return (
    <div 
      className="relative flex items-center justify-center overflow-hidden rounded-full cursor-pointer" 
      onMouseEnter={manageMouseEnter} 
      onMouseLeave={manageMouseLeave} 
      onClick={handleClick} 
      {...attributes}
    >
      <div>{children}</div>
      <div 
        ref={circle} 
        className="absolute w-full h-[150%] rounded-[50%] top-full bg-custom-main mix-blend-difference z-10" 
      ></div>
    </div>
  );
}
