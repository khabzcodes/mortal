import { Node } from "@tiptap/core";

export interface DatabaseViewOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    databaseView: {
      insertDatabaseView: (options: { type: string }) => ReturnType;
    };
  }
}
