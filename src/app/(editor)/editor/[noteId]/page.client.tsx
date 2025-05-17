"use client";

import NotFound from "@/app/not-found";
import { Editor } from "@/components/editor";
import { EditorHeader } from "@/components/editor/header";
import { getNoteById } from "@/rpc/notes";
import { QueryKeys } from "@/rpc/query-keys";
import { useQuery } from "@tanstack/react-query";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

type EditorClientProps = {
  noteId: string;
};
export const EditorClient = ({ noteId }: EditorClientProps) => {
  const { data, isPending, error } = useQuery({
    queryKey: [QueryKeys.GET_NODE_BY_ID, noteId],
    queryFn: () => getNoteById(noteId),
  });

  if (isPending) return <div>Loading...</div>;

  if (!data) {
    return <NotFound />;
  }

  const formattedNote = {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
  };

  return (
    <div className="flex flex-col">
      <EditorHeader
        title={formattedNote.title}
        description={formattedNote.description}
      />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={80}>
          <Editor />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20}>Two</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
