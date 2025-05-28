"use client";

import * as React from "react";
import {
  EditorContent,
  EditorContext,
  useEditor,
  Editor as EditorInstance,
} from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

import { Ai } from "@/components/editor/extensions/ai";
import "@/components/editor/simple-editor.scss";

import { ScrollArea } from "../ui/scroll-area";
import { Note } from "@/types/notes";
import { cn } from "@/lib/utils";
import { SlashCommand } from "./extensions/slash-command/slash-command";
import { getSuggestion } from "./extensions/slash-command/suggestion";
import { defaultExtensions } from "./extensions/default-extensions";
import { toast } from "sonner";
import { DefaultBubbleMenu } from "./menus/default-bubble-menu";
import { CodeBlockLanguageMenu } from "./menus/codeblock-language-menu";
import { RealtimeCursors } from "./realtime-cursors";
import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { TableOptionsMenu } from "./menus/table-options-menu";

type EditorProps = {
  note: Note;
  user: {
    id: string;
    name: string;
  };
  enableRealtime?: boolean;
  onUpdate: (editor: EditorInstance) => void;
  onCreate: (editor: EditorInstance) => void;
};

const supabase = createClient();

export function Editor({
  note,
  enableRealtime,
  onUpdate,
  onCreate,
  user,
}: EditorProps) {
  const channelRef = useRef<any>(null);

  useEffect(() => {
    if (!note.id && enableRealtime) return;

    channelRef.current = supabase.channel(`realtime:note-${note.id}`);
    channelRef.current.subscribe();

    return () => {
      if (channelRef.current && enableRealtime) {
        channelRef.current.unsubscribe();
      }
    };
  }, [note.id, enableRealtime]);

  const editor = useEditor(
    {
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          "aria-label": "Main content area, start typing to enter text.",
        },
      },
      extensions: [
        ...defaultExtensions,
        Placeholder.configure({
          placeholder: "Type  /  for commands...",
          emptyEditorClass: cn("is-editor-empty text-gray-400"),
          emptyNodeClass: cn("is-empty text-gray-400"),
        }),
        Ai.configure({
          onError: (error) => {
            toast.error(error.message);
          },
        }),
        SlashCommand.configure({
          suggestion: getSuggestion({ ai: true }),
        }),
      ],
      onUpdate: ({ editor }) => {
        onUpdate(editor);

        if (channelRef.current && enableRealtime) {
          const html = editor.getHTML();
          channelRef.current.send({
            type: "broadcast",
            event: "doc-update",
            payload: { html },
          });
        }
      },
      onCreate: ({ editor }) => {
        onCreate(editor);
      },
      content: note.content ? JSON.parse(note.content!) : note.content,
      immediatelyRender: true,
      shouldRerenderOnTransaction: false,
    },
    [note.content, note.id, onUpdate, onCreate]
  );

  useEffect(() => {
    if (!note.id || !editor || !channelRef.current) return;

    const handleDocUpdate = ({ payload }: any) => {
      if (editor && payload.html !== editor.getHTML()) {
        editor.commands.setContent(payload.html, false);
      }
    };

    channelRef.current.on(
      "broadcast",
      { event: "doc-update" },
      handleDocUpdate
    );

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }
    };
  }, [editor, note.id]);

  return (
    <EditorContext.Provider value={{ editor }}>
      <div className="content-wrapper">
        <ScrollArea className="h-svh">
          <div className="py-4">
            <EditorContent
              editor={editor}
              className="prose dark:prose-invert focus:outline-none max-w-full z-0 px-32"
            >
              <DefaultBubbleMenu editor={editor} showAiTools={true} />
              <CodeBlockLanguageMenu editor={editor} />
              <TableOptionsMenu editor={editor} />
              <RealtimeCursors
                roomName={`cursor-note-${note.id}`}
                username={user.name}
                userId={user.id}
              />
            </EditorContent>
          </div>
        </ScrollArea>
      </div>
    </EditorContext.Provider>
  );
}
