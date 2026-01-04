"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify, X, Folder, CreditCard, Activity } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NotificationBell from "@/components/notification-bell";

interface Notification {
  id: number;
  type: string | null;
  title: string | null;
  message: string | null;
  isRead: boolean | null;
  createdAt: Date | null;
  project?: {
    id: number;
    name: string | null;
  } | null;
  feedback?: {
    id: number;
    userName: string | null;
    rating: number | null;
  } | null;
}

interface HeaderMenuProps {
  notifications?: Notification[];
  unreadCount?: number;
}

const HeaderMenu = ({
  notifications = [],
  unreadCount = 0,
}: HeaderMenuProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Notification Bell */}
      <NotificationBell
        initialNotifications={notifications}
        initialUnreadCount={unreadCount}
      />

      {/* Menu Dropdown */}
      <DropdownMenu open={open} onOpenChange={toggleMenu}>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={toggleMenu}
            className="bg-transparent dark:bg-transparent"
            variant="secondary"
            size="icon"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <AlignJustify className="h-5 w-5" />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex cursor-pointer">
              <Folder className="mr-2 h-4 w-4" />
              <span>Projects</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/payments/subscribe" className="flex cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex cursor-pointer">
              <Activity className="mr-2 h-4 w-4" />
              <span>Activity</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HeaderMenu;
