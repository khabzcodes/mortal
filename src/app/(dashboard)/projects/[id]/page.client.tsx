"use client";

import { getProject } from "@/rpc/projects";
import { QueryKeys } from "@/rpc/query-keys";
import { useQuery } from "@tanstack/react-query";
import { ProjectHeader } from "./_components/header.";

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
    <>
      <ProjectHeader
        project={{
          id: project?.id || "",
          name: project?.name || "",
        }}
      />
      <div className="flex flex-col gap-2" />
    </>
  );
};
