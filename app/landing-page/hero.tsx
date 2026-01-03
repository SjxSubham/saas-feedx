"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Link from "next/link";
import { LogIn, Github } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Hero = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    setRotateX(y * -10);
    setRotateY(x * 15);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6">
      <motion.div
        className="w-40 h-80 -rotate-90 z-0 absolute rounded-full top-20 left-20 bg-gradient-to-br from-primary/20 to-purple-500/20 blur-3xl"
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="w-60 h-60 rotate-45 z-0 absolute rounded-full bottom-20 right-20 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 blur-3xl"
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.2, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        {/* Left Content */}
        <motion.div
          className="p-8 md:p-12 rounded-3xl border border-white/10 bg-background/30 backdrop-blur-lg shadow-2xl max-w-xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setRotateX(0);
            setRotateY(0);
          }}
          style={{
            transformStyle: "preserve-3d",
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-foreground tracking-tight glow-text">
            Collect Feedback <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
              Seamlessly
            </span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Easily integrate FeedX and start collecting feedback with just a few clicks. Open source and developer friendly.
          </p>
          <div className="flex flex-wrap gap-4">
            <SignedOut>
              <SignUpButton>
                <Button size="lg" className="rounded-full text-lg px-8 shadow-lg shadow-primary/20">
                  <LogIn className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
              </SignUpButton>
              <Button size="lg" variant="outline" className="rounded-full text-lg px-8 bg-transparent border-primary/20 hover:bg-primary/10" asChild>
                <Link href="https://github.com/SjxSubham/saas-feedx/wiki">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub Docs
                </Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button size="lg" className="rounded-full text-lg px-8 shadow-lg shadow-primary/20" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </SignedIn>
          </div>

        </motion.div>

        {/* Right GIF */}
        <motion.div
          className="relative max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setRotateX(0);
            setRotateY(0);
          }}
          style={{
            transformStyle: "preserve-3d",
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 pointer-events-none" />
          <Image
            src={"/feedx.gif"}
            alt="Demo"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            unoptimized
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
