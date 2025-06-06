import Placeholder from "@tiptap/extension-placeholder";
import { Editor, EditorContent, EditorContext, useEditor } from "@tiptap/react";

import { defaultExtensions } from "@/components/editor/extensions/default-extensions";
import { CodeBlockLanguageMenu } from "@/components/editor/menus/codeblock-language-menu";
import { DefaultBubbleMenu } from "@/components/editor/menus/default-bubble-menu";
import { TableOptionsMenu } from "@/components/editor/menus/table-options-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

import { Ai } from "@/components/editor/extensions/ai";

import "@/components/editor/simple-editor.scss";

import { toast } from "sonner";

import { SlashCommand } from "@/components/editor/extensions/slash-command/slash-command";
import { getSuggestion } from "@/components/editor/extensions/slash-command/suggestion";

type OverviewEditorProps = {
  source: {
    id: string;
    content: string | undefined | null;
  };
  onUpdate(editor: Editor): void;
  onCreate(editor: Editor): void;
};

export function OverviewEditor({ source, onUpdate }: OverviewEditorProps) {
  const editor = useEditor({
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
    },
    content: source.content ? JSON.parse(source.content) : undefined,
  });

  return (
    <EditorContext.Provider value={{ editor }}>
      <div className="content-wrapper">
        <ScrollArea className="h-[90vh] p-4">
          <div className="pt-2 pb-10">
            <EditorContent editor={editor} className="prose dark:prose-invert focus:outline-none max-w-full">
              <DefaultBubbleMenu editor={editor} showAiTools={true} />
              <CodeBlockLanguageMenu editor={editor} />
              <TableOptionsMenu editor={editor} />
            </EditorContent>
          </div>
        </ScrollArea>
      </div>
    </EditorContext.Provider>
  );
}
