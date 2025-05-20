"use client";
import { PageHeader } from "@/components/layout/dashboard/page-header";
import { CreateNoteButton } from "@/components/notes/create-note/create-note-button";
import { NotesList } from "@/components/notes/notes-list";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserNotes } from "@/rpc/notes";
import { QueryKeys } from "@/rpc/query-keys";
import { useQuery } from "@tanstack/react-query";

export default function NotesPage() {
  const { data: notesData, isPending } = useQuery({
    queryKey: [QueryKeys.GET_NOTES],
    queryFn: () => getUserNotes(),
  });

  const myNotes = notesData?.map((note) => ({
    ...note,
    createdAt: new Date(note.createdAt),
    updatedAt: note.updatedAt ? new Date(note.updatedAt) : null,
  }));
  return (
    <div className="flex flex-col gap-2">
      <PageHeader title="Notes" description="">
        <div className="flex items-center space-x-3">
          <Input placeholder="Search notes" />
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
