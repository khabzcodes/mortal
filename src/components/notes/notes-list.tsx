"use client";

import { getUserNotes } from "@/rpc/notes";
import { QueryKeys } from "@/rpc/query-keys";
import { useQuery } from "@tanstack/react-query";
import { NoteCard } from "./note-card";

export const NotesList = () => {
  const { data } = useQuery({
    queryKey: [QueryKeys.GET_NOTES],
    queryFn: () => getUserNotes(),
  });
  return (
    <div className="grid gap-2 grid-cols-4">
      {data?.map((note, idx) => (
        <NoteCard
          key={idx}
          note={{
            id: note.id,
            title: note.title,
            description: note.description,
            isFavorite: note.isFavorite,
            tags: note.tags || [],
            createdAt: new Date(note.createdAt),
            updatedAt: note.updatedAt ? new Date(note.updatedAt) : null,
          }}
        />
      ))}
    </div>
  );
};
