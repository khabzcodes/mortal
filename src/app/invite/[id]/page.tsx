"use client";
import { use, useState } from "react";
import { AcceptInviteClient } from "./page.client";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/rpc/query-keys";
import { getInvitation } from "@/rpc/invitations";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { organization } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function AcceptInvitePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [isAccepting, setIsAccepting] = useState<boolean>(false);
  const [isRejecting, setIsRejecting] = useState<boolean>(false);

  const { id: invitationId } = use(params);
  const router = useRouter();
  const { data, isPending, error } = useQuery({
    queryKey: [QueryKeys.GET_INVITATION_BY_ID, invitationId],
    queryFn: () => getInvitation(invitationId),
    enabled: !!invitationId,
  });

  if (isPending || !data) {
    return <div>Loading...</div>;
  }

  const handleAccept = async () => {
    setIsAccepting(true);
    await organization.acceptInvitation({
      invitationId,
      fetchOptions: {
        onSuccess: async () => {
          toast.success("Invitation accepted successfully");
          router.push("/dashboard");
        },
        onError: (error) => {
          setIsAccepting(false);
          toast.error(error.error.message || "Failed to accept invitation");
        },
      },
    });
  };

  const handleReject = async () => {
    setIsRejecting(false);
    await organization.rejectInvitation({
      invitationId,
      fetchOptions: {
        onSuccess: async () => {
          toast.success("Invitation rejected successfully");
          router.push("/dashboard");
        },
        onError: (error) => {
          setIsRejecting(false);
          toast.error(error.error.message || "Failed to reject invitation");
        },
      },
    });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Card className="w-full max-w-md border-dashed border-2 rounded-none shadow-none">
        <CardHeader className="border-b border-dashed pb-4">
          <div className="flex items-center space-x-2 text-center">
            <span className="text-sm font-mono">
              You have been invited to join {data.organization.name}
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-3 pb-0 font-mono">
          <div className="grid grid-cols-1 gap-2">
            <Button
              type="button"
              onClick={() => handleAccept()}
              disabled={isAccepting || isRejecting}
            >
              Accept Invitation
              {isAccepting && <Loader className="animate-spin" />}
            </Button>
            <Button
              variant="destructive"
              type="button"
              onClick={() => handleReject()}
              disabled={isAccepting || isRejecting}
            >
              Reject Invitation
              {isRejecting && <Loader className="animate-spin" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
