import { use } from "react";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">{id}</h1>
      <p className="text-gray-500">This is the project page.</p>
    </div>
  );
}
