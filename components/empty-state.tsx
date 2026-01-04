"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: string | LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  actionIcon?: LucideIcon;
  onAction?: () => void;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  secondaryOnAction?: () => void;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  actionIcon: ActionIcon,
  onAction,
  secondaryActionLabel,
  secondaryActionHref,
  secondaryOnAction,
}: EmptyStateProps) {
  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === "string") {
      return <div className="text-6xl mb-4">{icon}</div>;
    }

    const IconComponent = icon;
    return (
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <IconComponent className="h-8 w-8 text-muted-foreground" />
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      {renderIcon()}

      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {actionLabel && (actionHref || onAction) && (
          <>
            {actionHref ? (
              <Button asChild>
                <Link href={actionHref}>
                  {ActionIcon && <ActionIcon className="w-4 h-4 mr-2" />}
                  {actionLabel}
                </Link>
              </Button>
            ) : (
              <Button onClick={onAction}>
                {ActionIcon && <ActionIcon className="w-4 h-4 mr-2" />}
                {actionLabel}
              </Button>
            )}
          </>
        )}

        {secondaryActionLabel && (secondaryActionHref || secondaryOnAction) && (
          <>
            {secondaryActionHref ? (
              <Button variant="outline" asChild>
                <Link href={secondaryActionHref}>{secondaryActionLabel}</Link>
              </Button>
            ) : (
              <Button variant="outline" onClick={secondaryOnAction}>
                {secondaryActionLabel}
              </Button>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

// Preset empty states for common use cases
export function NoProjectsEmptyState() {
  return (
    <EmptyState
      icon="📋"
      title="No projects yet"
      description="Create your first project to start collecting valuable feedback from your users."
      actionLabel="Create Project"
      actionHref="/dashboard"
    />
  );
}

export function NoFeedbacksEmptyState({
  projectId,
  projectName,
}: {
  projectId: string | number;
  projectName: string;
}) {
  return (
    <EmptyState
      icon="💬"
      title="No feedbacks yet"
      description="Share your feedback link or embed the widget on your site to start collecting valuable user feedback."
      actionLabel="Get Feedback Link"
      actionHref={`/projects/${projectId}/${projectName}/instructions`}
    />
  );
}

export function NoNotificationsEmptyState() {
  return (
    <EmptyState
      icon="🔔"
      title="No notifications"
      description="You're all caught up! New feedback notifications will appear here."
    />
  );
}

export function NoActivityEmptyState() {
  return (
    <EmptyState
      icon="📊"
      title="No activity yet"
      description="Activity will be recorded here as you and your users interact with this project."
    />
  );
}

export function SearchEmptyState({ query }: { query: string }) {
  return (
    <EmptyState
      icon="🔍"
      title="No results found"
      description={`We couldn't find any feedbacks matching "${query}". Try adjusting your search or filters.`}
    />
  );
}

export function ErrorEmptyState({
  title = "Something went wrong",
  description = "An error occurred while loading this content. Please try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <EmptyState
      icon="⚠️"
      title={title}
      description={description}
      actionLabel={onRetry ? "Try Again" : undefined}
      onAction={onRetry}
    />
  );
}

export function NotFoundEmptyState({
  backHref = "/dashboard",
  backLabel = "Go to Dashboard",
}: {
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <EmptyState
      icon="🔍"
      title="Not found"
      description="The resource you're looking for doesn't exist or you don't have access to it."
      actionLabel={backLabel}
      actionHref={backHref}
    />
  );
}
