"use client";
import { PricingPlan } from "./pricing-section";
import { Check, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef } from "react";

const PricingCard = ({
  title,
  price,
  description,
  features,
  isPopular,
  url,
}: PricingPlan) => {
  const router = useRouter();
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
    rotateX.set(y * -8);
    rotateY.set(x * 8);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  const onClick = () => {
    router.push(url);
  };

  return (
    <motion.div
      ref={ref}
      className="relative group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Animated gradient border for popular plan */}
      {isPopular && (
        <div className="absolute -inset-[2px] rounded-2xl overflow-hidden">
          <motion.div
            className="absolute inset-[-200%]"
            style={{
              background:
                "conic-gradient(from 0deg, #c4f820, #10b981, #3b82f6, #8b5cf6, #c4f820)",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      )}

      {/* Hover gradient border for non-popular plans */}
      {!isPopular && (
        <div className="absolute -inset-[1px] rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <motion.div
            className="absolute inset-[-200%]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, hsl(var(--primary)), transparent 30%)",
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
      )}

      {/* Card content */}
      <div
        className={cn(
          "relative rounded-2xl flex flex-col justify-between p-8 min-h-[500px] transition-all duration-300 bg-background/80 backdrop-blur-xl overflow-hidden",
          isPopular
            ? "shadow-[0_0_40px_-10px_hsl(var(--primary)/0.4)]"
            : "border border-border group-hover:border-transparent",
        )}
      >
        {/* Background glow */}
        <motion.div
          className={cn(
            "absolute -right-20 -top-20 w-60 h-60 rounded-full blur-[100px]",
            isPopular ? "bg-primary/30" : "bg-primary/10",
          )}
          animate={{
            scale: isHovered ? 1.3 : 1,
            opacity: isHovered
              ? isPopular
                ? 0.5
                : 0.3
              : isPopular
                ? 0.3
                : 0.1,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Spotlight effect */}
        <motion.div
          className="absolute w-40 h-40 rounded-full bg-primary/10 blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            x: mouseX.get() * 150,
            y: mouseY.get() * 150,
          }}
        />

        {/* Popular badge */}
        {isPopular && (
          <motion.div
            className="absolute -top-px left-1/2 -translate-x-1/2"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary blur-md opacity-50" />
              <div className="relative px-6 py-2 rounded-b-xl bg-primary text-primary-foreground text-sm font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Most Popular
              </div>
            </div>
          </motion.div>
        )}

        <div className="space-y-6 relative z-10">
          <div className={isPopular ? "pt-4" : ""}>
            <motion.h2
              className="text-2xl font-bold text-foreground"
              animate={{
                color:
                  isHovered && isPopular
                    ? "hsl(var(--primary))"
                    : "hsl(var(--foreground))",
              }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h2>
            <p className="text-muted-foreground mt-2">{description}</p>
          </div>

          <div className="flex items-baseline gap-1">
            <motion.span
              className="text-5xl font-bold text-foreground"
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              ₹{price}
            </motion.span>
            <span className="text-muted-foreground">/mo</span>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent w-full" />

          <ul className="space-y-4">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-3 text-sm"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={cn(
                    "rounded-full flex items-center justify-center w-6 h-6 shrink-0 transition-colors duration-300",
                    isPopular
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
                  )}
                  whileHover={{ scale: 1.2 }}
                >
                  <Check className="w-3.5 h-3.5" />
                </motion.div>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-8 relative z-10">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={onClick}
              variant={isPopular ? "default" : "outline"}
              className={cn(
                "w-full h-14 rounded-xl text-base font-semibold transition-all relative overflow-hidden",
                isPopular
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50"
                  : "border-border hover:border-primary/50 hover:bg-primary/5",
              )}
            >
              {/* Button shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                animate={{
                  translateX: isHovered ? "200%" : "-100%",
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              />
              <span className="relative z-10">
                {isPopular ? "Get Started" : "Choose Plan"}
              </span>
            </Button>
          </motion.div>
        </div>

        {/* Corner accents */}
        <motion.div
          className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-primary/20 rounded-tr-xl opacity-0 group-hover:opacity-100"
          animate={{
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-primary/20 rounded-bl-xl opacity-0 group-hover:opacity-100"
          animate={{
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default PricingCard;
