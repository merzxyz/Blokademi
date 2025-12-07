import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CheckCircle, Clock, XCircle, Copy, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { TransactionStatus } from "@shared/schema";

interface TransactionItem {
  id: string;
  txHash: string;
  timestamp: string;
  actionType: string;
  actorWallet: string;
  entityType: string;
  entityId: string;
  details: string;
  status: TransactionStatus;
  blockNumber?: number | null;
  gasUsed?: string | null;
}

interface TransactionTableProps {
  transactions: TransactionItem[];
  isLoading?: boolean;
}

function getStatusConfig(status: TransactionStatus) {
  switch (status) {
    case "confirmed":
      return {
        label: "Confirmed",
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
    case "failed":
      return {
        label: "Failed",
        variant: "destructive" as const,
        icon: XCircle,
        className: "",
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

function getActionTypeLabel(actionType: string) {
  const labels: Record<string, { label: string; color: string }> = {
    create_schedule: { label: "Create Schedule", color: "text-chart-2" },
    validate_schedule: { label: "Validate Schedule", color: "text-chart-4" },
    update_schedule: { label: "Update Schedule", color: "text-chart-3" },
    archive_schedule: { label: "Archive Schedule", color: "text-muted-foreground" },
    create_room: { label: "Create Room", color: "text-chart-1" },
    update_room: { label: "Update Room", color: "text-chart-1" },
    create_class: { label: "Create Class", color: "text-chart-2" },
    update_class: { label: "Update Class", color: "text-chart-2" },
    enroll: { label: "Course Enrollment", color: "text-chart-5" },
    change_request: { label: "Change Request", color: "text-chart-3" },
  };
  return labels[actionType] || { label: actionType, color: "text-foreground" };
}

function TransactionRow({ transaction }: { transaction: TransactionItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const statusConfig = getStatusConfig(transaction.status);
  const StatusIcon = statusConfig.icon;
  const actionConfig = getActionTypeLabel(transaction.actionType);

  const truncatedHash = `${transaction.txHash.slice(0, 10)}...${transaction.txHash.slice(-8)}`;
  const truncatedActor = `${transaction.actorWallet.slice(0, 6)}...${transaction.actorWallet.slice(-4)}`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <TableRow className="group" data-testid={`row-transaction-${transaction.id}`}>
        <TableCell>
          <div className="flex items-center gap-2">
            <code className="font-mono text-sm">{truncatedHash}</code>
            <Button
              variant="ghost"
              size="icon"
              className="invisible h-6 w-6 group-hover:visible"
              onClick={() => copyToClipboard(transaction.txHash, "Transaction hash")}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </TableCell>
        <TableCell className="font-mono text-sm text-muted-foreground">
          {new Date(transaction.timestamp).toLocaleString()}
        </TableCell>
        <TableCell>
          <span className={actionConfig.color}>{actionConfig.label}</span>
        </TableCell>
        <TableCell>
          <Badge variant={statusConfig.variant} className={statusConfig.className}>
            <StatusIcon className="mr-1 h-3 w-3" />
            {statusConfig.label}
          </Badge>
        </TableCell>
        <TableCell>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              Details
            </Button>
          </CollapsibleTrigger>
        </TableCell>
      </TableRow>
      <CollapsibleContent asChild>
        <TableRow className="bg-muted/30">
          <TableCell colSpan={5} className="p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Full Transaction Hash</p>
                  <div className="flex items-center gap-2">
                    <code className="break-all font-mono text-xs">{transaction.txHash}</code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 flex-shrink-0"
                      onClick={() => copyToClipboard(transaction.txHash, "Transaction hash")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Actor Wallet</p>
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-xs">{transaction.actorWallet}</code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 flex-shrink-0"
                      onClick={() => copyToClipboard(transaction.actorWallet, "Wallet address")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Entity</p>
                  <p className="text-sm">
                    {transaction.entityType} ({transaction.entityId})
                  </p>
                </div>
                {transaction.blockNumber && (
                  <div>
                    <p className="text-xs text-muted-foreground">Block Number</p>
                    <p className="font-mono text-sm">{transaction.blockNumber}</p>
                  </div>
                )}
                {transaction.gasUsed && (
                  <div>
                    <p className="text-xs text-muted-foreground">Gas Used</p>
                    <p className="font-mono text-sm">{transaction.gasUsed}</p>
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-muted-foreground">Details</p>
                <p className="text-sm">{transaction.details}</p>
              </div>
            </div>
          </TableCell>
        </TableRow>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function TransactionTable({ transactions, isLoading }: TransactionTableProps) {
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

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Clock className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No Transactions</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              There are no blockchain transactions recorded yet.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>TX Hash</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function TransactionCards({ transactions }: { transactions: TransactionItem[] }) {
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`,
    });
  };

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Clock className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No Transactions</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          No blockchain transactions recorded yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => {
        const statusConfig = getStatusConfig(transaction.status);
        const StatusIcon = statusConfig.icon;
        const actionConfig = getActionTypeLabel(transaction.actionType);
        const truncatedHash = `${transaction.txHash.slice(0, 10)}...${transaction.txHash.slice(-8)}`;

        return (
          <Card key={transaction.id} data-testid={`card-transaction-${transaction.id}`}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`text-sm font-medium ${actionConfig.color}`}>
                    {actionConfig.label}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {new Date(transaction.timestamp).toLocaleString()}
                  </p>
                </div>
                <Badge variant={statusConfig.variant} className={statusConfig.className}>
                  <StatusIcon className="mr-1 h-3 w-3" />
                  {statusConfig.label}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 truncate font-mono text-xs text-muted-foreground">
                  {truncatedHash}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => copyToClipboard(transaction.txHash, "Transaction hash")}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-sm">{transaction.details}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
