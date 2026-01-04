import NewProjBtn from "@/components/new.proj";
import { db } from "@/db";
import { projects, feedbacks } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, inArray } from "drizzle-orm";
import ProjectsList from "./projects-list";
import { getSubscription } from "@/actions/userSubscription";
import { maxFreeProjects } from "@/lib/payments";
import DashboardStats from "@/components/dashboard-stats";

export default async function Page() {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const userProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId));

  const subscribed = await getSubscription({ userId });

  // Get all feedbacks for user's projects to calculate stats
  const projectIds = userProjects.map((p) => p.id);
  let allFeedbacks: (typeof feedbacks.$inferSelect)[] = [];

  if (projectIds.length > 0) {
    allFeedbacks = await db
      .select()
      .from(feedbacks)
      .where(inArray(feedbacks.projectId, projectIds));
  }

  // Calculate statistics
  const totalProjects = userProjects.length;
  const activeProjects = userProjects.filter(
    (p) => p.isActive !== false,
  ).length;
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-mono">Your Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your projects and view feedback analytics
          </p>
        </div>
        {subscribed !== true && userProjects.length >= maxFreeProjects ? (
          <div className="text-sm text-muted-foreground bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-lg">
            Free tier limit reached ({maxFreeProjects} projects)
          </div>
        ) : (
          <NewProjBtn />
        )}
      </div>

      {/* Statistics Cards */}
      {totalProjects > 0 && (
        <DashboardStats
          totalProjects={totalProjects}
          activeProjects={activeProjects}
          totalFeedbacks={totalFeedbacks}
          unreadFeedbacks={unreadFeedbacks}
          pinnedFeedbacks={pinnedFeedbacks}
          averageRating={averageRating}
        />
      )}

      {/* Projects List */}
      {totalProjects === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-xl">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-xl font-semibold mb-2">No projects yet</h2>
            <p className="text-muted-foreground mb-6">
              Create your first project to start collecting valuable feedback
              from your users.
            </p>
            <NewProjBtn />
          </div>
        </div>
      ) : (
        <ProjectsList projects={userProjects} />
      )}
    </div>
  );
}
