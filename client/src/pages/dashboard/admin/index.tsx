import { Link } from "wouter";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/stat-card";
import {
  Calendar,
  Building2,
  BookOpen,
  Users,
  FileCheck,
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  History,
} from "lucide-react";

const stats = [
  { title: "Total Schedules", value: 24, icon: Calendar, color: "text-chart-1", bg: "bg-chart-1/20" },
  { title: "Active Rooms", value: 12, icon: Building2, color: "text-chart-2", bg: "bg-chart-2/20" },
  { title: "Classes", value: 18, icon: BookOpen, color: "text-chart-3", bg: "bg-chart-3/20" },
  { title: "Lecturers", value: 8, icon: Users, color: "text-chart-4", bg: "bg-chart-4/20" },
];

const pendingValidations = [
  { id: "1", className: "CS301 - Database Systems", room: "B201", time: "09:00 - 11:00", day: "Monday" },
  { id: "2", className: "MATH201 - Calculus II", room: "A105", time: "13:00 - 15:00", day: "Tuesday" },
  { id: "3", className: "ENG101 - English Composition", room: "C301", time: "10:00 - 12:00", day: "Wednesday" },
];

const recentActivity = [
  { action: "Schedule Created", entity: "CS101", time: "2 hours ago", status: "confirmed" },
  { action: "Room Updated", entity: "Room B205", time: "4 hours ago", status: "confirmed" },
  { action: "Schedule Validated", entity: "MATH202", time: "Yesterday", status: "confirmed" },
  { action: "Change Request", entity: "PHY101", time: "Yesterday", status: "pending" },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage schedules, rooms, classes, and validate pending requests
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconColor={stat.color}
              iconBgColor={stat.bg}
            />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/dashboard/admin/schedules">
            <Card className="hover-elevate cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-1/20">
                  <Plus className="h-6 w-6 text-chart-1" />
                </div>
                <div>
                  <p className="font-semibold">Create Schedule</p>
                  <p className="text-sm text-muted-foreground">Add new class schedule</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/admin/rooms">
            <Card className="hover-elevate cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-2/20">
                  <Building2 className="h-6 w-6 text-chart-2" />
                </div>
                <div>
                  <p className="font-semibold">Manage Rooms</p>
                  <p className="text-sm text-muted-foreground">Add or edit rooms</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/admin/classes">
            <Card className="hover-elevate cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-3/20">
                  <BookOpen className="h-6 w-6 text-chart-3" />
                </div>
                <div>
                  <p className="font-semibold">Manage Classes</p>
                  <p className="text-sm text-muted-foreground">Add or edit classes</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/admin/validation">
            <Card className="hover-elevate cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-4/20">
                  <FileCheck className="h-6 w-6 text-chart-4" />
                </div>
                <div>
                  <p className="font-semibold">Validation Queue</p>
                  <p className="text-sm text-muted-foreground">{pendingValidations.length} pending</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-chart-3" />
                Pending Validations
              </CardTitle>
              <Badge variant="outline">{pendingValidations.length} pending</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingValidations.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 rounded-md border border-border p-3"
                  >
                    <div>
                      <p className="font-medium">{item.className}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.room} | {item.day}, {item.time}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <FileCheck className="mr-2 h-4 w-4" />
                      Validate
                    </Button>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/admin/validation">
                <Button variant="ghost" className="mt-4 w-full gap-2">
                  View All Pending
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4 rounded-md border border-border p-3"
                  >
                    <div className="flex items-center gap-3">
                      {item.status === "confirmed" ? (
                        <CheckCircle className="h-4 w-4 text-chart-4" />
                      ) : (
                        <Clock className="h-4 w-4 text-chart-3" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{item.action}</p>
                        <p className="text-xs text-muted-foreground">{item.entity}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/admin/transactions">
                <Button variant="ghost" className="mt-4 w-full gap-2">
                  View All Transactions
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
