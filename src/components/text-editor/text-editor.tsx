"use client";

import "./editor.css";

import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor, type Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { TipTapFloatingMenu } from "@/components/text-editor/extensions/floating-menu";
import { FloatingToolbar } from "@/components/text-editor/extensions/floating-toolbar";
import { ImageExtension } from "@/components/text-editor/extensions/image";
import { ImagePlaceholder } from "@/components/text-editor/extensions/image-placeholder";
import SearchAndReplace from "@/components/text-editor/extensions/search-and-replace";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";
import { EditorToolbar } from "./toolbars/editor-toolbar";

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc",
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
    },
  }),
  Placeholder.configure({
    emptyNodeClass: "is-editor-empty",
    placeholder: ({ node }) => {
      switch (node.type.name) {
        case "heading":
          return `Heading ${node.attrs.level}`;
        case "detailsSummary":
          return "Section title";
        case "codeBlock":
          // never show the placeholder when editing code
          return "";
        default:
          return "Write, type '/' for commands";
      }
    },
    includeChildren: false,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TextStyle,
  Subscript,
  Superscript,
  Underline,
  Link,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  ImageExtension,
  ImagePlaceholder,
  SearchAndReplace,
  Typography,
];

export function TextEditor({ className, content }: { className?: string; content?: string }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: extensions as Extension[],
    content: content ? JSON.parse(content) : undefined,
    editorProps: {
      attributes: {
        class: "max-w-full focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      // do what you want to do with output
      // Update stats
      // saving as text/json/hmtml
      // const text = editor.getHTML();
      console.log(editor.getText());
    },
  });

  if (!editor) return null;

  return (
    <div
      className={cn(
        "relative max-h-[calc(100dvh-6rem)]  w-full overflow-hidden overflow-y-scroll border bg-card pb-[60px] sm:pb-0",
        className
      )}
    >
      <EditorToolbar editor={editor} />
      <FloatingToolbar editor={editor} />
      <TipTapFloatingMenu editor={editor} />
      <EditorContent editor={editor} className=" min-h-[600px] w-full min-w-full cursor-text sm:p-6" />
    </div>
  );
}
