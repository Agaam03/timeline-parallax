"use client";
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ChapterZeroData } from "@/types";

interface SplashScreenProps {
  data: ChapterZeroData;
  onOpen: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ data, onOpen }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entry Animation
      const tl = gsap.timeline();

      tl.from(imageRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      })
        .from(
          footerRef.current,
          {
            y: 100,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          ".splash-item",
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleOpen = () => {
    const tl = gsap.timeline({
      onComplete: onOpen,
    });

    tl.to(contentRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
    }).to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "expo.inOut",
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[3000] flex flex-col bg-white overflow-hidden"
    >
      {/* Cinematic Top Section */}
      <div
        ref={imageRef}
        className="relative w-full h-[65vh] md:h-[70vh] p-4 md:p-0"
      >
        <div className="relative w-full h-full overflow-hidden  ">
          <Image
            src={data.imageSplash}
            alt="Album Cover"
            fill
            className="object-cover w-full h-full`"
            priority
          />
          {/* Subtle vignette or overlay */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      </div>

      {/* Editorial Footer Section */}
      <div
        ref={footerRef}
        className="relative flex-grow flex flex-col justify-between p-6 md:p-12 "
      >
        <div ref={contentRef} className="w-full">
          {/* Main Title - Bold Condensed Aesthetic */}
          <div className="splash-item flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <h1 className="text-[15vw] md:text-[8vw] leading-[0.85] font-black uppercase tracking-tighter text-black/90 font-sans">
              OUR STORY
              <br />
              <span className="text-gray-400">ALBUM</span>
            </h1>

            <button
              onClick={handleOpen}
              className="group flex items-center gap-4 md:py-2 md:px-6 py-1 px-5 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 transform active:scale-95 self-start md:mb-4"
            >
              <span className="text-xs font-bold uppercase tracking-widest">
                Open Album
              </span>
              <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>

          {/* Metadata Row */}
          <div className="splash-item grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 border-t border-black/10">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                BY
              </span>
              <p className="text-xs font-bold uppercase text-black">
                {data.names.groom} & {data.names.bride}
              </p>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                COLLECTION
              </span>
              <p className="text-xs font-bold uppercase text-black">
                MODERN WEDDING EDITORIAL
              </p>
            </div>

            <div className="flex flex-col md:items-end">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                RELEASE DATE
              </span>
              <p className="text-xs font-bold uppercase text-black">
                EST. 2025
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar Accent */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
