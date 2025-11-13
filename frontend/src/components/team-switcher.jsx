import { useAuth } from "@/hooks/useAuth";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ChevronsUpDown, User2, Ambulance } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function TeamSwitcher({ teams = [] }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const activeTeam = user?.role === 'rescuer' ? teams[1] : teams[0];
  
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          asChild
        >
          <Link to="/dashboard">
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
              {user?.role === 'rescuer' ? <Ambulance className="size-4" /> : <User2 className="size-4" />}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold capitalize">{user?.role || 'User'} Panel</span>
              <span className="truncate text-xs text-muted-foreground">
                {activeTeam?.plan || 'Street साथी'}
              </span>
            </div>
            <ChevronsUpDown className="ml-auto size-4 opacity-50" />
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}