
import React from "react";

interface FontProps {
  title: string;
  className?: string;
}

const FontGreatVibes: React.FC<FontProps> = ({ title, className = "" }) => {
  return (
    <span
      className={`block ${className}`}
      style={{ fontFamily: "'Great Vibes', cursive" }}
    >
      {title}
    </span>
  );
};

export default FontGreatVibes;
