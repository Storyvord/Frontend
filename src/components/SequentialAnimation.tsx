"use client";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface SequentialAnimationProps {
  svgs: string[]; // Array of image paths
  className?: string;
}

const SequentialAnimation: React.FC<SequentialAnimationProps> = ({ svgs, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1) Listen to scroll events in this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 2) Compress the range from 0..0.3
  //    So we don't need to scroll the full container for the last image
  const indexRange = useTransform(scrollYProgress, [0, 0.3], [0, svgs.length - 1]);

  // 3) We'll store the activeIndex in local state
  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(indexRange, "change", (latest) => {
    const roundedIndex = Math.round(latest);
    setActiveIndex(roundedIndex);
  });

  return (
    <div ref={containerRef} className={cn("relative w-full h-full overflow-y-auto", className)}>
      {svgs.map((svg, i) => (
        <Image
          key={i}
          src={svg}
          alt={`Sequential Image ${i + 1}`}
          className={cn(
            "absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-300",
            i === activeIndex ? "opacity-100" : "opacity-0"
          )}
          width={1000}
          height={1000}
        />
      ))}
    </div>
  );
};

export default SequentialAnimation;
