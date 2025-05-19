"use client";
import { NotesList } from "@/components/notes/notes-list";
import { ActivityFeed } from "@/components/activities/feed";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/rpc/query-keys";
import { getUserFavoriteNotes } from "@/rpc/notes";

export default function DashboardPage() {
  const { data: notesRaw } = useQuery({
    queryKey: [QueryKeys.GET_NOTES],
    queryFn: () => getUserFavoriteNotes(),
    initialData: [],
  });

  const notes = notesRaw.map((note) => ({
    ...note,
    createdAt: new Date(note.createdAt),
    updatedAt: note.updatedAt ? new Date(note.updatedAt) : null,
  }));

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <NotesList notes={notes} />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
