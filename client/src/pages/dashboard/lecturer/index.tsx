import { Link } from "wouter";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/stat-card";
import {
  Calendar,
  FileCheck,
  FileEdit,
  Clock,
  CheckCircle,
  ArrowRight,
  History,
  AlertTriangle,
} from "lucide-react";

const stats = [
  { title: "My Schedules", value: 6, icon: Calendar, color: "text-chart-1", bg: "bg-chart-1/20" },
  { title: "Pending Validation", value: 2, icon: FileCheck, color: "text-chart-3", bg: "bg-chart-3/20" },
  { title: "Change Requests", value: 1, icon: FileEdit, color: "text-chart-2", bg: "bg-chart-2/20" },
  { title: "Total Hours", value: 18, icon: Clock, color: "text-chart-4", bg: "bg-chart-4/20" },
];

const mySchedules = [
  { id: "1", className: "CS301 - Database Systems", room: "B201", time: "09:00 - 11:00", day: "Monday", status: "validated" },
  { id: "2", className: "CS401 - Machine Learning", room: "A105", time: "14:00 - 16:00", day: "Tuesday", status: "validated" },
  { id: "3", className: "CS201 - Data Structures", room: "C301", time: "10:00 - 12:00", day: "Wednesday", status: "pending" },
];

const pendingValidations = [
  { id: "1", className: "MATH301 - Linear Algebra", requester: "Admin", time: "Yesterday", type: "New Schedule" },
  { id: "2", className: "CS401 - Machine Learning", requester: "Admin", time: "2 days ago", type: "Time Change" },
];

export default function LecturerDashboard() {
  return (
    <DashboardLayout role="lecturer">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">
            Lecturer Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            View your schedules, validate changes, and manage requests
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
          <Link href="/dashboard/lecturer/schedules">
            <Card className="hover-elevate cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-1/20">
                  <Calendar className="h-6 w-6 text-chart-1" />
                </div>
                <div>
                  <p className="font-semibold">My Schedules</p>
                  <p className="text-sm text-muted-foreground">View teaching schedule</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/lecturer/validation">
            <Card className="hover-elevate cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-3/20">
                  <FileCheck className="h-6 w-6 text-chart-3" />
                </div>
                <div>
                  <p className="font-semibold">Validate Schedules</p>
                  <p className="text-sm text-muted-foreground">{pendingValidations.length} awaiting review</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/lecturer/requests">
            <Card className="hover-elevate cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-2/20">
                  <FileEdit className="h-6 w-6 text-chart-2" />
                </div>
                <div>
                  <p className="font-semibold">Change Requests</p>
                  <p className="text-sm text-muted-foreground">Submit or view requests</p>
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
              <Badge variant="outline">{mySchedules.length} classes</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mySchedules.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 rounded-md border border-border p-3"
                  >
                    <div className="flex items-center gap-3">
                      {item.status === "validated" ? (
                        <CheckCircle className="h-4 w-4 text-chart-4" />
                      ) : (
                        <Clock className="h-4 w-4 text-chart-3" />
                      )}
                      <div>
                        <p className="font-medium">{item.className}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.room} | {item.day}, {item.time}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={item.status === "validated" ? "default" : "outline"}
                      className={item.status === "validated" ? "bg-chart-4/20 text-chart-4 border-chart-4/30" : ""}
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/lecturer/schedules">
                <Button variant="ghost" className="mt-4 w-full gap-2">
                  View All Schedules
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-chart-3" />
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
                        {item.type} | Requested {item.time}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <FileCheck className="mr-2 h-4 w-4" />
                      Review
                    </Button>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/lecturer/validation">
                <Button variant="ghost" className="mt-4 w-full gap-2">
                  View All Pending
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
