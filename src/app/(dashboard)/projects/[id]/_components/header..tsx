import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type ProjectHeaderProps = {
  id: string;
  name: string;
};

export const ProjectHeader = ({ project }: { project: ProjectHeaderProps }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>(project.name);
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
              onBlur={() => setIsEdit(false)}
              autoFocus
            />
            <Icons.checkMarkCircle
              className="h-4 w-4 cursor-pointer text-primary hover:text-primary/80"
              onClick={() => {
                // Here you would typically save the updated project name
                setIsEdit(false);
              }}
            />
            <Icons.cancelCircle
              className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-primary"
              onClick={() => {
                setProjectName(project.name);
                setIsEdit(false);
              }}
            />
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
        <Button size="sm">
          <Icons.share className="h-4 w-4" />
          Share
        </Button>
        <Button size="sm" variant="outline" className="border-dashed">
          <Icons.idea className="h-4 w-4" />
          Ask AI
        </Button>
      </div>
    </div>
  );
};
