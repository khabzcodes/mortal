"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Icons } from "./icons";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: keyof typeof Icons;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, idx) => {
          const Icon = Icons[item.icon as keyof typeof Icons];
          return (
            <Link key={idx} href={item.url}>
              <SidebarMenuItem key={idx}>
                <SidebarMenuButton tooltip={item.title}>
                  {Icon && <Icon className="mr-2 h-4 w-4" />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
