import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  ChartPie,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  User,
  User2,
  Ambulance,
  ChartPieIcon,
  Plus,
  Clock,
  Phone,
  Navigation,
  AlertCircle,
  Flag,
  CheckCircle2,
  Users,
  Home,
  Activity,
  MessageSquare,
  Settings
} from "lucide-react"

import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const sidebarConfig = {
  admin: {
    teams: [
      {
        name: "Admin Panel",
        logo: Command,
        plan: "Administrator",
      },
    ],
    projects: [
      {
        name: "Dashboard Overview",
        url: "/dashboard/admin",
        icon: ChartPieIcon,
      },
      {
        name: "User Management",
        url: "/dashboard/admin/users",
        icon: Users,
      },
      {
        name: "Rescuer Management",
        url: "/dashboard/admin/rescuers",
        icon: Ambulance,
      },
      {
        name: "Analytics & Reports",
        url: "/dashboard/admin/analytics",
        icon: PieChart,
      },
      {
        name: "System Logs",
        url: "/dashboard/admin/logs",
        icon: SquareTerminal,
      },
    ]
  },
  user: {
    teams: [
      {
        name: "User Panel",
        logo: User2,
        plan: "Citizen",
      },
    ],
    projects: [
      {
        name: "My Dashboard",
        url: "/dashboard/user",
        icon: Home,
      },
      {
        name: "Create New Request",
        url: "/dashboard/user/new-request",
        icon: Plus,
      },
      {
        name: "Active Requests",
        url: "/dashboard/user/requests",
        icon: Clock,
      },
      {
        name: "Completed Requests",
        url: "/dashboard/user/history",
        icon: CheckCircle2,
      },
      {
        name: "Emergency Contacts",
        url: "/dashboard/user/contacts",
        icon: Phone,
      },
      {
        name: "Saved Locations",
        url: "/dashboard/user/locations",
        icon: Map,
      },
    ]
  },
  rescuer: {
    teams: [
      {
        name: "Rescuer Panel",
        logo: Ambulance,
        plan: "Rescuer",
      },
    ],
    projects: [
      {
        name: "Mission Dashboard",
        url: "/dashboard/rescuer",
        icon: ChartPieIcon,
      },
      {
        name: "Active Missions",
        url: "/dashboard/rescuer/active",
        icon: Navigation,
      },
      {
        name: "Available Requests",
        url: "/dashboard/rescuer/available",
        icon: AlertCircle,
      },
      {
        name: "My Statistics",
        url: "/dashboard/rescuer/stats",
        icon: Activity,
      },
      {
        name: "Emergency Protocols",
        url: "/dashboard/rescuer/protocols",
        icon: BookOpen,
      },
      {
        name: "Team Chat",
        url: "/dashboard/rescuer/chat",
        icon: MessageSquare,
      },
    ]
  }
};

export function AppSidebar({ userRole, userName, ...props }) {
  const config = sidebarConfig[userRole] || sidebarConfig.user;
  const userData = {
    name: userName || "User",
    email: `${userRole}@streetsathi.com`,
    avatar: "/avatars/shadcn.jpg", 
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={config.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={config.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}