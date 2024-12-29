import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface SequentialAnimationProps {
  svgs: string[]; // Array of SVG paths
  className?: string;
}

const SequentialAnimation: React.FC<SequentialAnimationProps> = ({ svgs, className }) => {
  return (
    <div className="relative h-full w-full flex justify-start items-start">
      {svgs.map((svg, index) => (
        <Image
          key={index}
          src={svg}
          alt={`SVG ${index + 1}`}
          className={cn(
            " absolute opacity-0 transform scale-100 animate-fadeInStack w-full",
            className
          )}
          style={{ animationDelay: `${index * 1.5}s` }} // Delay each image by 1.5 seconds
          width={100}
          height={100}
        />
      ))}
    </div>
  );
};

export default SequentialAnimation;
