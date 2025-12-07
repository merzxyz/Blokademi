import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScheduleTable, ScheduleCards } from "@/components/shared/schedule-table";
import {
  Calendar,
  Clock,
  Building2,
  CheckCircle,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const mockSchedules = [
  {
    id: "1",
    className: "Database Systems",
    classCode: "CS301",
    roomName: "Room B201",
    lecturerName: "You",
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "11:00",
    status: "validated" as const,
    semester: "Fall 2024",
  },
  {
    id: "2",
    className: "Machine Learning",
    classCode: "CS401",
    roomName: "Room A105",
    lecturerName: "You",
    dayOfWeek: 2,
    startTime: "14:00",
    endTime: "16:00",
    status: "validated" as const,
    semester: "Fall 2024",
  },
  {
    id: "3",
    className: "Data Structures",
    classCode: "CS201",
    roomName: "Room C301",
    lecturerName: "You",
    dayOfWeek: 3,
    startTime: "10:00",
    endTime: "12:00",
    status: "pending" as const,
    semester: "Fall 2024",
  },
  {
    id: "4",
    className: "Algorithms",
    classCode: "CS302",
    roomName: "Room B105",
    lecturerName: "You",
    dayOfWeek: 4,
    startTime: "13:00",
    endTime: "15:00",
    status: "validated" as const,
    semester: "Fall 2024",
  },
  {
    id: "5",
    className: "Computer Networks",
    classCode: "CS350",
    roomName: "Room A201",
    lecturerName: "You",
    dayOfWeek: 5,
    startTime: "09:00",
    endTime: "11:00",
    status: "validated" as const,
    semester: "Fall 2024",
  },
  {
    id: "6",
    className: "Software Engineering",
    classCode: "CS380",
    roomName: "Room C102",
    lecturerName: "You",
    dayOfWeek: 1,
    startTime: "14:00",
    endTime: "16:00",
    status: "validated" as const,
    semester: "Fall 2024",
  },
];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function LecturerSchedules() {
  const [filter, setFilter] = useState("all");

  const filteredSchedules = mockSchedules.filter((s) => {
    if (filter === "all") return true;
    return s.status === filter;
  });

  const totalHours = mockSchedules.reduce((acc, s) => {
    const start = parseInt(s.startTime.split(":")[0]);
    const end = parseInt(s.endTime.split(":")[0]);
    return acc + (end - start);
  }, 0);

  return (
    <DashboardLayout role="lecturer">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold md:text-3xl">
              My Teaching Schedule
            </h1>
            <p className="mt-1 text-muted-foreground">
              View and manage your assigned classes
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-1/20">
                <Calendar className="h-5 w-5 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockSchedules.length}</p>
                <p className="text-sm text-muted-foreground">Total Classes</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-4/20">
                <CheckCircle className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockSchedules.filter(s => s.status === "validated").length}</p>
                <p className="text-sm text-muted-foreground">Validated</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-3/20">
                <Clock className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalHours}h</p>
                <p className="text-sm text-muted-foreground">Weekly Hours</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-2/20">
                <Building2 className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold">{new Set(mockSchedules.map(s => s.roomName)).size}</p>
                <p className="text-sm text-muted-foreground">Rooms Used</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
            <CardTitle>Weekly Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid gap-2 md:grid-cols-5">
              {[1, 2, 3, 4, 5].map((day) => {
                const daySchedules = mockSchedules.filter((s) => s.dayOfWeek === day);
                return (
                  <div key={day} className="rounded-md border border-border p-3">
                    <p className="mb-2 text-sm font-semibold text-muted-foreground">
                      {dayNames[day]}
                    </p>
                    {daySchedules.length === 0 ? (
                      <p className="text-xs text-muted-foreground">No classes</p>
                    ) : (
                      <div className="space-y-2">
                        {daySchedules.map((s) => (
                          <div
                            key={s.id}
                            className="rounded-md bg-chart-1/10 p-2 text-xs"
                          >
                            <p className="font-medium">{s.classCode}</p>
                            <p className="text-muted-foreground">
                              {s.startTime} - {s.endTime}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]" data-testid="select-filter">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Schedules</SelectItem>
                <SelectItem value="validated">Validated</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Badge variant="outline">{filteredSchedules.length} schedules</Badge>
        </div>

        <ScheduleTable
          schedules={filteredSchedules}
          showActions={false}
        />
        <ScheduleCards schedules={filteredSchedules} />
      </div>
    </DashboardLayout>
  );
}
