import { PageHeader } from "@/components/layout/dashboard/page-header";
import { PeopleComponent } from "@/components/people";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-2">
      <PageHeader
        title="Settings"
        description="Manage your account and workspace settings."
      />
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <div className="border border-dashed p-4">
          <TabsContent value="account">Account</TabsContent>
          <TabsContent value="workspace">Workspace</TabsContent>
          <TabsContent value="people">
            <PeopleComponent />
          </TabsContent>
          <TabsContent value="billing">Billing</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
