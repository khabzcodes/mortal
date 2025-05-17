import { getUser } from "@/lib/auth-utils";
import { NotesList } from "@/components/notes/notes-list";
import { PageHeader } from "@/components/layout/dashboard/page-header";
import { CreateNoteButton } from "@/components/notes/create-note/create-note-button";

export default async function DashboardPage() {
  const user = await getUser();

  return (
    <div className="flex flex-col gap-2">
      <PageHeader
        title={`Hi👋, ${user?.name.split(" ")[0]}`}
        description="Your notes are waiting for you."
      >
        <CreateNoteButton />
      </PageHeader>
      <NotesList />
    </div>
  );
}
