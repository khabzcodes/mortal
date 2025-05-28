"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { WorkspaceSwitcher } from "@/components/workspace-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { dashboardConfig } from "@/config/dashboard.config";
import { useActiveOrganization, useListOrganizations } from "@/lib/auth-client";
import { Skeleton } from "./ui/skeleton";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: workspaces } = useListOrganizations();
  const { data: activeWorkspace } = useActiveOrganization();
  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-dashed">
      <SidebarHeader>
        {workspaces && activeWorkspace ? (
          <WorkspaceSwitcher
            workspaces={
              workspaces.map((workspace) => ({
                id: workspace.id,
                name: workspace.name,
                plan: "Free plan",
              })) || []
            }
            activeWorkspaceId={activeWorkspace.id}
          />
        ) : (
          <div className="flex items-center justify-between px-2 gap-2">
            <Skeleton className="h-9 w-9 rounded-xl" />
            <Skeleton className="h-9 w-full rounded-xl" />
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={dashboardConfig.navItems} />
        <NavProjects />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
