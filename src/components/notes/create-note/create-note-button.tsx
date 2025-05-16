"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateNoteDialog } from "./create-note-dialog";

export const CreateNoteButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="border-r border-dashed"
        onClick={() => setIsOpen(true)}
      >
        <Icons.addSquare />
        Create new note
      </Button>
      <CreateNoteDialog isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};
