"use client";

import { useState } from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { CreateNoteDialog } from "./create-note-dialog";

export const CreateNoteButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button size="sm" variant="outline" className="border-r border-dashed" onClick={() => setIsOpen(true)}>
        <Icons.addSquare />
        Add new note
      </Button>
      <CreateNoteDialog isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};
