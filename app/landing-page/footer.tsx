"use client";

import { Github, Heart, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GradientText } from "@/components/ui/animated-text";

const Footer = () => {
  return (
    <footer className="relative border-t border-border mt-20 bg-background/80 backdrop-blur-md overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <GradientText
                colors={["#c4f820", "#10b981", "#3b82f6", "#c4f820"]}
                animationDuration={4}
                className="text-3xl font-bold tracking-tighter"
              >
                FeedX
              </GradientText>
              <motion.div
                className="absolute -inset-2 bg-primary/10 rounded-lg blur-lg -z-10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
            <p className="text-sm text-muted-foreground mt-3 max-w-xs">
              Collect feedback, build better products.
            </p>
          </motion.div>

          {/* GitHub Link */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="https://github.com/SjxSubham/saas-feedx"
                className="group relative flex items-center gap-3 px-6 py-3 rounded-full bg-background border border-border overflow-hidden"
              >
                {/* Animated border on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(90deg, hsl(var(--primary) / 0.1), hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.1))",
                  }}
                />

                {/* Shimmer effect */}
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                <motion.div
                  className="relative bg-foreground text-background p-1.5 rounded-full"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Github className="w-4 h-4" />
                </motion.div>
                <span className="relative font-semibold text-sm group-hover:text-primary transition-colors">
                  Star on GitHub
                </span>
                <ArrowUpRight className="relative w-4 h-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="flex items-center gap-2 text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span>© 2024 FeedX. Made with</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
            </motion.div>
            <span>by Sjx</span>
          </motion.div>
        </div>

        {/* Bottom decorative line */}
        <motion.div
          className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        {/* Floating dots decoration */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary/30"
              animate={{
                y: [0, -5, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
