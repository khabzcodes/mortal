import { use } from "react";
import { EditorClient } from "./page.client";
import { EditorHeader } from "@/components/editor/header";

export default function EditorPage({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const { noteId } = use(params);
  return <EditorClient noteId={noteId} />;
}
