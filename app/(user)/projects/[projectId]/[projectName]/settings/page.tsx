import { db } from "@/db";
import { projects as dbProjects, activities } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Settings, Bell, Activity, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditProjectDialog from "@/components/edit-project-dialog";
import DeleteProjectDialog from "@/components/delete-project-dialog";
import ActivityLog from "@/components/activity-log";

const SettingsPage = async ({
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

  const project = await db.query.projects.findFirst({
    where: and(
      eq(dbProjects.id, parseInt(params.projectId)),
      eq(dbProjects.userId, userId),
    ),
    with: {
      feedbacks: true,
    },
  });

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

  // Get project activities
  const projectActivities = await db.query.activities.findMany({
    where: eq(activities.projectId, project.id),
    orderBy: [desc(activities.createdAt)],
    limit: 20,
  });

  const totalFeedbacks = project.feedbacks?.length || 0;

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <div className="my-4">
        <Button
          variant="secondary"
          className="rounded-full hover:scale-105 transition-all shadow-sm"
          asChild
        >
          <Link href={`/projects/${params.projectId}/${params.projectName}`}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Project
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Settings className="h-8 w-8" />
            Project Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage settings for <strong>{project.name}</strong>
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* General Settings Card */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>
              Update your project basic information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-muted-foreground">
                Project Name
              </label>
              <p className="text-foreground">{project.name || "Unnamed"}</p>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-muted-foreground">
                Description
              </label>
              <p className="text-foreground">
                {project.description || "No description"}
              </p>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-muted-foreground">
                Project URL
              </label>
              <p className="text-foreground">{project.url || "Not set"}</p>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-muted-foreground">
                Status
              </label>
              <p className="text-foreground">
                {project.isActive !== false ? (
                  <span className="inline-flex items-center gap-1 text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-yellow-600">
                    <span className="h-2 w-2 rounded-full bg-yellow-500" />
                    Inactive
                  </span>
                )}
              </p>
            </div>
            <div className="pt-4">
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
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings Card */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure how you receive feedback notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-muted-foreground">
                Email Notifications
              </label>
              <p className="text-foreground">
                {project.emailNotifications ? (
                  <span className="inline-flex items-center gap-1 text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Enabled
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-gray-500">
                    <span className="h-2 w-2 rounded-full bg-gray-400" />
                    Disabled
                  </span>
                )}
              </p>
            </div>
            {project.emailNotifications && (
              <div className="grid gap-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Notification Email
                </label>
                <p className="text-foreground">
                  {project.notificationEmail || "Not set"}
                </p>
              </div>
            )}
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                Click Edit Project to change notification settings
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone Card */}
        <Card className="border-red-200 dark:border-red-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Shield className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>
              Irreversible and destructive actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
              <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                Delete this project
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                Once you delete a project, there is no going back. This will
                permanently delete the project and all {totalFeedbacks} feedback
                {totalFeedbacks !== 1 ? "s" : ""}.
              </p>
              <DeleteProjectDialog
                projectId={project.id}
                projectName={project.name}
                feedbackCount={totalFeedbacks}
              />
            </div>
          </CardContent>
        </Card>

        {/* Project Stats Card */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Project Statistics
            </CardTitle>
            <CardDescription>Overview of your project activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-3xl font-bold">{totalFeedbacks}</p>
                <p className="text-sm text-muted-foreground">Total Feedbacks</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-3xl font-bold">
                  {project.feedbacks?.filter((f) => !f.isRead).length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Unread</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-3xl font-bold">
                  {project.feedbacks?.filter((f) => f.isPinned).length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Pinned</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-3xl font-bold">
                  {project.feedbacks?.filter((f) => f.isArchived).length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Archived</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Log */}
      <div className="mt-8">
        <ActivityLog
          activities={projectActivities}
          title="Recent Activity"
          emptyMessage="No activity recorded for this project yet"
          maxItems={10}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
