import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TransactionTable, TransactionCards } from "@/components/shared/transaction-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  History,
  Search,
  Filter,
  CheckCircle,
  Clock,
  FileCheck,
  FileEdit,
} from "lucide-react";
import { useState } from "react";
import { useWallet } from "@/lib/wallet-context";

const mockTransactions = [
  {
    id: "1",
    txHash: "0x7f8e4a2b9c1d3e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f",
    timestamp: "2024-01-15T14:32:01Z",
    actionType: "validate_schedule",
    actorWallet: "0x742d35Cc6634C0532925a3b844Bc9e7595f8bDc7",
    entityType: "Schedule",
    entityId: "SCH-2024-0015",
    details: "Validated schedule for CS301 - Database Systems",
    status: "confirmed" as const,
    blockNumber: 18456789,
    gasUsed: "45,234",
  },
  {
    id: "2",
    txHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    timestamp: "2024-01-14T09:15:30Z",
    actionType: "change_request",
    actorWallet: "0x742d35Cc6634C0532925a3b844Bc9e7595f8bDc7",
    entityType: "ChangeRequest",
    entityId: "REQ-2024-0008",
    details: "Submitted time change request for CS401 - Machine Learning",
    status: "confirmed" as const,
    blockNumber: 18455432,
    gasUsed: "38,567",
  },
  {
    id: "3",
    txHash: "0x9f8e7d6c5b4a3928171605f4e3d2c1b0a9f8e7d6c5b4a3928171605f4e3d2c1b",
    timestamp: "2024-01-13T16:45:22Z",
    actionType: "validate_schedule",
    actorWallet: "0x742d35Cc6634C0532925a3b844Bc9e7595f8bDc7",
    entityType: "Schedule",
    entityId: "SCH-2024-0012",
    details: "Validated room change for CS201 - Data Structures",
    status: "confirmed" as const,
    blockNumber: 18454123,
    gasUsed: "42,891",
  },
  {
    id: "4",
    txHash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d",
    timestamp: "2024-01-12T11:20:15Z",
    actionType: "change_request",
    actorWallet: "0x742d35Cc6634C0532925a3b844Bc9e7595f8bDc7",
    entityType: "ChangeRequest",
    entityId: "REQ-2024-0006",
    details: "Submitted room change request for CS350 - Computer Networks",
    status: "confirmed" as const,
    blockNumber: 18452876,
    gasUsed: "36,234",
  },
  {
    id: "5",
    txHash: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f",
    timestamp: "2024-01-11T08:55:40Z",
    actionType: "validate_schedule",
    actorWallet: "0x742d35Cc6634C0532925a3b844Bc9e7595f8bDc7",
    entityType: "Schedule",
    entityId: "SCH-2024-0010",
    details: "Validated new schedule assignment for MATH301 - Linear Algebra",
    status: "confirmed" as const,
    blockNumber: 18451234,
    gasUsed: "48,123",
  },
];

export default function LecturerTransactions() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { truncatedAddress, address } = useWallet();

  const filteredTransactions = mockTransactions.filter((t) => {
    const matchesFilter = filter === "all" || t.actionType === filter;
    const matchesSearch =
      search === "" ||
      t.txHash.toLowerCase().includes(search.toLowerCase()) ||
      t.details.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const validationCount = mockTransactions.filter((t) => t.actionType === "validate_schedule").length;
  const requestCount = mockTransactions.filter((t) => t.actionType === "change_request").length;

  return (
    <DashboardLayout role="lecturer">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">
            My Transactions
          </h1>
          <p className="mt-1 text-muted-foreground">
            View your blockchain transaction history
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/20">
                <History className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockTransactions.length}</p>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-4/20">
                <FileCheck className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">{validationCount}</p>
                <p className="text-sm text-muted-foreground">Validations</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-2/20">
                <FileEdit className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold">{requestCount}</p>
                <p className="text-sm text-muted-foreground">Change Requests</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-4/20">
                <CheckCircle className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Wallet Address:</span>
              <code className="rounded-md bg-muted px-2 py-1 font-mono text-xs">
                {address || truncatedAddress}
              </code>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by hash or details..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]" data-testid="select-filter">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="validate_schedule">Validations</SelectItem>
                <SelectItem value="change_request">Change Requests</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Badge variant="outline">{filteredTransactions.length} transactions</Badge>
        </div>

        <div className="hidden md:block">
          <TransactionTable transactions={filteredTransactions} />
        </div>
        <div className="md:hidden">
          <TransactionCards transactions={filteredTransactions} />
        </div>
      </div>
    </DashboardLayout>
  );
}
