import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  History,
  Search,
  CheckCircle,
  Clock,
  ArrowRightLeft,
  ExternalLink,
} from "lucide-react";

const transactions = [
  { 
    id: "1", 
    hash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12", 
    type: "Enrollment", 
    description: "Enrolled in CS301 - Database Systems", 
    timestamp: "2024-01-15 09:30:00", 
    status: "confirmed",
    blockNumber: 12345678
  },
  { 
    id: "2", 
    hash: "0x2b3c4d5e6f7890abcdef1234567890abcdef123a", 
    type: "Enrollment", 
    description: "Enrolled in MATH201 - Calculus II", 
    timestamp: "2024-01-15 09:35:00", 
    status: "confirmed",
    blockNumber: 12345679
  },
  { 
    id: "3", 
    hash: "0x3c4d5e6f7890abcdef1234567890abcdef1234ab", 
    type: "Enrollment", 
    description: "Enrolled in ENG101 - English Composition", 
    timestamp: "2024-01-16 10:15:00", 
    status: "confirmed",
    blockNumber: 12345890
  },
  { 
    id: "4", 
    hash: "0x4d5e6f7890abcdef1234567890abcdef12345abc", 
    type: "Enrollment", 
    description: "Enrolled in PHY201 - Physics II", 
    timestamp: "2024-01-18 14:20:00", 
    status: "pending",
    blockNumber: null
  },
  { 
    id: "5", 
    hash: "0x5e6f7890abcdef1234567890abcdef123456abcd", 
    type: "Unenrollment", 
    description: "Unenrolled from BIO101 - Biology Basics", 
    timestamp: "2024-01-17 11:45:00", 
    status: "confirmed",
    blockNumber: 12346001
  },
  { 
    id: "6", 
    hash: "0x6f7890abcdef1234567890abcdef1234567abcde", 
    type: "Enrollment", 
    description: "Enrolled in CS201 - Data Structures", 
    timestamp: "2024-01-14 08:00:00", 
    status: "confirmed",
    blockNumber: 12345500
  },
];

const transactionTypes = ["All Types", "Enrollment", "Unenrollment"];
const statusOptions = ["All Status", "confirmed", "pending"];

export default function StudentTransactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.hash.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All Types" || tx.type === selectedType;
    const matchesStatus = selectedStatus === "All Status" || tx.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">
            Transaction History
          </h1>
          <p className="mt-1 text-muted-foreground">
            View your enrollment transactions recorded on the blockchain
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Blockchain Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by description or transaction hash..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-search-transactions"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-40" data-testid="select-type-filter">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {transactionTypes.map((type) => (
                    <SelectItem key={type} value={type} data-testid={`option-type-${type.toLowerCase().replace(/\s+/g, "-")}`}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-40" data-testid="select-status-filter">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status} data-testid={`option-status-${status.toLowerCase().replace(/\s+/g, "-")}`}>
                      {status === "All Status" ? status : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {filteredTransactions.length === 0 ? (
              <div className="py-12 text-center">
                <ArrowRightLeft className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No transactions found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex flex-col gap-4 rounded-md border border-border p-4"
                    data-testid={`transaction-row-${tx.id}`}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={tx.type === "Enrollment" ? "default" : "secondary"} size="sm">
                            {tx.type}
                          </Badge>
                          {tx.status === "confirmed" ? (
                            <Badge className="bg-chart-4/20 text-chart-4" size="sm">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Confirmed
                            </Badge>
                          ) : (
                            <Badge className="bg-chart-3/20 text-chart-3" size="sm">
                              <Clock className="mr-1 h-3 w-3" />
                              Pending
                            </Badge>
                          )}
                        </div>
                        <p className="font-medium">{tx.description}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{tx.timestamp}</p>
                    </div>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2 font-mono">
                        <span>TX:</span>
                        <span className="text-foreground">{truncateHash(tx.hash)}</span>
                        <ExternalLink className="h-3 w-3 cursor-pointer text-muted-foreground hover:text-foreground" />
                      </div>
                      {tx.blockNumber && (
                        <span>Block: #{tx.blockNumber.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
