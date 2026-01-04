"use server";
import { db } from "@/db";
import { projects, feedbacks, activities, notifications } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Update project details
export async function updateProject(
  projectId: number,
  formData: FormData
) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const url = formData.get("url") as string;
  const emailNotifications = formData.get("emailNotifications") === "true";
  const notificationEmail = formData.get("notificationEmail") as string;

  // Verify ownership
  const project = await db.query.projects.findFirst({
    where: and(eq(projects.id, projectId), eq(projects.userId, userId)),
  });

  if (!project) {
    throw new Error("Project not found or unauthorized");
  }

  await db
    .update(projects)
    .set({
      name,
      description,
      url,
      emailNotifications,
      notificationEmail,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, projectId));

  // Log activity
  await db.insert(activities).values({
    projectId,
    userId,
    action: "project_updated",
    description: `Project "${name}" was updated`,
    metadata: JSON.stringify({ name, description, url }),
  });

  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/dashboard");

  return { success: true };
}

// Delete a project and all its feedbacks
export async function deleteProject(projectId: number) {
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

  // Delete all related notifications
  await db.delete(notifications).where(eq(notifications.projectId, projectId));

  // Delete all related activities
  await db.delete(activities).where(eq(activities.projectId, projectId));

  // Delete all feedbacks for this project
  await db.delete(feedbacks).where(eq(feedbacks.projectId, projectId));

  // Delete the project
  await db.delete(projects).where(eq(projects.id, projectId));

  revalidatePath("/dashboard");

  return { success: true };
}

// Toggle project active status
export async function toggleProjectStatus(projectId: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const project = await db.query.projects.findFirst({
    where: and(eq(projects.id, projectId), eq(projects.userId, userId)),
  });

  if (!project) {
    throw new Error("Project not found or unauthorized");
  }

  const newStatus = !project.isActive;

  await db
    .update(projects)
    .set({
      isActive: newStatus,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, projectId));

  // Log activity
  await db.insert(activities).values({
    projectId,
    userId,
    action: "project_status_changed",
    description: `Project "${project.name}" was ${newStatus ? "activated" : "deactivated"}`,
  });

  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/dashboard");

  return { success: true, isActive: newStatus };
}

// Update notification settings
export async function updateNotificationSettings(
  projectId: number,
  emailNotifications: boolean,
  notificationEmail: string
) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const project = await db.query.projects.findFirst({
    where: and(eq(projects.id, projectId), eq(projects.userId, userId)),
  });

  if (!project) {
    throw new Error("Project not found or unauthorized");
  }

  await db
    .update(projects)
    .set({
      emailNotifications,
      notificationEmail,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, projectId));

  revalidatePath(`/projects/${projectId}`);

  return { success: true };
}

// Get project statistics
export async function getProjectStats(projectId: number) {
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

  const allFeedbacks = project.feedbacks || [];
  const totalFeedbacks = allFeedbacks.length;
  const unreadFeedbacks = allFeedbacks.filter((f) => !f.isRead).length;
  const pinnedFeedbacks = allFeedbacks.filter((f) => f.isPinned).length;
  const archivedFeedbacks = allFeedbacks.filter((f) => f.isArchived).length;

  const ratingsSum = allFeedbacks.reduce((sum, f) => sum + (f.rating || 0), 0);
  const ratedFeedbacks = allFeedbacks.filter((f) => f.rating !== null);
  const averageRating = ratedFeedbacks.length > 0
    ? (ratingsSum / ratedFeedbacks.length).toFixed(1)
    : "N/A";

  // Calculate feedback by rating
  const ratingDistribution = [1, 2, 3, 4, 5].map((rating) => ({
    rating,
    count: allFeedbacks.filter((f) => f.rating === rating).length,
  }));

  return {
    totalFeedbacks,
    unreadFeedbacks,
    pinnedFeedbacks,
    archivedFeedbacks,
    averageRating,
    ratingDistribution,
  };
}
