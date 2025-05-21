import { SidebarConfig } from "@/types";

export const dashboardConfig: SidebarConfig = {
  navItems: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: "home",
    },
    {
      title: "All Notes",
      url: "/notes",
      icon: "stickyNotes",
    },
    {
      title: "Settings",
      url: "/settings",
      icon: "settings",
    },
    {
      title: "Trash",
      url: "/trash",
      icon: "trash",
    },
  ],
};
