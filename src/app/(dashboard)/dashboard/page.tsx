"use client";

import { useQuery } from "@tanstack/react-query";

import { ActivityFeed } from "@/components/activities/feed";
import { NotesList } from "@/components/notes/notes-list";
import { TextEditor } from "@/components/text-editor/text-editor";
import { QueryKeys } from "@/rpc/query-keys";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-2">
      <TextEditor />
    </div>
  );
}
