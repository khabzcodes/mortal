import { Editor, Extension, Range } from "@tiptap/core";
import { PluginKey } from "@tiptap/pm/state";
import Suggestion, { SuggestionOptions } from "@tiptap/suggestion";

type OnCommandSelect = (props: { editor: Editor; range: Range }) => void;

export interface SuggestionItem {
  title: string;
  description: string;
  keywords: string[];
  command: OnCommandSelect;
}

export interface SlashCommandNodeAttrs {
  command: OnCommandSelect;
}

export interface SlashCommandOptions<Item extends SuggestionItem = any> {
  /**
   * The suggestion options.
   * @default {}
   * @example { char: '/', pluginKey: slashCommandPluginKey, command: ({ editor, range, props }) => { ... } }
   */
  suggestion: Omit<SuggestionOptions<Item, SlashCommandNodeAttrs>, "editor">;
}

/**
 * The plugin key for the slash command plugin.
 * @default 'slash-command'
 */
export const slashCommandPluginKey = new PluginKey("slashCommand");

export const SlashCommand = Extension.create<SlashCommandOptions>({
  name: "slashCommand",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        pluginKey: slashCommandPluginKey,
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },
        allow: ({ editor }) => {
          // TODO: Disallow if the editor is in a code block
          return true;
        },
      },
    };
  },

  addProseMirrorPlugins() {
    const { suggestion } = this.options;

    return [
      Suggestion({
        editor: this.editor,
        ...suggestion,
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },
      }),
    ];
  },
});
