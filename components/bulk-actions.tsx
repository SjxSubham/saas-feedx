"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckSquare,
  Square,
  Eye,
  Archive,
  Trash2,
  Loader2,
  X,
  CheckCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  bulkMarkAsRead,
  bulkArchive,
  bulkDelete,
} from "@/actions/feedbackActions";
import toast from "react-hot-toast";

interface Feedback {
  id: number;
  projectId: number | null;
  userName: string | null;
  userEmail: string | null;
  message: string | null;
  rating: number | null;
  isRead: boolean | null;
  isPinned: boolean | null;
  isArchived: boolean | null;
}

interface BulkActionsProps {
  feedbacks: Feedback[];
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
  onUpdate?: () => void;
}

export default function BulkActions({
  feedbacks,
  selectedIds,
  onSelectionChange,
  onUpdate,
}: BulkActionsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const allSelected =
    feedbacks.length > 0 && selectedIds.length === feedbacks.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(feedbacks.map((f) => f.id));
    }
  };

  const handleClearSelection = () => {
    onSelectionChange([]);
  };

  const handleBulkMarkAsRead = async () => {
    if (selectedIds.length === 0) {
      toast.error("No feedbacks selected");
      return;
    }

    setIsLoading("read");
    try {
      const result = await bulkMarkAsRead(selectedIds);
      toast.success(`Marked ${result.count} feedback(s) as read`);
      onSelectionChange([]);
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to mark feedbacks as read");
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleBulkArchive = async () => {
    if (selectedIds.length === 0) {
      toast.error("No feedbacks selected");
      return;
    }

    setIsLoading("archive");
    try {
      const result = await bulkArchive(selectedIds);
      toast.success(`Archived ${result.count} feedback(s)`);
      onSelectionChange([]);
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to archive feedbacks");
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.error("No feedbacks selected");
      return;
    }

    setIsLoading("delete");
    try {
      const result = await bulkDelete(selectedIds);
      toast.success(`Deleted ${result.count} feedback(s)`);
      onSelectionChange([]);
      setIsDeleteDialogOpen(false);
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to delete feedbacks");
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-4 p-3 bg-muted/30 rounded-lg border">
        {/* Select All Checkbox */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSelectAll}
          className="gap-2"
        >
          {allSelected ? (
            <CheckSquare className="h-4 w-4 text-primary" />
          ) : someSelected ? (
            <div className="relative">
              <Square className="h-4 w-4" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-0.5 bg-primary rounded" />
              </div>
            </div>
          ) : (
            <Square className="h-4 w-4" />
          )}
          <span className="text-sm">
            {allSelected ? "Deselect all" : "Select all"}
          </span>
        </Button>

        {/* Selection Info */}
        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-3"
            >
              <span className="text-sm text-muted-foreground">
                {selectedIds.length} selected
              </span>

              <div className="h-4 w-px bg-border" />

              {/* Bulk Actions */}
              <div className="flex items-center gap-1">
                {/* Mark as Read */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBulkMarkAsRead}
                  disabled={isLoading !== null}
                  className="gap-2 h-8"
                  title="Mark selected as read"
                >
                  {isLoading === "read" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">Mark read</span>
                </Button>

                {/* Archive */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBulkArchive}
                  disabled={isLoading !== null}
                  className="gap-2 h-8"
                  title="Archive selected"
                >
                  {isLoading === "archive" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Archive className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">Archive</span>
                </Button>

                {/* Delete */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  disabled={isLoading !== null}
                  className="gap-2 h-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                  title="Delete selected"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </div>

              <div className="h-4 w-px bg-border" />

              {/* Clear Selection */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSelection}
                className="gap-1 h-8"
                title="Clear selection"
              >
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bulk Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Delete {selectedIds.length} Feedback(s)
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedIds.length} selected
              feedback(s)? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isLoading === "delete"}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              disabled={isLoading === "delete"}
            >
              {isLoading === "delete" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete All
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Individual row selection checkbox component
export function FeedbackCheckbox({
  feedbackId,
  isSelected,
  onToggle,
}: {
  feedbackId: number;
  isSelected: boolean;
  onToggle: (id: number) => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle(feedbackId);
      }}
      className="p-1 hover:bg-accent rounded transition-colors"
    >
      {isSelected ? (
        <CheckSquare className="h-4 w-4 text-primary" />
      ) : (
        <Square className="h-4 w-4 text-muted-foreground" />
      )}
    </button>
  );
}
