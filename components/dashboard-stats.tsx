"use client";

import { motion } from "framer-motion";
import {
  FolderKanban,
  MessageSquare,
  Star,
  Bell,
  Pin,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStatsProps {
  totalProjects: number;
  activeProjects: number;
  totalFeedbacks: number;
  unreadFeedbacks: number;
  pinnedFeedbacks: number;
  averageRating: string;
}

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
      value: totalFeedbacks > 0 ? `${Math.round(((totalFeedbacks - unreadFeedbacks) / totalFeedbacks) * 100)}%` : "N/A",
      subtitle: "feedbacks reviewed",
      icon: TrendingUp,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.subtitle}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
