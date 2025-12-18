"use client";
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { CHAPTERS } from "@/constants";
import { Spin as Hamburger } from "hamburger-react";

interface SidebarProps {
  onChapterClick?: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onChapterClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Animation Timeline Setup
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set(overlayRef.current, { xPercent: -100, autoAlpha: 1 });
      gsap.set(".chapter-card", { x: -50, opacity: 0 });

      // 2. Build Timeline
      tl.current = gsap
        .timeline({ paused: true })
        .to(overlayRef.current, {
          xPercent: 0,
          duration: 0.8,
          ease: "power4.inOut",
        })
        .to(
          ".chapter-card",
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.4"
        );
    }, overlayRef);

    return () => ctx.revert();
  }, []);

  // Open/Close Logic & Scroll Locking
  useLayoutEffect(() => {
    if (tl.current) {
      if (isOpen) {
        tl.current.play();
        // Lock body and html scrolling
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
      } else {
        tl.current.reverse();
        // Unlock body and html scrolling
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // Desktop Horizontal Scroll Handling (Wheel -> Horizontal)
  useEffect(() => {
    const el = scrollContainerRef.current;

    if (el && isOpen) {
      const onWheel = (e: WheelEvent) => {
        // Only apply custom scroll logic on Desktop views
        if (window.innerWidth >= 1024) {
          if (e.deltaY !== 0) {
            // Prevent default vertical scroll of the page
            e.preventDefault();
            // Manually scroll the container horizontally
            el.scrollLeft += e.deltaY;
          }
        }
      };

      // Add non-passive event listener to allow preventDefault
      el.addEventListener("wheel", onWheel, { passive: false });

      return () => {
        el.removeEventListener("wheel", onWheel);
      };
    }
  }, [isOpen]);

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    if (onChapterClick) {
      setTimeout(() => {
        onChapterClick(id);
      }, 500);
    }
  };

  return (
    <>
      {/* Navigation Bar / Toggle Button */}
      <nav className="fixed top-0 right-0 lg:right-auto lg:left-0 w-full lg:w-20 h-14 lg:h-full bg-white z-[2010] border-b lg:border-b-0 lg:border-r border-gray-100 transition-all duration-300">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full h-full cursor-pointer outline-none block"
        >
          {/* Desktop Layout: Absolute Top Left */}
          <div className="hidden lg:block">
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50">
              <Hamburger
                toggled={isOpen}
                toggle={setIsOpen}
                color="black"
                size={20}
                duration={0.8}
              />
            </div>
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none">
              <span
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                }}
                className={`text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 whitespace-nowrap ${
                  isOpen
                    ? "text-black font-semibold"
                    : "text-gray-400 group-hover:text-black"
                }`}
              >
                {isOpen ? "Close Menu" : "All Chapters"}
              </span>
            </div>
          </div>

          {/* Mobile Layout: Absolute Top Right */}
          <div className="lg:hidden w-full h-full relative">
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-row items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 min-w-[60px] text-right">
                {isOpen ? "Close" : "All Chapters"}
              </span>
              <div className="relative z-50">
                <Hamburger
                  toggled={isOpen}
                  toggle={setIsOpen}
                  color="black"
                  size={18}
                  duration={0.8}
                />
              </div>
            </div>
          </div>
        </button>
      </nav>

      {/* Full Screen Overlay */}
      {/* Mobile: overflow-y-auto handles vertical scroll */}
      {/* Desktop: overflow-hidden because inner container handles horizontal scroll */}
      <div
        ref={overlayRef}
        className="fixed inset-0 w-full h-screen bg-gray-50 z-[2000] overflow-y-auto lg:overflow-hidden invisible overscroll-contain"
      >
        <div className="w-full h-full pt-20 pb-20 px-6 lg:pl-32 lg:pr-0 flex flex-col">
          {/* Overlay Header */}
          <div className="w-full text-center lg:text-left mb-12 lg:mb-0 lg:absolute lg:top-10 lg:left-32 shrink-0 z-10">
            <h2 className="text-[10px] font-sans uppercase tracking-[0.3em] text-black">
              All Chapters
            </h2>
          </div>

          {/* 
            Responsive Scroll Container 
            Mobile: Grid layout, scrolls with parent (overlayRef)
            Desktop: Flex layout, horizontal scroll handled here via ref
          */}
          <div
            ref={scrollContainerRef}
            className="
              w-full flex-grow
              grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16      
              lg:flex lg:flex-row lg:flex-nowrap lg:overflow-x-auto lg:items-center lg:gap-10 lg:h-full lg:pb-0
              no-scrollbar overscroll-contain
            "
          >
            {CHAPTERS.map((chapter, index) => (
              <div
                key={chapter.id}
                className="
                  chapter-card group cursor-pointer flex flex-col bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-300
                  w-full                                  
                  lg:w-[500px] lg:shrink-0 lg:min-w-[400px] lg:aspect-[3/4] lg:justify-center
                "
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
                  <h3 className="font-serif text-2xl lg:text-3xl  leading-[0.9] text-black tracking-tight group-hover:text-gray-600 transition-colors duration-300">
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

            {/* Spacer for horizontal scroll on desktop */}
            <div className="hidden lg:block w-12 shrink-0 h-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
