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
    <section className="grow">
      <div className="container mx-auto px-4 mb-24 mt-4 flex flex-col md:flex-row justify-center">
        
        <motion.div
          className="flex flex-col max-w-sm justify-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setRotateX(0);
            setRotateY(0);
          }}
          style={{
            transformStyle: "preserve-3d",
            transform: `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <div className="bg-white/20 shadow-lg p-6 rounded-3xl mt-6 relative mb-8">
            <h1 className="mb-5 text-5xl font-extrabold leading-tight">
              Collect your feedback seamlessly
            </h1>
            <p className="text-gray-500 text-lg">
              Easily integrate FeedX and start collecting feedback today.
            </p>
          </div>
          
          <div>
            <SignedOut>
              <SignUpButton>
                <div className="flex gap-3">
                  <Button className="shadow-sm hover:shadow-gray-500">
                    <LogIn className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                  <Button variant="secondary" asChild>
                    <Link href="https://github.com/SjxSubham/saas-feedx/wiki">
                      <Github className="w-4 h-4 mr-2" />
                      Star on GitHub
                    </Link>
                  </Button>
                </div>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button className="shadow-lg hover:shadow-gray-500" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </SignedIn>
          </div>
        </motion.div>

        {/* Right Section (GIF) */}
        <motion.div
          className="flex-1 max-w-md hover:shadow-emerald-200 shadow-md"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setRotateX(0);
            setRotateY(0);
          }}
          style={{
            transformStyle: "preserve-3d",
            transform: `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image
            src={"/feedx.gif"}
            alt="demo"
            layout={"responsive"}
            width={155}
            height={155}
            unoptimized={true}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
