"use client";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import { UserProfile } from "../user-profile";
import ThemeToggler from "../theme/toggler";

type EditorHeaderProps = {
  title: string;
  description: string;
};

export const EditorHeader = ({ title, description }: EditorHeaderProps) => {
  const { data: session, isPending } = useSession();
  return (
    <div
      id="nav"
      className="w-full flex items-center justify-end border-b border-dashed divide-x"
    >
      <div
        id="brand"
        className="flex-col font-mono flex-1 flex h-full px-3 border-dashed"
      >
        {title}
        <span className="text-muted-foreground/70 text-xs truncate">
          {description}
        </span>
      </div>
      {!isPending &&
        (session ? (
          <Button
            className="h-full border-dashed"
            size="lg"
            variant="ghost"
            asChild
          >
            <Link
              href="/dashboard"
              className="flex items-center gap-2 group/nav"
            >
              <span>Dashboard</span>
              <div className="relative z-10 size-4 overflow-hidden flex items-center justify-center">
                <ArrowUpRight className="-z-10 absolute opacity-100 scale-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/nav:-translate-y-5 group-hover/nav:translate-x-5 group-hover/nav:opacity-0 group-hover/nav:scale-0 transition-all duration-200" />
                <ArrowUpRight className="absolute -z-10 -bottom-4 -left-4 opacity-0 scale-0 group-hover/nav:-translate-y-[15px] group-hover/nav:translate-x-4 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-200" />
              </div>
            </Link>
          </Button>
        ) : (
          <Button
            className="h-full border-dashed"
            size="lg"
            variant="ghost"
            asChild
          >
            <Link href="/sign-in" className="flex items-center gap-2 group/nav">
              <span>Sign In</span>
              <div className="relative z-10 size-4 overflow-hidden flex items-center justify-center">
                <ArrowUpRight className="-z-10 absolute opacity-100 scale-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/nav:-translate-y-5 group-hover/nav:translate-x-5 group-hover/nav:opacity-0 group-hover/nav:scale-0 transition-all duration-200" />
                <ArrowUpRight className="absolute -z-10 -bottom-4 -left-4 opacity-0 scale-0 group-hover/nav:-translate-y-[15px] group-hover/nav:translate-x-4 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-200" />
              </div>
            </Link>
          </Button>
        ))}
      <UserProfile className="border-dashed size-10 md:size-14" />
      <ThemeToggler className="border-dashed size-10 md:size-14" />
    </div>
  );
};
