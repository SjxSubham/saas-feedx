"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  MessageSquare,
  Star,
  Pin,
  Archive,
  Trash2,
  Edit,
  Eye,
  Send,
  RefreshCw,
  Clock,
  Filter,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "@/lib/utils";

interface ActivityItem {
  id: number;
  projectId: number | null;
  userId: string | null;
  action: string | null;
  description: string | null;
  metadata: string | null;
  createdAt: Date | null;
  project?: {
    id: number;
    name: string | null;
  } | null;
}

interface ActivityLogProps {
  activities: ActivityItem[];
  showProjectName?: boolean;
  maxItems?: number;
  title?: string;
  emptyMessage?: string;
  onRefresh?: () => void;
  isLoading?: boolean;
}

const actionIcons: Record<string, React.ReactNode> = {
  feedback_received: <MessageSquare className="h-4 w-4 text-blue-500" />,
  project_updated: <Edit className="h-4 w-4 text-yellow-500" />,
  project_created: <Activity className="h-4 w-4 text-green-500" />,
  project_deleted: <Trash2 className="h-4 w-4 text-red-500" />,
  project_status_changed: <RefreshCw className="h-4 w-4 text-purple-500" />,
  feedback_pinned: <Pin className="h-4 w-4 text-purple-500" />,
  feedback_unpinned: <Pin className="h-4 w-4 text-gray-500" />,
  feedback_archived: <Archive className="h-4 w-4 text-yellow-500" />,
  feedback_unarchived: <Archive className="h-4 w-4 text-gray-500" />,
  feedback_deleted: <Trash2 className="h-4 w-4 text-red-500" />,
  feedback_replied: <Send className="h-4 w-4 text-green-500" />,
  feedback_read: <Eye className="h-4 w-4 text-blue-500" />,
  high_rating: <Star className="h-4 w-4 text-yellow-500" />,
  low_rating: <Star className="h-4 w-4 text-red-500" />,
};

const actionLabels: Record<string, string> = {
  feedback_received: "New Feedback",
  project_updated: "Project Updated",
  project_created: "Project Created",
  project_deleted: "Project Deleted",
  project_status_changed: "Status Changed",
  feedback_pinned: "Feedback Pinned",
  feedback_unpinned: "Feedback Unpinned",
  feedback_archived: "Feedback Archived",
  feedback_unarchived: "Feedback Restored",
  feedback_deleted: "Feedback Deleted",
  feedback_replied: "Reply Sent",
  feedback_read: "Marked as Read",
  high_rating: "High Rating",
  low_rating: "Low Rating",
};

const actionColors: Record<string, string> = {
  feedback_received: "border-l-blue-500",
  project_updated: "border-l-yellow-500",
  project_created: "border-l-green-500",
  project_deleted: "border-l-red-500",
  project_status_changed: "border-l-purple-500",
  feedback_pinned: "border-l-purple-500",
  feedback_unpinned: "border-l-gray-400",
  feedback_archived: "border-l-yellow-500",
  feedback_unarchived: "border-l-gray-400",
  feedback_deleted: "border-l-red-500",
  feedback_replied: "border-l-green-500",
  feedback_read: "border-l-blue-500",
  high_rating: "border-l-yellow-500",
  low_rating: "border-l-red-500",
};

export default function ActivityLog({
  activities,
  showProjectName = false,
  maxItems,
  title = "Activity Log",
  emptyMessage = "No activities yet",
  onRefresh,
  isLoading = false,
}: ActivityLogProps) {
  const [filteredActivities, setFilteredActivities] =
    useState<ActivityItem[]>(activities);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  // Update filtered activities when activities prop changes
  useEffect(() => {
    if (selectedActions.length === 0) {
      setFilteredActivities(activities);
    } else {
      setFilteredActivities(
        activities.filter((a) => selectedActions.includes(a.action || "")),
      );
    }
  }, [activities, selectedActions]);

  // Get unique action types from activities
  const actionTypeSet = new Set(
    activities.map((a) => a.action).filter(Boolean),
  );
  const actionTypes = Array.from(actionTypeSet) as string[];

  const handleActionFilter = (action: string, checked: boolean) => {
    if (checked) {
      setSelectedActions((prev) => [...prev, action]);
    } else {
      setSelectedActions((prev) => prev.filter((a) => a !== action));
    }
  };

  const displayedActivities =
    maxItems && !showAll
      ? filteredActivities.slice(0, maxItems)
      : filteredActivities;

  const hasMoreActivities = maxItems && filteredActivities.length > maxItems;

  const getActivityIcon = (action: string | null) => {
    if (!action) return <Activity className="h-4 w-4 text-gray-500" />;
    return (
      actionIcons[action] || <Activity className="h-4 w-4 text-gray-500" />
    );
  };

  const getActivityLabel = (action: string | null) => {
    if (!action) return "Activity";
    return actionLabels[action] || action.replace(/_/g, " ");
  };

  const getActivityColor = (action: string | null) => {
    if (!action) return "border-l-gray-400";
    return actionColors[action] || "border-l-gray-400";
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {/* Filter Dropdown */}
            {actionTypes.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 h-8">
                    <Filter className="h-3 w-3" />
                    Filter
                    {selectedActions.length > 0 && (
                      <span className="ml-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {selectedActions.length}
                      </span>
                    )}
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {actionTypes.map((action) => (
                    <DropdownMenuCheckboxItem
                      key={action}
                      checked={selectedActions.includes(action)}
                      onCheckedChange={(checked) =>
                        handleActionFilter(action, checked)
                      }
                    >
                      <span className="flex items-center gap-2">
                        {getActivityIcon(action)}
                        {getActivityLabel(action)}
                      </span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Refresh Button */}
            {onRefresh && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onRefresh}
                disabled={isLoading}
              >
                <RefreshCw
                  className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {displayedActivities.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <Activity className="h-10 w-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm">{emptyMessage}</p>
          </div>
        ) : (
          <div className="space-y-1">
            <AnimatePresence mode="popLayout">
              {displayedActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-start gap-3 p-3 rounded-lg border-l-2 bg-muted/30 hover:bg-muted/50 transition-colors ${getActivityColor(activity.action)}`}
                >
                  {/* Icon */}
                  <div className="mt-0.5 flex-shrink-0">
                    {getActivityIcon(activity.action)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {getActivityLabel(activity.action)}
                      </span>
                      {showProjectName && activity.project && (
                        <span className="text-xs text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">
                          {activity.project.name}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {activity.createdAt
                        ? formatDistanceToNow(new Date(activity.createdAt))
                        : "Just now"}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Show More / Show Less Button */}
            {hasMoreActivities && (
              <div className="pt-3 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAll(!showAll)}
                  className="text-primary"
                >
                  {showAll
                    ? "Show less"
                    : `Show ${filteredActivities.length - maxItems} more`}
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Compact version for sidebar or smaller spaces
export function ActivityLogCompact({
  activities,
  maxItems = 5,
}: {
  activities: ActivityItem[];
  maxItems?: number;
}) {
  const displayedActivities = activities.slice(0, maxItems);

  return (
    <div className="space-y-2">
      {displayedActivities.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No recent activity
        </p>
      ) : (
        displayedActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted/50 transition-colors"
          >
            <span className="flex-shrink-0">
              {actionIcons[activity.action || ""] || (
                <Activity className="h-4 w-4 text-gray-500" />
              )}
            </span>
            <span className="flex-1 truncate text-muted-foreground">
              {activity.description}
            </span>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {activity.createdAt
                ? formatDistanceToNow(new Date(activity.createdAt))
                : "now"}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
