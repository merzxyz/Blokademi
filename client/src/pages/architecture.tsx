import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/public-layout";
import {
  Layers,
  Database,
  Code2,
  Wallet,
  ArrowRight,
  ArrowDown,
  Monitor,
  Server,
  Blocks,
  FileCheck,
  Shield,
  Users,
  Settings,
  GraduationCap,
} from "lucide-react";
import { SiReact, SiTypescript, SiTailwindcss, SiSolidity, SiEthereum } from "react-icons/si";

export default function ArchitecturePage() {
  return (
    <PublicLayout>
      <div className="min-h-screen pt-20">
      <section className="px-4 py-12 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4">System Architecture</Badge>
          <h1 className="font-display text-3xl font-bold md:text-5xl">
            Multi-Layer Decentralized
            <br />
            <span className="text-muted-foreground">Architecture</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            BLOKADEMI implements a three-tier architecture connecting the user interface
            to smart contracts and the Ethereum blockchain for decentralized scheduling governance.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-card/50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">Architecture Overview</Badge>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              System Layers
            </h2>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-chart-1/50">
              <CardHeader className="bg-chart-1/10">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-1/20">
                      <Monitor className="h-6 w-6 text-chart-1" />
                    </div>
                    <div>
                      <CardTitle>Frontend Layer</CardTitle>
                      <p className="text-sm text-muted-foreground">User Interface & Wallet Integration</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline"><SiReact className="mr-1 h-3 w-3" />React</Badge>
                    <Badge variant="outline"><SiTypescript className="mr-1 h-3 w-3" />TypeScript</Badge>
                    <Badge variant="outline"><SiTailwindcss className="mr-1 h-3 w-3" />Tailwind</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h4 className="font-semibold">User Interface</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>Role-based dashboards</li>
                      <li>Schedule management forms</li>
                      <li>Transaction history views</li>
                      <li>Conflict alert displays</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Wallet Integration</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>MetaMask connection</li>
                      <li>Transaction signing</li>
                      <li>Account management</li>
                      <li>Network detection</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">State Management</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>React Query caching</li>
                      <li>Optimistic updates</li>
                      <li>Real-time sync</li>
                      <li>Error handling</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <ArrowDown className="h-8 w-8 text-muted-foreground" />
            </div>

            <Card className="border-2 border-chart-2/50">
              <CardHeader className="bg-chart-2/10">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-2/20">
                      <Code2 className="h-6 w-6 text-chart-2" />
                    </div>
                    <div>
                      <CardTitle>Smart Contract Layer</CardTitle>
                      <p className="text-sm text-muted-foreground">Business Logic & Validation</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline"><SiSolidity className="mr-1 h-3 w-3" />Solidity</Badge>
                    <Badge variant="outline">Remix IDE</Badge>
                    <Badge variant="outline">OpenZeppelin</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Validation Logic</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>Require assertions</li>
                      <li>Conflict detection</li>
                      <li>State constraints</li>
                      <li>Input validation</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Access Control</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>Role-based modifiers</li>
                      <li>Wallet verification</li>
                      <li>Permission checks</li>
                      <li>Owner functions</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">State Management</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>Non-destructive updates</li>
                      <li>Status transitions</li>
                      <li>Event emission</li>
                      <li>Storage optimization</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <ArrowDown className="h-8 w-8 text-muted-foreground" />
            </div>

            <Card className="border-2 border-chart-4/50">
              <CardHeader className="bg-chart-4/10">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-4/20">
                      <Blocks className="h-6 w-6 text-chart-4" />
                    </div>
                    <div>
                      <CardTitle>Blockchain Layer</CardTitle>
                      <p className="text-sm text-muted-foreground">Decentralized Storage & Execution</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline"><SiEthereum className="mr-1 h-3 w-3" />Ethereum</Badge>
                    <Badge variant="outline">EVM</Badge>
                    <Badge variant="outline">Consensus</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Transaction Processing</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>EVM bytecode execution</li>
                      <li>Gas metering</li>
                      <li>Block inclusion</li>
                      <li>Confirmation</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">State Storage</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>Immutable records</li>
                      <li>Merkle Patricia Trie</li>
                      <li>World state</li>
                      <li>Receipt logs</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Network</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>Distributed nodes</li>
                      <li>Consensus protocol</li>
                      <li>State replication</li>
                      <li>Finality guarantees</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">Data Flow</Badge>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Transaction Lifecycle
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-6">
            {[
              { step: 1, title: "User Action", description: "Admin creates schedule via dashboard", icon: Settings },
              { step: 2, title: "Wallet Sign", description: "MetaMask prompts for signature", icon: Wallet },
              { step: 3, title: "Contract Call", description: "Signed tx sent to smart contract", icon: Code2 },
              { step: 4, title: "Validation", description: "Require assertions check constraints", icon: FileCheck },
              { step: 5, title: "EVM Execute", description: "State transition processed", icon: Layers },
              { step: 6, title: "Confirmed", description: "Block mined, tx immutable", icon: Database },
            ].map((item, i) => (
              <div key={i} className="relative">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="text-sm font-bold">{item.step}</span>
                    </div>
                    <item.icon className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
                    <h4 className="text-sm font-semibold">{item.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
                {i < 5 && (
                  <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 md:block">
                    <ArrowRight className="h-4 w-4 text-muted-foreground/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card/50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">Actor Model</Badge>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Multi-Stakeholder Ecosystem
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-1/20">
                    <Settings className="h-6 w-6 text-chart-1" />
                  </div>
                  <div>
                    <CardTitle>Administrator</CardTitle>
                    <p className="text-sm text-muted-foreground">System Governance</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold">Capabilities</h4>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>Create schedules, rooms, classes</li>
                      <li>Validate pending requests</li>
                      <li>Manage lecturer assignments</li>
                      <li>Archive obsolete records</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Contract Permissions</h4>
                    <Badge variant="outline">onlyAdmin modifier</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-2/20">
                    <Users className="h-6 w-6 text-chart-2" />
                  </div>
                  <div>
                    <CardTitle>Lecturer</CardTitle>
                    <p className="text-sm text-muted-foreground">Schedule Validation</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold">Capabilities</h4>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>View assigned schedules</li>
                      <li>Validate schedule changes</li>
                      <li>Submit change requests</li>
                      <li>Sign with wallet</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Contract Permissions</h4>
                    <Badge variant="outline">onlyLecturer modifier</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-chart-4/20">
                    <GraduationCap className="h-6 w-6 text-chart-4" />
                  </div>
                  <div>
                    <CardTitle>Student</CardTitle>
                    <p className="text-sm text-muted-foreground">Schedule Access</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold">Capabilities</h4>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>View class schedules</li>
                      <li>Course enrollment</li>
                      <li>Check room details</li>
                      <li>Privacy-preserving access</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Contract Permissions</h4>
                    <Badge variant="outline">View-only functions</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">Security Model</Badge>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Trust & Verification
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-chart-4" />
                  Decentralized Trust
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-chart-4" />
                    No centralized authority controls schedule data
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-chart-4" />
                    Validation logic executed across distributed nodes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-chart-4" />
                    Consensus ensures state consistency
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-chart-4" />
                    Cryptographic signatures prove authenticity
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-chart-2" />
                  Verification Guarantees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-chart-2" />
                    Every transaction includes verifiable hash
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-chart-2" />
                    Block explorers enable independent audit
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-chart-2" />
                    Smart contract code is publicly verifiable
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-chart-2" />
                    Historical state can be reconstructed
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card/50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Explore UML Diagrams
          </h2>
          <p className="mt-4 text-muted-foreground">
            View detailed Use Case, Class, and Sequence diagrams that formally
            specify the BLOKADEMI system architecture.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/uml">
              <Button className="gap-2">
                View UML Diagrams
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="outline">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </PublicLayout>
  );
}
