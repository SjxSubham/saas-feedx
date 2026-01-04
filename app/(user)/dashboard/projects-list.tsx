"use client";

import { InferSelectModel } from "drizzle-orm";
import { projects } from "@/db/schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SubsribeBtn from "../payments/subscribe-btn";
import { monthlyPlanId } from "@/lib/payments";
import {
  Lock,
  ExternalLink,
  MessageSquare,
  Settings,
  MoreVertical,
  Eye,
  Trash2,
  Power,
  PowerOff,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toggleProjectStatus, deleteProject } from "@/actions/projectActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Project = InferSelectModel<typeof projects>;
type Props = {
  projects: Project[];
};

const ProjectList = (props: Props) => {
  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {props.projects.map((project: Project, index: number) => (
          <motion.li
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.li>
        ))}

        {/* Upgrade Card */}
        <motion.li
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: props.projects.length * 0.1 }}
        >
          <Card className="h-full flex flex-col bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-dashed border-2 hover:border-primary/50 transition-all duration-300">
            <CardHeader className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Upgrade to Premium</CardTitle>
              <CardDescription className="mt-2">
                Unlock unlimited projects and premium features
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center pb-6">
              <SubsribeBtn price={monthlyPlanId} />
            </CardFooter>
          </Card>
        </motion.li>
      </ul>
    </div>
  );
};

function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleStatus = async () => {
    setIsLoading(true);
    try {
      const result = await toggleProjectStatus(project.id);
      toast.success(
        result.isActive ? "Project activated" : "Project deactivated",
      );
      router.refresh();
    } catch (error) {
      toast.error("Failed to update project status");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteProject(project.id);
      toast.success("Project deleted successfully");
      setIsDeleteDialogOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="h-full flex flex-col group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/30">
        <CardHeader className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg truncate">
                  {project.name}
                </CardTitle>
                {project.isActive === false && (
                  <span className="text-xs bg-yellow-500/10 text-yellow-600 px-2 py-0.5 rounded-full flex-shrink-0">
                    Inactive
                  </span>
                )}
              </div>
              <CardDescription className="mt-1 line-clamp-2">
                {project.description || "No description"}
              </CardDescription>
            </div>

            {/* Actions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link
                    href={`/projects/${project.id}/${project.name}`}
                    className="cursor-pointer"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Project
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/projects/${project.id}/${project.name}/settings`}
                    className="cursor-pointer"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                {project.url && (
                  <DropdownMenuItem asChild>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Site
                    </a>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleToggleStatus}
                  disabled={isLoading}
                  className="cursor-pointer"
                >
                  {project.isActive !== false ? (
                    <>
                      <PowerOff className="mr-2 h-4 w-4" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <Power className="mr-2 h-4 w-4" />
                      Activate
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="text-red-600 focus:text-red-600 cursor-pointer"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Project URL */}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary truncate block mt-2 flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{project.url}</span>
            </a>
          )}
        </CardHeader>

        <CardFooter className="pt-0 flex gap-2">
          <Button variant="default" className="flex-1" asChild>
            <Link href={`/projects/${project.id}/${project.name}`}>
              <MessageSquare className="mr-2 h-4 w-4" />
              View Feedbacks
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Delete Project
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong>{project.name || "this project"}</strong>? This action
              cannot be undone and will permanently delete all associated
              feedbacks.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProjectList;
