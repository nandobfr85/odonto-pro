"use client";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import clsx from "clsx";
import {
  Banknote,
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  Folder,
  List,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

export function SidebarDashboard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={clsx(
          "flex flex-col border-r bg-background transition-all duration-300 p-4 h-full",
          {
            "w-20": isCollapsed,
            "w-64": !isCollapsed,
            "hidden md:flex md:fixed": true,
          },
        )}
      >
        <div className="mb-6 mt-4">
          {!isCollapsed && (
            <h2 className="text-4xl text-center">
              Odonto<span className="text-emerald-500">PRO</span>
            </h2>
          )}
        </div>

        <Button
          className="bg-gray-100 hover:bg-gray-200 text-zinc-900 self-end mb-2 cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="w-12 h-12" />
          ) : (
            <ChevronLeft className="w-12 h-12" />
          )}
        </Button>

        {isCollapsed && (
          <nav className="flex flex-col gap-1 overflow-hidden mt-2">
            <SidebarLink
              href="/dashboard"
              label="Agendamentos"
              pathName={pathname}
              isCollapsed={isCollapsed}
              icon={<CalendarCheck2 />}
            />
            <SidebarLink
              href="/dashboard/services"
              label="Serviços"
              pathName={pathname}
              isCollapsed={isCollapsed}
              icon={<Folder />}
            />
            <SidebarLink
              href="/dashboard/profile"
              label="Meu Perfil"
              pathName={pathname}
              isCollapsed={isCollapsed}
              icon={<User />}
            />
            <SidebarLink
              href="/dashboard/plans"
              label="Planos"
              pathName={pathname}
              isCollapsed={isCollapsed}
              icon={<Banknote />}
            />
          </nav>
        )}

        <Collapsible open={!isCollapsed}>
          <CollapsibleContent>
            <nav className="flex flex-col gap-1 overflow-hidden">
              <span className="text-sm text-gray-400 font-medium uppercase">
                Dashboard
              </span>
              <SidebarLink
                href="/dashboard"
                label="Agendamentos"
                pathName={pathname}
                isCollapsed={isCollapsed}
                icon={<CalendarCheck2 />}
              />
              <SidebarLink
                href="/dashboard/services"
                label="Serviços"
                pathName={pathname}
                isCollapsed={isCollapsed}
                icon={<Folder />}
              />

              <span className="text-sm text-gray-400 font-medium uppercase">
                Configurações
              </span>
              <SidebarLink
                href="/dashboard/profile"
                label="Meu Perfil"
                pathName={pathname}
                isCollapsed={isCollapsed}
                icon={<User />}
              />
              <SidebarLink
                href="/dashboard/plans"
                label="Planos"
                pathName={pathname}
                isCollapsed={isCollapsed}
                icon={<Banknote />}
              />
            </nav>
          </CollapsibleContent>
        </Collapsible>
      </aside>

      <div
        className={clsx("flex flex-1 flex-col transition-all duration-300", {
          "md:ml-20": isCollapsed,
          "md:ml-64": !isCollapsed,
        })}
      >
        <header className="md:hidden flex items-center justify-between border-b px-4 md:px-6 h-14 z-10 sticky top-0 bg-white">
          <Sheet>
            <div className="flex items-center gap-4">
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <List className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <h1 className="text-base md:text-lg font-semibold">
                Menu Odonto<span className="text-emerald-500">PRO</span>
              </h1>
            </div>

            <SheetContent side="right" className="sm:max-w-xs text-black">
              <SheetHeader>
                <SheetTitle>
                  Odonto<span className="text-emerald-500">PRO</span>
                </SheetTitle>
                <SheetDescription>Menu Administrativo</SheetDescription>
              </SheetHeader>

              <nav className="grid gap-2 text-base pt-5 px-2">
                <SidebarLink
                  href="/dashboard"
                  label="Agendamentos"
                  pathName={pathname}
                  isCollapsed={isCollapsed}
                  icon={<CalendarCheck2 />}
                />
                <SidebarLink
                  href="/dashboard/services"
                  label="Serviços"
                  pathName={pathname}
                  isCollapsed={isCollapsed}
                  icon={<Folder />}
                />
                <SidebarLink
                  href="/dashboard/profile"
                  label="Meu Perfil"
                  pathName={pathname}
                  isCollapsed={isCollapsed}
                  icon={<User />}
                />
                <SidebarLink
                  href="/dashboard/plans"
                  label="Planos"
                  pathName={pathname}
                  isCollapsed={isCollapsed}
                  icon={<Banknote />}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 py-4 px-2 md:p-6">{children}</main>
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
  pathName: string;
  isCollapsed: boolean;
}

function SidebarLink({
  href,
  icon,
  label,
  pathName,
  isCollapsed,
}: SidebarLinkProps) {
  return (
    <Link href={href}>
      <div
        className={clsx("flex items-center gap-2 px-3 py-2 rounded-md", {
          "text-white bg-blue-500": pathName === href,
          "text-gray-700 hover:bg-gray-100": pathName !== href,
        })}
      >
        <span className="w-6 h-6">{icon}</span>
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  );
}
