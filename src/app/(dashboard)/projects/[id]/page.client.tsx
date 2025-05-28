"use client";

import { getProject } from "@/rpc/projects";
import { QueryKeys } from "@/rpc/query-keys";
import { useQuery } from "@tanstack/react-query";
import { ProjectHeader } from "./_components/header.";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/icons";

export const ProjectClientPage = ({ projectId }: { projectId: string }) => {
  const { data: project, isPending } = useQuery({
    queryKey: [QueryKeys.GET_PROJECT_BY_ID, projectId],
    queryFn: () => getProject(projectId),
    refetchOnWindowFocus: false,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-2">
      <ProjectHeader
        project={{
          id: project?.id || "",
          name: project?.name || "",
        }}
      />
      <div className="flex flex-col gap-2" />
      <Tabs className="w-full" defaultValue="overview">
        <TabsList className="w-full">
          <TabsTrigger value="overview">
            <Icons.profile className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="board">
            <Icons.dashboardSquare className="h-4 w-4" />
            Board
          </TabsTrigger>
          <TabsTrigger value="files">
            <Icons.files className="h-4 w-4" />
            Files
          </TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
