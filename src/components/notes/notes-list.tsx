"use client";

import { getUserNotes } from "@/rpc/notes";
import { QueryKeys } from "@/rpc/query-keys";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export const NotesList = () => {
  const { data } = useQuery({
    queryKey: [QueryKeys.GET_NOTES],
    queryFn: () => getUserNotes(),
  });
  return (
    <div>
      {data?.map((note, idx) => (
        <Link
          key={idx}
          href={`/editor/${note.id}`}
          className="block p-4 mb-2 bg-gray-100 rounded-md shadow-md hover:bg-gray-200"
        >
          <h2 className="text-lg font-semibold">{note.title}</h2>
        </Link>
      ))}
    </div>
  );
};
