"use client";

import { useQuery } from "@tanstack/react-query";

import { Icons } from "@/components/icons";
import { ProjectOverview } from "@/components/projects/overview/overview";
import { OverviewEditor } from "@/components/projects/overview/overview-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProject } from "@/rpc/projects";
import { QueryKeys } from "@/rpc/query-keys";
import { ProjectHeader } from "./_components/header.";

export const ProjectClientPage = ({ projectId }: { projectId: string }) => {
  const { data: project, isPending } = useQuery({
    queryKey: [QueryKeys.GET_PROJECT_BY_ID, projectId],
    queryFn: () => getProject(projectId),
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
        <TabsContent value="overview">
          <ProjectOverview projectId={projectId} overview={project?.overview ?? null} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
