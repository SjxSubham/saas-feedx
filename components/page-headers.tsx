"use client";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignUpButton,
} from "@clerk/nextjs";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import HeaderMenu from "./header-menu";
import Loading from "@/app/(user)/loading";
import ThemeToggleButton from "@/components/ThemeToggleButton";

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

interface PageHeaderProps {
  notifications?: Notification[];
  unreadCount?: number;
}

const PageHeader = ({
  notifications = [],
  unreadCount = 0,
}: PageHeaderProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <header className="w-full justify-between sticky inset-x-0 top-0 z-30 transition-all bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="w-full max-w-screen-xl px-2.5 lg:px-20 relative mx-auto">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="relative group">
            {loading ? (
              <Loading />
            ) : (
              <div className="relative w-[110px] h-[90px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/image.svg"
                  alt="FeedX Logo"
                  width={100}
                  height={90}
                  className="object-contain h-14 dark:invert"
                  priority
                />
              </div>
            )}
          </Link>
          <div className="flex items-center gap-6">
            <SignedOut>
              <SignInButton>
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity rounded-full px-6 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                  Get Started
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-4">
                <ThemeToggleButton />
                <HeaderMenu
                  notifications={notifications}
                  unreadCount={unreadCount}
                />
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
