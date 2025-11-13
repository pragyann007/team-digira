import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavProjects({ projects = [], ...props }) {
  const location = useLocation();
  
  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => {
          const isActive = location.pathname === item.url;
          
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton 
                asChild 
                isActive={isActive}
                className={cn(
                  isActive && "bg-primary/10 text-primary font-medium"
                )}
              >
                <Link to={item.url} onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, "", item.url);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}>
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}