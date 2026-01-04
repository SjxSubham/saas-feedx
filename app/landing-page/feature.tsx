"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface FeatureProps {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}

const Feature = ({ title, description, icon, className }: FeatureProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
    rotateX.set(y * -10);
    rotateY.set(x * 10);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("relative group", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
    >
      {/* Spinning gradient border */}
      <div className="absolute -inset-[1px] rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <motion.div
          className="absolute inset-[-200%]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, hsl(var(--primary)), hsl(78 100% 50% / 0.8), transparent 30%)",
          }}
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Card content */}
      <div className="relative p-8 rounded-2xl bg-background/80 backdrop-blur-xl border border-border group-hover:border-transparent transition-colors overflow-hidden">
        {/* Background glow */}
        <motion.div
          className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 blur-[80px] rounded-full"
          animate={{
            scale: isHovered ? 1.3 : 1,
            opacity: isHovered ? 0.4 : 0.15,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Spotlight effect following mouse */}
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            x: useSpring(mouseX.get() * 100, springConfig),
            y: useSpring(mouseY.get() * 100, springConfig),
          }}
        />

        {/* Shimmer line effect */}
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none"
          initial={false}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full"
            animate={{
              translateX: isHovered ? "200%" : "-100%",
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <div className="relative z-10">
          {icon && (
            <motion.div
              className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 text-primary"
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? [0, -5, 5, 0] : 0,
              }}
              transition={{
                scale: { duration: 0.3 },
                rotate: { duration: 0.5 },
              }}
            >
              {icon}
            </motion.div>
          )}

          <motion.h4
            className="mb-3 text-xl font-bold text-foreground"
            animate={{
              color: isHovered
                ? "hsl(var(--primary))"
                : "hsl(var(--foreground))",
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h4>

          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>

        {/* Corner decorations */}
        <motion.div
          className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-xl opacity-0 group-hover:opacity-100"
          initial={false}
          animate={{
            scale: isHovered ? 1 : 0.8,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-xl opacity-0 group-hover:opacity-100"
          initial={false}
          animate={{
            scale: isHovered ? 1 : 0.8,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default Feature;
