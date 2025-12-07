import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWallet } from "@/lib/wallet-context";
import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/public-layout";
import {
  Wallet,
  Shield,
  CheckCircle,
  AlertTriangle,
  Settings,
  Users,
  GraduationCap,
  ArrowRight,
  Copy,
  ExternalLink,
  Blocks,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { UserRole } from "@shared/schema";

export default function WalletPage() {
  const { isConnected, address, role, connect, disconnect, setRole, isConnecting, truncatedAddress } = useWallet();
  const { toast } = useToast();

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const getDashboardLink = () => {
    switch (role) {
      case "admin":
        return "/dashboard/admin";
      case "lecturer":
        return "/dashboard/lecturer";
      default:
        return "/dashboard/student";
    }
  };

  const getRoleIcon = (r: UserRole) => {
    switch (r) {
      case "admin":
        return Settings;
      case "lecturer":
        return Users;
      default:
        return GraduationCap;
    }
  };

  const RoleIcon = getRoleIcon(role);

  return (
    <PublicLayout>
      <div className="min-h-screen pt-20">
      <section className="px-4 py-12 md:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <Badge variant="outline" className="mb-4">Wallet Connection</Badge>
            <h1 className="font-display text-3xl font-bold md:text-4xl">
              MetaMask Integration
            </h1>
            <p className="mt-2 text-muted-foreground">
              Connect your wallet for privacy-preserving authentication and
              cryptographic transaction signing.
            </p>
          </div>

          {isConnected ? (
            <div className="space-y-6">
              <Card className="border-chart-4/50">
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-4/20">
                        <CheckCircle className="h-6 w-6 text-chart-4" />
                      </div>
                      <div>
                        <CardTitle>Wallet Connected</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Your wallet is successfully connected
                        </p>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-chart-4/20 text-chart-4 border-chart-4/30">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md border border-border bg-muted/30 p-4">
                    <p className="text-xs text-muted-foreground">Wallet Address</p>
                    <div className="mt-1 flex items-center gap-2">
                      <code className="flex-1 break-all font-mono text-sm">
                        {address}
                      </code>
                      <Button variant="ghost" size="icon" onClick={copyAddress}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">Network</p>
                      <p className="text-sm text-muted-foreground">Ethereum Mainnet</p>
                    </div>
                    <Badge variant="outline">Chain ID: 1</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RoleIcon className="h-5 w-5" />
                    Role Selection
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Select your role to access the appropriate dashboard
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                    <SelectTrigger data-testid="select-role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          Administrator
                        </div>
                      </SelectItem>
                      <SelectItem value="lecturer">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Lecturer
                        </div>
                      </SelectItem>
                      <SelectItem value="student">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          Student
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="rounded-md bg-muted/50 p-4">
                    <h4 className="text-sm font-semibold capitalize">{role} Permissions</h4>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {role === "admin" && (
                        <>
                          <li>Create and manage schedules, rooms, and classes</li>
                          <li>Validate pending schedules</li>
                          <li>View complete transaction logs</li>
                        </>
                      )}
                      {role === "lecturer" && (
                        <>
                          <li>View assigned teaching schedules</li>
                          <li>Submit and validate change requests</li>
                          <li>Sign transactions with wallet</li>
                        </>
                      )}
                      {role === "student" && (
                        <>
                          <li>View class schedules (read-only)</li>
                          <li>Course selection and enrollment</li>
                          <li>Privacy-preserving access</li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Link href={getDashboardLink()} className="flex-1">
                      <Button className="w-full gap-2" data-testid="button-goto-dashboard">
                        Go to Dashboard
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" onClick={disconnect} data-testid="button-disconnect">
                      Disconnect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                    <Wallet className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Connect Your Wallet</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Use MetaMask to authenticate and sign blockchain transactions
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Button
                    size="lg"
                    className="w-full gap-2"
                    onClick={connect}
                    disabled={isConnecting}
                    data-testid="button-connect-wallet"
                  >
                    <Wallet className="h-5 w-5" />
                    {isConnecting ? "Connecting..." : "Connect with MetaMask"}
                  </Button>

                  <div className="space-y-4 rounded-md border border-border p-4">
                    <h4 className="text-sm font-semibold">Why Connect a Wallet?</h4>
                    <ul className="space-y-3">
                      {[
                        {
                          icon: Shield,
                          title: "Privacy-Preserving Identity",
                          description: "No personal data stored in centralized databases",
                        },
                        {
                          icon: Blocks,
                          title: "Cryptographic Authentication",
                          description: "Secure signing for all blockchain transactions",
                        },
                        {
                          icon: CheckCircle,
                          title: "Non-Repudiation",
                          description: "Every action is attributable and verifiable",
                        },
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-muted">
                            <item.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{item.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-chart-3" />
                    Don&apos;t Have MetaMask?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    MetaMask is a browser extension that allows you to interact with
                    blockchain applications. Install it to connect to BLOKADEMI.
                  </p>
                  <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                    <li>Visit the official MetaMask website</li>
                    <li>Download and install the browser extension</li>
                    <li>Create a new wallet or import an existing one</li>
                    <li>Return here and click "Connect with MetaMask"</li>
                  </ol>
                  <a
                    href="https://metamask.io/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    Download MetaMask
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
    </PublicLayout>
  );
}
