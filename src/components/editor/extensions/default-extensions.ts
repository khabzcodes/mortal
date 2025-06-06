import { mergeAttributes } from "@tiptap/core";
import { BulletList } from "@tiptap/extension-bullet-list";
import CharacterCount from "@tiptap/extension-character-count";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { OrderedList } from "@tiptap/extension-ordered-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { Typography } from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import StarterKit from "@tiptap/starter-kit";
import { common, createLowlight } from "lowlight";
import GlobalDragHandle from "tiptap-extension-global-drag-handle";
import { Markdown } from "tiptap-markdown";

import { cn } from "@/lib/utils";
import { AiPlaceholder } from "../extensions/ai-placeholder/ai-placeholder";
import { AiWriter } from "../extensions/ai-writer/ai-writer";
import { CustomCodeBlock } from "../extensions/code-block";
import { Mathematics } from "../extensions/mathematics";

const TiptapStarterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cn("list-disc list-outside leading-3 -mt-2"),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cn("list-decimal list-outside leading-3 -mt-2"),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cn("leading-normal -mb-2"),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cn("border-l-4 border-gray-600"),
    },
  },
  codeBlock: false,
  code: {
    HTMLAttributes: {
      class: cn(
        "rounded-lg bg-muted text-red-700 dark:bg-muted/90 dark:text-red-400 px-1.5 py-1 font-mono font-medium before:content-none after:content-none"
      ),
      spellcheck: "false",
    },
  },
  horizontalRule: {
    HTMLAttributes: {
      class: cn("my-4 bg-border border-border"),
    },
  },
  dropcursor: {
    color: "#DBEAFE",
    width: 4,
  },
  // gapcursor: false,
  heading: false,
});

const typography = Typography;

const bulletList = BulletList;
const orderedList = OrderedList;
const color = Color.configure({
  types: ["textStyle"],
});

const TiptapHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = node.attrs.level;
    const level = hasLevel ? node.attrs.level : 1;

    return [`h${level}`, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});

const taskItem = TaskItem.configure({
  nested: true,
});

const taskList = TaskList;

const mathematics = Mathematics.configure({
  HTMLAttributes: {
    class: cn("text-foreground rounded p-1 hover:bg-accent cursor-pointer"),
  },
});

const lowlight = createLowlight(common);
const codeBlock = CustomCodeBlock.configure({
  HTMLAttributes: {
    class: cn("rounded !bg-gray-800 dark:!bg-gray-900 text-gray-200 border p-5 font-mono font-medium"),
    spellcheck: false,
  },
  defaultLanguage: "plaintext",
  lowlight: lowlight,
});

const TiptapTextAlign = TextAlign.configure({
  types: ["heading", "paragraph", "math"],
});

const TiptapTable = Table.extend({
  renderHTML({ node, HTMLAttributes }) {
    return ["table", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), ["tbody", 0]];
  },
}).configure({
  HTMLAttributes: {
    class: cn("not-prose table-auto border-collapse w-full"),
  },
  lastColumnResizable: false,
  allowTableNodeSelection: true,
});

const TiptapTableHeader = TableHeader.configure({
  HTMLAttributes: {
    class: cn("bg-muted dark:bg-gray-900 border border-default p-2 text-start min-w-[150px] font-semibold"),
  },
});

const TiptapTableCell = TableCell.configure({
  HTMLAttributes: {
    class: cn("border border-default p-2 min-w-[150px] align-middle"),
  },
});

const TiptapLink = Link.configure({
  HTMLAttributes: {
    class: cn("!text-foreground underline underline-offset-[3px] transition-colors cursor-pointer"),
  },
  openOnClick: false,
});

const TiptapImage = Image.configure({
  allowBase64: false,
  HTMLAttributes: {
    class: cn("rounded border mx-auto"),
  },
});

const DragHandle = GlobalDragHandle.configure({
  dragHandleWidth: 25,
  excludedTags: ["table"],
});

const aiPlaceholder = AiPlaceholder.configure({
  HTMLAttributes: {
    class: cn("!text-muted-foreground not-draggable"),
  },
});

const aiWriter = AiWriter.configure({
  HTMLAttributes: {
    class: cn("py-3 px-1 select-none"),
  },
});

const markdown = Markdown.configure({
  html: true,
});

const TiptapYoutube = Youtube.configure({
  HTMLAttributes: {
    class: cn("border border-muted"),
  },
  nocookie: true,
});

const TiptapCharacterCount = CharacterCount;

// const selection = Selection.configure({
//   HTMLAttributes: {
//     class: "selection",
//   },
// });

export const defaultExtensions = [
  TiptapStarterKit,
  TiptapHeading,
  TiptapTextAlign,
  TiptapTable,
  TiptapTableHeader,
  TableRow,
  TiptapTableCell,
  TiptapLink,
  TiptapYoutube,
  TiptapCharacterCount,
  TiptapImage,
  Underline,
  TextStyle,
  mathematics,
  codeBlock,
  DragHandle,
  aiPlaceholder,
  aiWriter,
  markdown,
  taskItem,
  taskList,
  typography,
  bulletList,
  orderedList,
  color,
];
