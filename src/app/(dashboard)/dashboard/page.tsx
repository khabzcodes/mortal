import { getUser } from "@/lib/auth-utils";
import { NotesList } from "@/components/notes/notes-list";
import { PageHeader } from "@/components/layout/dashboard/page-header";
import { CreateNoteButton } from "@/components/notes/create-note/create-note-button";
import { ActivityFeed } from "@/components/activities/feed";

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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <NotesList />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
