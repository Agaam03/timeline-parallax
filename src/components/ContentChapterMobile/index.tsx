import { ChapterData } from "@/types";
import Image from "next/image";
import React from "react";

interface ContentChapterProps {
  data: ChapterData;
  timeline?: gsap.core.Tween;
}

const ContentChapterMobile: React.FC<ContentChapterProps> = ({
  data,
  timeline,
}) => {
  return (
    <main className="flex flex-col justify-center items-center mx-auto w-full  mt-5  ">
      {/* panel 1 */}
      <section className="w-full flex flex-col min-h-screen">
        <main
          id="gambar"
          className="relative w-full h-[60vh] sm:h-[120vh] shrink-0"
        >
          <div className="absolute top-8 w-full text-center z-10 pointer-events-none">
            <h1 className="font-sans text-[8px] uppercase tracking-widest text-white drop-shadow-md">
              Image
            </h1>
            <p className="font-serif italic text-[10px] text-white drop-shadow-md">
              '{data.firstSection.bottomTitleImage}'
            </p>
          </div>

          <Image
            src={data.firstSection.imageLeft}
            alt={data.firstSection.bottomTitleImage}
            fill
            quality={100}
            className="object-cover px-5"
          />

          {/* <div className="absolute bottom-8 left-0 w-full text-center z-10 pointer-events-none">
            <h1 className="font-serif text-sm uppercase text-white drop-shadow-md">
              Indonesia
            </h1>
            <h1 className="font-serif text-4xl sm:text-6xl uppercase leading-none tracking-tighter text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
              Lamongan
            </h1>
          </div> */}
        </main>

        <main
          id="teks"
          className="px-5 py-12 flex flex-col items-center text-center justify-center mx-auto   "
        >
          <h1 className="text-gray-400 text-xs font-sans mb-6 uppercase tracking-widest">
            {data.chapter}.
          </h1>

          <p className="font-serif text-[30px] leading-[0.9]   text-black/80 tracking-tight mt-13">
            {data.firstSection.maintext}
          </p>
        </main>
      </section>

      {/* panel 2 */}
      <section className="w-full h-[80vh] relative   shrink-0 items-center justify-center flex">
        <Image
          src={data.secondSection.mainImage}
          alt={data.secondSection.bottomTitleLeftImage}
          id="gambar"
          fill
          quality={100}
          className="object-cover "
        />
        <div className="absolute bottom-4 left-6 z-10 pointer-events-none">
          <p className="font-sans text-[8px] uppercase text-gray-300 mb-1 drop-shadow-sm">
            Image
          </p>
          {/* <p className="text-white font-serif italic text-xs drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
            '{data.secondSection.bottomTitleLeftImage}'
          </p> */}
        </div>
      </section>

      {/* panel 3 */}
      <section className="w-full py-16 px-6 flex flex-col gap-12   shrink-0">
        <main id="gambar" className="w-full flex flex-col">
          <div className="w-full aspect-square relative shadow-sm  ">
            <Image
              src={data.thridSection.imageRightTop}
              alt="Detail"
              fill
              className="object-cover"
            />
          </div>

          <p className="text-[8px] uppercase text-gray-500 mt-2">Image</p>
          <p className="font-serif italic text-[10px] text-gray-800">
            '{data.thridSection.titleImageRightTop}'
          </p>
        </main>

        <main id="text" className="text-center px-2">
          <h1 className="font-serif text-[30px]   leading-[0.85] mb-6 text-black/80 tracking-tight">
            {data.thridSection.mainText}
          </h1>
          <p className="font-sans text-xs font-medium text-gray-600 mt-18">
            {data.thridSection.subMainText}
          </p>
        </main>

        <main id="gambar" className="w-full flex flex-col items-start">
          <div className="w-full aspect-square relative shadow-sm  ">
            <Image
              src={data.thridSection.imageBottomLeft}
              alt="Detail"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-[8px] uppercase text-gray-500 mt-2">Image</p>
          <p className="font-serif italic text-[10px] text-gray-800">
            '{data.thridSection.titleImageBottomLeft}'
          </p>
        </main>

        <main id="gambar" className="w-full flex flex-col">
          <div className="w-full h-[60vh] md:h-[85vh] relative shadow-sm mb-3">
            <Image
              src={data.thridSection.mainImageRight}
              alt="Main"
              fill
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-[8px] uppercase text-gray-500">Image</p>
          <p className="font-serif italic text-[10px] text-gray-800">
            '{data.thridSection.titleMainImageRight}'
          </p>
        </main>
      </section>

      {/* panel 4 */}
      <section className="w-full py-16 px-6    shrink-0">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-[30px]  leading-[0.85] tracking-tight text-black/80 text-center mb-22">
            {data.fourthSection.mainText}
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          <main id="gambar" className="w-full">
            <div className="w-full aspect-square relative  shadow-sm mb-4">
              <Image
                src={data.fourthSection.mainImageRight}
                alt="Footer"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex gap-8 items-start">
              <div className="shrink-0 w-20">
                <p className="text-[8px] uppercase text-gray-400">Image</p>
                <p className="font-serif italic text-[10px] text-gray-600 ">
                  '{data.fourthSection.titleMainImageRight}'
                </p>
              </div>
              <p className="font-serif text-[11px] leading-tight tracking-wide text-black/80">
                {data.fourthSection.descImageRight}
              </p>
            </div>
          </main>
        </div>
      </section>
    </main>
  );
};

export default ContentChapterMobile;
