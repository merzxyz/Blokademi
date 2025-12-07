import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionTable, TransactionCards } from "@/components/shared/transaction-table";
import { StatCard } from "@/components/shared/stat-card";
import { Database, Search, Filter, CheckCircle, Clock, XCircle, History } from "lucide-react";

const mockTransactions = [
  {
    id: "1",
    txHash: "0x7f8e4a2b3c1d5e6f9a8b7c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f",
    timestamp: "2024-01-15T14:32:01Z",
    actionType: "create_schedule",
    actorWallet: "0x1234567890abcdef1234567890abcdef12345678",
    entityType: "Schedule",
    entityId: "SCH001",
    details: "Created schedule for CS101 - Introduction to Programming in Room A101",
    status: "confirmed" as const,
    blockNumber: 18456789,
    gasUsed: "145,230",
  },
  {
    id: "2",
    txHash: "0x2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b",
    timestamp: "2024-01-15T13:15:22Z",
    actionType: "validate_schedule",
    actorWallet: "0xabcdef1234567890abcdef1234567890abcdef12",
    entityType: "Schedule",
    entityId: "SCH002",
    details: "Validated schedule for MATH201 - Calculus II",
    status: "confirmed" as const,
    blockNumber: 18456750,
    gasUsed: "98,450",
  },
  {
    id: "3",
    txHash: "0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d",
    timestamp: "2024-01-15T11:45:10Z",
    actionType: "create_room",
    actorWallet: "0x1234567890abcdef1234567890abcdef12345678",
    entityType: "Room",
    entityId: "ROOM003",
    details: "Created Room B205 in Engineering Building with capacity 60",
    status: "confirmed" as const,
    blockNumber: 18456700,
    gasUsed: "125,800",
  },
  {
    id: "4",
    txHash: "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e",
    timestamp: "2024-01-15T10:20:33Z",
    actionType: "enroll",
    actorWallet: "0x5678901234abcdef5678901234abcdef56789012",
    entityType: "Enrollment",
    entityId: "ENR001",
    details: "Student enrolled in CS101 - Introduction to Programming",
    status: "confirmed" as const,
    blockNumber: 18456650,
    gasUsed: "78,900",
  },
  {
    id: "5",
    txHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    timestamp: "2024-01-15T09:05:45Z",
    actionType: "change_request",
    actorWallet: "0xabcdef1234567890abcdef1234567890abcdef12",
    entityType: "ChangeRequest",
    entityId: "REQ001",
    details: "Lecturer submitted change request for schedule time modification",
    status: "pending" as const,
    blockNumber: null,
    gasUsed: null,
  },
  {
    id: "6",
    txHash: "0x8f9e0d1c2b3a4f5e6d7c8b9a0f1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e",
    timestamp: "2024-01-14T16:30:12Z",
    actionType: "update_schedule",
    actorWallet: "0x1234567890abcdef1234567890abcdef12345678",
    entityType: "Schedule",
    entityId: "SCH003",
    details: "Updated schedule status from pending to validated",
    status: "confirmed" as const,
    blockNumber: 18456500,
    gasUsed: "65,200",
  },
];

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTransactions = mockTransactions.filter((tx) => {
    const matchesSearch =
      tx.txHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.actorWallet.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === "all" || tx.actionType === actionFilter;
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    return matchesSearch && matchesAction && matchesStatus;
  });

  const stats = {
    total: mockTransactions.length,
    confirmed: mockTransactions.filter((tx) => tx.status === "confirmed").length,
    pending: mockTransactions.filter((tx) => tx.status === "pending").length,
    failed: mockTransactions.filter((tx) => tx.status === "failed").length,
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="px-4 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <Badge variant="outline" className="mb-4">Blockchain Records</Badge>
            <h1 className="font-display text-3xl font-bold md:text-4xl">
              Transaction History
            </h1>
            <p className="mt-2 text-muted-foreground">
              View all schedule-related transactions recorded on the Ethereum blockchain
              with complete audit trail data.
            </p>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <StatCard
              title="Total Transactions"
              value={stats.total}
              icon={Database}
              iconColor="text-primary"
              iconBgColor="bg-primary/20"
            />
            <StatCard
              title="Confirmed"
              value={stats.confirmed}
              icon={CheckCircle}
              iconColor="text-chart-4"
              iconBgColor="bg-chart-4/20"
            />
            <StatCard
              title="Pending"
              value={stats.pending}
              icon={Clock}
              iconColor="text-chart-3"
              iconBgColor="bg-chart-3/20"
            />
            <StatCard
              title="Failed"
              value={stats.failed}
              icon={XCircle}
              iconColor="text-destructive"
              iconBgColor="bg-destructive/20"
            />
          </div>

          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by TX hash, wallet address, or details..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                    data-testid="input-search-transactions"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={actionFilter} onValueChange={setActionFilter}>
                    <SelectTrigger className="w-40" data-testid="select-action-filter">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      <SelectItem value="create_schedule">Create Schedule</SelectItem>
                      <SelectItem value="validate_schedule">Validate Schedule</SelectItem>
                      <SelectItem value="update_schedule">Update Schedule</SelectItem>
                      <SelectItem value="create_room">Create Room</SelectItem>
                      <SelectItem value="enroll">Enrollment</SelectItem>
                      <SelectItem value="change_request">Change Request</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-36" data-testid="select-status-filter">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="hidden md:block">
            <TransactionTable transactions={filteredTransactions} />
          </div>
          <div className="md:hidden">
            <TransactionCards transactions={filteredTransactions} />
          </div>

          {filteredTransactions.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <History className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold">No Transactions Found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  No transactions match your current filters.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setActionFilter("all");
                    setStatusFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
