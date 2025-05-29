import { use } from "react";
import { EditorClient } from "./page.client";

export default function EditorPage({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const { noteId } = use(params);
  return <EditorClient noteId={noteId} />;
}
