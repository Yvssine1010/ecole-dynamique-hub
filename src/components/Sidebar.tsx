import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  UserCog,
  DollarSign,
  ChevronUp,
  School,
} from 'lucide-react';

const navigationItems = {
  admin: [
    { title: 'Tableau de bord', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Étudiants', url: '/students', icon: GraduationCap },
    { title: 'Personnel', url: '/staff', icon: Users },
    { title: 'Cours', url: '/courses', icon: BookOpen },
    { title: 'Emploi du temps', url: '/schedule', icon: Calendar },
    { title: 'Finances', url: '/finances', icon: DollarSign },
    { title: 'Communications', url: '/communications', icon: MessageSquare },
    { title: 'Paramètres', url: '/settings', icon: Settings },
  ],
  teacher: [
    { title: 'Tableau de bord', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Mes cours', url: '/my-courses', icon: BookOpen },
    { title: 'Mes étudiants', url: '/my-students', icon: GraduationCap },
    { title: 'Emploi du temps', url: '/schedule', icon: Calendar },
    { title: 'Messages', url: '/messages', icon: MessageSquare },
  ],
  student: [
    { title: 'Tableau de bord', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Mes cours', url: '/my-courses', icon: BookOpen },
    { title: 'Emploi du temps', url: '/schedule', icon: Calendar },
    { title: 'Notes', url: '/grades', icon: GraduationCap },
    { title: 'Messages', url: '/messages', icon: MessageSquare },
  ],
  accountant: [
    { title: 'Tableau de bord', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Finances', url: '/finances', icon: DollarSign },
    { title: 'Étudiants', url: '/students', icon: GraduationCap },
    { title: 'Paiements', url: '/payments', icon: DollarSign },
  ],
};

export function AppSidebar() {
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();

  if (!user) return null;

  const items = navigationItems[user.role] || [];
  const isActive = (path: string) => location.pathname === path;
  const collapsed = state === 'collapsed';

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-64'} collapsible="icon">
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="bg-gradient-primary p-2 rounded-lg shadow-card">
            <School className="w-6 h-6 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-foreground">EduManager</h2>
              <p className="text-xs text-muted-foreground">Gestion scolaire</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-primary text-primary-foreground shadow-card'
                            : 'hover:bg-muted/50 text-foreground'
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg bg-gradient-primary text-primary-foreground">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {!collapsed && (
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs text-muted-foreground capitalize">
                        {user.role === 'admin' ? 'Administrateur' :
                         user.role === 'teacher' ? 'Enseignant' :
                         user.role === 'student' ? 'Étudiant' : 'Comptable'}
                      </span>
                    </div>
                  )}
                  {!collapsed && <ChevronUp className="ml-auto size-4" />}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <UserCog className="mr-2 h-4 w-4" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}