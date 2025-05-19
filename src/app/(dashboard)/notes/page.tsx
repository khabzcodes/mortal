"use client";
import { PageHeader } from "@/components/layout/dashboard/page-header";
import { CreateNoteButton } from "@/components/notes/create-note/create-note-button";
import { NotesList } from "@/components/notes/notes-list";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserNotes } from "@/rpc/notes";
import { QueryKeys } from "@/rpc/query-keys";
import { useQuery } from "@tanstack/react-query";

export default function NotesPage() {
  const { data: notesData } = useQuery({
    queryKey: [QueryKeys.GET_NOTES],
    queryFn: () => getUserNotes(),
    initialData: [],
  });

  const myNotes = notesData.map((note) => ({
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
      <Tabs defaultValue="my-notes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-notes">My Notes</TabsTrigger>
          <TabsTrigger value="shared-notes">Shared with Me</TabsTrigger>
        </TabsList>
        <div className="p-4 border-1 border-dashed">
          <TabsContent value="my-notes">
            <NotesList notes={myNotes} />
          </TabsContent>
          <TabsContent value="shared-notes">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                You have no shared notes yet. Ask someone to share one with you.
              </p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
