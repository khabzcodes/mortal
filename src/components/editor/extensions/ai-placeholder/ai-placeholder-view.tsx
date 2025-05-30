import { NodeViewProps } from "@tiptap/core";
import { NodeViewWrapper, useEditorState } from "@tiptap/react";
import Markdown from "react-markdown";

import { BounceSpinner } from "../../bounce-spinner";
import { AiStorage } from "../ai";

const AiPlaceholderView = ({ editor }: NodeViewProps) => {
  const { completion } = useEditorState({
    editor: editor,
    selector: (instance) => {
      const storage = instance.editor.storage.ai as AiStorage;
      return {
        completion: storage.message,
      };
    },
  });

  return (
    <NodeViewWrapper>
      <div className="flex flex-wrap items-baseline">
        <div>
          <Markdown>{completion}</Markdown>
        </div>
        <BounceSpinner className="ms-2" />
      </div>
    </NodeViewWrapper>
  );
};

export default AiPlaceholderView;
