"use server";
import { db } from "@/db";
import { notifications, activities, projects, feedbacks } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, desc, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Get all notifications for the current user
export async function getNotifications(limit: number = 20) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const userNotifications = await db.query.notifications.findMany({
    where: eq(notifications.userId, userId),
    orderBy: [desc(notifications.createdAt)],
    limit,
    with: {
      project: true,
      feedback: true,
    },
  });

  return userNotifications;
}

// Get unread notification count
export async function getUnreadNotificationCount() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const unreadNotifications = await db.query.notifications.findMany({
    where: and(
      eq(notifications.userId, userId),
      eq(notifications.isRead, false)
    ),
  });

  return unreadNotifications.length;
}

// Mark notification as read
export async function markNotificationAsRead(notificationId: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const notification = await db.query.notifications.findFirst({
    where: and(
      eq(notifications.id, notificationId),
      eq(notifications.userId, userId)
    ),
  });

  if (!notification) {
    throw new Error("Notification not found or unauthorized");
  }

  await db
    .update(notifications)
    .set({ isRead: true })
    .where(eq(notifications.id, notificationId));

  return { success: true };
}

// Mark all notifications as read
export async function markAllNotificationsAsRead() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db
    .update(notifications)
    .set({ isRead: true })
    .where(eq(notifications.userId, userId));

  return { success: true };
}

// Delete a notification
export async function deleteNotification(notificationId: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const notification = await db.query.notifications.findFirst({
    where: and(
      eq(notifications.id, notificationId),
      eq(notifications.userId, userId)
    ),
  });

  if (!notification) {
    throw new Error("Notification not found or unauthorized");
  }

  await db.delete(notifications).where(eq(notifications.id, notificationId));

  return { success: true };
}

// Delete all notifications
export async function clearAllNotifications() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.delete(notifications).where(eq(notifications.userId, userId));

  return { success: true };
}

// Create a notification (internal use)
export async function createNotification({
  userId,
  projectId,
  feedbackId,
  type,
  title,
  message,
}: {
  userId: string;
  projectId?: number;
  feedbackId?: number;
  type: string;
  title: string;
  message: string;
}) {
  await db.insert(notifications).values({
    userId,
    projectId,
    feedbackId,
    type,
    title,
    message,
    isRead: false,
  });

  return { success: true };
}

// Get activity log for a project
export async function getProjectActivities(
  projectId: number,
  limit: number = 50
) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Verify ownership
  const project = await db.query.projects.findFirst({
    where: and(eq(projects.id, projectId), eq(projects.userId, userId)),
  });

  if (!project) {
    throw new Error("Project not found or unauthorized");
  }

  const projectActivities = await db.query.activities.findMany({
    where: eq(activities.projectId, projectId),
    orderBy: [desc(activities.createdAt)],
    limit,
  });

  return projectActivities;
}

// Get all activities for user's projects
export async function getAllUserActivities(limit: number = 50) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Get all user's projects
  const userProjects = await db.query.projects.findMany({
    where: eq(projects.userId, userId),
  });

  if (userProjects.length === 0) {
    return [];
  }

  const projectIds = userProjects.map((p) => p.id);

  const userActivities = await db.query.activities.findMany({
    where: inArray(activities.projectId, projectIds),
    orderBy: [desc(activities.createdAt)],
    limit,
    with: {
      project: true,
    },
  });

  return userActivities;
}

// Log an activity (internal use)
export async function logActivity({
  projectId,
  userId,
  action,
  description,
  metadata,
}: {
  projectId: number;
  userId: string;
  action: string;
  description: string;
  metadata?: Record<string, unknown>;
}) {
  await db.insert(activities).values({
    projectId,
    userId,
    action,
    description,
    metadata: metadata ? JSON.stringify(metadata) : undefined,
  });

  return { success: true };
}

// Get dashboard statistics
export async function getDashboardStats() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Get all user's projects with feedbacks
  const userProjects = await db.query.projects.findMany({
    where: eq(projects.userId, userId),
    with: {
      feedbacks: true,
    },
  });

  const totalProjects = userProjects.length;
  const activeProjects = userProjects.filter((p) => p.isActive).length;

  const allFeedbacks = userProjects.flatMap((p) => p.feedbacks || []);
  const totalFeedbacks = allFeedbacks.length;
  const unreadFeedbacks = allFeedbacks.filter((f) => !f.isRead).length;
  const pinnedFeedbacks = allFeedbacks.filter((f) => f.isPinned).length;

  // Calculate average rating
  const ratedFeedbacks = allFeedbacks.filter((f) => f.rating !== null);
  const averageRating =
    ratedFeedbacks.length > 0
      ? (
          ratedFeedbacks.reduce((sum, f) => sum + (f.rating || 0), 0) /
          ratedFeedbacks.length
        ).toFixed(1)
      : "N/A";

  // Calculate feedback distribution by rating
  const ratingDistribution = [1, 2, 3, 4, 5].map((rating) => ({
    rating,
    count: allFeedbacks.filter((f) => f.rating === rating).length,
  }));

  // Calculate feedback trends (last 7 days)
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split("T")[0];
  });

  const feedbackTrends = last7Days.map((date) => ({
    date,
    count: allFeedbacks.filter((f) => {
      if (!f.createdAt) return false;
      const feedbackDate = new Date(f.createdAt).toISOString().split("T")[0];
      return feedbackDate === date;
    }).length,
  }));

  // Get recent feedbacks
  const recentFeedbacks = allFeedbacks
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  return {
    totalProjects,
    activeProjects,
    totalFeedbacks,
    unreadFeedbacks,
    pinnedFeedbacks,
    averageRating,
    ratingDistribution,
    feedbackTrends,
    recentFeedbacks,
  };
}

// Get recent activity summary
export async function getRecentActivitySummary() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const userProjects = await db.query.projects.findMany({
    where: eq(projects.userId, userId),
  });

  if (userProjects.length === 0) {
    return {
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
    };
  }

  const projectIds = userProjects.map((p) => p.id);

  const allActivities = await db.query.activities.findMany({
    where: inArray(activities.projectId, projectIds),
  });

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const today = allActivities.filter(
    (a) => a.createdAt && new Date(a.createdAt) >= startOfToday
  ).length;

  const thisWeek = allActivities.filter(
    (a) => a.createdAt && new Date(a.createdAt) >= startOfWeek
  ).length;

  const thisMonth = allActivities.filter(
    (a) => a.createdAt && new Date(a.createdAt) >= startOfMonth
  ).length;

  return {
    today,
    thisWeek,
    thisMonth,
  };
}
