import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import FontQuintessential from "../ChapterZeroMobile/FontQuintessential";

const ChapterZero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Initial State
      gsap.set(imageWrapperRef.current, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(imageRef.current, { scale: 1.4 });
      gsap.set(".anim-text", { y: 100, opacity: 0, rotateX: 10 });

      // 2. Entrance Animation
      tl.to(imageWrapperRef.current, {
        clipPath: "inset(0% 0 0 0)",
        duration: 2,
        ease: "expo.inOut",
      })
        .to(
          imageRef.current,
          {
            scale: 1,
            duration: 2,
            ease: "expo.out",
          },
          "<"
        )
        .to(
          ".anim-text",
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=1.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-screen h-screen flex flex-col items-center justify-center relative  shrink-0 overflow-hidden"
    >
      <main className="flex flex-col items-center text-center z-10 max-w-[95vw] mx-auto w-full    ">
        {/* Main Content: Split Layout */}
        <main className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-24 w-full relative">
          {/* Image Section - Animated Reveal */}
          <div id="image" className="relative z-10 order-2 md:order-1">
            <div className="relative p-2">
              {/* Optional border frame effect */}
              <div className="absolute inset-0 rounded-sm transform translate-x-2 translate-y-2 border border-gray-200 hidden md:block"></div>

              <div
                ref={imageWrapperRef}
                className="w-[80vw] h-[50vh] md:w-[28vw] md:h-[80vh] overflow-hidden bg-gray-100 shadow-2xl relative"
              >
                <Image
                  ref={imageRef}
                  src="/chapter-0/0.jpg"
                  alt="Couple"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
              </div>
            </div>
          </div>

          {/* Text Section - Modern & Interactive */}
          <div
            id="text"
            className="flex flex-col gap-6 items-center md:items-start justify-center text-center md:text-left z-30 text-black order-1 md:order-2   "
          >
            {/* Top Label */}
            <div className="anim-text text-[10px] uppercase tracking-[0.3em] font-sans text-gray-400">
              Chapter Zero
            </div>

            <div className="flex flex-col gap-2 md:gap-6">
              <h2 className="anim-text font-serif text-xs uppercase tracking-[0.2em] text-black/90 md:text-left text-center">
                The Prologue
              </h2>

              <div className="flex flex-col items-center md:items-start gap-1">
                <div className="anim-text transform transition-all hover:-translate-y-1 duration-500 hover:scale-[1.02] cursor-default">
                  <FontQuintessential
                    title="Ciputra Frida Pratama"
                    className="font-black leading-[0.9] text-black text-[42px] sm:text-[60px] md:text-[5vw] lg:text-[70px] "
                  />
                </div>

                <div className="anim-text text-xl md:text-3xl font-serif italic text-gray-300 md:pl-10 whitespace-nowrap">
                  &
                </div>

                <div className="anim-text transform transition-all hover:-translate-y-1 duration-500 hover:scale-[1.02] cursor-default">
                  <FontQuintessential
                    title="Aimmatur Nur Azizah"
                    className="font-black leading-[0.9] text-black text-[42px] sm:text-[60px] md:text-[5vw] lg:text-[70px] whitespace-nowrap"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </main>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 right-12 flex items-center gap-4 animate-pulse hidden md:flex z-20">
        <span className="text-[10px] uppercase tracking-widest font-sans text-black">
          Scroll
        </span>
        <svg
          width="32"
          height="12"
          viewBox="0 0 32 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M26 6H0M26 6L21 1M26 6L21 11" stroke="black" />
        </svg>
      </div>
    </section>
  );
};

export default ChapterZero;
