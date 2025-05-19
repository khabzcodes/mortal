import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PopoverContent,
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import { useRef } from "react";

export const LinkSelector = ({ editor }: { editor: Editor }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const editorState = useEditorState({
    editor,
    selector: (instance) => ({
      isLink: instance.editor.isActive("link"),
      getLink: instance.editor.getAttributes("link").href,
      isMath: instance.editor.isActive("math"),
    }),
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-none flex-shrink-0"
          disabled={editorState.isMath}
        >
          <Icons.link
            className={cn("size-4", {
              "text-primary": editorState.isLink,
            })}
            strokeWidth={2.5}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-fit shadow-xl rounded-none border border-dashed p-1"
        align="end"
      >
        <form
          className="flex space-x-1 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            const url = inputRef.current?.value;
            if (!url) return;
            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href: url })
              .run();
          }}
        >
          <Input
            ref={inputRef}
            placeholder="https://example.com"
            defaultValue={editorState.getLink}
          />
          {editorState.isLink ? (
            <Button
              variant="destructive"
              size="icon"
              type="button"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }}
            >
              <Icons.trash className="size-4" />
            </Button>
          ) : (
            <Button size="icon">
              <Icons.checkMarkCircle className="size-4" />
            </Button>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
};
