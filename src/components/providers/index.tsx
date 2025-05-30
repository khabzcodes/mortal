"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@/components/theme/provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={new QueryClient()}>
        <Toaster position="top-right" richColors />
        <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
