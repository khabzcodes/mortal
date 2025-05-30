import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { updateProjectOverview } from "@/rpc/projects";
import { OverviewEditor } from "./overview-editor";

type ProjectOverviewProps = {
  projectId: string;
  overview: string | undefined | null;
};
export const ProjectOverview = ({ projectId, overview }: ProjectOverviewProps) => {
  const [overviewState, setOverviewState] = useState<string | undefined | null>(overview);
  const [hasChanges, setHasChanges] = useState(false);

  const mutation = useMutation({
    mutationFn: () => updateProjectOverview(projectId, { overview: overviewState }),
    onSuccess: () => {
      toast.success("Project overview updated successfully!");
      setHasChanges(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update project overview");
      setHasChanges(false);
    },
  });

  const handleUpdate = (editorContent: string) => {
    setOverviewState(editorContent);
    setHasChanges(true);
  };

  const handSaveChanges = async () => {
    await mutation.mutateAsync();
  };

  return (
    <div className="relative">
      <OverviewEditor
        source={{
          id: projectId,
          content: overview || null,
        }}
        onCreate={(editor) => {
          console.log("Created editor:", editor);
        }}
        onUpdate={(editor) => {
          const jsonContent = editor.getJSON();
          const content = JSON.stringify(jsonContent);
          handleUpdate(content);
        }}
      />
      {hasChanges && (
        <div className="absolute bottom-20 right-4 border-1 border-dashed p-4 shadow-2xl">
          <p className="text-sm text-muted-foreground">Do you want to save your changes?</p>
          <div className="flex justify-end gap-2 mt-2">
            <Button
              disabled={mutation.isPending}
              size="sm"
              variant="outline"
              className="border-dashed"
              onClick={handSaveChanges}
            >
              Save
            </Button>
            <Button disabled={mutation.isPending} size="sm" onClick={() => setHasChanges(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
