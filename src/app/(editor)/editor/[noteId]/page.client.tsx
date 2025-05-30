"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Editor as EditorInstance } from "@tiptap/core";

import NotFound from "@/app/not-found";
import { Editor } from "@/components/editor";
import { EditorHeader } from "@/components/editor/header";
import { TextEditor } from "@/components/text-editor/text-editor";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useSession } from "@/lib/auth-client";
import { getNoteById, updateNoteContent } from "@/rpc/notes";
import { QueryKeys } from "@/rpc/query-keys";

type EditorClientProps = {
  noteId: string;
};
export const EditorClient = ({ noteId }: EditorClientProps) => {
  const [editor, setEditor] = useState<EditorInstance | null>(null);
  const queryClient = useQueryClient();

  const { data: session } = useSession();

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

  if (isPending || !session?.user) return <div>Loading...</div>;

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
    <main className="min-h-full" id="editor">
      <TextEditor className="w-full rounded-xl" />
    </main>
  );
};
