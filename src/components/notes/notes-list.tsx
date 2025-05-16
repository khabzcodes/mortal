"use client";

import { getUserNotes } from "@/rpc/notes";
import { QueryKeys } from "@/rpc/query-keys";
import { useQuery } from "@tanstack/react-query";

export const NotesList = () => {
  const { data } = useQuery({
    queryKey: [QueryKeys.GET_NOTES],
    queryFn: () => getUserNotes(),
  });
  return <div>{data?.length}</div>;
};
