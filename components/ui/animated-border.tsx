"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedBorderProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  borderRadius?: string;
  duration?: number;
  gradientColors?: string[];
}

export const AnimatedBorder = ({
  children,
  className,
  containerClassName,
  borderRadius = "1rem",
  duration = 3,
  gradientColors = ["#c4f820", "#10b981", "#3b82f6", "#8b5cf6", "#c4f820"],
}: AnimatedBorderProps) => {
  return (
    <div
      className={cn("relative group", containerClassName)}
      style={{ borderRadius }}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute -inset-[1px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, ${gradientColors.join(", ")})`,
          backgroundSize: "300% 100%",
          borderRadius,
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Inner content container */}
      <div
        className={cn(
          "relative bg-background rounded-[inherit]",
          className
        )}
        style={{ borderRadius }}
      >
        {children}
      </div>
    </div>
  );
};

interface GlowingBorderProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  borderRadius?: string;
}

export const GlowingBorder = ({
  children,
  className,
  glowColor = "hsl(var(--primary))",
  borderRadius = "1rem",
}: GlowingBorderProps) => {
  return (
    <div
      className={cn(
        "relative group transition-all duration-300",
        className
      )}
      style={{ borderRadius }}
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-[1px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
        style={{
          background: glowColor,
          borderRadius,
        }}
      />

      {/* Border */}
      <div
        className="absolute -inset-[1px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: glowColor,
          borderRadius,
        }}
      />

      {/* Content */}
      <div
        className="relative bg-background rounded-[inherit]"
        style={{ borderRadius }}
      >
        {children}
      </div>
    </div>
  );
};

interface SpinningBorderProps {
  children: ReactNode;
  className?: string;
  borderRadius?: string;
  duration?: number;
}

export const SpinningBorder = ({
  children,
  className,
  borderRadius = "1rem",
  duration = 4,
}: SpinningBorderProps) => {
  return (
    <div
      className={cn("relative overflow-hidden group", className)}
      style={{ borderRadius }}
    >
      {/* Spinning gradient */}
      <motion.div
        className="absolute inset-[-200%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, hsl(var(--primary)), transparent 30%)",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Inner container */}
      <div
        className="relative m-[1px] bg-background rounded-[inherit]"
        style={{
          borderRadius: `calc(${borderRadius} - 1px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

interface PulseBorderProps {
  children: ReactNode;
  className?: string;
  borderRadius?: string;
}

export const PulseBorder = ({
  children,
  className,
  borderRadius = "1rem",
}: PulseBorderProps) => {
  return (
    <div
      className={cn("relative", className)}
      style={{ borderRadius }}
    >
      {/* Pulsing rings */}
      <motion.div
        className="absolute -inset-[2px] rounded-[inherit] border border-primary/50 opacity-0 group-hover:opacity-100"
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ borderRadius }}
      />

      {/* Content */}
      <div
        className="relative bg-background border border-border rounded-[inherit] group-hover:border-primary/30 transition-colors"
        style={{ borderRadius }}
      >
        {children}
      </div>
    </div>
  );
};
