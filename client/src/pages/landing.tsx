import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWallet } from "@/lib/wallet-context";
import {
  Shield,
  Lock,
  Eye,
  Clock,
  AlertTriangle,
  FileCheck,
  Wallet,
  ArrowRight,
  Blocks,
  Database,
  Code2,
  Users,
  GraduationCap,
  Settings,
  CheckCircle,
  Layers,
} from "lucide-react";
import { SiEthereum, SiSolidity } from "react-icons/si";

export default function LandingPage() {
  const { connect, isConnected, isConnecting } = useWallet();

  return (
    <div className="flex flex-col">
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4 py-20 md:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-chart-1/5" />
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-chart-1/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="mx-auto max-w-5xl text-center">
          <Badge variant="outline" className="mb-6 gap-2 px-4 py-2">
            <Blocks className="h-4 w-4" />
            Powered by Ethereum Smart Contracts
          </Badge>

          <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Decentralized Scheduling
            <br />
            <span className="bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
              Governance on Ethereum
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            BLOKADEMI transforms academic scheduling with blockchain technology.
            Experience transparent, immutable, and conflict-free schedule management
            through smart contract validation and cryptographic authentication.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {isConnected ? (
              <Link href="/dashboard/student">
                <Button size="lg" className="gap-2" data-testid="button-goto-dashboard">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                onClick={connect}
                disabled={isConnecting}
                className="gap-2"
                data-testid="button-connect-hero"
              >
                <Wallet className="h-4 w-4" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
            <Link href="/architecture">
              <Button variant="outline" size="lg" className="gap-2" data-testid="button-view-architecture">
                View Architecture
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <SiEthereum className="h-5 w-5" />
              <span className="text-sm">Ethereum</span>
            </div>
            <div className="flex items-center gap-2">
              <SiSolidity className="h-5 w-5" />
              <span className="text-sm">Solidity</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">MetaMask</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              <span className="text-sm">Immutable Ledger</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card/50 px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <Badge variant="outline" className="mb-4">The Problem</Badge>
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Traditional Scheduling Is Broken
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  { icon: AlertTriangle, text: "Silent modifications without audit trails" },
                  { icon: Lock, text: "Centralized control creates single points of failure" },
                  { icon: Eye, text: "No transparency in schedule decision-making" },
                  { icon: Clock, text: "Schedule conflicts go undetected" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-destructive/20">
                      <item.icon className="h-4 w-4 text-destructive" />
                    </div>
                    <span className="mt-1 text-muted-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Badge variant="outline" className="mb-4">The Solution</Badge>
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                BLOKADEMI Blockchain Governance
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  { icon: FileCheck, text: "Every change recorded as immutable transaction" },
                  { icon: Blocks, text: "Decentralized validation across network nodes" },
                  { icon: Shield, text: "Cryptographic signing ensures accountability" },
                  { icon: CheckCircle, text: "Smart contract conflict prevention" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-chart-4/20">
                      <item.icon className="h-4 w-4 text-chart-4" />
                    </div>
                    <span className="mt-1 text-muted-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">Key Features</Badge>
            <h2 className="font-display text-2xl font-bold md:text-4xl">
              Blockchain-Powered Scheduling
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              BLOKADEMI leverages Ethereum smart contracts to deliver unparalleled
              transparency, security, and conflict prevention in academic scheduling.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Lock,
                title: "Immutable Records",
                description: "Every schedule modification is permanently recorded on the blockchain, preventing silent overwrites and ensuring complete audit trails.",
                color: "text-chart-1",
                bg: "bg-chart-1/20",
              },
              {
                icon: FileCheck,
                title: "Smart Contract Validation",
                description: "Solidity require assertions enforce scheduling rules at the EVM level, rejecting invalid states before they reach the ledger.",
                color: "text-chart-2",
                bg: "bg-chart-2/20",
              },
              {
                icon: Shield,
                title: "Cryptographic Signing",
                description: "MetaMask wallet authentication ensures all schedule actions are cryptographically signed and attributable to authorized actors.",
                color: "text-chart-3",
                bg: "bg-chart-3/20",
              },
              {
                icon: Eye,
                title: "Privacy-Preserving Identity",
                description: "Wallet-based authentication enables participation without storing personal identifiers in centralized database schemas.",
                color: "text-chart-4",
                bg: "bg-chart-4/20",
              },
              {
                icon: AlertTriangle,
                title: "Conflict Prevention",
                description: "On-chain validation detects room, lecturer, and time-slot conflicts before transaction commit, ensuring schedule integrity.",
                color: "text-chart-5",
                bg: "bg-chart-5/20",
              },
              {
                icon: Clock,
                title: "Permanent Audit Trails",
                description: "Complete transaction history with timestamps, action types, and actor wallets enables comprehensive schedule auditing.",
                color: "text-primary",
                bg: "bg-primary/20",
              },
            ].map((feature, i) => (
              <Card key={i} className="hover-elevate" data-testid={`card-feature-${i}`}>
                <CardHeader>
                  <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-md ${feature.bg}`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card/50 px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">How It Works</Badge>
            <h2 className="font-display text-2xl font-bold md:text-4xl">
              Blockchain Scheduling Flow
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              From schedule creation to immutable storage, every step is validated
              and recorded on the Ethereum blockchain.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {[
              { step: 1, title: "Create Schedule", icon: Settings, description: "Admin initiates schedule creation with room, class, and lecturer" },
              { step: 2, title: "Smart Contract", icon: Code2, description: "Solidity contract validates constraints and conflict rules" },
              { step: 3, title: "EVM Processing", icon: Layers, description: "Ethereum Virtual Machine executes validation logic" },
              { step: 4, title: "Wallet Signing", icon: Wallet, description: "MetaMask signs transaction for cryptographic verification" },
              { step: 5, title: "Immutable Storage", icon: Database, description: "Confirmed transaction stored permanently on blockchain" },
            ].map((item, i) => (
              <div key={i} className="relative">
                <Card className="h-full">
                  <CardContent className="p-4 text-center">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="font-bold">{item.step}</span>
                    </div>
                    <item.icon className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
                {i < 4 && (
                  <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 md:block">
                    <ArrowRight className="h-4 w-4 text-muted-foreground/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">Architecture</Badge>
            <h2 className="font-display text-2xl font-bold md:text-4xl">
              Multi-Layer Decentralized System
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              BLOKADEMI implements a three-tier architecture connecting the user interface
              to smart contracts and the Ethereum blockchain.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                layer: "Frontend Layer",
                icon: Code2,
                iconColor: "text-chart-1",
                iconBg: "bg-chart-1/20",
                technologies: ["React", "TailwindCSS", "Web3.js", "MetaMask"],
                description: "User interface for schedule management, wallet connection, and blockchain interaction.",
              },
              {
                layer: "Smart Contract Layer",
                icon: FileCheck,
                iconColor: "text-chart-2",
                iconBg: "bg-chart-2/20",
                technologies: ["Solidity", "Remix IDE", "OpenZeppelin", "Hardhat"],
                description: "Business logic enforcement with require assertions, access control, and state validation.",
              },
              {
                layer: "Blockchain Layer",
                icon: Blocks,
                iconColor: "text-chart-4",
                iconBg: "bg-chart-4/20",
                technologies: ["Ethereum", "EVM", "IPFS", "Gas Optimization"],
                description: "Decentralized storage and execution with permanent transaction history and audit trails.",
              },
            ].map((layer, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-md ${layer.iconBg}`}>
                      <layer.icon className={`h-5 w-5 ${layer.iconColor}`} />
                    </div>
                    <CardTitle className="text-lg">{layer.layer}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{layer.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {layer.technologies.map((tech, j) => (
                      <Badge key={j} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/architecture">
              <Button variant="outline" className="gap-2">
                Explore Full Architecture
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card/50 px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">Role-Based Access</Badge>
            <h2 className="font-display text-2xl font-bold md:text-4xl">
              Tailored Dashboards for Every Role
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              BLOKADEMI provides specialized interfaces for administrators, lecturers,
              and students with role-appropriate permissions and capabilities.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                role: "Administrator",
                icon: Settings,
                color: "text-chart-1",
                bg: "bg-chart-1/20",
                features: [
                  "Create and manage schedules",
                  "Add rooms and classes",
                  "Validate pending schedules",
                  "Update schedule status",
                  "View complete audit logs",
                ],
                link: "/dashboard/admin",
              },
              {
                role: "Lecturer",
                icon: Users,
                color: "text-chart-2",
                bg: "bg-chart-2/20",
                features: [
                  "View assigned schedules",
                  "Validate schedule changes",
                  "Submit change requests",
                  "Sign transactions via wallet",
                  "Track request history",
                ],
                link: "/dashboard/lecturer",
              },
              {
                role: "Student",
                icon: GraduationCap,
                color: "text-chart-4",
                bg: "bg-chart-4/20",
                features: [
                  "View class schedules",
                  "Course selection",
                  "View enrollments",
                  "Privacy-preserving identity",
                  "No personal data exposure",
                ],
                link: "/dashboard/student",
              },
            ].map((item, i) => (
              <Card key={i} className="hover-elevate">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-md ${item.bg}`}>
                      <item.icon className={`h-6 w-6 ${item.color}`} />
                    </div>
                    <CardTitle>{item.role}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {item.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-chart-4" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={item.link}>
                    <Button variant="outline" className="w-full gap-2">
                      View Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { value: "1,234", label: "Transactions Recorded", icon: Database },
              { value: "98.5%", label: "Validation Success", icon: CheckCircle },
              { value: "256", label: "Active Users", icon: Users },
              { value: "47", label: "Conflicts Prevented", icon: Shield },
            ].map((stat, i) => (
              <Card key={i}>
                <CardContent className="p-6 text-center">
                  <stat.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4 md:flex-row">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-display text-lg font-bold">
                    Blockchain Verification Example
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Every schedule transaction is permanently recorded with verifiable data
                  </p>
                </div>
                <div className="rounded-md border border-border bg-muted/30 p-4">
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex gap-4">
                      <span className="text-muted-foreground">TX Hash:</span>
                      <span>0x7f8e...4a2b</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-muted-foreground">Block:</span>
                      <span>18,456,789</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-muted-foreground">Timestamp:</span>
                      <span>2024-01-15 14:32:01 UTC</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant="default" className="bg-chart-4/20 text-chart-4 border-chart-4/30">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Confirmed
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-border px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-4xl">
            Ready to Transform Your Scheduling?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Connect your wallet to experience decentralized scheduling governance
            with full transparency and immutable audit trails.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {isConnected ? (
              <Link href="/dashboard/student">
                <Button size="lg" className="gap-2" data-testid="button-cta-dashboard">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                onClick={connect}
                disabled={isConnecting}
                className="gap-2"
                data-testid="button-cta-connect"
              >
                <Wallet className="h-4 w-4" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
