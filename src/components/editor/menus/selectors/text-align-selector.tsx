import { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, ChevronDownIcon, LucideIcon } from "lucide-react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SelectorResult {
  isLeft: boolean;
  isCenter: boolean;
  isRight: boolean;
}

interface MenuItem {
  title: string;
  icon: LucideIcon;
  onClick: (editor: Editor) => void;
  isActive: (state: SelectorResult) => boolean;
}

const items: MenuItem[] = [
  {
    title: "Left",
    icon: AlignLeftIcon,
    onClick: (editor: Editor) => {
      editor.chain().focus().setTextAlign("left").run();
    },
    isActive: (state: SelectorResult) => state.isLeft,
  },
  {
    title: "Center",
    icon: AlignLeftIcon,
    onClick: (editor: Editor) => {
      editor.chain().focus().setTextAlign("center").run();
    },
    isActive: (state: SelectorResult) => state.isCenter,
  },
  {
    title: "Right",
    icon: AlignCenterIcon,
    onClick: (editor: Editor) => {
      editor.chain().focus().setTextAlign("right").run();
    },
    isActive: (state: SelectorResult) => state.isRight,
  },
];

export const TextAlignSelector = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (instance) => ({
      isLeft: instance.editor.isActive("textAlign", { textAlign: "left" }),
      isCenter: instance.editor.isActive("textAlign", { textAlign: "center" }),
      isRight: instance.editor.isActive("textAlign", { textAlign: "right" }),
    }),
  });

  const activeItem = items.find((item) => item.isActive(editorState)) ?? items[0]!;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="rounded-none">
          <activeItem.icon className="size-4 me-2" strokeWidth={2.5} />
          <ChevronDownIcon className="size-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1 shadow-xl w-32" align="end">
        {items.map((item, idx) => {
          return (
            <div
              key={idx}
              onClick={() => item.onClick(editor)}
              className="flex space-x-2 items-center rounded-md hover:bg-accent px-2 py-1.5 text-accent-foreground cursor-pointer"
            >
              <item.icon className="size-4" />
              <span className="text-sm">{item.title}</span>
              <div className="flex-1" />
              {item.isActive(editorState) && <Icons.checkMarkCircle className="size-3.5" />}
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};
