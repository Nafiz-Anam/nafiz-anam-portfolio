"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export function TextHoverEffect({
  text,
  duration = 0,
}: {
  text: string;
  duration?: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const cx = ((cursor.x - rect.left) / rect.width) * 100;
    const cy = ((cursor.y - rect.top) / rect.height) * 100;
    setMaskPosition({ cx: `${cx}%`, cy: `${cy}%` });
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 500 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none cursor-default"
      style={{ mixBlendMode: "difference" }}
    >
      <defs>
        <linearGradient id="naTextGradient" gradientUnits="userSpaceOnUse">
          {hovered && (
            <>
              <stop offset="0%"   stopColor="hsl(13,79%,57%)" />
              <stop offset="33%"  stopColor="hsl(40,95%,60%)" />
              <stop offset="66%"  stopColor="hsl(13,79%,57%)" />
              <stop offset="100%" stopColor="hsl(0,72%,65%)" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="naRevealMask"
          gradientUnits="userSpaceOnUse"
          r="22%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration, ease: "easeOut" }}
        >
          <stop offset="0%"   stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="naTextMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#naRevealMask)" />
        </mask>
      </defs>

      {/* Always-visible base stroke */}
      <text
        x="50%" y="55%" textAnchor="middle" dominantBaseline="middle"
        fontSize="85" fontWeight="700" fontFamily="var(--font-sans, sans-serif)"
        strokeWidth="1"
        fill="transparent"
        style={{ stroke: "rgba(255,255,255,0.08)" }}
      >
        {text}
      </text>

      {/* Draw-on stroke animation — plays once on mount */}
      <motion.text
        x="50%" y="55%" textAnchor="middle" dominantBaseline="middle"
        fontSize="85" fontWeight="700" fontFamily="var(--font-sans, sans-serif)"
        strokeWidth="1"
        fill="transparent"
        style={{ stroke: "rgba(255,255,255,0.15)" }}
        initial={{ strokeDashoffset: 8000, strokeDasharray: 8000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 8000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>

      {/* Hover gradient reveal */}
      <text
        x="50%" y="55%" textAnchor="middle" dominantBaseline="middle"
        fontSize="85" fontWeight="700" fontFamily="var(--font-sans, sans-serif)"
        stroke="url(#naTextGradient)"
        strokeWidth="1"
        mask="url(#naTextMask)"
        fill="transparent"
      >
        {text}
      </text>
    </svg>
  );
}
