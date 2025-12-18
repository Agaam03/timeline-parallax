import { Quintessential } from "next/font/google";
import React from "react";

const quintessential = Quintessential({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400"],
  style: ["normal"],
});

const FontQuintessential = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <span className={` ${quintessential.className} ${className} `}>
      {title}
    </span>
  );
};

export default FontQuintessential;
