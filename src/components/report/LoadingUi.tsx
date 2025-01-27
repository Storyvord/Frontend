import React, { useEffect, useState } from "react";

const LoadingUi = ({ isPending, text = "Loading..." }: { isPending: boolean; text?: string }) => {
  const loadingMessages = [
    "Fetching best fit data, please wait.",
    "Hang tight! Gathering the latest information.",
    "Just a moment, we're almost there!",
    "This might take 30-60 seconds.",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (isPending) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isPending, loadingMessages.length]);

  if (isPending) {
    return (
      <div className="flex flex-col items-center h-screen space-y-4 transition-opacity duration-500 pt-8">
        <p className="text-xl font-poppins-bold text-gray-700">{text}</p>
        <p className="relative text-lg font-poppins-semibold text-gray-600 transition-transform transform duration-500 ease-in-out overflow-hidden">
          {loadingMessages[currentMessageIndex]}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent blur-md animate-slide"></span>
        </p>
      </div>
    );
  }
};

export default LoadingUi;
