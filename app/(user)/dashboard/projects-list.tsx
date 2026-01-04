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
  Sparkles,
} from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useRef } from "react";
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
import { cn } from "@/lib/utils";

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
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <ProjectCard project={project} index={index} />
          </motion.li>
        ))}

        {/* Upgrade Card */}
        <motion.li
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: props.projects.length * 0.1 }}
        >
          <UpgradeCard />
        </motion.li>
      </ul>
    </div>
  );
};

function UpgradeCard() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    rotateX.set(y * -8);
    rotateY.set(x * 8);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className="relative group h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
    >
      {/* Animated gradient border */}
      <div className="absolute -inset-[2px] rounded-2xl overflow-hidden">
        <motion.div
          className="absolute inset-[-200%]"
          style={{
            background:
              "conic-gradient(from 0deg, #c4f820, #10b981, #3b82f6, #8b5cf6, #c4f820)",
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <Card className="relative h-full flex flex-col bg-gradient-to-br from-background via-background to-primary/5 border-0 overflow-hidden">
        {/* Background effects */}
        <motion.div
          className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: isHovered ? 1.3 : 1,
            opacity: isHovered ? 0.4 : 0.2,
          }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="absolute -left-10 -bottom-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: isHovered ? 1.3 : 1,
            opacity: isHovered ? 0.4 : 0.2,
          }}
          transition={{ duration: 0.4, delay: 0.1 }}
        />

        <CardHeader className="flex-1 flex flex-col items-center justify-center text-center py-8 relative z-10">
          <motion.div
            className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4"
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? [0, -10, 10, 0] : 0,
            }}
            transition={{
              scale: { duration: 0.2 },
              rotate: { duration: 0.5 },
            }}
          >
            <Lock className="h-7 w-7 text-primary" />
          </motion.div>
          <CardTitle className="text-xl">Upgrade to Premium</CardTitle>
          <CardDescription className="mt-2 text-muted-foreground">
            Unlock unlimited projects and premium features
          </CardDescription>

          {/* Feature badges */}
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {["Unlimited", "Analytics", "Priority"].map((feature, i) => (
              <motion.span
                key={feature}
                className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                {feature}
              </motion.span>
            ))}
          </div>
        </CardHeader>

        <CardFooter className="flex justify-center pb-6 relative z-10">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <SubsribeBtn price={monthlyPlanId} />
          </motion.div>
        </CardFooter>

        {/* Corner accents */}
        <motion.div
          className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-primary/30 rounded-tr-xl opacity-0 group-hover:opacity-100"
          animate={{ scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-primary/30 rounded-bl-xl opacity-0 group-hover:opacity-100"
          animate={{ scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        />
      </Card>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
    rotateX.set(y * -8);
    rotateY.set(x * 8);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  const handleToggleStatus = async () => {
    setIsLoading(true);
    try {
      const result = await toggleProjectStatus(project.id);
      toast.success(
        result.isActive ? "Project activated" : "Project deactivated",
      );
      router.refresh();
    } catch {
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
    } catch {
      toast.error("Failed to delete project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
        ref={ref}
        className="relative group h-full"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
      >
        {/* Animated border on hover */}
        <div className="absolute -inset-[1px] rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <motion.div
            className="absolute inset-[-200%]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, hsl(var(--primary)), transparent 30%)",
            }}
            animate={{
              rotate: isHovered ? 360 : 0,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <Card className="relative h-full flex flex-col overflow-hidden border-border/50 bg-background/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/5">
          {/* Background glow */}
          <motion.div
            className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: isHovered ? 1.5 : 1,
              opacity: isHovered ? 0.4 : 0.15,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Spotlight effect */}
          <motion.div
            className="absolute w-24 h-24 rounded-full bg-primary/10 blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              x: useSpring(mouseX.get() * 100, springConfig),
              y: useSpring(mouseY.get() * 100, springConfig),
            }}
          />

          <CardHeader className="flex-1 relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{
                      color: isHovered
                        ? "hsl(var(--primary))"
                        : "hsl(var(--foreground))",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardTitle className="text-lg truncate">
                      {project.name}
                    </CardTitle>
                  </motion.div>
                  {project.isActive === false && (
                    <motion.span
                      className="text-xs bg-yellow-500/10 text-yellow-600 px-2 py-0.5 rounded-full flex-shrink-0 border border-yellow-500/20"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                    >
                      Inactive
                    </motion.span>
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
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/10"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-background/95 backdrop-blur-md border-border/50"
                >
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
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary truncate block mt-3 flex items-center gap-1 transition-colors"
                whileHover={{ x: 3 }}
              >
                <ExternalLink className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{project.url}</span>
              </motion.a>
            )}
          </CardHeader>

          <CardFooter className="pt-0 flex gap-2 relative z-10">
            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="default"
                className="w-full relative overflow-hidden group/btn"
                asChild
              >
                <Link href={`/projects/${project.id}/${project.name}`}>
                  {/* Button shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                    animate={{
                      translateX: isHovered ? "200%" : "-100%",
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                  />
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span className="relative z-10">View Feedbacks</span>
                </Link>
              </Button>
            </motion.div>
          </CardFooter>

          {/* Corner accents */}
          <motion.div
            className="absolute top-2 right-2 w-8 h-8 border-t border-r border-primary/20 rounded-tr-xl opacity-0 group-hover:opacity-100"
            animate={{ scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="absolute bottom-2 left-2 w-8 h-8 border-b border-l border-primary/20 rounded-bl-xl opacity-0 group-hover:opacity-100"
            animate={{ scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
          />

          {/* Active indicator */}
          {project.isActive !== false && (
            <motion.div
              className="absolute top-4 left-4 w-2 h-2 rounded-full bg-emerald-500"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </Card>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px] bg-background/95 backdrop-blur-md border-border/50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                <Trash2 className="h-5 w-5" />
              </motion.div>
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
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Deleting...
                  </motion.div>
                ) : (
                  "Delete Project"
                )}
              </Button>
            </motion.div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProjectList;
