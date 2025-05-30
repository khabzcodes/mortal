"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { toast } from "sonner";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { createProject, getProjects } from "@/rpc/projects";
import { QueryKeys } from "@/rpc/query-keys";
import { Icons } from "./icons";
import { Skeleton } from "./ui/skeleton";

export function NavProjects() {
  const { isMobile } = useSidebar();
  const { push } = useRouter();

  const { data: projects, isPending } = useQuery({
    queryKey: [QueryKeys.GET_PROJECTS],
    queryFn: () => getProjects(4),
  });

  const mutation = useMutation({
    mutationFn: () => createProject(),
    onSuccess: (data) => {
      toast.success(`Project "${data.name}" created successfully!`);
      push(`/projects/${data.id}`);
    },
    onError: (error) => {
      toast.error(`Failed to create project: ${error.message}`);
    },
  });

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex items-center justify-between">
        Projects
        <span className="text-muted-foreground">
          {!mutation.isPending ? (
            <Icons.addSquare className="size-4 cursor-pointer" onClick={() => mutation.mutate()} />
          ) : (
            <Loader className="size-4 animate-spin" />
          )}
        </span>
      </SidebarGroupLabel>
      <SidebarMenu className="!mt-0">
        {isPending && !projects ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <SidebarMenuItem key={idx}>
                <SidebarMenuButton asChild>
                  <Link href="#" className="flex items-center gap-2cursor-not-allowed">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-full rounded" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </div>
        ) : (
          <div>
            {projects?.map((project, idx) => (
              <SidebarMenuItem key={idx}>
                <SidebarMenuButton asChild>
                  <Link rel="preload" href={`/projects/${project.id}`} className="flex items-center gap-2">
                    <Icons.folder className="text-sidebar-foreground" />
                    <span>{project.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </div>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
