import { Link } from "wouter";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/stat-card";
import {
  GraduationCap,
  Calendar,
  BookOpen,
  Clock,
  CheckCircle,
  ArrowRight,
  History,
  ClipboardList,
} from "lucide-react";

const stats = [
  { title: "Enrolled Courses", value: 5, icon: BookOpen, color: "text-chart-4", bg: "bg-chart-4/20" },
  { title: "Active Classes", value: 12, icon: Calendar, color: "text-chart-1", bg: "bg-chart-1/20" },
  { title: "Completed", value: 8, icon: CheckCircle, color: "text-chart-2", bg: "bg-chart-2/20" },
  { title: "Pending", value: 2, icon: Clock, color: "text-chart-3", bg: "bg-chart-3/20" },
];

const upcomingSchedules = [
  { id: "1", courseName: "CS301 - Database Systems", room: "B201", time: "09:00 - 11:00", day: "Monday" },
  { id: "2", courseName: "MATH201 - Calculus II", room: "A105", time: "13:00 - 15:00", day: "Tuesday" },
  { id: "3", courseName: "ENG101 - English Composition", room: "C301", time: "10:00 - 12:00", day: "Wednesday" },
];

const recentActivity = [
  { action: "Enrollment Confirmed", entity: "CS301", time: "2 hours ago", status: "confirmed" },
  { action: "Course Enrolled", entity: "MATH201", time: "1 day ago", status: "confirmed" },
  { action: "Schedule Updated", entity: "ENG101", time: "2 days ago", status: "confirmed" },
  { action: "Enrollment Pending", entity: "PHY101", time: "3 days ago", status: "pending" },
];

export default function StudentDashboard() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">
            Student Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            View your schedules, courses, and manage enrollments
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/dashboard/student/schedules" data-testid="link-view-schedules">
            <Card className="hover-elevate cursor-pointer" data-testid="card-view-schedules">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-1/20">
                  <Calendar className="h-6 w-6 text-chart-1" />
                </div>
                <div>
                  <p className="font-semibold">View Schedules</p>
                  <p className="text-sm text-muted-foreground">Check your class schedule</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/student/courses" data-testid="link-browse-courses">
            <Card className="hover-elevate cursor-pointer" data-testid="card-browse-courses">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-4/20">
                  <ClipboardList className="h-6 w-6 text-chart-4" />
                </div>
                <div>
                  <p className="font-semibold">Browse Courses</p>
                  <p className="text-sm text-muted-foreground">Explore available courses</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/student/enrollments" data-testid="link-my-enrollments">
            <Card className="hover-elevate cursor-pointer" data-testid="card-my-enrollments">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-2/20">
                  <GraduationCap className="h-6 w-6 text-chart-2" />
                </div>
                <div>
                  <p className="font-semibold">My Enrollments</p>
                  <p className="text-sm text-muted-foreground">Manage your enrollments</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-chart-1" />
                Upcoming Classes
              </CardTitle>
              <Badge variant="outline">{upcomingSchedules.length} upcoming</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingSchedules.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 rounded-md border border-border p-3"
                    data-testid={`schedule-item-${item.id}`}
                  >
                    <div>
                      <p className="font-medium">{item.courseName}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.room} | {item.day}, {item.time}
                      </p>
                    </div>
                    <Badge variant="secondary">{item.day}</Badge>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/student/schedules" data-testid="link-all-schedules">
                <Button variant="ghost" className="mt-4 w-full gap-2" data-testid="button-view-all-schedules">
                  View All Schedules
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
                    data-testid={`activity-item-${i}`}
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
              <Link href="/dashboard/student/transactions" data-testid="link-all-transactions">
                <Button variant="ghost" className="mt-4 w-full gap-2" data-testid="button-view-all-transactions">
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
