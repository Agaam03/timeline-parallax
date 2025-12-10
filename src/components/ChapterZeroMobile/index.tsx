import FontQuintessential from "./FontQuintessential";

const ChapterZeroMobile = () => {
  return (
    <section className="w-full h-full  flex flex-col items-center py-12 relative      ">
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
            {/* Container Utama dengan Shadow Halus */}
            <div className="relative w-[86%] h-[90%] overflow-hidden rounded-[2px]   group">
              <img
                src="/chapter-0/0.jpg"
                alt="Intro"
                className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-3000 ease-in-out"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <div className="text-center space-y-2 mt-5">
        <div className="flex flex-row items-center justify-center gap-4 text-">
          <FontQuintessential title="Ciputra Frida Pratama" />
          <p className="italicew">&</p>
          <FontQuintessential title="Aimmatur Nur Azizah" />
        </div>
        <p className="font-serif italic text-[10px] text-gray-400">
          Est. 2025 — Our Story
        </p>
      </div>
    </section>
  );
};

export default ChapterZeroMobile;
