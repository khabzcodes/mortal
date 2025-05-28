import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProject } from "@/rpc/projects";
import { QueryKeys } from "@/rpc/query-keys";
import { UpdateProjectInputValidation } from "@/validations/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type ProjectHeaderProps = {
  id: string;
  name: string;
};

export const ProjectHeader = ({ project }: { project: ProjectHeaderProps }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>(project.name);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateProjectInputValidation) =>
      updateProject(project.id, data),
    onSuccess: (data) => {
      toast.success("Project name successfully updated.");
      setIsEdit(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update project name.");
      setProjectName(project.name);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_PROJECTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_PROJECT_BY_ID, project.id],
      });
    },
  });
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {isEdit ? (
          <div className="flex items-center gap-2">
            <Input
              className="w-64"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
              autoFocus
            />
            <Button
              disabled={
                mutation.isPending ||
                projectName === project.name ||
                projectName.trim() === ""
              }
              size="icon"
              variant="outline"
              onClick={async (e) => {
                e.preventDefault();
                await mutation.mutateAsync({ name: projectName });
              }}
            >
              <Icons.checkMarkCircle />
            </Button>
            <Button
              disabled={mutation.isPending}
              size="icon"
              variant="destructive"
              onClick={() => {
                setProjectName(project.name);
                setIsEdit(false);
              }}
            >
              <Icons.cancelCircle />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">{project.name}</h1>
            <Icons.edit
              className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-primary"
              onClick={() => setIsEdit(true)}
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" className="w-32">
          <Icons.share className="h-4 w-4" />
          Share
        </Button>
        <Button size="sm" variant="outline" className="border-dashed w-32">
          <Icons.idea className="h-4 w-4" />
          Ask AI
        </Button>
      </div>
    </div>
  );
};
