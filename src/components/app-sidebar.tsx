import * as React from "react";
import {
  DatabaseZap,
  Frame,
  Map,
  PieChart,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { RiGraduationCapFill } from "@remixicon/react";

// This is sample data.
const data = {
  user: {
    name: "Yusuf Pazuruan",
    email: "yusufpazuruan@gmail.com",
    avatar: "https://ui.shadcn.com/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Sma Islam",
      logo: RiGraduationCapFill,
      plan: "Qurani Al-Bahjah",
    },
  ],
  admin: [
    {
      label: "Admin",
      title: "Master DB",
      url: "#",
      icon: DatabaseZap,
      isActive: true,
      items: [
        // {
        //   title: "Jabatan",
        //   url: "masterdb/jabatan",
        // },
        // {
        //   title: "Status",
        //   url: "masterdb/status",
        // },
        // {
        //   title: "Pengguna",
        //   url: "masterdb/pengguna",
        // },
        {
          title: "Pengajar",
          url: "masterdb/pengajar",
        },
        {
          title: "Kamar",
          url: "masterdb/kamar",
        },
        {
          title: "Kelas",
          url: "masterdb/kelas",
        },
        {
          title: "Mapel",
          url: "masterdb/mapel",
        },
        {
          title: "Jadwal",
          url: "masterdb/jadwal",
        },
      ],
    },

  ],
  kurikulum: [
    {
      label: "Kurikulum",
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },

  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.admin} />
        <NavMain items={data.kurikulum} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
