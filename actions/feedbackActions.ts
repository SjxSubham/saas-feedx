"use server";
import { db } from "@/db";
import { feedbacks, activities, notifications, projects } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Mark feedback as read/unread
export async function toggleFeedbackRead(feedbackId: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const feedback = await db.query.feedbacks.findFirst({
    where: eq(feedbacks.id, feedbackId),
    with: {
      project: true,
    },
  });

  if (!feedback || feedback.project?.userId !== userId) {
    throw new Error("Feedback not found or unauthorized");
  }

  const newStatus = !feedback.isRead;

  await db
    .update(feedbacks)
    .set({ isRead: newStatus })
    .where(eq(feedbacks.id, feedbackId));

  revalidatePath(`/projects/${feedback.projectId}`);

  return { success: true, isRead: newStatus };
}

// Mark feedback as pinned/unpinned
export async function toggleFeedbackPinned(feedbackId: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const feedback = await db.query.feedbacks.findFirst({
    where: eq(feedbacks.id, feedbackId),
    with: {
      project: true,
    },
  });

  if (!feedback || feedback.project?.userId !== userId) {
    throw new Error("Feedback not found or unauthorized");
  }

  const newStatus = !feedback.isPinned;

  await db
    .update(feedbacks)
    .set({ isPinned: newStatus })
    .where(eq(feedbacks.id, feedbackId));

  // Log activity
  await db.insert(activities).values({
    projectId: feedback.projectId,
    userId,
    action: newStatus ? "feedback_pinned" : "feedback_unpinned",
    description: `Feedback from "${feedback.userName}" was ${newStatus ? "pinned" : "unpinned"}`,
    metadata: JSON.stringify({ feedbackId }),
  });

  revalidatePath(`/projects/${feedback.projectId}`);

  return { success: true, isPinned: newStatus };
}

// Archive/unarchive feedback
export async function toggleFeedbackArchived(feedbackId: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const feedback = await db.query.feedbacks.findFirst({
    where: eq(feedbacks.id, feedbackId),
    with: {
      project: true,
    },
  });

  if (!feedback || feedback.project?.userId !== userId) {
    throw new Error("Feedback not found or unauthorized");
  }

  const newStatus = !feedback.isArchived;

  await db
    .update(feedbacks)
    .set({ isArchived: newStatus })
    .where(eq(feedbacks.id, feedbackId));

  // Log activity
  await db.insert(activities).values({
    projectId: feedback.projectId,
    userId,
    action: newStatus ? "feedback_archived" : "feedback_unarchived",
    description: `Feedback from "${feedback.userName}" was ${newStatus ? "archived" : "restored"}`,
    metadata: JSON.stringify({ feedbackId }),
  });

  revalidatePath(`/projects/${feedback.projectId}`);

  return { success: true, isArchived: newStatus };
}

// Delete feedback
export async function deleteFeedback(feedbackId: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const feedback = await db.query.feedbacks.findFirst({
    where: eq(feedbacks.id, feedbackId),
    with: {
      project: true,
    },
  });

  if (!feedback || feedback.project?.userId !== userId) {
    throw new Error("Feedback not found or unauthorized");
  }

  const projectId = feedback.projectId;

  // Delete related notifications
  await db
    .delete(notifications)
    .where(eq(notifications.feedbackId, feedbackId));

  // Delete the feedback
  await db.delete(feedbacks).where(eq(feedbacks.id, feedbackId));

  // Log activity
  await db.insert(activities).values({
    projectId,
    userId,
    action: "feedback_deleted",
    description: `Feedback from "${feedback.userName}" was deleted`,
    metadata: JSON.stringify({
      feedbackId,
      userName: feedback.userName,
      message: feedback.message,
    }),
  });

  revalidatePath(`/projects/${projectId}`);

  return { success: true };
}

// Reply to feedback (stores reply and optionally sends email)
export async function replyToFeedback(
  feedbackId: number,
  replyMessage: string,
) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const feedback = await db.query.feedbacks.findFirst({
    where: eq(feedbacks.id, feedbackId),
    with: {
      project: true,
    },
  });

  if (!feedback || feedback.project?.userId !== userId) {
    throw new Error("Feedback not found or unauthorized");
  }

  await db
    .update(feedbacks)
    .set({
      replyMessage,
      repliedAt: new Date(),
      isRead: true, // Mark as read when replied
    })
    .where(eq(feedbacks.id, feedbackId));

  // Log activity
  await db.insert(activities).values({
    projectId: feedback.projectId,
    userId,
    action: "feedback_replied",
    description: `Replied to feedback from "${feedback.userName}"`,
    metadata: JSON.stringify({ feedbackId, replyMessage }),
  });

  revalidatePath(`/projects/${feedback.projectId}`);

  return { success: true };
}

