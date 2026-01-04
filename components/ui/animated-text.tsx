"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export const AnimatedText = ({
  children,
  className,
  delay = 0,
}: AnimatedTextProps) => {
  const letters = children.split("");

  return (
    <span className={cn("inline-flex overflow-hidden", className)}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.33, 1, 0.68, 1],
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
};

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationDuration?: number;
}

export const GradientText = ({
  children,
  className,
  colors = ["#c4f820", "#10b981", "#3b82f6", "#8b5cf6", "#c4f820"],
  animationDuration = 5,
}: GradientTextProps) => {
  return (
    <motion.span
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
        backgroundSize: "300% 100%",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: animationDuration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
};

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export const TypewriterText = ({
  text,
  className,
  delay = 0,
  speed = 50,
}: TypewriterTextProps) => {
  const letters = text.split("");

  return (
    <span className={cn("inline-block", className)}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.01,
            delay: delay + i * (speed / 1000),
          }}
        >
          {letter}
        </motion.span>
      ))}
      <motion.span
        className="inline-block w-[2px] h-[1em] bg-primary ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </span>
  );
};

interface GlitchTextProps {
  children: string;
  className?: string;
}

export const GlitchText = ({ children, className }: GlitchTextProps) => {
  return (
    <span className={cn("relative inline-block group", className)}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute top-0 left-0 text-cyan-500 opacity-0 group-hover:opacity-70"
        animate={{
          x: [0, -2, 2, -1, 0],
          y: [0, 1, -1, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        aria-hidden
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 text-red-500 opacity-0 group-hover:opacity-70"
        animate={{
          x: [0, 2, -2, 1, 0],
          y: [0, -1, 1, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        aria-hidden
      >
        {children}
      </motion.span>
    </span>
  );
};

interface ShimmerTextProps {
  children: ReactNode;
  className?: string;
}

export const ShimmerText = ({ children, className }: ShimmerTextProps) => {
  return (
    <motion.span
      className={cn(
        "relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_100%]",
        className,
      )}
      animate={{
        backgroundPosition: ["200% 0", "-200% 0"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
};

interface WavyTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export const WavyText = ({ children, className, delay = 0 }: WavyTextProps) => {
  const letters = children.split("");

  return (
    <span className={cn("inline-flex", className)}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 1.5,
            delay: delay + i * 0.05,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
};

interface FloatingLogoProps {
  className?: string;
}

export const FloatingLogo = ({ className }: FloatingLogoProps) => {
  return (
    <motion.div
      className={cn("relative inline-flex items-center gap-2", className)}
      whileHover="hover"
    >
      <motion.div
        className="relative"
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.span
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-400 to-primary bg-[length:200%_100%]"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          FeedX
        </motion.span>

        {/* Glow effect */}
        <motion.div
          className="absolute -inset-2 bg-primary/20 blur-xl rounded-full -z-10"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Orbiting dot */}
      <motion.div
        className="absolute w-2 h-2 bg-primary rounded-full"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformOrigin: "25px 50%",
        }}
      />
    </motion.div>
  );
};
