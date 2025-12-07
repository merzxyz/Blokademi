import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  FileCheck,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Building2,
  User,
  AlertTriangle,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useWallet } from "@/lib/wallet-context";

interface ValidationItem {
  id: string;
  type: "new_schedule" | "time_change" | "room_change";
  className: string;
  classCode: string;
  currentRoom?: string;
  proposedRoom?: string;
  currentTime?: string;
  proposedTime?: string;
  currentDay?: string;
  proposedDay?: string;
  requestedBy: string;
  requestedAt: string;
  reason?: string;
}

const pendingValidations: ValidationItem[] = [
  {
    id: "1",
    type: "new_schedule",
    className: "Linear Algebra",
    classCode: "MATH301",
    proposedRoom: "Room A201",
    proposedTime: "09:00 - 11:00",
    proposedDay: "Monday",
    requestedBy: "Admin",
    requestedAt: "2024-01-15 10:30",
    reason: "New course assignment for Spring semester",
  },
  {
    id: "2",
    type: "time_change",
    className: "Machine Learning",
    classCode: "CS401",
    currentRoom: "Room A105",
    proposedRoom: "Room A105",
    currentTime: "14:00 - 16:00",
    proposedTime: "10:00 - 12:00",
    currentDay: "Tuesday",
    proposedDay: "Tuesday",
    requestedBy: "Admin",
    requestedAt: "2024-01-14 15:45",
    reason: "Room scheduling optimization",
  },
  {
    id: "3",
    type: "room_change",
    className: "Database Systems",
    classCode: "CS301",
    currentRoom: "Room B201",
    proposedRoom: "Room B305",
    currentTime: "09:00 - 11:00",
    proposedTime: "09:00 - 11:00",
    currentDay: "Monday",
    proposedDay: "Monday",
    requestedBy: "Admin",
    requestedAt: "2024-01-13 09:15",
    reason: "Room B201 under maintenance",
  },
];

function getTypeConfig(type: ValidationItem["type"]) {
  switch (type) {
    case "new_schedule":
      return { label: "New Schedule", color: "text-chart-2", bg: "bg-chart-2/20" };
    case "time_change":
      return { label: "Time Change", color: "text-chart-3", bg: "bg-chart-3/20" };
    case "room_change":
      return { label: "Room Change", color: "text-chart-1", bg: "bg-chart-1/20" };
  }
}

function ValidationCard({ item, onApprove, onReject }: { 
  item: ValidationItem; 
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
}) {
  const [rejectReason, setRejectReason] = useState("");
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const { truncatedAddress } = useWallet();
  const typeConfig = getTypeConfig(item.type);

  const handleReject = () => {
    onReject(item.id, rejectReason);
    setIsRejectOpen(false);
    setRejectReason("");
  };

  return (
    <Card data-testid={`card-validation-${item.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-md ${typeConfig.bg}`}>
              <FileCheck className={`h-5 w-5 ${typeConfig.color}`} />
            </div>
            <div>
              <CardTitle className="text-base">{item.className}</CardTitle>
              <p className="font-mono text-xs text-muted-foreground">{item.classCode}</p>
            </div>
          </div>
          <Badge variant="outline" className={typeConfig.color}>
            {typeConfig.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {item.type === "new_schedule" && (
          <div className="rounded-md border border-border p-3 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{item.proposedDay}, {item.proposedTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{item.proposedRoom}</span>
            </div>
          </div>
        )}

        {(item.type === "time_change" || item.type === "room_change") && (
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-md border border-border p-3">
              <p className="mb-2 text-xs font-medium text-muted-foreground">CURRENT</p>
              <div className="space-y-1 text-sm">
                <p>{item.currentDay}, {item.currentTime}</p>
                <p className="text-muted-foreground">{item.currentRoom}</p>
              </div>
            </div>
            <div className="rounded-md border border-chart-4/30 bg-chart-4/5 p-3">
              <p className="mb-2 text-xs font-medium text-chart-4">PROPOSED</p>
              <div className="space-y-1 text-sm">
                <p>{item.proposedDay}, {item.proposedTime}</p>
                <p className="text-muted-foreground">{item.proposedRoom}</p>
              </div>
            </div>
          </div>
        )}

        {item.reason && (
          <div className="rounded-md bg-muted/50 p-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">Reason</p>
            <p className="text-sm">{item.reason}</p>
          </div>
        )}

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>Requested by {item.requestedBy}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{item.requestedAt}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button 
            className="flex-1 gap-2" 
            onClick={() => onApprove(item.id)}
            data-testid={`button-approve-${item.id}`}
          >
            <Wallet className="h-4 w-4" />
            Sign & Approve
          </Button>
          <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1 gap-2" data-testid={`button-reject-${item.id}`}>
                <XCircle className="h-4 w-4" />
                Reject
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reject Validation</DialogTitle>
                <DialogDescription>
                  Provide a reason for rejecting this schedule change request.
                </DialogDescription>
              </DialogHeader>
              <Textarea
                placeholder="Enter rejection reason..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="min-h-[100px]"
                data-testid="textarea-reject-reason"
              />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRejectOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleReject} disabled={!rejectReason.trim()}>
                  Confirm Rejection
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Signing as <span className="font-mono">{truncatedAddress}</span>
        </p>
      </CardContent>
    </Card>
  );
}

export default function LecturerValidation() {
  const [validations, setValidations] = useState(pendingValidations);

  const handleApprove = (id: string) => {
    setValidations((prev) => prev.filter((v) => v.id !== id));
  };

  const handleReject = (id: string, reason: string) => {
    setValidations((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <DashboardLayout role="lecturer">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">
            Schedule Validation
          </h1>
          <p className="mt-1 text-muted-foreground">
            Review and validate schedule changes that require your approval
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-3/20">
                <Clock className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold">{validations.length}</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-4/20">
                <CheckCircle className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Approved This Month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-destructive/20">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Rejected This Month</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {validations.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-chart-4/20">
                <CheckCircle className="h-6 w-6 text-chart-4" />
              </div>
              <h3 className="text-lg font-semibold">All Caught Up</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                There are no schedule changes requiring your validation at the moment.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {validations.map((item) => (
              <ValidationCard
                key={item.id}
                item={item}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-4 w-4 text-chart-3" />
              Validation Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-chart-4" />
                Verify that proposed times do not conflict with your existing schedule
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-chart-4" />
                Check room capacity matches your class enrollment
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-chart-4" />
                All approvals require cryptographic signing via your connected wallet
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-chart-4" />
                Validation transactions are permanently recorded on the blockchain
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
