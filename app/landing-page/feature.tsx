"use client";
import { motion } from "framer-motion";
import { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureProps {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}

const Feature = ({ title, description, icon, className }: FeatureProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    setRotateX(y * -10);
    setRotateY(x * 10);
  };

  return (
    <motion.div
      className={cn("glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-colors", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setRotateX(0);
        setRotateY(0);
      }}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.2s ease-out",
      }}
    >
      <div
        className="absolute -right-10 -top-10 w-32 h-32 bg-primary/20 blur-[60px] rounded-full group-hover:bg-primary/30 transition-all duration-500"
      />

      <div className="relative z-10">
        {icon && (
          <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary border border-border text-primary group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        )}
        <h4 className="mb-3 text-xl font-bold text-foreground group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default Feature;
