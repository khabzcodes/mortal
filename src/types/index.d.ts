import { Icons } from "@/components/icons";

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  origin: string;
  og: string;
  keywords: string[];
  creator: {
    name: string;
    url: string;
  };
  socials: {
    github: string;
    x: string;
  };
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    aiWriterCommands: {
      setAiWriter: () => ReturnType;
    };
  }
}

export type NavItem = {
  title: string;
  url: string;
  icon?: keyof typeof Icons;
  items?: {
    title: string;
    url: string;
  }[];
};

export type SidebarConfig = {
  navItems: NavItem[];
};
