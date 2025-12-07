import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/public-layout";
import {
  Lock,
  FileCheck,
  Shield,
  Eye,
  AlertTriangle,
  Clock,
  Wallet,
  Database,
  Users,
  Settings,
  GraduationCap,
  ArrowRight,
  CheckCircle,
  Layers,
  Blocks,
  Code2,
} from "lucide-react";

export default function FeaturesPage() {
  return (
    <PublicLayout>
      <div className="min-h-screen pt-20">
      <section className="px-4 py-12 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4">Platform Features</Badge>
          <h1 className="font-display text-3xl font-bold md:text-5xl">
            Blockchain-Powered
            <br />
            <span className="text-muted-foreground">Scheduling Capabilities</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Discover the comprehensive features that make BLOKADEMI the most transparent,
            secure, and conflict-free academic scheduling platform.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-card/50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">Core Features</Badge>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Blockchain Foundation
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Lock,
                title: "Immutable Records",
                description: "Every schedule modification is permanently recorded as a blockchain transaction. Records cannot be altered or deleted, ensuring complete data integrity.",
                benefits: ["Tamper-proof history", "No silent modifications", "Permanent audit trail"],
                color: "text-chart-1",
                bg: "bg-chart-1/20",
              },
              {
                icon: FileCheck,
                title: "Smart Contract Validation",
                description: "Solidity smart contracts enforce scheduling rules deterministically. Require assertions prevent invalid states from being committed to the blockchain.",
                benefits: ["EVM-level enforcement", "Deterministic execution", "Consistent validation"],
                color: "text-chart-2",
                bg: "bg-chart-2/20",
              },
              {
                icon: Shield,
                title: "Cryptographic Authentication",
                description: "MetaMask wallet signatures provide cryptographic proof of authorization. Every action is attributable to a specific wallet address.",
                benefits: ["Wallet-based identity", "Signature verification", "Non-repudiation"],
                color: "text-chart-3",
                bg: "bg-chart-3/20",
              },
              {
                icon: Eye,
                title: "Privacy-Preserving Identity",
                description: "Wallet addresses enable participation without exposing personal identifiers. No centralized database stores user credentials.",
                benefits: ["No PII storage", "Pseudonymous access", "Privacy by design"],
                color: "text-chart-4",
                bg: "bg-chart-4/20",
              },
              {
                icon: AlertTriangle,
                title: "Conflict Prevention",
                description: "Smart contract logic detects room, lecturer, and time-slot conflicts before transaction commit. Invalid schedules are rejected at the EVM level.",
                benefits: ["Pre-commit validation", "Collision detection", "Resource protection"],
                color: "text-chart-5",
                bg: "bg-chart-5/20",
              },
              {
                icon: Clock,
                title: "Complete Audit Trails",
                description: "Transaction history includes timestamps, action types, actor wallets, and detailed schedule data. Full transparency for all stakeholders.",
                benefits: ["Timestamped records", "Action attribution", "Searchable history"],
                color: "text-primary",
                bg: "bg-primary/20",
              },
            ].map((feature, i) => (
              <Card key={i} data-testid={`feature-card-${i}`}>
                <CardHeader>
                  <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-md ${feature.bg}`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-1">
                    {feature.benefits.map((benefit, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-chart-4" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">Role-Based Features</Badge>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Tailored Capabilities
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Each user role has access to specific features designed for their responsibilities.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-chart-1/50">
              <CardHeader className="border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-1/20">
                    <Settings className="h-6 w-6 text-chart-1" />
                  </div>
                  <div>
                    <CardTitle>Administrator</CardTitle>
                    <p className="text-sm text-muted-foreground">Full platform access</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {[
                    "Create and manage schedules",
                    "Add rooms with capacity and facilities",
                    "Create classes with course details",
                    "Assign lecturers to schedules",
                    "Validate pending schedule requests",
                    "Update schedule status (non-destructive)",
                    "View complete transaction logs",
                    "Manage all platform resources",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-chart-1" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-chart-2/50">
              <CardHeader className="border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-2/20">
                    <Users className="h-6 w-6 text-chart-2" />
                  </div>
                  <div>
                    <CardTitle>Lecturer</CardTitle>
                    <p className="text-sm text-muted-foreground">Schedule validation</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {[
                    "View assigned teaching schedules",
                    "Validate schedule changes",
                    "Submit change requests",
                    "Sign transactions via MetaMask",
                    "Track request approval status",
                    "View personal transaction history",
                    "Receive conflict notifications",
                    "Cryptographic wallet signing",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-chart-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-chart-4/50">
              <CardHeader className="border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-4/20">
                    <GraduationCap className="h-6 w-6 text-chart-4" />
                  </div>
                  <div>
                    <CardTitle>Student</CardTitle>
                    <p className="text-sm text-muted-foreground">Schedule viewing</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {[
                    "View class schedules",
                    "Course selection interface",
                    "View enrolled courses",
                    "See room and time details",
                    "Check lecturer assignments",
                    "Privacy-preserving access",
                    "No personal data exposure",
                    "Wallet-based authentication",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-chart-4" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card/50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">Technical Features</Badge>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Under the Hood
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Code2,
                title: "Smart Contract Architecture",
                items: [
                  "Solidity 0.8+ with latest security patterns",
                  "OpenZeppelin access control integration",
                  "Gas-optimized storage patterns",
                  "Upgradeable proxy contracts (optional)",
                  "Comprehensive event emission",
                  "Reentrancy protection",
                ],
              },
              {
                icon: Layers,
                title: "EVM Validation Logic",
                items: [
                  "Require assertions for state validation",
                  "Modifier-based access control",
                  "Pre-commit conflict detection",
                  "Deterministic execution across nodes",
                  "Stack-based bytecode processing",
                  "Gas metering for operations",
                ],
              },
              {
                icon: Wallet,
                title: "MetaMask Integration",
                items: [
                  "Web3 provider connection",
                  "Personal sign for authentication",
                  "Transaction signing and broadcasting",
                  "Network detection and switching",
                  "Account change listeners",
                  "Error handling and recovery",
                ],
              },
              {
                icon: Database,
                title: "Data Governance",
                items: [
                  "Append-only transaction model",
                  "Status mutations instead of deletions",
                  "Immutable reference integrity",
                  "Decentralized storage replication",
                  "Cross-node consistency",
                  "Timestamp-based ordering",
                ],
              },
            ].map((section, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                      <section.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 md:grid-cols-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">User Interface</Badge>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Intuitive Components
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Schedule Tables", description: "Interactive tables with sorting, filtering, and status indicators" },
              { title: "Resource Cards", description: "Compact cards displaying rooms, classes, and lecturers" },
              { title: "Conflict Alerts", description: "Visual warnings when schedule conflicts are detected" },
              { title: "Validation Modals", description: "Step-by-step transaction signing interface" },
              { title: "Transaction Logs", description: "Expandable rows with full blockchain data" },
              { title: "Dashboard Stats", description: "Real-time metrics and activity summaries" },
              { title: "Role Indicators", description: "Clear visual distinction between user roles" },
              { title: "Wallet Status", description: "Connection state and address display" },
            ].map((item, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card/50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Ready to Experience BLOKADEMI?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Connect your wallet and explore the future of decentralized academic scheduling.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/wallet">
              <Button className="gap-2">
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            </Link>
            <Link href="/architecture">
              <Button variant="outline" className="gap-2">
                View Architecture
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </PublicLayout>
  );
}
