import ThemeToggler from "@/components/theme/toggler";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/user-profile";
import { siteConfig } from "@/config/site.config";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const DashboardNavbar = () => {
  return (
    <div
      id="nav"
      className="border-b border-dashed flex items-center justify-between"
    >
      <div
        id="brand"
        className="h-full md:border-r border-dashed w-[300px] flex items-center justify-center"
      >
        <Button
          variant="ghost"
          className="w-full h-full font-heading text-lg md:text-2xl font-bold"
          asChild
        >
          <Link href="/" className="item-center justify-start">
            <span>{siteConfig.name}</span>
          </Link>
        </Button>
      </div>
      <div className="flex-1 flex items-center justify-end h-full border-dashed divide-x">
        <Button
          className="h-full border-l border-dashed"
          size="lg"
          variant="ghost"
          asChild
        >
          <a
            href={siteConfig.socials.x}
            target="_blank"
            className="flex items-center gap-2 group/nav"
          >
            <span>X</span>
            <div className="relative z-10 size-4 overflow-hidden flex items-center justify-center">
              <ArrowUpRight className="-z-10 absolute opacity-100 scale-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/nav:-translate-y-5 group-hover/nav:translate-x-5 group-hover/nav:opacity-0 group-hover/nav:scale-0 transition-all duration-200" />
              <ArrowUpRight className="absolute -z-10 -bottom-4 -left-4 opacity-0 scale-0 group-hover/nav:-translate-y-[15px] group-hover/nav:translate-x-4 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-200" />
            </div>
          </a>
        </Button>
        <Button
          className="h-full border-l border-dashed"
          size="lg"
          variant="ghost"
          asChild
        >
          <a
            href={siteConfig.socials.github}
            target="_blank"
            className="flex items-center gap-2 group/nav"
          >
            <span>Github</span>
            <div className="relative z-10 size-4 overflow-hidden flex items-center justify-center">
              <ArrowUpRight className="-z-10 absolute opacity-100 scale-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/nav:-translate-y-5 group-hover/nav:translate-x-5 group-hover/nav:opacity-0 group-hover/nav:scale-0 transition-all duration-200" />
              <ArrowUpRight className="absolute -z-10 -bottom-4 -left-4 opacity-0 scale-0 group-hover/nav:-translate-y-[15px] group-hover/nav:translate-x-4 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-200" />
            </div>
          </a>
        </Button>
        <ThemeToggler className="h-full border-dashed size-10 md:size-14" />
        <UserProfile className="size-10 md:size-14" />
      </div>
    </div>
  );
};
