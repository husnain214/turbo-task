import * as React from "react";
import Link from "next/link";
import {
  LayoutDashboardIcon,
  FolderIcon,
  DatabaseIcon,
  FileChartColumnIcon,
  FileIcon,
  CommandIcon,
} from "lucide-react";

import { NavWorkspace } from "@/components/sidebar/nav-workspace";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Projects",
      url: "#",
      icon: <FolderIcon />,
    },
  ],
  navWorkspace: [
    {
      name: "Active Task",
      url: "#",
      icon: <DatabaseIcon />,
    },
    {
      name: "Queue",
      url: "#",
      icon: <FileChartColumnIcon />,
    },
    {
      name: "Completed",
      url: "#",
      icon: <FileIcon />,
    },
  ],
  navAccount: [
    {
      title: "Team Members",
      url: "#",
      icon: <DatabaseIcon />,
    },
    {
      title: "Billing",
      url: "#",
      icon: <FileChartColumnIcon />,
    },
  ],
};

export default async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("name, role, email")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/login");

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">Turbo Task</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavWorkspace items={data.navWorkspace} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={profile} />
      </SidebarFooter>
    </Sidebar>
  );
}

