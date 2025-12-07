import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ValidationAlert } from "@/components/shared/conflict-alert";
import { FileCheck, Clock, CheckCircle, XCircle, AlertTriangle, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const pendingSchedules = [
  {
    id: "1",
    className: "CS301 - Database Systems",
    classCode: "CS301",
    roomName: "Room B201",
    lecturerName: "Dr. John Smith",
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "11:00",
    semester: "2024-1",
    requestedAt: "2024-01-15T10:30:00Z",
    hasConflict: false,
  },
  {
    id: "2",
    className: "MATH201 - Calculus II",
    classCode: "MATH201",
    roomName: "Room A105",
    lecturerName: "Prof. Jane Doe",
    dayOfWeek: 2,
    startTime: "13:00",
    endTime: "15:00",
    semester: "2024-1",
    requestedAt: "2024-01-15T09:15:00Z",
    hasConflict: false,
  },
  {
    id: "3",
    className: "ENG101 - English Composition",
    classCode: "ENG101",
    roomName: "Room C301",
    lecturerName: "Ms. Emily White",
    dayOfWeek: 3,
    startTime: "10:00",
    endTime: "12:00",
    semester: "2024-1",
    requestedAt: "2024-01-14T16:45:00Z",
    hasConflict: true,
    conflictDetails: "Room C301 is already booked for PHY101 at this time slot",
  },
];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AdminValidation() {
  const [selectedSchedule, setSelectedSchedule] = useState<typeof pendingSchedules[0] | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationSuccess, setValidationSuccess] = useState(false);
  const { toast } = useToast();

  const handleValidate = async (approve: boolean) => {
    setIsValidating(true);
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsValidating(false);
    setValidationSuccess(true);
    
    toast({
      title: approve ? "Schedule Validated" : "Schedule Rejected",
      description: approve
        ? "The schedule has been validated and recorded on the blockchain."
        : "The schedule has been rejected.",
    });
    
    setTimeout(() => {
      setSelectedSchedule(null);
      setValidationSuccess(false);
    }, 2000);
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Validation Panel</h1>
          <p className="text-muted-foreground">
            Review and validate pending schedule requests
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-3/20">
                <Clock className="h-6 w-6 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingSchedules.length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-destructive/20">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {pendingSchedules.filter((s) => s.hasConflict).length}
                </p>
                <p className="text-sm text-muted-foreground">With Conflicts</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-4/20">
                <CheckCircle className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {pendingSchedules.filter((s) => !s.hasConflict).length}
                </p>
                <p className="text-sm text-muted-foreground">Ready to Validate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {pendingSchedules.map((schedule) => (
            <Card
              key={schedule.id}
              className={schedule.hasConflict ? "border-destructive/50" : ""}
              data-testid={`card-pending-${schedule.id}`}
            >
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-3/20">
                      <Clock className="h-6 w-6 text-chart-3" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{schedule.className}</h3>
                        {schedule.hasConflict && (
                          <Badge variant="destructive">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            Conflict
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {schedule.roomName} | {dayNames[schedule.dayOfWeek]}, {schedule.startTime} - {schedule.endTime}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Lecturer: {schedule.lecturerName}
                      </p>
                      {schedule.hasConflict && (
                        <p className="mt-2 text-sm text-destructive">
                          {schedule.conflictDetails}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedSchedule(schedule)}
                      data-testid={`button-review-${schedule.id}`}
                    >
                      <FileCheck className="mr-2 h-4 w-4" />
                      Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {pendingSchedules.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="mb-4 h-12 w-12 text-chart-4" />
                <h3 className="text-lg font-semibold">All Caught Up</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  There are no pending schedules to validate.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <Dialog open={!!selectedSchedule} onOpenChange={() => setSelectedSchedule(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Validate Schedule</DialogTitle>
              <DialogDescription>
                Review the schedule details and validate on the blockchain.
              </DialogDescription>
            </DialogHeader>

            {isValidating && (
              <ValidationAlert isValidating />
            )}

            {validationSuccess && (
              <ValidationAlert
                isSuccess
                message="Schedule validated successfully"
                txHash="0x7f8e4a2b3c1d5e6f9a8b7c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f"
              />
            )}

            {!isValidating && !validationSuccess && selectedSchedule && (
              <>
                <div className="space-y-4 py-4">
                  <div className="rounded-md border border-border p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Class</span>
                      <span className="font-medium">{selectedSchedule.className}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Room</span>
                      <span>{selectedSchedule.roomName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lecturer</span>
                      <span>{selectedSchedule.lecturerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Day</span>
                      <span>{dayNames[selectedSchedule.dayOfWeek]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-mono">{selectedSchedule.startTime} - {selectedSchedule.endTime}</span>
                    </div>
                  </div>

                  {selectedSchedule.hasConflict && (
                    <div className="rounded-md border border-destructive bg-destructive/10 p-4">
                      <div className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="font-medium">Conflict Detected</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {selectedSchedule.conflictDetails}
                      </p>
                    </div>
                  )}

                  <div className="rounded-md bg-muted/50 p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Wallet className="h-4 w-4" />
                      <span>This action requires wallet signature</span>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedSchedule(null)}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleValidate(false)}
                    data-testid="button-reject"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleValidate(true)}
                    disabled={selectedSchedule.hasConflict}
                    data-testid="button-approve"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Validate
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