// Bulk mark as read
export async function bulkMarkAsRead(feedbackIds: number[]) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (feedbackIds.length === 0) {
    return { success: true, count: 0 };
  }

  // Verify ownership of all feedbacks
  const feedbacksToUpdate = await db.query.feedbacks.findMany({
    where: inArray(feedbacks.id, feedbackIds),
    with: {
      project: true,
    },
  });

  const authorizedFeedbacks = feedbacksToUpdate.filter(
    (f) => f.project?.userId === userId,
  );

  if (authorizedFeedbacks.length === 0) {
    throw new Error("No authorized feedbacks found");
  }

  const authorizedIds = authorizedFeedbacks.map((f) => f.id);

  await db
    .update(feedbacks)
    .set({ isRead: true })
    .where(inArray(feedbacks.id, authorizedIds));

  // Revalidate affected project paths
  const projectIdSet = new Set(authorizedFeedbacks.map((f) => f.projectId));
  const projectIds = Array.from(projectIdSet);
  projectIds.forEach((pid) => {
    revalidatePath(`/projects/${pid}`);
  });

  return { success: true, count: authorizedIds.length };
}

// Bulk archive
export async function bulkArchive(feedbackIds: number[]) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (feedbackIds.length === 0) {
    return { success: true, count: 0 };
  }

  const feedbacksToUpdate = await db.query.feedbacks.findMany({
    where: inArray(feedbacks.id, feedbackIds),
    with: {
      project: true,
    },
  });

  const authorizedFeedbacks = feedbacksToUpdate.filter(
    (f) => f.project?.userId === userId,
  );

  if (authorizedFeedbacks.length === 0) {
    throw new Error("No authorized feedbacks found");
  }

  const authorizedIds = authorizedFeedbacks.map((f) => f.id);

  await db
    .update(feedbacks)
    .set({ isArchived: true })
    .where(inArray(feedbacks.id, authorizedIds));

  // Revalidate affected project paths
  const projectIdSet = new Set(authorizedFeedbacks.map((f) => f.projectId));
  const projectIds = Array.from(projectIdSet);
  projectIds.forEach((pid) => {
    revalidatePath(`/projects/${pid}`);
  });

  return { success: true, count: authorizedIds.length };
}

// Bulk delete
export async function bulkDelete(feedbackIds: number[]) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (feedbackIds.length === 0) {
    return { success: true, count: 0 };
  }

  const feedbacksToDelete = await db.query.feedbacks.findMany({
    where: inArray(feedbacks.id, feedbackIds),
    with: {
      project: true,
    },
  });

  const authorizedFeedbacks = feedbacksToDelete.filter(
    (f) => f.project?.userId === userId,
  );

  if (authorizedFeedbacks.length === 0) {
    throw new Error("No authorized feedbacks found");
  }

  const authorizedIds = authorizedFeedbacks.map((f) => f.id);

  // Delete related notifications
  await db
    .delete(notifications)
    .where(inArray(notifications.feedbackId, authorizedIds));

  // Delete feedbacks
  await db.delete(feedbacks).where(inArray(feedbacks.id, authorizedIds));

  // Revalidate affected project paths
  const projectIdSet = new Set(authorizedFeedbacks.map((f) => f.projectId));
  const projectIds = Array.from(projectIdSet);
  projectIds.forEach((pid) => {
    revalidatePath(`/projects/${pid}`);
  });

  return { success: true, count: authorizedIds.length };
}

// Get feedback details
export async function getFeedbackDetails(feedbackId: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const feedback = await db.query.feedbacks.findFirst({
    where: eq(feedbacks.id, feedbackId),
    with: {
      project: true,
    },
  });

  if (!feedback || feedback.project?.userId !== userId) {
    throw new Error("Feedback not found or unauthorized");
  }

  return feedback;
}

// Search feedbacks
export async function searchFeedbacks(
  projectId: number,
  query: string,
  filters?: {
    isRead?: boolean;
    isPinned?: boolean;
    isArchived?: boolean;
    minRating?: number;
    maxRating?: number;
    startDate?: Date;
    endDate?: Date;
  },
) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const project = await db.query.projects.findFirst({
    where: and(eq(projects.id, projectId), eq(projects.userId, userId)),
    with: {
      feedbacks: true,
    },
  });

  if (!project) {
    throw new Error("Project not found or unauthorized");
  }

  let results = project.feedbacks || [];

  // Apply text search
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(
      (f) =>
        f.userName?.toLowerCase().includes(lowerQuery) ||
        f.userEmail?.toLowerCase().includes(lowerQuery) ||
        f.message?.toLowerCase().includes(lowerQuery),
    );
  }

  // Apply filters
  if (filters) {
    if (filters.isRead !== undefined) {
      results = results.filter((f) => f.isRead === filters.isRead);
    }
    if (filters.isPinned !== undefined) {
      results = results.filter((f) => f.isPinned === filters.isPinned);
    }
    if (filters.isArchived !== undefined) {
      results = results.filter((f) => f.isArchived === filters.isArchived);
    }
    if (filters.minRating !== undefined) {
      results = results.filter(
        (f) => f.rating !== null && f.rating >= filters.minRating!,
      );
    }
    if (filters.maxRating !== undefined) {
      results = results.filter(
        (f) => f.rating !== null && f.rating <= filters.maxRating!,
      );
    }
    if (filters.startDate !== undefined) {
      results = results.filter(
        (f) => f.createdAt && new Date(f.createdAt) >= filters.startDate!,
      );
    }
    if (filters.endDate !== undefined) {
      results = results.filter(
        (f) => f.createdAt && new Date(f.createdAt) <= filters.endDate!,
      );
    }
  }

  return results;
}
