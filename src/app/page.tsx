"use client";
import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useMediaQuery } from "react-responsive";

import dynamic from "next/dynamic";
import ChapterZero from "@/components/ChapterZero";
import ContentChapter from "@/components/ContentChapter";
import { CHAPTERS } from "@/constants";
import ChapterZeroMobile from "@/components/ChapterZeroMobile";

import MusicPlayer from "@/components/MusicPlayer";
import ContentChapterMobile from "@/components/ContentChapterMobile";
import Sidebar from "@/components/Sidebar";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const musicPlayerContainerRef = useRef<HTMLElement>(null);
  const [tween, setTween] = useState<gsap.core.Tween | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 770 });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slider = sliderRef.current;

      if (slider && isDesktop) {
        // Horizontal Scroll Logic (Desktop Only)
        const totalWidth = slider.scrollWidth;
        const amountToScroll = totalWidth - window.innerWidth;

        const t = gsap.to(slider, {
          x: -amountToScroll,
          ease: "none",
          scrollTrigger: {
            id: "main-scroll", // ID used for retrieving trigger if needed
            trigger: slider,
            pin: true,
            scrub: 1,
            // The scroll distance (duration) matches the width we are scrolling through
            end: () => `+=${totalWidth}`,
            invalidateOnRefresh: true,
          },
        });

        setTween(t);
      }
    }, componentRef);

    return () => ctx.revert();
  }, [isDesktop]);

  // Music Player Visibility Logic (Mobile Only)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!isDesktop) {
        // Mobile: Initially hidden and slightly moved up
        gsap.set(musicPlayerContainerRef.current, { autoAlpha: 0, y: -20 });

        const showAnim = gsap.to(musicPlayerContainerRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          paused: true,
        });

        // Toggle visibility based on scroll position
        const handleScroll = () => {
          if (window.scrollY > 50) {
            showAnim.play();
          } else {
            showAnim.reverse();
          }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      } else {
        // Desktop: Always visible
        gsap.set(musicPlayerContainerRef.current, { autoAlpha: 1, y: 0 });
      }
    }, componentRef);

    return () => ctx.revert();
  }, [isDesktop]);

  // Navigation Logic
  const handleChapterClick = (id: string) => {
    if (isDesktop && sliderRef.current) {
      // DESKTOP: Horizontal Scroll Calculation
      const targetEl = document.getElementById(id);

      if (targetEl && sliderRef.current) {
        const slider = sliderRef.current;
        const totalWidth = slider.scrollWidth;
        const viewportWidth = window.innerWidth;
        const amountToScroll = totalWidth - viewportWidth;

        // Horizontal offset of the target element within the slider
        const targetOffsetLeft = targetEl.offsetLeft;

        // Calculate progress ratio (0 to 1) based on horizontal position
        const progress = targetOffsetLeft / amountToScroll;

        // ScrollTrigger start/end calculation
        // The ScrollTrigger starts at top (0) and ends at totalWidth (roughly)
        // We retrieve the scroll trigger instance to get exact start/end
        const st = ScrollTrigger.getById("main-scroll");

        if (st) {
          const start = st.start;
          const end = st.end;
          const totalScrollDistance = end - start;

          const targetScrollPos = start + progress * totalScrollDistance;

          window.scrollTo({
            top: targetScrollPos,
            behavior: "smooth",
          });
        }
      }
    } else {
      // MOBILE: Vertical Scroll
      const targetEl = document.getElementById(id);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div ref={componentRef} className="bg-white overflow-hidden m-0 p-0 w-full">
      <Sidebar onChapterClick={handleChapterClick} />
      {isDesktop ? (
        <>
          <div ref={sliderRef} className="flex flex-nowrap h-screen w-max">
            <div id="chapter-zero">
              <ChapterZero />
            </div>
            {CHAPTERS.map((chapter) => (
              // ID added here for navigation
              <div key={chapter.id} id={chapter.id} className="h-full">
                <ContentChapter data={chapter} timeline={tween} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div id="chapter-zero">
            <ChapterZeroMobile />
          </div>
          {CHAPTERS.map((chapter) => (
            // ID added here for navigation
            <div key={chapter.id} id={chapter.id}>
              <ContentChapterMobile data={chapter} timeline={tween} />
            </div>
          ))}
        </>
      )}

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-[0.7px] bg-gray-100 z-[1000]">
        <div
          className="h-full bg-black origin-left scale-x-0 progress-bar"
          ref={(el) => {
            if (el && sliderRef.current && isDesktop) {
              gsap.to(el, {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: sliderRef.current,
                  scrub: 1,
                  start: "top top",
                  end: () => `+=${sliderRef.current?.scrollWidth}`,
                },
              });
            }
          }}
        />
      </div>

      <main
        ref={musicPlayerContainerRef}
        className={`fixed ${isDesktop ? `top-5` : `top-17`} right-3 z-[999]`}
      >
        <MusicPlayer isPlaying={isPlaying} onTogglePlay={setIsPlaying} />
      </main>
    </div>
  );
};

export default dynamic(() => Promise.resolve(App), { ssr: false });
