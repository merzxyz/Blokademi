import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/lib/wallet-context";
import { useTheme } from "@/lib/theme-context";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Calendar,
  Building2,
  GraduationCap,
  Users,
  FileCheck,
  History,
  Settings,
  LogOut,
  Moon,
  Sun,
  Blocks,
  Home,
  BookOpen,
  ClipboardList,
  FileEdit,
} from "lucide-react";
import type { UserRole } from "@shared/schema";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
}

const adminMenuItems = [
  { title: "Overview", url: "/dashboard/admin", icon: LayoutDashboard },
  { title: "Schedules", url: "/dashboard/admin/schedules", icon: Calendar },
  { title: "Rooms", url: "/dashboard/admin/rooms", icon: Building2 },
  { title: "Classes", url: "/dashboard/admin/classes", icon: BookOpen },
  { title: "Lecturers", url: "/dashboard/admin/lecturers", icon: Users },
  { title: "Validation", url: "/dashboard/admin/validation", icon: FileCheck },
  { title: "Transactions", url: "/dashboard/admin/transactions", icon: History },
];

const lecturerMenuItems = [
  { title: "Overview", url: "/dashboard/lecturer", icon: LayoutDashboard },
  { title: "My Schedules", url: "/dashboard/lecturer/schedules", icon: Calendar },
  { title: "Validation", url: "/dashboard/lecturer/validation", icon: FileCheck },
  { title: "Change Requests", url: "/dashboard/lecturer/requests", icon: FileEdit },
  { title: "Transactions", url: "/dashboard/lecturer/transactions", icon: History },
];

const studentMenuItems = [
  { title: "Overview", url: "/dashboard/student", icon: LayoutDashboard },
  { title: "View Schedules", url: "/dashboard/student/schedules", icon: Calendar },
  { title: "Course Selection", url: "/dashboard/student/courses", icon: ClipboardList },
  { title: "My Enrollments", url: "/dashboard/student/enrollments", icon: GraduationCap },
  { title: "Transactions", url: "/dashboard/student/transactions", icon: History },
];

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [location] = useLocation();
  const { disconnect, truncatedAddress } = useWallet();
  const { theme, toggleTheme } = useTheme();

  const menuItems =
    role === "admin"
      ? adminMenuItems
      : role === "lecturer"
      ? lecturerMenuItems
      : studentMenuItems;

  const roleLabel =
    role === "admin" ? "Administrator" : role === "lecturer" ? "Lecturer" : "Student";

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border p-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary">
                <Blocks className="h-4 w-4 text-sidebar-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">BLOKADEMI</span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="uppercase tracking-wider">
                {roleLabel} Panel
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={location === item.url}
                      >
                        <Link href={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="uppercase tracking-wider">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/">
                        <Home className="h-4 w-4" />
                        <span>Back to Home</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-sidebar-border p-4">
            <div className="mb-3 rounded-md bg-sidebar-accent/50 p-3">
              <p className="text-xs text-muted-foreground">Connected Wallet</p>
              <p className="font-mono text-sm">{truncatedAddress}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="flex-shrink-0"
                data-testid="button-theme-toggle-sidebar"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={disconnect}
                className="flex-1 justify-start gap-2"
                data-testid="button-disconnect-sidebar"
              >
                <LogOut className="h-4 w-4" />
                Disconnect
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <div className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex-1" />
            <p className="text-sm text-muted-foreground">
              <span className="hidden sm:inline">Logged in as </span>
              <span className="capitalize font-medium text-foreground">{role}</span>
            </p>
          </div>
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
