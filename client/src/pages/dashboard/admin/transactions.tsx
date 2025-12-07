import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { TransactionTable, TransactionCards } from "@/components/shared/transaction-table";
import { StatCard } from "@/components/shared/stat-card";
import { Database, CheckCircle, Clock, XCircle } from "lucide-react";

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
    actorWallet: "0x1234567890abcdef1234567890abcdef12345678",
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
];

export default function AdminTransactions() {
  const stats = {
    total: mockTransactions.length,
    confirmed: mockTransactions.filter((tx) => tx.status === "confirmed").length,
    pending: mockTransactions.filter((tx) => tx.status === "pending").length,
    failed: mockTransactions.filter((tx) => tx.status === "failed").length,
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground">
            View all blockchain transactions for admin actions
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
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

        <div className="hidden md:block">
          <TransactionTable transactions={mockTransactions} />
        </div>
        <div className="md:hidden">
          <TransactionCards transactions={mockTransactions} />
        </div>
      </div>
    </DashboardLayout>
  );
}
