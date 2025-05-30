"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";

import { PageHeader } from "@/components/layout/dashboard/page-header";
import { CreateNoteButton } from "@/components/notes/create-note/create-note-button";
import { NotesList } from "@/components/notes/notes-list";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserNotes } from "@/rpc/notes";
import { QueryKeys } from "@/rpc/query-keys";

export default function NotesPage() {
  const [searchText, setSearchText] = useState<string | null>(null);

  const { data: notesData, isPending } = useQuery({
    queryKey: [QueryKeys.GET_NOTES],
    queryFn: () => getUserNotes(),
  });

  const filteredNotes = useMemo(() => {
    if (!notesData) return [];

    if (searchText) {
      return notesData.filter((note) => note.title.toLowerCase().includes(searchText.toLowerCase()));
    }
    return notesData;
  }, [searchText, notesData]);

  const myNotes = filteredNotes.map((note) => ({
    ...note,
    createdAt: new Date(note.createdAt),
    updatedAt: note.updatedAt ? new Date(note.updatedAt) : null,
    contributors: note.contributors.map((contributor) => ({
      ...contributor,
      createdAt: contributor.createdAt ? new Date(contributor.createdAt) : undefined,
      user: {
        ...contributor.user,
        createdAt: new Date(contributor.user.createdAt),
        updatedAt: new Date(contributor.user.updatedAt),
      },
    })),
  }));

  return (
    <div className="flex flex-col gap-2">
      <PageHeader title="Notes" description="">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="size-4 text-muted-foreground" />
            </div>
            <Input
              placeholder="Search notes"
              className="w-100 border border-dashed h-8 pl-10"
              value={searchText || ""}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <CreateNoteButton />
        </div>
      </PageHeader>
      <div className="p-4 border-1 border-dashed">
        {isPending ? (
          <div className="flex items-center gap-2">
            <Skeleton className="h-60 w-full border border-dashed" />
            <Skeleton className="h-60 w-full border border-dashed" />
            <Skeleton className="h-60 w-full border border-dashed" />
            <Skeleton className="h-60 w-full border border-dashed" />
          </div>
        ) : (
          <NotesList notes={myNotes || []} />
        )}
      </div>
    </div>
  );
}
