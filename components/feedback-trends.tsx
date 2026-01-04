"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react";
import { FeedbackTrendData } from "@/lib/feedback-utils";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface FeedbackTrendsProps {
  data: FeedbackTrendData[];
  title?: string;
  showRatingTrend?: boolean;
  period?: "7days" | "30days" | "90days";
}

export default function FeedbackTrends({
  data,
  title = "Feedback Trends",
  showRatingTrend = true,
  period = "7days",
}: FeedbackTrendsProps) {
  // Calculate trend percentage
  const trendInfo = useMemo(() => {
    if (data.length < 2) {
      return { percentage: 0, direction: "neutral" as const };
    }

    const midpoint = Math.floor(data.length / 2);
    const firstHalf = data.slice(0, midpoint);
    const secondHalf = data.slice(midpoint);

    const firstHalfTotal = firstHalf.reduce((sum, d) => sum + d.count, 0);
    const secondHalfTotal = secondHalf.reduce((sum, d) => sum + d.count, 0);

    if (firstHalfTotal === 0) {
      return {
        percentage: secondHalfTotal > 0 ? 100 : 0,
        direction: secondHalfTotal > 0 ? ("up" as const) : ("neutral" as const),
      };
    }

    const percentage = Math.round(
      ((secondHalfTotal - firstHalfTotal) / firstHalfTotal) * 100,
    );

    return {
      percentage: Math.abs(percentage),
      direction:
        percentage > 0
          ? ("up" as const)
          : percentage < 0
            ? ("down" as const)
            : ("neutral" as const),
    };
  }, [data]);

  // Total feedbacks in period
  const totalFeedbacks = useMemo(() => {
    return data.reduce((sum, d) => sum + d.count, 0);
  }, [data]);

  // Average rating in period
  const averageRating = useMemo(() => {
    const ratedData = data.filter((d) => d.averageRating !== undefined);
    if (ratedData.length === 0) return null;
    const sum = ratedData.reduce((acc, d) => acc + (d.averageRating || 0), 0);
    return (sum / ratedData.length).toFixed(1);
  }, [data]);

  // Format date labels
  const labels = useMemo(() => {
    return data.map((d) => {
      const date = new Date(d.date);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    });
  }, [data]);

  // Chart data for feedback count
  const feedbackChartData = {
    labels,
    datasets: [
      {
        label: "Feedbacks",
        data: data.map((d) => d.count),
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderColor: "rgba(59, 130, 246, 0.8)",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Chart data for rating trend
  const ratingChartData = {
    labels,
    datasets: [
      {
        label: "Average Rating",
        data: data.map((d) => d.averageRating || 0),
        backgroundColor: "rgba(234, 179, 8, 0.7)",
        borderColor: "rgba(234, 179, 8, 1)",
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  // Chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: { parsed: { y: number } }) => {
            return `${context.parsed.y} feedback${context.parsed.y !== 1 ? "s" : ""}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(156, 163, 175, 1)",
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(156, 163, 175, 0.1)",
        },
        ticks: {
          color: "rgba(156, 163, 175, 1)",
          font: {
            size: 11,
          },
          stepSize: 1,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: { parsed: { y: number } }) => {
            return `Rating: ${context.parsed.y.toFixed(1)} / 5`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(156, 163, 175, 1)",
          font: {
            size: 11,
          },
        },
      },
      y: {
        min: 0,
        max: 5,
        grid: {
          color: "rgba(156, 163, 175, 0.1)",
        },
        ticks: {
          color: "rgba(156, 163, 175, 1)",
          font: {
            size: 11,
          },
          stepSize: 1,
        },
      },
    },
  };

  const periodLabel = {
    "7days": "Last 7 days",
    "30days": "Last 30 days",
    "90days": "Last 90 days",
  };

  const getTrendIcon = () => {
    switch (trendInfo.direction) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = () => {
    switch (trendInfo.direction) {
      case "up":
        return "text-green-500";
      case "down":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Feedbacks */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{totalFeedbacks}</p>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {periodLabel[period]}
            </p>
          </CardContent>
        </Card>

        {/* Trend */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Trend</p>
                <div className="flex items-center gap-1">
                  <p className={`text-2xl font-bold ${getTrendColor()}`}>
                    {trendInfo.percentage}%
                  </p>
                  {getTrendIcon()}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              vs. previous period
            </p>
          </CardContent>
        </Card>

        {/* Average Rating */}
        {averageRating && (
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold">{averageRating}</p>
                </div>
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <span className="text-yellow-500 text-lg">★</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">out of 5</p>
            </CardContent>
          </Card>
        )}

        {/* Daily Average */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Daily Avg</p>
                <p className="text-2xl font-bold">
                  {data.length > 0
                    ? (totalFeedbacks / data.length).toFixed(1)
                    : "0"}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              feedbacks per day
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div
        className={`grid gap-4 ${showRatingTrend ? "md:grid-cols-2" : "grid-cols-1"}`}
      >
        {/* Feedback Count Trend */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              {data.length > 0 ? (
                <Line data={feedbackChartData} options={lineChartOptions} />
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <p>No feedback data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Rating Trend */}
        {showRatingTrend && (
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <span className="text-yellow-500">★</span>
                Rating Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                {data.length > 0 ? (
                  <Bar data={ratingChartData} options={barChartOptions} />
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <p>No rating data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  );
}
