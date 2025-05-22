"use client";

import { NoteCard } from "./note-card";
import { Note, NoteWithContributors } from "@/types/notes";

interface NoteListProps {
  notes: NoteWithContributors[];
}

export const NotesList = ({ notes }: NoteListProps) => {
  return (
    <div className="grid gap-2 sm:grid-cols-4">
      {notes?.map((note, idx) => (
        <NoteCard
          key={idx}
          note={{
            id: note.id,
            title: note.title,
            description: note.description,
            content: note.content,
            contributors: note.contributors,
            tags: note.tags || [],
            createdAt: new Date(note.createdAt),
            updatedAt: note.updatedAt ? new Date(note.updatedAt) : null,
          }}
        />
      ))}
    </div>
  );
};
