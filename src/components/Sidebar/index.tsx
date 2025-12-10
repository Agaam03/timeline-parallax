"use client";
import React, { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { CHAPTERS } from "@/constants";

interface SidebarProps {
  onChapterClick?: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onChapterClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    // Scope GSAP to the overlayRef
    const ctx = gsap.context(() => {
      // 1. Initial State
      // Position overlay off-screen to the LEFT (xPercent: -100)
      gsap.set(overlayRef.current, { xPercent: -100, autoAlpha: 1 });
      // Initial state for cards
      gsap.set(".chapter-card", { y: 50, opacity: 0 });

      // 2. Build Timeline
      tl.current = gsap
        .timeline({ paused: true })
        .to(overlayRef.current, {
          xPercent: 0,
          duration: 1,
          ease: "power4.inOut",
        })
        .to(
          ".chapter-card",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.6"
        );
    }, overlayRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (tl.current) {
      if (isOpen) {
        tl.current.play();
        document.body.style.overflow = "hidden"; // Prevent background scrolling
      } else {
        tl.current.reverse();
        document.body.style.overflow = "";
      }
    }
  }, [isOpen]);

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    if (onChapterClick) {
      // Small delay to allow sidebar to close visually before scrolling
      setTimeout(() => {
        onChapterClick(id);
      }, 500);
    }
  };

  return (
    <>
      {/* Sidebar Trigger Strip - Fixed on Left/Top */}
      {/* 
         Desktop: Left side, Full height. 
         Mobile: Top side, Full width.
         Button position: Top-left on desktop (justify-start + padding).
      */}
      <nav className="fixed top-0 right-0 lg:right-auto lg:left-0 w-full lg:w-20 h-14 lg:h-full bg-white z-[1000] border-b lg:border-b-0 lg:border-r border-gray-100 flex lg:flex-col items-center justify-between lg:justify-start lg:pt-10 px-6 lg:px-0 transition-all duration-300">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex flex-col items-center gap-6 cursor-pointer outline-none w-full h-full lg:h-auto justify-center lg:w-auto"
        >
          {/* Desktop Vertical Text */}
          <div className="hidden lg:flex flex-col items-center gap-4 writing-vertical-rl transform rotate-180">
            <span
              style={{
                writingMode: "sideways-lr",
                textOrientation: "sideways",
              }}
              className={`text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                isOpen
                  ? "text-black font-semibold"
                  : "text-gray-400 group-hover:text-black"
              }`}
            >
              {isOpen ? "Close Menu" : "All Chapters"}
            </span>
          </div>

          {/* Mobile Horizontal Text */}
          <div className="lg:hidden flex items-center">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
              {isOpen ? "Close" : "All Chapters"}
            </span>
          </div>

          {/* Icon Indicator */}
          <div className="relative w-4 h-4 flex items-center justify-center">
            <div
              className={`absolute w-full h-[1px] bg-black transition-all duration-300 ${
                isOpen ? "rotate-45" : "-translate-y-1"
              }`}
            ></div>
            <div
              className={`absolute w-full h-[1px] bg-black transition-all duration-300 ${
                isOpen ? "-rotate-45" : "translate-y-1"
              }`}
            ></div>
          </div>
        </button>
      </nav>

      {/* All Chapters Full Screen Overlay */}
      {/* 
          Fixed z-index 900.
          overflow-y-auto ensures scrolling on small desktop screens with many items.
      */}
      <div
        ref={overlayRef}
        className="fixed inset-0 w-full h-screen bg-gray-50 z-[900] overflow-y-auto overflow-x-hidden invisible"
      >
        {/* 
           Inner Container: 
           - Removed 'min-h-screen flex items-center' to prevent overflow issues on desktop.
           - Added top/bottom padding to ensure content is reachable.
           - Added lg:pl-28 to account for the sidebar width.
        */}
        <div className="w-full pt-20 pb-20 px-6 lg:pl-32 lg:pr-12">
          {/* Overlay Header */}
          <div className="w-full text-center mb-12 lg:mb-20">
            <h2 className="text-[10px] font-sans uppercase tracking-[0.3em] text-black">
              All Chapters
            </h2>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 w-full max-w-[1600px] mx-auto">
            {CHAPTERS.map((chapter, index) => (
              <div
                key={chapter.id}
                className="chapter-card group cursor-pointer flex flex-col w-full bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                onClick={() => handleLinkClick(chapter.id)}
              >
                {/* Top Row: Index and Image */}
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-sans text-gray-400 font-medium pt-1">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>

                  {/* Image Container */}
                  <div className="w-[85%] relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <Image
                      src={chapter.firstSection.imageLeft}
                      alt={chapter.title}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Middle Row: Large Title */}
                <div className="mb-6 pr-2 min-h-[60px]">
                  <h3 className="font-serif text-2xl lg:text-3xl uppercase leading-[0.9] text-black tracking-tight group-hover:text-gray-600 transition-colors duration-300">
                    {chapter.firstSection.maintext.length > 50
                      ? `${chapter.firstSection.maintext.substring(0, 50)}...`
                      : chapter.firstSection.maintext}
                  </h3>
                </div>

                {/* Bottom Row: Footer info */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-gray-500">
                    {chapter.title}
                  </span>

                  {/* Arrow Icon */}
                  <svg
                    className="w-4 h-4 text-gray-400 transform transition-transform duration-300 group-hover:translate-x-2 group-hover:text-black"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
