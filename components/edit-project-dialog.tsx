"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Loader2, Bell, Mail } from "lucide-react";
import { updateProject } from "@/actions/projectActions";
import toast from "react-hot-toast";

interface Project {
  id: number;
  name: string | null;
  description: string | null;
  url: string | null;
  emailNotifications?: boolean | null;
  notificationEmail?: string | null;
}

interface EditProjectDialogProps {
  project: Project;
  onSuccess?: () => void;
}

export default function EditProjectDialog({
  project,
  onSuccess,
}: EditProjectDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(project.name || "");
  const [description, setDescription] = useState(project.description || "");
  const [url, setUrl] = useState(project.url || "");
  const [emailNotifications, setEmailNotifications] = useState(
    project.emailNotifications || false,
  );
  const [notificationEmail, setNotificationEmail] = useState(
    project.notificationEmail || "",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("url", url);
      formData.append("emailNotifications", String(emailNotifications));
      formData.append("notificationEmail", notificationEmail);

      await updateProject(project.id, formData);

      toast.success("Project updated successfully!");
      setIsOpen(false);
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to update project. Please try again.");
      console.error("Error updating project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      // Reset form to current project values when opening
      setName(project.name || "");
      setDescription(project.description || "");
      setUrl(project.url || "");
      setEmailNotifications(project.emailNotifications || false);
      setNotificationEmail(project.notificationEmail || "");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Pencil className="h-4 w-4" />
          Edit Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="h-5 w-5" />
            Edit Project
          </DialogTitle>
          <DialogDescription>
            Update your project details and notification settings.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Project Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Awesome Project"
                required
              />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief description of your project..."
                rows={3}
              />
            </div>

            {/* URL */}
            <div className="grid gap-2">
              <Label htmlFor="url">Project URL</Label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>

            {/* Notification Settings */}
            <div className="border-t pt-4 mt-2">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notification Settings
              </h4>

              {/* Email Notifications Toggle */}
              <div className="flex items-center justify-between mb-3">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications" className="text-sm">
                    Email Notifications
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Get notified when you receive new feedback
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Notification Email */}
              {emailNotifications && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid gap-2"
                >
                  <Label
                    htmlFor="notificationEmail"
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Notification Email
                  </Label>
                  <Input
                    id="notificationEmail"
                    type="email"
                    value={notificationEmail}
                    onChange={(e) => setNotificationEmail(e.target.value)}
                    placeholder="your@email.com"
                    required={emailNotifications}
                  />
                  <p className="text-xs text-muted-foreground">
                    We will send feedback notifications to this email address
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
