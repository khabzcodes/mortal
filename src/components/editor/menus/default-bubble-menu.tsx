import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Editor, isTextSelection } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/react";
import { NodeSelector } from "./selectors/node-selector";
import { Separator } from "@/components/ui/separator";
import { TextStylesSelector } from "./selectors/text-styles-selector";
import { TextAlignSelector } from "./selectors/text-align-selector";
import { AiSelector } from "./selectors/ai-selector";

export const DefaultBubbleMenu = ({
  editor,
  showAiTools,
}: {
  editor: Editor | null;
  showAiTools?: boolean;
}) => {
  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{
        placement: "top",
        hideOnClick: false,
        moveTransition: "transform 0.2s ease-in-out",
      }}
      shouldShow={({ editor, state }) => {
        const { selection } = state;
        const { empty } = selection;

        if (!editor.isEditable) return false;
        if (empty) return false;
        if (isTextSelection(selection)) return true;

        if (editor.isActive("codeBlock")) return false;

        return true;
      }}
    >
      <ScrollArea className="max-w-[90vw] border border-dashed bg-popover shadow-xl">
        <div className="flex">
          {showAiTools && (
            <>
              <AiSelector editor={editor} />
              <Separator orientation="vertical" className="h-10" />
            </>
          )}
          <NodeSelector editor={editor} />
          <Separator orientation="vertical" className="h-10" />
          <TextStylesSelector editor={editor} />
          <Separator orientation="vertical" className="h-10" />
          <TextAlignSelector editor={editor} />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </BubbleMenu>
  );
};
