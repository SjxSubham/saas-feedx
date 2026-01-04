"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Star,
  ThumbsUp,
  Heart,
  Sparkles,
  Zap,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

interface FloatingIconProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
}

export const FloatingIcon = ({
  children,
  className,
  delay = 0,
  duration = 6,
  x = 0,
  y = 0,
}: FloatingIconProps) => {
  return (
    <motion.div
      className={cn(
        "absolute p-3 rounded-2xl bg-background/80 backdrop-blur-sm border border-border shadow-lg",
        className
      )}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1, 1, 0.5],
        y: [y, y - 20, y + 10, y],
        x: [x, x + 10, x - 5, x],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

interface FloatingBadgeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const FloatingBadge = ({
  children,
  className,
  delay = 0,
}: FloatingBadgeProps) => {
  return (
    <motion.div
      className={cn(
        "absolute px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary font-medium text-sm",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        y: {
          duration: 4,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      {children}
    </motion.div>
  );
};

interface FloatingCardProps {
  rating?: number;
  className?: string;
  delay?: number;
}

export const FloatingFeedbackCard = ({
  rating = 5,
  className,
  delay = 0,
}: FloatingCardProps) => {
  return (
    <motion.div
      className={cn(
        "absolute p-4 rounded-2xl bg-background/90 backdrop-blur-md border border-border shadow-2xl min-w-[180px]",
        className
      )}
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: [-2, 2, -2],
        y: [0, -15, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        rotate: {
          duration: 6,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
        y: {
          duration: 5,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-4 h-4",
              i < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
            )}
          />
        ))}
      </div>
      <div className="h-2 w-3/4 bg-muted rounded-full mb-1.5" />
      <div className="h-2 w-1/2 bg-muted rounded-full" />
    </motion.div>
  );
};

interface FloatingStatsCardProps {
  value: string;
  trend?: "up" | "down";
  className?: string;
  delay?: number;
}

export const FloatingStatsCard = ({
  value,
  trend = "up",
  className,
  delay = 0,
}: FloatingStatsCardProps) => {
  return (
    <motion.div
      className={cn(
        "absolute p-4 rounded-2xl bg-background/90 backdrop-blur-md border border-border shadow-2xl",
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: {
          duration: 4,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <TrendingUp
          className={cn(
            "w-5 h-5",
            trend === "up" ? "text-emerald-500" : "text-red-500 rotate-180"
          )}
        />
      </div>
    </motion.div>
  );
};

export const FloatingElements = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top left area */}
      <FloatingIcon
        className="top-[15%] left-[5%] text-primary"
        delay={0}
        duration={7}
      >
        <MessageSquare className="w-5 h-5" />
      </FloatingIcon>

      {/* Top right area */}
      <FloatingIcon
        className="top-[10%] right-[10%] text-amber-500"
        delay={1.5}
        duration={8}
      >
        <Star className="w-5 h-5 fill-current" />
      </FloatingIcon>

      {/* Middle left */}
      <FloatingIcon
        className="top-[45%] left-[8%] text-emerald-500"
        delay={2}
        duration={6}
      >
        <ThumbsUp className="w-5 h-5" />
      </FloatingIcon>

      {/* Middle right */}
      <FloatingIcon
        className="top-[40%] right-[5%] text-pink-500"
        delay={0.5}
        duration={7}
      >
        <Heart className="w-5 h-5" />
      </FloatingIcon>

      {/* Bottom left */}
      <FloatingIcon
        className="bottom-[20%] left-[12%] text-purple-500"
        delay={3}
        duration={8}
      >
        <Sparkles className="w-5 h-5" />
      </FloatingIcon>

      {/* Bottom right */}
      <FloatingIcon
        className="bottom-[25%] right-[8%] text-blue-500"
        delay={1}
        duration={6}
      >
        <Zap className="w-5 h-5" />
      </FloatingIcon>

      {/* Additional floating elements */}
      <FloatingIcon
        className="top-[60%] left-[3%] text-cyan-500"
        delay={2.5}
        duration={7}
      >
        <BarChart3 className="w-5 h-5" />
      </FloatingIcon>

      {/* Floating mini cards - hidden on mobile */}
      <div className="hidden lg:block">
        <FloatingFeedbackCard
          rating={5}
          className="top-[20%] right-[15%]"
          delay={0.5}
        />
        <FloatingStatsCard
          value="+24%"
          className="bottom-[30%] left-[10%]"
          delay={1}
        />
      </div>

      {/* Floating dots */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/30"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${5 + Math.random() * 90}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

interface MorphingShapeProps {
  className?: string;
}

export const MorphingShape = ({ className }: MorphingShapeProps) => {
  return (
    <motion.div
      className={cn("absolute", className)}
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        width: 300,
        height: 300,
        background:
          "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.05))",
        filter: "blur(40px)",
      }}
    />
  );
};

export const InteractiveOrb = ({ className }: { className?: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 50,
        y: (e.clientY / window.innerHeight - 0.5) * 50,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className={cn(
        "absolute w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-emerald-500/10 blur-3xl",
        className
      )}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: "spring",
        damping: 50,
        stiffness: 100,
      }}
    />
  );
};
