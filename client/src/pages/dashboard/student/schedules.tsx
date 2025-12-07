import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Search,
  MapPin,
  Clock,
  User,
} from "lucide-react";

const schedules = [
  { id: "1", courseName: "CS301 - Database Systems", courseCode: "CS301", lecturer: "Dr. Smith", room: "B201", time: "09:00 - 11:00", day: "Monday", credits: 3 },
  { id: "2", courseName: "MATH201 - Calculus II", courseCode: "MATH201", lecturer: "Prof. Johnson", room: "A105", time: "13:00 - 15:00", day: "Tuesday", credits: 4 },
  { id: "3", courseName: "ENG101 - English Composition", courseCode: "ENG101", lecturer: "Ms. Davis", room: "C301", time: "10:00 - 12:00", day: "Wednesday", credits: 3 },
  { id: "4", courseName: "PHY201 - Physics II", courseCode: "PHY201", lecturer: "Dr. Brown", room: "D102", time: "14:00 - 16:00", day: "Thursday", credits: 4 },
  { id: "5", courseName: "CS201 - Data Structures", courseCode: "CS201", lecturer: "Dr. Wilson", room: "B203", time: "08:00 - 10:00", day: "Friday", credits: 3 },
  { id: "6", courseName: "CS301 - Database Systems", courseCode: "CS301", lecturer: "Dr. Smith", room: "B201", time: "09:00 - 11:00", day: "Wednesday", credits: 3 },
  { id: "7", courseName: "MATH201 - Calculus II", courseCode: "MATH201", lecturer: "Prof. Johnson", room: "A105", time: "13:00 - 15:00", day: "Thursday", credits: 4 },
];

const days = ["All Days", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const getDayColor = (day: string) => {
  const colors: Record<string, string> = {
    Monday: "bg-chart-1/20 text-chart-1",
    Tuesday: "bg-chart-2/20 text-chart-2",
    Wednesday: "bg-chart-3/20 text-chart-3",
    Thursday: "bg-chart-4/20 text-chart-4",
    Friday: "bg-chart-5/20 text-chart-5",
  };
  return colors[day] || "bg-muted text-muted-foreground";
};

export default function StudentSchedules() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState("All Days");

  const filteredSchedules = schedules.filter((schedule) => {
    const matchesSearch =
      schedule.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.lecturer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDay = selectedDay === "All Days" || schedule.day === selectedDay;
    return matchesSearch && matchesDay;
  });

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">
            My Schedules
          </h1>
          <p className="mt-1 text-muted-foreground">
            View your enrolled class schedules for the semester
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-chart-1" />
              Class Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by course, code, or lecturer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-search-schedules"
                />
              </div>
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger className="w-full sm:w-40" data-testid="select-day-filter">
                  <SelectValue placeholder="Filter by day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day} value={day} data-testid={`option-day-${day.toLowerCase().replace(/\s+/g, "-")}`}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {filteredSchedules.length === 0 ? (
              <div className="py-12 text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No schedules found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSchedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="flex flex-col gap-4 rounded-md border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                    data-testid={`schedule-row-${schedule.id}`}
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{schedule.courseName}</p>
                        <Badge variant="outline" size="sm">{schedule.credits} Credits</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {schedule.lecturer}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {schedule.room}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {schedule.time}
                        </span>
                      </div>
                    </div>
                    <Badge className={getDayColor(schedule.day)}>
                      {schedule.day}
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredSchedules.length} of {schedules.length} schedules
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
