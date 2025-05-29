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
import { organization } from "@/lib/auth-client";
import { Skeleton } from "./ui/skeleton";
import { Organization } from "better-auth/plugins";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  activeWorkspaceId: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | undefined | null;
  };
};

export function AppSidebar({
  activeWorkspaceId,
  user,
  ...props
}: AppSidebarProps) {
  const [workspaces, setWorkspaces] = React.useState<Organization[]>();
  React.useEffect(() => {
    const listWorkspaces = async () => {
      const { data } = await organization.list();
      if (data) {
        setWorkspaces(data);
      }
    };
    listWorkspaces();
  }, []);
  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-dashed">
      <SidebarHeader>
        {workspaces ? (
          <WorkspaceSwitcher
            workspaces={
              workspaces.map((workspace) => ({
                id: workspace.id,
                name: workspace.name,
                plan: "Free plan",
              })) || []
            }
            activeWorkspaceId={activeWorkspaceId}
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
        <NavUser
          user={{
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
