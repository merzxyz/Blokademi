import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock, Building2, Users, X } from "lucide-react";

interface ConflictItem {
  type: "room" | "lecturer" | "time";
  message: string;
  suggestion?: string;
}

interface ConflictAlertProps {
  conflicts: ConflictItem[];
  onDismiss?: () => void;
}

export function ConflictAlert({ conflicts, onDismiss }: ConflictAlertProps) {
  if (conflicts.length === 0) return null;

  return (
    <Alert variant="destructive" className="relative" data-testid="alert-conflict">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="flex items-center justify-between">
        <span>Schedule Conflicts Detected</span>
        {onDismiss && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </AlertTitle>
      <AlertDescription className="mt-2 space-y-2">
        {conflicts.map((conflict, index) => {
          const Icon = conflict.type === "room" ? Building2 : conflict.type === "lecturer" ? Users : Clock;
          return (
            <div key={index} className="flex items-start gap-2">
              <Icon className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <div>
                <p>{conflict.message}</p>
                {conflict.suggestion && (
                  <p className="mt-1 text-xs opacity-80">{conflict.suggestion}</p>
                )}
              </div>
            </div>
          );
        })}
      </AlertDescription>
    </Alert>
  );
}

export function ValidationAlert({ 
  isValidating = false, 
  isSuccess = false,
  txHash,
  message,
  onClose,
}: { 
  isValidating?: boolean;
  isSuccess?: boolean;
  txHash?: string;
  message?: string;
  onClose?: () => void;
}) {
  if (isValidating) {
    return (
      <Card className="border-chart-3/50 bg-chart-3/10" data-testid="alert-validating">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-chart-3 border-t-transparent" />
          <div>
            <p className="font-medium">Validating on Blockchain</p>
            <p className="text-sm text-muted-foreground">
              Please wait while the transaction is being processed...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isSuccess) {
    return (
      <Card className="border-chart-4/50 bg-chart-4/10" data-testid="alert-success">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-4/20">
                <AlertTriangle className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="font-medium text-chart-4">Transaction Confirmed</p>
                <p className="text-sm text-muted-foreground">{message || "Successfully recorded on blockchain"}</p>
                {txHash && (
                  <code className="mt-2 block font-mono text-xs text-muted-foreground">
                    TX: {txHash.slice(0, 20)}...{txHash.slice(-8)}
                  </code>
                )}
              </div>
            </div>
            {onClose && (
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
