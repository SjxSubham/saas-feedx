import { db } from "@/db";
import { projects as dbProjects } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import Link from "next/link";
import { Globe, ChevronLeft, Code } from "lucide-react";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import EditProjectDialog from "@/components/edit-project-dialog";
import DeleteProjectDialog from "@/components/delete-project-dialog";
import FeedbackTrends from "@/components/feedback-trends";
import { generateTrendData } from "@/lib/feedback-utils";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async ({
  params,
}: {
  params: {
    projectId: string;
    projectName: string;
  };
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  if (!params.projectId) return <div>Invalid Project ID</div>;

  const projects = await db.query.projects.findMany({
    where: and(
      eq(dbProjects.id, parseInt(params.projectId)),
      eq(dbProjects.userId, userId),
    ),
    with: {
      feedbacks: true,
    },
  });

  const project = projects[0];

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-xl font-semibold mb-2">Project not found</h2>
        <p className="text-muted-foreground mb-6">
          The project you are looking for does not exist or you do not have
          access to it.
        </p>
        <Button asChild>
          <Link href="/dashboard">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  // Generate trend data for the last 7 days
  const trendData = generateTrendData(project.feedbacks || [], 7);

  // Calculate stats for the project
  const totalFeedbacks = project.feedbacks?.length || 0;
  const unreadCount = project.feedbacks?.filter((f) => !f.isRead).length || 0;

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <div className="my-4">
        <Button
          variant="secondary"
          className="rounded-full hover:scale-105 transition-all shadow-sm"
          asChild
        >
          <Link href="/dashboard">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
      </div>

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold tracking-tight glow-text text-foreground">
              {project.name}
            </h1>
            {project.isActive === false && (
              <span className="text-xs bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded-full">
                Inactive
              </span>
            )}
          </div>
          <p className="text-xl text-muted-foreground">{project.description}</p>
          {unreadCount > 0 && (
            <div className="inline-flex items-center gap-2 text-sm text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              {unreadCount} new feedback{unreadCount !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Visit Site Button */}
          {project.url && (
            <Button
              variant="secondary"
              className="shadow-sm hover:scale-105 transition-transform"
              asChild
            >
              <Link href={project.url} target="_blank">
                <Globe className="w-4 h-4 mr-2" />
                Visit Site
              </Link>
            </Button>
          )}

          {/* Share Link Button */}
          <Button
            className="bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 rounded-lg"
            asChild
          >
            <Link
              href={`/projects/${params.projectId}/${params.projectName}/instructions`}
            >
              <Code className="w-4 h-4 mr-2" />
              Share Link
            </Link>
          </Button>

          {/* Edit Project Button */}
          <EditProjectDialog
            project={{
              id: project.id,
              name: project.name,
              description: project.description,
              url: project.url,
              emailNotifications: project.emailNotifications,
              notificationEmail: project.notificationEmail,
            }}
          />

          {/* Delete Project Button */}
          <DeleteProjectDialog
            projectId={project.id}
            projectName={project.name}
            feedbackCount={totalFeedbacks}
          />
        </div>
      </div>

      {/* Feedback Trends Section */}
      {totalFeedbacks > 0 && (
        <div className="glass-panel p-6 rounded-2xl border border-white/5">
          <FeedbackTrends
            data={trendData}
            title="Feedback Activity"
            showRatingTrend={true}
            period="7days"
          />
        </div>
      )}

      {/* Feedbacks Table Section */}
      <div className="glass-panel p-6 rounded-2xl overflow-hidden border border-white/5">
        {totalFeedbacks === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💬</div>
            <h2 className="text-xl font-semibold mb-2">No feedbacks yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Share your feedback link or embed the widget on your site to start
              collecting valuable user feedback.
            </p>
            <Button asChild>
              <Link
                href={`/projects/${params.projectId}/${params.projectName}/instructions`}
              >
                <Code className="w-4 h-4 mr-2" />
                Get Feedback Link
              </Link>
            </Button>
          </div>
        ) : (
          <Table data={project.feedbacks} />
        )}
      </div>
    </div>
  );
};

export default Page;
