"use client";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import {
  CreateInvitationInputValidation,
  createInvitationSchema,
} from "@/validations/invitations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { createInvitation } from "@/rpc/invitations";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { QueryKeys } from "@/rpc/query-keys";

interface InviteMemberModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const InviteMemberModal = ({
  isOpen,
  setIsOpen,
}: InviteMemberModalProps) => {
  const queryClient = new QueryClient();
  const form = useForm<CreateInvitationInputValidation>({
    resolver: zodResolver(createInvitationSchema),
    defaultValues: {
      email: "",
      role: "member",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: CreateInvitationInputValidation) =>
      createInvitation(data),
    onSuccess: () => {
      toast.success("Invitation sent successfully");
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_ORGANIZATION_INVITATIONS],
      });
      form.reset();
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const onSubmit = (data: CreateInvitationInputValidation) => {
    mutation.mutate(data);
  };

  const isLoading = mutation.isPending;
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="border border-dashed">
        <DialogHeader>
          <DialogTitle>Invite member</DialogTitle>
          <DialogDescription className="text-xs">
            Invite a member to your workspace. They will receive an email with
            instructions to join.
          </DialogDescription>
        </DialogHeader>
        <div className="min-w-[400px]">
          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          {...field}
                          type="email"
                          className="border border-dashed"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-destructive" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  name="role"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="role">Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full border border-dashed">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border border-dashed">
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="owner">Workspace Owner</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                disabled={isLoading}
                type="submit"
                size="sm"
                variant="outline"
                className="border border-dashed"
              >
                Send invite
                {isLoading && <Loader />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
