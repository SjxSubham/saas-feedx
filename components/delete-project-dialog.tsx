"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { deleteProject } from "@/actions/projectActions";
import toast from "react-hot-toast";

interface DeleteProjectDialogProps {
  projectId: number;
  projectName: string | null;
  feedbackCount?: number;
}

export default function DeleteProjectDialog({
  projectId,
  projectName,
  feedbackCount = 0,
}: DeleteProjectDialogProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const expectedConfirmText = projectName || "delete";

  const handleDelete = async () => {
    if (confirmText !== expectedConfirmText) {
      toast.error("Please type the project name to confirm deletion");
      return;
    }

    setIsLoading(true);

    try {
      await deleteProject(projectId);
      toast.success("Project deleted successfully!");
      setIsOpen(false);
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to delete project. Please try again.");
      console.error("Error deleting project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setConfirmText("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300"
        >
          <Trash2 className="h-4 w-4" />
          Delete Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Delete Project
          </DialogTitle>
          <DialogDescription className="text-left">
            This action cannot be undone. This will permanently delete the
            project and all associated data.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Warning Box */}
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-red-800 dark:text-red-200">
                  You are about to delete:
                </p>
                <ul className="mt-2 space-y-1 text-red-700 dark:text-red-300">
                  <li>
                    • Project: <strong>{projectName || "Unnamed"}</strong>
                  </li>
                  <li>
                    • {feedbackCount} feedback{feedbackCount !== 1 ? "s" : ""}
                  </li>
                  <li>• All analytics and activity history</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Confirmation Input */}
          <div className="grid gap-2">
            <Label htmlFor="confirmDelete" className="text-sm">
              Type <strong className="text-red-600">{expectedConfirmText}</strong> to
              confirm:
            </Label>
            <Input
              id="confirmDelete"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={expectedConfirmText}
              className="border-red-200 focus:border-red-400 focus:ring-red-400"
              autoComplete="off"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading || confirmText !== expectedConfirmText}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Project
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
