"use client";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignUpButton,
} from "@clerk/nextjs";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import HeaderMenu from "./header-menu";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface Notification {
  id: number;
  type: string | null;
  title: string | null;
  message: string | null;
  isRead: boolean | null;
  createdAt: Date | null;
  project?: {
    id: number;
    name: string | null;
  } | null;
  feedback?: {
    id: number;
    userName: string | null;
    rating: number | null;
  } | null;
}

interface PageHeaderProps {
  notifications?: Notification[];
  unreadCount?: number;
}

const PageHeader = ({
  notifications = [],
  unreadCount = 0,
}: PageHeaderProps) => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <header className="w-full justify-between sticky inset-x-0 top-0 z-30 transition-all">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-xl border-b border-white/5" />

      {/* Animated gradient line at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent)",
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="w-full max-w-screen-xl px-2.5 lg:px-20 relative mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Animated Logo */}
          <Link
            href="/"
            className="relative group"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <motion.div
              className="relative flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Logo glow effect */}
              <motion.div
                className="absolute -inset-2 bg-primary/20 rounded-full blur-xl"
                animate={{
                  opacity: isLogoHovered ? 0.6 : 0.2,
                  scale: isLogoHovered ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Logo image */}
              <motion.div
                className="relative w-[110px] h-[90px] flex items-center justify-center"
                animate={{
                  y: isLogoHovered ? -2 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/image.svg"
                  alt="FeedX Logo"
                  width={100}
                  height={90}
                  className="object-contain h-14 dark:invert transition-all duration-300"
                  priority
                />
              </motion.div>
            </motion.div>
          </Link>

          {/* Right side buttons */}
          <div className="flex items-center gap-4 md:gap-6">
            <SignedOut>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <SignInButton>
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground transition-colors relative group"
                  >
                    <span>Sign In</span>
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-primary rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </SignInButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SignUpButton>
                  <Button className="relative overflow-hidden bg-primary text-primary-foreground font-semibold rounded-full px-6 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 group">
                    {/* Button shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-200%", "200%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 1,
                      }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </SignUpButton>
              </motion.div>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-3 md:gap-4">
                {/* Theme Toggle */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ThemeToggleButton />
                </motion.div>

                {/* Header Menu (Notifications, etc.) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <HeaderMenu
                    notifications={notifications}
                    unreadCount={unreadCount}
                  />
                </motion.div>

                {/* User Button with glow effect */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="absolute -inset-1 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-9 h-9 ring-2 ring-primary/20 hover:ring-primary/40 transition-all",
                      },
                    }}
                  />
                </motion.div>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Floating particles (subtle) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${20 + i * 30}%`,
              top: "50%",
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </header>
  );
};

export default PageHeader;
