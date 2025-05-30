import { useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/core";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const COLORS = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#ffffff" },
  { name: "Gray", value: "#6b7280" },
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Yellow", value: "#eab308" },
  { name: "Green", value: "#22c55e" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Purple", value: "#a855f7" },
  { name: "Pink", value: "#ec4899" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Lime", value: "#84cc16" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Emerald", value: "#10b981" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Fuchsia", value: "#d946ef" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Slate", value: "#64748b" },
  { name: "Zinc", value: "#3f3f46" },
  { name: "Neutral", value: "#a1a1aa" },
  { name: "Stone", value: "#78716c" },
];

export const TextColorSelector = ({ editor }: { editor: Editor }) => {
  const [currentColor, setCurrentColor] = useState<string | null>(editor.getAttributes("textStyle").color);

  useEffect(() => {
    const updateColor = () => {
      setCurrentColor(editor.getAttributes("textStyle").color);
    };

    editor.on("update", updateColor);

    updateColor();

    return () => {
      editor.off("update", updateColor);
    };
  }, [editor]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className={cn("w-9 h-9 p-0")} title="Text color">
          <div className="flex flex-col items-center justify-center w-full">
            <span className="sr-only">Text color</span>
            <Icons.textColor
              style={{
                color: editor.getAttributes("textStyle").color || "#000000",
              }}
            />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52">
        <div className="space-y-2">
          <div className="grid grid-cols-5 gap-1">
            {COLORS.map((color, idx) => (
              <Button
                size="icon"
                variant="outline"
                style={{
                  backgroundColor: color.value,
                }}
                className="rounded-xl h-6 w-6 p-0 flex items-center justify-center"
                key={idx}
                onClick={() => editor.chain().focus().setColor(color.value).run()}
                data-testid={`set${color.name.toLowerCase()}`}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
