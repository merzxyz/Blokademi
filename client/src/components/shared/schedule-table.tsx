import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, AlertTriangle, Archive, Eye, Edit, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ScheduleStatus } from "@shared/schema";

interface ScheduleItem {
  id: string;
  className: string;
  classCode: string;
  roomName: string;
  lecturerName: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  status: ScheduleStatus;
  semester: string;
}

interface ScheduleTableProps {
  schedules: ScheduleItem[];
  showActions?: boolean;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onValidate?: (id: string) => void;
  isLoading?: boolean;
}

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getStatusConfig(status: ScheduleStatus) {
  switch (status) {
    case "validated":
      return {
        label: "Validated",
        variant: "default" as const,
        icon: CheckCircle,
        className: "bg-chart-4/20 text-chart-4 border-chart-4/30",
      };
    case "pending":
      return {
        label: "Pending",
        variant: "outline" as const,
        icon: Clock,
        className: "border-chart-3/50 text-chart-3",
      };
    case "conflict":
      return {
        label: "Conflict",
        variant: "destructive" as const,
        icon: AlertTriangle,
        className: "",
      };
    case "archived":
      return {
        label: "Archived",
        variant: "secondary" as const,
        icon: Archive,
        className: "opacity-60",
      };
    default:
      return {
        label: status,
        variant: "outline" as const,
        icon: Clock,
        className: "",
      };
  }
}

export function ScheduleTable({
  schedules,
  showActions = true,
  onView,
  onEdit,
  onValidate,
  isLoading,
}: ScheduleTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (schedules.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold">No Schedules Found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              There are no schedules to display at the moment.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="hidden md:block">
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Lecturer</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                {showActions && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule) => {
                const statusConfig = getStatusConfig(schedule.status);
                const StatusIcon = statusConfig.icon;
                return (
                  <TableRow key={schedule.id} data-testid={`row-schedule-${schedule.id}`}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{schedule.className}</p>
                        <p className="font-mono text-xs text-muted-foreground">
                          {schedule.classCode}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{schedule.roomName}</TableCell>
                    <TableCell>{schedule.lecturerName}</TableCell>
                    <TableCell>{dayNames[schedule.dayOfWeek]}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {schedule.startTime} - {schedule.endTime}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusConfig.variant} className={statusConfig.className}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {statusConfig.label}
                      </Badge>
                    </TableCell>
                    {showActions && (
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" data-testid={`button-actions-${schedule.id}`}>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onView?.(schedule.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {onEdit && (
                              <DropdownMenuItem onClick={() => onEdit(schedule.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                            )}
                            {onValidate && schedule.status === "pending" && (
                              <DropdownMenuItem onClick={() => onValidate(schedule.id)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Validate
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function Calendar({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

export function ScheduleCards({ schedules, onView }: { schedules: ScheduleItem[]; onView?: (id: string) => void }) {
  if (schedules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Calendar className="mb-4 h-12 w-12 text-muted-foreground/50" />
        <h3 className="text-lg font-semibold">No Schedules</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          No schedules available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:hidden">
      {schedules.map((schedule) => {
        const statusConfig = getStatusConfig(schedule.status);
        const StatusIcon = statusConfig.icon;
        return (
          <Card key={schedule.id} className="hover-elevate" data-testid={`card-schedule-${schedule.id}`}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base">{schedule.className}</CardTitle>
                  <p className="font-mono text-xs text-muted-foreground">
                    {schedule.classCode}
                  </p>
                </div>
                <Badge variant={statusConfig.variant} className={statusConfig.className}>
                  <StatusIcon className="mr-1 h-3 w-3" />
                  {statusConfig.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Room</span>
                <span>{schedule.roomName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lecturer</span>
                <span>{schedule.lecturerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Day</span>
                <span>{dayNames[schedule.dayOfWeek]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time</span>
                <span className="font-mono">{schedule.startTime} - {schedule.endTime}</span>
              </div>
              {onView && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full"
                  onClick={() => onView(schedule.id)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
