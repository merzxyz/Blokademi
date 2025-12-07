import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileEdit,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Building2,
  ArrowRight,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useWallet } from "@/lib/wallet-context";

interface ChangeRequest {
  id: string;
  type: "time_change" | "room_change" | "cancellation";
  className: string;
  classCode: string;
  currentDetails: string;
  proposedDetails: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

const myRequests: ChangeRequest[] = [
  {
    id: "1",
    type: "time_change",
    className: "Database Systems",
    classCode: "CS301",
    currentDetails: "Monday 09:00 - 11:00",
    proposedDetails: "Monday 14:00 - 16:00",
    reason: "Conference attendance in the morning",
    status: "pending",
    submittedAt: "2024-01-15 08:30",
  },
  {
    id: "2",
    type: "room_change",
    className: "Machine Learning",
    classCode: "CS401",
    currentDetails: "Room A105",
    proposedDetails: "Room B301 (Computer Lab)",
    reason: "Practical session requires computer lab",
    status: "approved",
    submittedAt: "2024-01-10 14:20",
    reviewedAt: "2024-01-11 09:15",
    reviewedBy: "Admin",
  },
  {
    id: "3",
    type: "cancellation",
    className: "Data Structures",
    classCode: "CS201",
    currentDetails: "Wednesday 10:00 - 12:00",
    proposedDetails: "Cancelled for Jan 17",
    reason: "Medical appointment",
    status: "rejected",
    submittedAt: "2024-01-08 16:45",
    reviewedAt: "2024-01-09 10:30",
    reviewedBy: "Admin",
    rejectionReason: "Insufficient notice period. Please provide at least 48 hours notice.",
  },
];

const mySchedules = [
  { id: "1", name: "Database Systems", code: "CS301", time: "Monday 09:00 - 11:00", room: "B201" },
  { id: "2", name: "Machine Learning", code: "CS401", time: "Tuesday 14:00 - 16:00", room: "A105" },
  { id: "3", name: "Data Structures", code: "CS201", time: "Wednesday 10:00 - 12:00", room: "C301" },
  { id: "4", name: "Algorithms", code: "CS302", time: "Thursday 13:00 - 15:00", room: "B105" },
];

function getStatusConfig(status: ChangeRequest["status"]) {
  switch (status) {
    case "pending":
      return { label: "Pending", icon: Clock, className: "border-chart-3/50 text-chart-3" };
    case "approved":
      return { label: "Approved", icon: CheckCircle, className: "bg-chart-4/20 text-chart-4 border-chart-4/30" };
    case "rejected":
      return { label: "Rejected", icon: XCircle, className: "" };
  }
}

function getTypeLabel(type: ChangeRequest["type"]) {
  switch (type) {
    case "time_change":
      return "Time Change";
    case "room_change":
      return "Room Change";
    case "cancellation":
      return "Class Cancellation";
  }
}

export default function LecturerRequests() {
  const [isOpen, setIsOpen] = useState(false);
  const [requestType, setRequestType] = useState<string>("");
  const [selectedSchedule, setSelectedSchedule] = useState<string>("");
  const [proposedChange, setProposedChange] = useState("");
  const [reason, setReason] = useState("");
  const { truncatedAddress } = useWallet();

  const handleSubmit = () => {
    setIsOpen(false);
    setRequestType("");
    setSelectedSchedule("");
    setProposedChange("");
    setReason("");
  };

  const pendingCount = myRequests.filter((r) => r.status === "pending").length;
  const approvedCount = myRequests.filter((r) => r.status === "approved").length;

  return (
    <DashboardLayout role="lecturer">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold md:text-3xl">
              Change Requests
            </h1>
            <p className="mt-1 text-muted-foreground">
              Submit and track your schedule change requests
            </p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" data-testid="button-new-request">
                <Plus className="h-4 w-4" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Submit Change Request</DialogTitle>
                <DialogDescription>
                  Request a modification to your teaching schedule. All requests require admin approval.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Request Type</Label>
                  <Select value={requestType} onValueChange={setRequestType}>
                    <SelectTrigger data-testid="select-request-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="time_change">Time Change</SelectItem>
                      <SelectItem value="room_change">Room Change</SelectItem>
                      <SelectItem value="cancellation">Class Cancellation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Select Class</Label>
                  <Select value={selectedSchedule} onValueChange={setSelectedSchedule}>
                    <SelectTrigger data-testid="select-class">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {mySchedules.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.code} - {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Proposed Change</Label>
                  <Input
                    placeholder={
                      requestType === "time_change"
                        ? "e.g., Tuesday 14:00 - 16:00"
                        : requestType === "room_change"
                        ? "e.g., Room B301"
                        : "e.g., Cancel Jan 17 class"
                    }
                    value={proposedChange}
                    onChange={(e) => setProposedChange(e.target.value)}
                    data-testid="input-proposed-change"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Reason</Label>
                  <Textarea
                    placeholder="Explain why this change is needed..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="min-h-[80px]"
                    data-testid="textarea-reason"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!requestType || !selectedSchedule || !proposedChange || !reason}
                  className="gap-2"
                >
                  <Wallet className="h-4 w-4" />
                  Sign & Submit
                </Button>
              </DialogFooter>
              <p className="text-center text-xs text-muted-foreground">
                Signing as <span className="font-mono">{truncatedAddress}</span>
              </p>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-3/20">
                <Clock className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-4/20">
                <CheckCircle className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">{approvedCount}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-2/20">
                <FileEdit className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold">{myRequests.length}</p>
                <p className="text-sm text-muted-foreground">Total Requests</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {myRequests.map((request) => {
            const statusConfig = getStatusConfig(request.status);
            const StatusIcon = statusConfig.icon;

            return (
              <Card key={request.id} data-testid={`card-request-${request.id}`}>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{request.className}</h3>
                        <Badge variant="outline" className="font-mono text-xs">
                          {request.classCode}
                        </Badge>
                        <Badge variant="outline">{getTypeLabel(request.type)}</Badge>
                        <Badge
                          variant={request.status === "rejected" ? "destructive" : "outline"}
                          className={statusConfig.className}
                        >
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {statusConfig.label}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">{request.currentDetails}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{request.proposedDetails}</span>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Reason:</span> {request.reason}
                      </p>

                      {request.status === "rejected" && request.rejectionReason && (
                        <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3">
                          <p className="text-sm text-destructive">
                            <span className="font-medium">Rejection Reason:</span> {request.rejectionReason}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span>Submitted: {request.submittedAt}</span>
                        {request.reviewedAt && (
                          <span>Reviewed: {request.reviewedAt} by {request.reviewedBy}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {myRequests.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <FileEdit className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No Requests Yet</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                You haven't submitted any change requests. Click "New Request" to submit one.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
