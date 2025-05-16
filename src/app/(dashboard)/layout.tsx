import { AppLayout } from "@/components/layout/dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
