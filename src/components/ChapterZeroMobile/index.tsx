import React from "react";

import { ChapterZeroData } from "@/types";
import FontQuintessential from "../FontQuintessential";

interface ChapterZeroMobileProps {
  data: ChapterZeroData;
}

const ChapterZeroMobile: React.FC<ChapterZeroMobileProps> = ({ data }) => {
  return (
    <section className="w-full h-full flex flex-col items-center py-12 relative bg-transparent">
      {/* Top Label */}
      <main className="text-center mt-7">
        <div className="text-[12px] font-sans text-black tracking-wide">
          Chapter Zero
        </div>
      </main>

      {/* Main Content */}
      <main className="flex flex-col items-center text-center justify-center w-full z-10 mt-7">
        {/* Subtitle */}
        <h2 className="font-sans text-[10px] uppercase tracking-[0.15em] mb-2 text-black">
          The Prologue
        </h2>

        {/* Main Image */}
        <div className="relative font-serif text-2xl leading-[0.8] text-black flex flex-col items-center w-full">
          <div className="w-full flex flex-row justify-center items-start text-[40px] mt-2 gap-1">
            <div className="relative w-[86%] h-[90%] overflow-hidden rounded-[2px] group">
              <img
                src={data.imageZero}
                alt="Intro"
                className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[3000ms] ease-in-out"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <div className="text-center space-y-4 mt-8 px-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <FontQuintessential
            title={data.names.groom}
            className="text-[26px] leading-tight"
          />
          <p className="font-serif italic text-gray-300 text-lg">&</p>
          <FontQuintessential
            title={data.names.bride}
            className="text-[26px] leading-tight"
          />
        </div>
        <div className="flex flex-col items-center gap-2 pt-2">
          <div className="w-[1px] h-4 bg-gray-200"></div>
          <p className="font-serif italic text-[10px] text-gray-400 tracking-wider">
            Est. 2025 — Our Story
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChapterZeroMobile;
