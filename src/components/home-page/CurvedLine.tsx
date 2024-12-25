export function CurvedLine() {
  return (
    <div className="absolute left-0 bottom-0 w-full h-full overflow-hidden pointer-events-none">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 800"
        preserveAspectRatio="none"
        className="absolute left-0 bottom-0 w-full h-full"
      >
        <path
          d="M0,800 Q400,600 1000,400"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="4"
          className="opacity-50"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
