"use client";

import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";

import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { organization, useListOrganizations } from "@/lib/auth-client";

export default function WorkspacesPage() {
  const { data, isPending } = useListOrganizations();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading workspaces...</p>
      </div>
    );
  }

  const handleWorkspaceClick = async (orgId: string) => {
    await organization.setActive(
      {
        organizationId: orgId,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
      }
    );
  };
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Workspaces</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-none border-dashed">
              <Icons.addSquare />
              Create Workspace
            </Button>
          </div>
        </div>
        <p className="mt-4 text-muted-foreground">This is the workspaces page. You can manage your workspaces here.</p>
        <div className="mt-4 space-y-2">
          {data?.length ? (
            data.map((org) => (
              <div
                className="p-4 border rounded-md border-dashed cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => handleWorkspaceClick(org.id)}
                key={org.id}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 rounded-xl">
                      <AvatarImage src={org.logo ?? undefined} alt={org.name} />
                      <AvatarFallback className="rounded-lg">{org.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-lg font-semibold">{org.name}</h2>
                  </div>
                  <Icons.arrowRight />
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No workspaces found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
