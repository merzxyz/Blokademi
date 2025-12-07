import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScheduleTable, ScheduleCards } from "@/components/shared/schedule-table";
import { ConflictAlert } from "@/components/shared/conflict-alert";
import { Plus, Search, Filter, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockSchedules = [
  { id: "1", className: "CS101 - Introduction to Programming", classCode: "CS101", roomName: "Room A101", lecturerName: "Dr. John Smith", dayOfWeek: 1, startTime: "09:00", endTime: "11:00", status: "validated" as const, semester: "2024-1" },
  { id: "2", className: "MATH201 - Calculus II", classCode: "MATH201", roomName: "Room A105", lecturerName: "Prof. Jane Doe", dayOfWeek: 2, startTime: "13:00", endTime: "15:00", status: "pending" as const, semester: "2024-1" },
  { id: "3", className: "PHY101 - Physics I", classCode: "PHY101", roomName: "Room B201", lecturerName: "Dr. Robert Brown", dayOfWeek: 3, startTime: "10:00", endTime: "12:00", status: "validated" as const, semester: "2024-1" },
  { id: "4", className: "ENG101 - English Composition", classCode: "ENG101", roomName: "Room C301", lecturerName: "Ms. Emily White", dayOfWeek: 4, startTime: "14:00", endTime: "16:00", status: "conflict" as const, semester: "2024-1" },
  { id: "5", className: "CS301 - Database Systems", classCode: "CS301", roomName: "Room B201", lecturerName: "Dr. John Smith", dayOfWeek: 5, startTime: "09:00", endTime: "11:00", status: "pending" as const, semester: "2024-1" },
];

const mockRooms = [
  { id: "1", name: "Room A101" },
  { id: "2", name: "Room A105" },
  { id: "3", name: "Room B201" },
  { id: "4", name: "Room C301" },
];

const mockClasses = [
  { id: "1", name: "CS101 - Introduction to Programming", code: "CS101" },
  { id: "2", name: "MATH201 - Calculus II", code: "MATH201" },
  { id: "3", name: "PHY101 - Physics I", code: "PHY101" },
];

const mockLecturers = [
  { id: "1", name: "Dr. John Smith" },
  { id: "2", name: "Prof. Jane Doe" },
  { id: "3", name: "Dr. Robert Brown" },
];

export default function AdminSchedules() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [conflicts, setConflicts] = useState<{ type: "room" | "lecturer" | "time"; message: string; suggestion?: string }[]>([]);
  const { toast } = useToast();

  const filteredSchedules = mockSchedules.filter((schedule) => {
    const matchesSearch =
      schedule.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.roomName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.lecturerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || schedule.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateSchedule = () => {
    toast({
      title: "Schedule Created",
      description: "The schedule has been submitted to the blockchain for validation.",
    });
    setCreateDialogOpen(false);
  };

  const handleValidate = (id: string) => {
    toast({
      title: "Validating Schedule",
      description: "Transaction submitted to blockchain. Please sign with your wallet.",
    });
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">Schedule Management</h1>
            <p className="text-muted-foreground">Create and manage class schedules</p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" data-testid="button-create-schedule">
                <Plus className="h-4 w-4" />
                Create Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Schedule</DialogTitle>
                <DialogDescription>
                  Add a new class schedule. The schedule will be validated on the blockchain.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Class</Label>
                  <Select>
                    <SelectTrigger data-testid="select-class">
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockClasses.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Room</Label>
                  <Select>
                    <SelectTrigger data-testid="select-room">
                      <SelectValue placeholder="Select a room" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockRooms.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Lecturer</Label>
                  <Select>
                    <SelectTrigger data-testid="select-lecturer">
                      <SelectValue placeholder="Select a lecturer" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockLecturers.map((lecturer) => (
                        <SelectItem key={lecturer.id} value={lecturer.id}>
                          {lecturer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Day of Week</Label>
                  <Select>
                    <SelectTrigger data-testid="select-day">
                      <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Monday</SelectItem>
                      <SelectItem value="2">Tuesday</SelectItem>
                      <SelectItem value="3">Wednesday</SelectItem>
                      <SelectItem value="4">Thursday</SelectItem>
                      <SelectItem value="5">Friday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Input type="time" data-testid="input-start-time" />
                  </div>
                  <div className="space-y-2">
                    <Label>End Time</Label>
                    <Input type="time" data-testid="input-end-time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Semester</Label>
                  <Input placeholder="e.g., 2024-1" data-testid="input-semester" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateSchedule} data-testid="button-submit-schedule">
                  Create Schedule
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {conflicts.length > 0 && (
          <ConflictAlert conflicts={conflicts} onDismiss={() => setConflicts([])} />
        )}

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search schedules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-search-schedules"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40" data-testid="select-status-filter">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="validated">Validated</SelectItem>
                  <SelectItem value="conflict">Conflict</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <ScheduleTable
          schedules={filteredSchedules}
          showActions
          onValidate={handleValidate}
        />
        <ScheduleCards schedules={filteredSchedules} />
      </div>
    </DashboardLayout>
  );
}
