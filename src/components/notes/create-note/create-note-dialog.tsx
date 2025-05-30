import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createNote } from "@/rpc/notes";
import { CreateNoteInputValidation, createNoteValidation, tagSchema } from "@/validations/notes";

type CreateNoteDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateNoteDialog = ({ isOpen, onOpenChange }: CreateNoteDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="border-r border-dashed">
        <DialogHeader>
          <DialogTitle>Create a new note</DialogTitle>
          <DialogDescription>Create a new note to keep track of your tasks and ideas.</DialogDescription>
        </DialogHeader>
        <CreateNoteForm />
      </DialogContent>
    </Dialog>
  );
};

const CreateNoteForm = () => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: CreateNoteInputValidation) => createNote(data),
    onSuccess: (response) => {
      toast.success("Note created successfully!");
      router.push(`/editor/${response.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<CreateNoteInputValidation>({
    resolver: zodResolver(createNoteValidation),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
    },
    mode: "onChange",
  });

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();

      // Validate tag with Zod
      const result = tagSchema.safeParse(tagInput.trim());

      if (result.success) {
        if (!tags.includes(result.data)) {
          const newTags = [...tags, result.data];
          setTags(newTags);
          form.setValue("tags", newTags, { shouldValidate: true });
        }
        setTagInput("");
      } else {
        toast.error("Tags must be between 1 and 20 characters long.");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    form.setValue("tags", newTags, { shouldValidate: true });
  };

  const onSubmit = async (data: CreateNoteInputValidation) => {
    await mutation.mutateAsync(data);
  };

  const isLoading = mutation.isPending;
  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title">Title</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="Title" {...field} className="border-r border-dashed" />
                </FormControl>
                <FormMessage {...field} className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    placeholder="Description"
                    {...field}
                    className="resize-none border-r border-dashed"
                  />
                </FormControl>
                <FormMessage {...field} className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormLabel htmlFor="tags">Tags</FormLabel>
          <Input
            disabled={isLoading}
            id="tags"
            placeholder="Add tags (press Enter)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            className="border-r border-dashed"
          />
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="flex items-center gap-1 border-r border-dashed bg-muted/50"
                >
                  {tag}
                  <button
                    disabled={isLoading}
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 rounded-full hover:bg-muted"
                  >
                    <Icons.cancelCircle className="h-3 w-3" />
                    <span className="sr-only">Remove {tag} tag</span>
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
        <Button size="sm" variant="default" type="submit" disabled={isLoading}>
          Continue
          {isLoading && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
