import { DashboardNavbar } from "./navbar";
import { Sidebar } from "./sidebar";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      <DashboardNavbar />
      <div className="flex h-full">
        <Sidebar />
        <div id="main" className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
