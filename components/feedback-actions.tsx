"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoreHorizontal,
  Eye,
  EyeOff,
  Pin,
  PinOff,
  Archive,
  ArchiveRestore,
  Trash2,
  MessageSquare,
  Loader2,
  Send,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  toggleFeedbackRead,
  toggleFeedbackPinned,
  toggleFeedbackArchived,
  deleteFeedback,
  replyToFeedback,
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
  replyMessage: string | null;
  repliedAt: Date | null;
  createdAt: Date | null;
}

interface FeedbackActionsProps {
  feedback: Feedback;
  onUpdate?: () => void;
  variant?: "dropdown" | "buttons";
}

export default function FeedbackActions({
  feedback,
  onUpdate,
  variant = "dropdown",
}: FeedbackActionsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState(feedback.replyMessage || "");

  const handleToggleRead = async () => {
    setIsLoading("read");
    try {
      await toggleFeedbackRead(feedback.id);
      toast.success(feedback.isRead ? "Marked as unread" : "Marked as read");
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to update feedback");
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleTogglePinned = async () => {
    setIsLoading("pin");
    try {
      await toggleFeedbackPinned(feedback.id);
      toast.success(feedback.isPinned ? "Unpinned feedback" : "Pinned feedback");
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to update feedback");
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleToggleArchived = async () => {
    setIsLoading("archive");
    try {
      await toggleFeedbackArchived(feedback.id);
      toast.success(
        feedback.isArchived ? "Restored feedback" : "Archived feedback"
      );
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to update feedback");
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleDelete = async () => {
    setIsLoading("delete");
    try {
      await deleteFeedback(feedback.id);
      toast.success("Feedback deleted successfully");
      setIsDeleteDialogOpen(false);
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to delete feedback");
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleReply = async () => {
    if (!replyMessage.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    setIsLoading("reply");
    try {
      await replyToFeedback(feedback.id, replyMessage);
      toast.success("Reply sent successfully");
      setIsReplyDialogOpen(false);
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to send reply");
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  if (variant === "buttons") {
    return (
      <>
        <div className="flex items-center gap-1">
          {/* Read/Unread Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleToggleRead}
            disabled={isLoading !== null}
            title={feedback.isRead ? "Mark as unread" : "Mark as read"}
          >
            {isLoading === "read" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : feedback.isRead ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-blue-500" />
            )}
          </Button>

          {/* Pin Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleTogglePinned}
            disabled={isLoading !== null}
            title={feedback.isPinned ? "Unpin" : "Pin"}
          >
            {isLoading === "pin" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : feedback.isPinned ? (
              <PinOff className="h-4 w-4 text-purple-500" />
            ) : (
              <Pin className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>

          {/* Archive Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleToggleArchived}
            disabled={isLoading !== null}
            title={feedback.isArchived ? "Restore" : "Archive"}
          >
            {isLoading === "archive" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : feedback.isArchived ? (
              <ArchiveRestore className="h-4 w-4 text-yellow-500" />
            ) : (
              <Archive className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>

          {/* Reply Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsReplyDialogOpen(true)}
            disabled={isLoading !== null}
            title="Reply"
          >
            <MessageSquare
              className={`h-4 w-4 ${
                feedback.repliedAt ? "text-green-500" : "text-muted-foreground"
              }`}
            />
          </Button>

          {/* Delete Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => setIsDeleteDialogOpen(true)}
            disabled={isLoading !== null}
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Delete Confirmation Dialog */}
        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          isLoading={isLoading === "delete"}
          feedbackName={feedback.userName}
        />

        {/* Reply Dialog */}
        <ReplyDialog
          isOpen={isReplyDialogOpen}
          onClose={() => setIsReplyDialogOpen(false)}
          onSubmit={handleReply}
          isLoading={isLoading === "reply"}
          feedback={feedback}
          replyMessage={replyMessage}
          setReplyMessage={setReplyMessage}
        />
      </>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {/* Read/Unread */}
          <DropdownMenuItem onClick={handleToggleRead} disabled={isLoading !== null}>
            {feedback.isRead ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Mark as unread
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Mark as read
              </>
            )}
          </DropdownMenuItem>

          {/* Pin/Unpin */}
          <DropdownMenuItem onClick={handleTogglePinned} disabled={isLoading !== null}>
            {feedback.isPinned ? (
              <>
                <PinOff className="mr-2 h-4 w-4" />
                Unpin feedback
              </>
            ) : (
              <>
                <Pin className="mr-2 h-4 w-4" />
                Pin feedback
              </>
            )}
          </DropdownMenuItem>

          {/* Archive/Restore */}
          <DropdownMenuItem
            onClick={handleToggleArchived}
            disabled={isLoading !== null}
          >
            {feedback.isArchived ? (
              <>
                <ArchiveRestore className="mr-2 h-4 w-4" />
                Restore feedback
              </>
            ) : (
              <>
                <Archive className="mr-2 h-4 w-4" />
                Archive feedback
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Reply */}
          <DropdownMenuItem
            onClick={() => setIsReplyDialogOpen(true)}
            disabled={isLoading !== null}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            {feedback.repliedAt ? "Edit reply" : "Reply to feedback"}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Delete */}
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            disabled={isLoading !== null}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete feedback
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        isLoading={isLoading === "delete"}
        feedbackName={feedback.userName}
      />

      {/* Reply Dialog */}
      <ReplyDialog
        isOpen={isReplyDialogOpen}
        onClose={() => setIsReplyDialogOpen(false)}
        onSubmit={handleReply}
        isLoading={isLoading === "reply"}
        feedback={feedback}
        replyMessage={replyMessage}
        setReplyMessage={setReplyMessage}
      />
    </>
  );
}

// Delete Confirmation Dialog
function DeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  feedbackName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  feedbackName: string | null;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            Delete Feedback
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this feedback from{" "}
            <strong>{feedbackName || "Unknown"}</strong>? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Reply Dialog
function ReplyDialog({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  feedback,
  replyMessage,
  setReplyMessage,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  feedback: Feedback;
  replyMessage: string;
  setReplyMessage: (value: string) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Reply to Feedback
          </DialogTitle>
          <DialogDescription>
            Send a reply to <strong>{feedback.userName || "Unknown"}</strong>
            {feedback.userEmail && ` (${feedback.userEmail})`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Original Message */}
          <div className="bg-muted/50 rounded-lg p-3">
            <Label className="text-xs text-muted-foreground">
              Original message:
            </Label>
            <p className="text-sm mt-1">{feedback.message || "No message"}</p>
          </div>

          {/* Reply Input */}
          <div className="grid gap-2">
            <Label htmlFor="reply">Your reply</Label>
            <Textarea
              id="reply"
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your reply here..."
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Previous Reply Info */}
          {feedback.repliedAt && (
            <p className="text-xs text-muted-foreground">
              Previously replied on{" "}
              {new Date(feedback.repliedAt).toLocaleDateString()}
            </p>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isLoading || !replyMessage.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Reply
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
