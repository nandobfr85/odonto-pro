import { ReactNode } from "react";
import { SidebarDashboard } from "./_components/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarDashboard>{children}</SidebarDashboard>
    </>
  );
}
