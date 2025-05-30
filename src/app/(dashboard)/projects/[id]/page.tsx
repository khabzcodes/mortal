import { use } from "react";

import { ProjectClientPage } from "./page.client";

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <div className="flex flex-col gap-2 px-1">
      <ProjectClientPage projectId={id} />
    </div>
  );
}
