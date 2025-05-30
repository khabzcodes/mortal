"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ChevronsUpDown, FrameIcon, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { organization } from "@/lib/auth-client";

export function WorkspaceSwitcher({
  workspaces,
  activeWorkspaceId,
}: {
  workspaces: {
    id: string;
    name: string;
    plan: string;
  }[];
  activeWorkspaceId: string;
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const [activeWorkspace, setActiveWorkspace] = React.useState(
    workspaces.find((workspace) => workspace.id === activeWorkspaceId)
  );

  if (!activeWorkspace) {
    return null;
  }

  const onSwitchWorkspace = async (workspaceId: string) => {
    await organization.setActive(
      {
        organizationId: workspaceId,
      },
      {
        onSuccess: () => {
          window.location.reload();
        },
      }
    );
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-green-500 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-xl">
                <FrameIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeWorkspace.name}</span>
                <span className="truncate text-xs">{activeWorkspace.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">Workspaces</DropdownMenuLabel>
            {workspaces.map((workspace, idx) => (
              <DropdownMenuItem
                key={workspace.name}
                onClick={() => {
                  if (activeWorkspace.id !== workspace.id) {
                    onSwitchWorkspace(workspace.id);
                  }
                }}
                className="gap-2 p-2"
              >
                <span className="truncate">{workspace.name}</span>
                <DropdownMenuShortcut>⌘{idx + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add new workspace</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
