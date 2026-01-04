"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ShimmerSkeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-muted/50",
        className,
      )}
      {...props}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          translateX: ["−100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

const CardSkeleton = ({ index = 0 }: { index?: number }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-50"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), transparent)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["200% 0", "-200% 0"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative z-10 space-y-4">
        {/* Header skeleton */}
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <ShimmerSkeleton className="h-6 w-3/4" />
            <ShimmerSkeleton className="h-4 w-1/2" />
          </div>
          <ShimmerSkeleton className="h-8 w-8 rounded-full" />
        </div>

        {/* Content skeleton */}
        <div className="space-y-3 pt-2">
          <ShimmerSkeleton className="h-4 w-full" />
          <ShimmerSkeleton className="h-4 w-5/6" />
        </div>

        {/* Footer skeleton */}
        <div className="pt-4 flex gap-2">
          <ShimmerSkeleton className="h-10 flex-1 rounded-lg" />
        </div>
      </div>

      {/* Corner decorations */}
      <motion.div
        className="absolute top-2 right-2 w-8 h-8 border-t border-r border-primary/20 rounded-tr-xl"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-2 left-2 w-8 h-8 border-b border-l border-primary/20 rounded-bl-xl"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
    </motion.div>
  );
};

const StatSkeleton = ({ index = 0 }: { index?: number }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm p-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="flex items-center justify-between mb-3">
        <ShimmerSkeleton className="h-4 w-20" />
        <ShimmerSkeleton className="h-8 w-8 rounded-lg" />
      </div>
      <ShimmerSkeleton className="h-8 w-16 mb-1" />
      <ShimmerSkeleton className="h-3 w-24" />
    </motion.div>
  );
};

export default function Loading() {
  return (
    <div className="space-y-8">
      {/* Page header skeleton */}
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="space-y-2">
          <ShimmerSkeleton className="h-9 w-48" />
          <ShimmerSkeleton className="h-5 w-72" />
        </div>
        <ShimmerSkeleton className="h-10 w-28 rounded-full" />
      </motion.div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <StatSkeleton key={`stat-${i}`} index={i} />
        ))}
      </div>

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={`card-${i}`} index={i} />
        ))}
      </div>

      {/* Floating loading indicator */}
      <motion.div
        className="fixed bottom-8 right-8 flex items-center gap-3 px-4 py-3 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="flex gap-1"
          initial="start"
          animate="end"
          variants={{
            start: {},
            end: {},
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
        <span className="text-sm text-muted-foreground">Loading...</span>
      </motion.div>
    </div>
  );
}
