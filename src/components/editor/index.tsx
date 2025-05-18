"use client";

import * as React from "react";
import {
  EditorContent,
  EditorContext,
  JSONContent,
  useEditor,
  Editor as EditorInstance,
} from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Underline } from "@tiptap/extension-underline";
import { Markdown } from "tiptap-markdown";

// --- Custom Extensions ---
import { Link } from "@/components/tiptap-extension/link-extension";
import { Selection } from "@/components/tiptap-extension/selection-extension";
import { TrailingNode } from "@/components/tiptap-extension/trailing-node-extension";

// --- UI Primitives ---
// import { Button } from "@/components/tiptap-ui-primitive/button";
import { Button } from "@/components/ui/button";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { BlockQuoteButton } from "@/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";
import Youtube from "@tiptap/extension-youtube";
import { AiPlaceholder } from "@/components/editor/extensions/ai-placeholder/ai-placeholder";
import { AiWriter } from "@/components/editor/extensions/ai-writer/ai-writer";
import { Ai } from "@/components/editor/extensions/ai";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";

// --- Hooks ---
import { useMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";
import { useDebouncedCallback } from "use-debounce";
// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/editor/simple-editor.scss";

import { ScrollArea } from "../ui/scroll-area";
import { Note } from "@/types/notes";
import { ThemeToggle } from "./theme-toggle";
import { UserProfile } from "../user-profile";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { SlashCommand } from "./extensions/slash-command/slash-command";
import { getSuggestion } from "./extensions/slash-command/suggestion";

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
  isUnsaved,
  onClickSave,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
  isUnsaved: boolean;
  onClickSave: () => void;
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
        <BlockQuoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <Spacer />

      <ToolbarGroup>
        {!isUnsaved ? (
          <Badge variant="outline" className="text-xs border border-dashed">
            No unsaved changes
          </Badge>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="text-xs border border-dashed"
            onClick={() => {
              onClickSave();
            }}
          >
            Save Changes
          </Button>
        )}
      </ToolbarGroup>

      <ToolbarGroup>
        <ThemeToggle />
        <UserProfile />
      </ToolbarGroup>

      {isMobile && <ToolbarSeparator />}
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

type EditorProps = {
  note: Note;
  onUpdate: (content: JSONContent) => void;
};

export function Editor({ note, onUpdate }: EditorProps) {
  const [useSaved, setUnsaved] = React.useState<boolean>(false);
  const isMobile = useMobile();
  const windowSize = useWindowSize();
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main");
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: true,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Markdown.configure({
        html: true,
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: cn("border border-muted"),
        },
        nocookie: true,
      }),
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      TrailingNode,
      AiPlaceholder.configure({
        HTMLAttributes: {
          class: cn("!text-muted-foreground not-draggable"),
        },
      }),
      AiWriter.configure({
        HTMLAttributes: {
          class: cn("py-3 px-1 select-none"),
        },
      }),
      Ai.configure({
        onError: (error) => {
          console.error("AI error:", error);
        },
      }),

      Link.configure({ openOnClick: false }),
      SlashCommand.configure({
        suggestion: getSuggestion({ ai: true }),
      }),
    ],
    onUpdate: ({ editor }) => {
      // setUnsaved(true);
      // debouncedUpdates(editor);
      console.log("Editor updated:", editor);
    },
    onCreate: ({ editor }) => {
      editor.commands.focus("end");
    },
    content: note.content ? JSON.parse(note.content!) : note.content,
  });

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      if (!json.content) return;

      onUpdate(json);
      setUnsaved(false);
    },
    60 * 1000
  );

  const bodyRect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  return (
    <EditorContext.Provider value={{ editor }}>
      <Toolbar
        ref={toolbarRef}
        style={
          isMobile
            ? {
                bottom: `calc(100% - ${windowSize.height - bodyRect.y}px)`,
              }
            : {}
        }
      >
        {mobileView === "main" ? (
          <MainToolbarContent
            isUnsaved={useSaved}
            onClickSave={() => {
              setUnsaved(false);
              onUpdate(editor?.getJSON()!);
            }}
            onHighlighterClick={() => setMobileView("highlighter")}
            onLinkClick={() => setMobileView("link")}
            isMobile={isMobile}
          />
        ) : (
          <MobileToolbarContent
            type={mobileView === "highlighter" ? "highlighter" : "link"}
            onBack={() => setMobileView("main")}
          />
        )}
      </Toolbar>

      <div className="content-wrapper">
        <ScrollArea className="h-screen">
          <div className="pb-20">
            <EditorContent editor={editor} className="simple-editor-content" />
          </div>
        </ScrollArea>
      </div>
    </EditorContext.Provider>
  );
}
