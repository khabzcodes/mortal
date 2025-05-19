"use client";

import NotFound from "@/app/not-found";
import { Editor } from "@/components/editor";
import { getNoteById, updateNoteContent } from "@/rpc/notes";
import { QueryKeys } from "@/rpc/query-keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";
import { Editor as EditorInstance } from "@tiptap/core";
import { EditorHeader } from "@/components/editor/header";

type EditorClientProps = {
  noteId: string;
};
export const EditorClient = ({ noteId }: EditorClientProps) => {
  const [editor, setEditor] = useState<EditorInstance | null>(null);
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: [QueryKeys.GET_NODE_BY_ID, noteId],
    queryFn: () => getNoteById(noteId),
  });

  const mutation = useMutation({
    mutationFn: (content: string) => updateNoteContent(noteId, content),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_NODE_BY_ID, noteId],
      });
    },
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

  const handleUpdate = async () => {
    const content = editor?.getJSON();
    if (!content) return;

    const contentString = JSON.stringify(content);
    try {
      await mutation.mutateAsync(contentString);
    } catch (error) {
      console.error("Error updating note content:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <EditorHeader
        title={formattedNote.title}
        description={formattedNote.description}
        lastSyncedAt={
          formattedNote.updatedAt
            ? formattedNote.updatedAt
            : formattedNote.createdAt
        }
        onSave={handleUpdate}
        isSaving={mutation.isPending}
      />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={80}>
          <Editor
            note={formattedNote}
            onUpdate={setEditor}
            onCreate={setEditor}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20}>
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-lg font-semibold">Ask AI</h2>
            <span className="text-sm text-gray-500"> (Coming soon)</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
