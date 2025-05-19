import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  LucideIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { LinkSelector } from "./link-selector";

interface SelectorResult {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrike: boolean;
  isCode: boolean;
  isMath: boolean;
}

interface MenuItem {
  icon: LucideIcon;
  onClick: (editor: Editor) => void;
  isActive: (state: SelectorResult) => boolean;
}

const items: MenuItem[] = [
  {
    icon: BoldIcon,
    onClick: (editor: Editor) => {
      editor.chain().focus().toggleBold().run();
    },
    isActive: (state: SelectorResult) => state.isBold,
  },
  {
    icon: ItalicIcon,
    onClick: (editor: Editor) => {
      editor.chain().focus().toggleItalic().run();
    },
    isActive: (state: SelectorResult) => state.isItalic,
  },
  {
    icon: UnderlineIcon,
    onClick: (editor: Editor) => {
      editor.chain().focus().toggleUnderline().run();
    },
    isActive: (state: SelectorResult) => state.isUnderline,
  },
  {
    icon: StrikethroughIcon,
    onClick: (editor: Editor) => {
      editor.chain().focus().toggleStrike().run();
    },
    isActive: (state: SelectorResult) => state.isStrike,
  },
  {
    icon: CodeIcon,
    onClick: (editor: Editor) => {
      editor.chain().focus().toggleCode().run();
    },
    isActive: (state: SelectorResult) => state.isCode,
  },
];

export const TextStylesSelector = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState<SelectorResult>({
    editor,
    selector: (instance) => ({
      isBold: instance.editor.isActive("bold"),
      isItalic: instance.editor.isActive("italic"),
      isUnderline: instance.editor.isActive("underline"),
      isStrike: instance.editor.isActive("strike"),
      isCode: instance.editor.isActive("code"),
      isMath: instance.editor.isActive("math"),
    }),
  });

  return (
    <>
      {items.map((item, idx) => {
        return (
          <Button
            key={idx}
            variant="ghost"
            size="icon"
            disabled={editorState.isMath}
            className="rounded-none flex-shrink-0"
            onClick={() => item.onClick(editor)}
          >
            <item.icon
              className={cn("size-4", {
                "text-primary": item.isActive(editorState),
              })}
            />
          </Button>
        );
      })}
      <LinkSelector editor={editor} />
    </>
  );
};
