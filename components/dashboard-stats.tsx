"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  FolderKanban,
  MessageSquare,
  Star,
  Bell,
  Pin,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface DashboardStatsProps {
  totalProjects: number;
  activeProjects: number;
  totalFeedbacks: number;
  unreadFeedbacks: number;
  pinnedFeedbacks: number;
  averageRating: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  index: number;
}

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  bgColor,
  index,
}: StatCardProps) => {
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
      className="relative group"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
    >
      {/* Animated border on hover */}
      <div className="absolute -inset-[1px] rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <motion.div
          className="absolute inset-[-200%]"
          style={{
            background:
              `conic-gradient(from 0deg, transparent, ${color.replace("text-", "rgb(var(--")}, transparent 30%)`.replace(
                "rgb(var(--",
                "hsl(var(--primary))",
              ),
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

      <Card className="relative h-full overflow-hidden border-border/50 bg-background/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/5">
        {/* Background glow */}
        <motion.div
          className={cn(
            "absolute -right-8 -top-8 w-24 h-24 rounded-full blur-2xl",
            bgColor,
          )}
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.6 : 0.3,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Spotlight effect */}
        <motion.div
          className="absolute w-20 h-20 rounded-full bg-primary/10 blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            x: useSpring(mouseX.get() * 80, springConfig),
            y: useSpring(mouseY.get() * 80, springConfig),
          }}
        />

        <CardHeader className="relative flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {title}
          </CardTitle>
          <motion.div
            className={cn(
              "p-2.5 rounded-xl transition-colors duration-300",
              bgColor,
            )}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? [0, -10, 10, 0] : 0,
            }}
            transition={{
              scale: { duration: 0.2 },
              rotate: { duration: 0.5 },
            }}
          >
            <Icon className={cn("h-4 w-4", color)} />
          </motion.div>
        </CardHeader>

        <CardContent className="relative">
          <motion.div
            className="text-2xl font-bold"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {value}
          </motion.div>
          <p className="text-xs text-muted-foreground mt-1 group-hover:text-muted-foreground/80 transition-colors">
            {subtitle}
          </p>

          {/* Animated underline */}
          <motion.div
            className={cn(
              "absolute bottom-0 left-0 h-0.5 rounded-full",
              bgColor.replace("/10", ""),
            )}
            initial={{ width: 0 }}
            animate={{
              width: isHovered ? "100%" : "0%",
            }}
            transition={{ duration: 0.3 }}
          />
        </CardContent>

        {/* Corner accents */}
        <motion.div
          className="absolute top-1 right-1 w-6 h-6 border-t border-r border-primary/20 rounded-tr-lg opacity-0 group-hover:opacity-100"
          animate={{
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="absolute bottom-1 left-1 w-6 h-6 border-b border-l border-primary/20 rounded-bl-lg opacity-0 group-hover:opacity-100"
          animate={{
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
        />
      </Card>
    </motion.div>
  );
};

export default function DashboardStats({
  totalProjects,
  activeProjects,
  totalFeedbacks,
  unreadFeedbacks,
  pinnedFeedbacks,
  averageRating,
}: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Projects",
      value: totalProjects,
      subtitle: `${activeProjects} active`,
      icon: FolderKanban,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Feedbacks",
      value: totalFeedbacks,
      subtitle: `${unreadFeedbacks} unread`,
      icon: MessageSquare,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Average Rating",
      value: averageRating,
      subtitle: "out of 5 stars",
      icon: Star,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Unread",
      value: unreadFeedbacks,
      subtitle: "need attention",
      icon: Bell,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      title: "Pinned",
      value: pinnedFeedbacks,
      subtitle: "important feedbacks",
      icon: Pin,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Response Rate",
      value:
        totalFeedbacks > 0
          ? `${Math.round(((totalFeedbacks - unreadFeedbacks) / totalFeedbacks) * 100)}%`
          : "N/A",
      subtitle: "feedbacks reviewed",
      icon: TrendingUp,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
  ];

  return (
    <div className="relative mb-8">
      {/* Section glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} index={index} />
        ))}
      </div>
    </div>
  );
}
