"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { LogIn, Github, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FloatingElements,
  InteractiveOrb,
  MorphingShape,
} from "@/components/ui/floating-elements";
import { GradientText } from "@/components/ui/animated-text";

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
    rotateX.set(y * -15);
    rotateY.set(x * 15);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden px-6">
      {/* Background morphing shapes */}
      <MorphingShape className="top-10 left-10 opacity-50" />
      <MorphingShape className="bottom-20 right-20 opacity-40" />

      {/* Interactive orb that follows cursor */}
      {mounted && <InteractiveOrb className="top-1/3 left-1/4" />}

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/30 via-emerald-500/20 to-transparent blur-3xl"
        style={{ top: "10%", left: "5%" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-transparent blur-3xl"
        style={{ bottom: "10%", right: "10%" }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br from-amber-500/15 to-pink-500/10 blur-3xl"
        style={{ top: "50%", right: "30%" }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating feedback-related icons */}
      <FloatingElements />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <motion.div
          className="relative p-8 md:p-12 rounded-3xl max-w-xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transformStyle: "preserve-3d",
            rotateX,
            rotateY,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Glass panel background */}
          <motion.div
            className="absolute inset-0 rounded-3xl bg-background/40 backdrop-blur-2xl border border-white/10 shadow-2xl"
            style={{ transform: "translateZ(-20px)" }}
          />

          {/* Glow effect behind card */}
          <motion.div
            className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/20 via-transparent to-emerald-500/20 blur-2xl opacity-0 group-hover:opacity-100"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-transparent border border-primary/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/*<Sparkles className="w-4 h-4 text-primary" />*/}
              {/*<span className="text-sm font-medium text-primary">
                Open Source
              </span>*/}
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6 text-foreground tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Collect Feedback <br />
              <GradientText
                colors={["#c4f820", "#10b981", "#06b6d4", "#8b5cf6", "#c4f820"]}
                animationDuration={6}
              >
                Seamlessly
              </GradientText>
            </motion.h1>

            <motion.p
              className="text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Easily integrate FeedX and start collecting feedback with just a
              few clicks.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <SignedOut>
                <SignUpButton>
                  <Button
                    size="lg"
                    className="group rounded-full text-lg px-8 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </SignUpButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="group rounded-full text-lg px-8 bg-transparent border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  asChild
                >
                  <Link href="https://github.com/SjxSubham/saas-feedx/wiki">
                    <Github className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                    GitHub Docs
                  </Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Button
                  size="lg"
                  className="group rounded-full text-lg px-8 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link href="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </SignedIn>
            </motion.div>
          </div>
        </motion.div>

        {/* Right - Demo GIF with enhanced effects */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transformStyle: "preserve-3d",
            rotateX,
            rotateY,
          }}
        >
          {/* Glow ring around image */}
          <motion.div
            className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/50 via-emerald-500/50 to-blue-500/50 opacity-50 blur-sm"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Main image container */}
          <div className="relative max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-background/50 backdrop-blur-sm">
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-emerald-500/10 mix-blend-overlay z-10 pointer-events-none"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Scan line effect */}
            <motion.div
              className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
              style={{ opacity: 0.03 }}
            >
              <motion.div
                className="w-full h-1 bg-primary"
                animate={{
                  y: [0, 400, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>

            <Image
              src="/feedx.gif"
              alt="FeedX Demo"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              unoptimized
              priority
            />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/50 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/50 rounded-br-2xl pointer-events-none" />
          </div>

          {/* Floating stats badge */}
          <motion.div
            className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl bg-background/90 backdrop-blur-md border border-border shadow-xl"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-foreground">Live</span>
            </div>
          </motion.div>

          {/* Rating badge */}
          <motion.div
            className="absolute -top-4 -right-4 px-4 py-3 rounded-xl bg-background/90 backdrop-blur-md border border-border shadow-xl"
            animate={{
              y: [0, -6, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.svg
                  key={i}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                  viewBox="0 0 24 24"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </motion.svg>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
