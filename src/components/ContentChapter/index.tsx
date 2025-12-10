import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ChapterData } from "@/types";

interface ContentChapterProps {
  data: ChapterData;
  timeline?: gsap.core.Tween;
}

const ContentChapter: React.FC<ContentChapterProps> = ({ data, timeline }) => {
  const firstSectionRef = useRef<HTMLElement>(null);
  const firstSectionImageRef = useRef<HTMLImageElement>(null);
  const secondSectionRef = useRef<HTMLElement>(null);
  const secondSectionImageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (!timeline) return;

    const ctx = gsap.context(() => {
      // 1. Zoom Effect for Section 1 (Scroll down -> Zoom Out, Scroll up -> Zoom In)
      if (firstSectionRef.current && firstSectionImageRef.current) {
        gsap.fromTo(
          firstSectionImageRef.current,
          { scale: 1.4 }, // Initial State: Zoomed In
          {
            scale: 1.0, // Final State: Zoomed Out (Normal)
            ease: "none",
            scrollTrigger: {
              trigger: firstSectionRef.current,
              containerAnimation: timeline,
              start: "left right", // Start when section enters from right
              end: "right left", // End when section leaves to left
              scrub: true,
            },
          }
        );
      }

      // 2. Parallax Effect for Section 2
      if (secondSectionRef.current && secondSectionImageRef.current) {
        gsap.fromTo(
          secondSectionImageRef.current,
          { xPercent: -15 },
          {
            xPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: secondSectionRef.current,
              containerAnimation: timeline,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      }
    }, [firstSectionRef, secondSectionRef]);

    return () => ctx.revert();
  }, [timeline]);

  return (
    <div className="flex h-screen">
      {/* 
        REFACTORED LAYOUT: Image Left, Text Right
        Single panel per chapter as requested.
      */}
      <section
        ref={firstSectionRef}
        className="panel w-screen h-full flex relative shrink-0"
      >
        {/* Left: Image Block (45%) */}
        <div className="w-[40%] h-full relative flex flex-col justify-center py-5">
          {/* Added relative and h-full to wrapper to support Next.js Image 'fill' */}
          <div className="w-full h-full relative flex mx-auto justify-center items-center overflow-hidden bg-red-300">
            <Image
              ref={firstSectionImageRef}
              src={data.firstSection.imageLeft}
              alt={data.firstSection.bottomTitleImage}
              fill
              quality={100}
              className="object-cover bg-red-300"
              priority
            />

            {/* Overlay Caption - Centered Top */}
            <div className="absolute top-10 w-full text-center z-10 pointer-events-none">
              <p className="font-sans text-[8px] uppercase text-white drop-shadow-md">
                Image
              </p>
              <p className="font-sans italic text-[10px] -mt-1 text-white drop-shadow-lg">
                '{data.firstSection.bottomTitleImage}'
              </p>
            </div>
            {/* Overlay Caption - Centered Bottom */}
            <div className="absolute bottom-16 left-0 w-full text-center z-10 pointer-events-none">
              <p className="font-serif text-md uppercase text-white drop-shadow-md">
                Indonesia
              </p>
              <p className="font-serif -mt-1 uppercase text-6xl tracking-tight text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
                Lamongan
              </p>
              <p className="mt-4 text-sm uppercase text-white drop-shadow-md">
                68°14′00″N 14°34′00″E
              </p>
            </div>
          </div>
        </div>

        {/* Right: Typography Content (55%) */}
        <div className="w-[50%] h-full flex flex-col justify-center px-16 lg:px-24 relative">
          {/* Chapter Number Absolute Top Right */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center  text-[10px] tracking-[0.3em] font-sans uppercase text-gray-500">
            {data.chapter}.
          </div>

          {/* Main Headline Block */}
          <div className="flex flex-col gap-6">
            <h2 className="font-serif uppercase leading-[0.9] text-4xl md:text-5xl lg:text-5xl text-black/80 text-center">
              {data.firstSection.maintext}
            </h2>

            {/* Body Text at Bottom */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-full flex justify-center px-10">
              <div className="max-w-xl">
                <p className="  text-sm font-medium leading-4 text-gray-600 text-justify">
                  {data.firstSection.bottomMainText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Panel 2: Full Screen Landscape Image with Parallax */}
      <section
        ref={secondSectionRef}
        className="panel w-screen h-full relative shrink-0 bg-gray-100 -ml-48 overflow-hidden"
      >
        <Image
          ref={secondSectionImageRef}
          src={data.secondSection.mainImage}
          alt={data.secondSection.bottomTitleLeftImage}
          fill
          quality={100}
          className="object-cover"
          priority
        />

        {/* Bottom Left Caption Overlay */}
        <div className="absolute bottom-5 left-12 text-left z-10">
          <p className="font-sans text-[10px] uppercase text-gray-300 mb-2 drop-shadow-md tracking-tighter">
            Image
          </p>
          <p className="font-serif -mt-2 text-[12px] text-white drop-shadow-lg">
            {data.secondSection.bottomTitleLeftImage}
          </p>
        </div>

        {/* Subtle overlay to ensure white text pops on bright images */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
      </section>

      {/* Panel 3: Split Layout - Scattered Images & Center Text */}
      <section className="w-screen h-full flex relative shrink-0 border-l border-gray-100">
        {/* Left Half: Typography & Scattered Images */}
        <main className="w-2/3 h-full relative flex flex-col items-center justify-center">
          {/* Top Right Image (Extra) */}
          <div className="absolute top-12 right-16 w-[20%] aspect-square z-10">
            <Image
              src={data.thridSection.imageRightTop}
              alt="Detail"
              fill
              quality={100}
              sizes="20vw"
              className="object-cover shadow-sm"
            />
            <div className="mt-2 absolute top-full right-0 text-right w-full pt-2">
              <p className="font-sans text-[8px] uppercase tracking-wider text-gray-500">
                Image
              </p>
              <p className="font-serif text-[10px] italic -mt-1 text-gray-800 truncate">
                '{data.thridSection.titleImageRightTop}'
              </p>
            </div>
          </div>

          {/* Bottom Left Image (Reused Intro) */}
          <div className="absolute bottom-12 left-16 w-[20%] aspect-square z-10">
            <Image
              src={data.thridSection.imageBottomLeft}
              alt="Atmosphere"
              fill
              quality={100}
              sizes="20vw"
              className="object-cover shadow-sm"
            />
            <div className="mt-2 absolute top-full left-0 text-left w-full pt-2">
              <p className="font-sans text-[8px] uppercase tracking-wider text-gray-500">
                Image
              </p>
              <p className="font-serif text-[10px] italic -mt-1 text-gray-800 truncate">
                '{data.thridSection.titleImageBottomLeft}'
              </p>
            </div>
          </div>

          {/* Center Typography */}
          <div className="relative z-20 max-w-2xl text-center flex flex-col gap-6">
            <h3 className="font-serif text-4xl md:text-5xl leading-[0.9] text-black/80 uppercase tracking-tight">
              {data.thridSection.mainText}
            </h3>

            <div className="w-full flex justify-end">
              <p className="font-sans text-xs md:text-sm leading-4 font-medium tracking-tight text-gray-600 max-w-xs text-right mt-4">
                {data.thridSection.subMainText}
              </p>
            </div>
          </div>
        </main>

        {/* Right Half */}
        <div className="w-[65%] flex flex-row py-5">
          {/* Image container - Added relative h-full for Next.js Image */}
          <div className="w-[85%] relative h-full">
            <Image
              src={data.thridSection.mainImageRight}
              alt="Detail"
              fill
              quality={100}
              sizes="50vw"
              className="object-cover"
            />
          </div>

          {/* Caption di kanan gambar */}
          <div className="flex">
            <div className="px-3.5 text-left">
              <p className="font-sans text-[10px] uppercase text-black/60">
                Image
              </p>
              <p className="font-serif italic text-[10px] text-black/80">
                '{data.thridSection.titleMainImageRight}'
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Panel 4: Final Split Layout */}
      <section className="panel w-screen h-full shrink-0 bg-white flex items-center justify-center">
        <main className="flex flex-row items-center w-full h-full">
          {/* Left Side: Large Title */}
          <div className="w-[45%] h-full flex items-center justify-center p-16">
            <h1 className="font-serif text-5xl leading-[0.85] text-black/80 uppercase tracking-[-0.04em] text-center">
              {data.fourthSection.mainText}
            </h1>
          </div>

          {/* Right Side: Image and Description */}
          <div className="w-[55%] h-full flex flex-col justify-center items-center p-16 relative">
            <div className="w-full aspect-square relative overflow-hidden mb-8 shadow-sm">
              <Image
                src={data.fourthSection.mainImageRight}
                alt={data.fourthSection.titleMainImageRight}
                fill
                quality={100}
                sizes="50vw"
                className="object-cover bg-gray-300"
              />
            </div>

            <div className="flex flex-row justify-start gap-16 w-full">
              <span className="font-sans text-[10px] w-[20%] text-gray-500 shrink-0">
                <p className="font-sans text-[8px] uppercase tracking-wider text-gray-500">
                  Image
                </p>
                <p className="font-serif text-[10px] italic -mt-1 text-gray-800 truncate">
                  '{data.fourthSection.titleMainImageRight}'
                </p>
              </span>
              <div></div>
              <h1 className="font-serif text-md leading-tight text-black text-left mt-10">
                {data.fourthSection.descImageRight}
              </h1>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default ContentChapter;
