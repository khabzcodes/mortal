import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CreateNoteInputValidation,
  createNoteValidation,
  tagSchema,
} from "@/validations/notes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

type CreateNoteDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateNoteDialog = ({
  isOpen,
  onOpenChange,
}: CreateNoteDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="border-r border-dashed">
        <DialogHeader>
          <DialogTitle>Create a new note</DialogTitle>
          <DialogDescription>
            Create a new note to keep track of your tasks and ideas.
          </DialogDescription>
        </DialogHeader>
        <CreateNoteForm />
      </DialogContent>
    </Dialog>
  );
};

const CreateNoteForm = () => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

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
  return (
    <Form {...form}>
      <form className="grid gap-4">
        <div className="grid gap-2">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field}
                    className="border-r border-dashed"
                  />
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
        <Button size="sm" variant="default" type="submit">
          Continue
        </Button>
      </form>
    </Form>
  );
};
