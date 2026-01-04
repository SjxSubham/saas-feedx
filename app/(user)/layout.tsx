"use client";

import Loading from "./loading";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

const orbColors = [
  "from-primary/20 to-emerald-500/10",
  "from-blue-500/15 to-purple-500/10",
  "from-purple-500/15 to-pink-500/10",
  "from-cyan-500/15 to-blue-500/10",
];

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const generatedOrbs: Orb[] = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      size: Math.random() * 250 + 150,
      color: orbColors[i % orbColors.length],
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 3,
    }));
    setOrbs(generatedOrbs);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background orbs */}
      {mounted && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {orbs.map((orb) => (
            <motion.div
              key={orb.id}
              className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-3xl opacity-50`}
              style={{
                width: orb.size,
                height: orb.size,
                left: `${orb.x}%`,
                top: `${orb.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                x: [0, 30, -20, 15, 0],
                y: [0, -25, 20, -15, 0],
                scale: [1, 1.1, 0.95, 1.05, 1],
                opacity: [0.3, 0.5, 0.4, 0.5, 0.3],
              }}
              transition={{
                duration: orb.duration,
                delay: orb.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />

          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        </div>
      )}

      {/* Main content */}
      <motion.div
        className="container relative z-10 mx-auto max-w-7xl px-4 py-8 md:py-12 min-h-screen"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </motion.div>

      {/* Bottom fade gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-0" />
    </div>
  );
}
