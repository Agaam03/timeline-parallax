"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { motion, scale } from "framer-motion";
import CountUp from "../CountUp";

const SplashScreen = ({
  onFinish,
  onPlayMusic,
}: {
  onFinish: () => void;
  onPlayMusic: () => void;
}) => {
  const splashRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (isDone) {
      gsap.to(countRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.6,
        onStart: () => {
          window.scrollTo({ top: 0, behavior: "smooth" as ScrollBehavior });
        },
        onComplete: () => setShowButton(true),
      });
    }
  }, [isDone]);

  const handleReady = () => {
    onPlayMusic();
    if (splashRef.current) {
      gsap.to(splashRef.current, {
        y: "-100%",
        duration: 1.5,
        ease: "power3.inOut",
        onComplete: onFinish,
      });
    }
  };

  return (
    <section
      ref={splashRef}
      className="fixed top-0 left-0 w-full h-screen backdrop-blur-xl bg-pink-400/5 flex flex-col items-center justify-center "
    >
      {/* Progress Bar */}
      {!isDone && (
        <motion.div
          className="fixed top-0 left-0 h-[1.3px] bg-gradient-to-r from-pink-400 via-pink-400 to-red-400 z-90"
          initial={{ width: "0%", opacity: 1 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ ease: "easeOut", duration: 1.5 }}
        />
      )}

      <main className="flex flex-col items-center justify-center gap-4 w-full">
        {/* Count Up */}
        {!showButton && (
          <div ref={countRef}>
            <CountUp
              from={0}
              to={100}
              duration={1}
              className="count-up-text font-extrabold text-3xl text-pink-300"
              onEnd={() => setIsDone(true)}
            />
          </div>
        )}

        {/* Button Ready muncul setelah count selesai */}
        {showButton && (
          <motion.button
            onClick={handleReady}
            className="border-2 text-[10px] uppercase border-pink-300 font-semibold rounded-sm py-3 px-10 text-pink-300 hover:bg-pink-400/15 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileTap={{ scale: 1.2 }}
          >
            Ready
          </motion.button>
        )}
      </main>
    </section>
  );
};

export default SplashScreen;
