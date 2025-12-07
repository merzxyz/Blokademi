import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Boxes,
  ArrowRightLeft,
  Settings,
  GraduationCap,
  Calendar,
  Building2,
  FileCheck,
  Database,
  Wallet,
} from "lucide-react";

export default function UMLPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="px-4 py-12 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4">System Modeling</Badge>
          <h1 className="font-display text-3xl font-bold md:text-5xl">
            UML Visualizations
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Formal UML diagrams that specify actors, data schemas, and interaction
            pipelines ensuring decentralized state transitions align with institutional requirements.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-card/50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Tabs defaultValue="usecase" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="usecase" className="gap-2">
                <Users className="h-4 w-4" />
                Use Case
              </TabsTrigger>
              <TabsTrigger value="class" className="gap-2">
                <Boxes className="h-4 w-4" />
                Class Diagram
              </TabsTrigger>
              <TabsTrigger value="sequence" className="gap-2">
                <ArrowRightLeft className="h-4 w-4" />
                Sequence
              </TabsTrigger>
            </TabsList>

            <TabsContent value="usecase" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Use Case Diagram</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Multi-actor decentralized scheduling ecosystem with institutional actors
                    and blockchain interactions
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-border bg-muted/30 p-6">
                    <div className="grid gap-8 md:grid-cols-4">
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-chart-1 bg-chart-1/10">
                            <Settings className="h-8 w-8 text-chart-1" />
                          </div>
                          <p className="font-semibold">Administrator</p>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="rounded-md bg-background p-2 text-center">Create Schedule</li>
                          <li className="rounded-md bg-background p-2 text-center">Create Room</li>
                          <li className="rounded-md bg-background p-2 text-center">Create Class</li>
                          <li className="rounded-md bg-background p-2 text-center">Validate Schedule</li>
                          <li className="rounded-md bg-background p-2 text-center">Update Status</li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-chart-2 bg-chart-2/10">
                            <Users className="h-8 w-8 text-chart-2" />
                          </div>
                          <p className="font-semibold">Lecturer</p>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="rounded-md bg-background p-2 text-center">View Schedules</li>
                          <li className="rounded-md bg-background p-2 text-center">Validate Changes</li>
                          <li className="rounded-md bg-background p-2 text-center">Submit Request</li>
                          <li className="rounded-md bg-background p-2 text-center">Sign Transaction</li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-chart-4 bg-chart-4/10">
                            <GraduationCap className="h-8 w-8 text-chart-4" />
                          </div>
                          <p className="font-semibold">Student</p>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="rounded-md bg-background p-2 text-center">View Schedules</li>
                          <li className="rounded-md bg-background p-2 text-center">Course Selection</li>
                          <li className="rounded-md bg-background p-2 text-center">View Enrollments</li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                            <Database className="h-8 w-8 text-primary" />
                          </div>
                          <p className="font-semibold">Blockchain</p>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="rounded-md bg-background p-2 text-center">Execute Contract</li>
                          <li className="rounded-md bg-background p-2 text-center">Validate State</li>
                          <li className="rounded-md bg-background p-2 text-center">Store Transaction</li>
                          <li className="rounded-md bg-background p-2 text-center">Emit Events</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="class" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Class Diagram</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Entity relationships and data schemas mapped to smart contract storage
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-border bg-muted/30 p-6">
                    <div className="grid gap-6 md:grid-cols-3">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-chart-1" />
                            <CardTitle className="text-base">Schedule</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <div className="border-b border-border pb-2 font-mono text-xs">
                            <p>+ id: uint256</p>
                            <p>+ classId: uint256</p>
                            <p>+ roomId: uint256</p>
                            <p>+ lecturerId: address</p>
                            <p>+ dayOfWeek: uint8</p>
                            <p>+ startTime: string</p>
                            <p>+ endTime: string</p>
                            <p>+ status: ScheduleStatus</p>
                            <p>+ semester: string</p>
                          </div>
                          <div className="pt-2 font-mono text-xs text-muted-foreground">
                            <p>+ create()</p>
                            <p>+ validate()</p>
                            <p>+ updateStatus()</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-chart-2" />
                            <CardTitle className="text-base">Room</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <div className="border-b border-border pb-2 font-mono text-xs">
                            <p>+ id: uint256</p>
                            <p>+ name: string</p>
                            <p>+ capacity: uint16</p>
                            <p>+ building: string</p>
                            <p>+ floor: uint8</p>
                            <p>+ facilities: string[]</p>
                            <p>+ isAvailable: bool</p>
                          </div>
                          <div className="pt-2 font-mono text-xs text-muted-foreground">
                            <p>+ create()</p>
                            <p>+ update()</p>
                            <p>+ checkAvailability()</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <FileCheck className="h-4 w-4 text-chart-4" />
                            <CardTitle className="text-base">Class</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <div className="border-b border-border pb-2 font-mono text-xs">
                            <p>+ id: uint256</p>
                            <p>+ name: string</p>
                            <p>+ code: string</p>
                            <p>+ credits: uint8</p>
                            <p>+ semester: string</p>
                            <p>+ maxStudents: uint16</p>
                            <p>+ description: string</p>
                          </div>
                          <div className="pt-2 font-mono text-xs text-muted-foreground">
                            <p>+ create()</p>
                            <p>+ update()</p>
                            <p>+ enroll()</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-chart-3" />
                            <CardTitle className="text-base">Lecturer</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <div className="border-b border-border pb-2 font-mono text-xs">
                            <p>+ walletAddress: address</p>
                            <p>+ name: string</p>
                            <p>+ department: string</p>
                            <p>+ specialization: string</p>
                            <p>+ email: string</p>
                          </div>
                          <div className="pt-2 font-mono text-xs text-muted-foreground">
                            <p>+ register()</p>
                            <p>+ update()</p>
                            <p>+ getSchedules()</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Database className="h-4 w-4 text-chart-5" />
                            <CardTitle className="text-base">Transaction</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <div className="border-b border-border pb-2 font-mono text-xs">
                            <p>+ txHash: bytes32</p>
                            <p>+ timestamp: uint256</p>
                            <p>+ actionType: ActionType</p>
                            <p>+ actorWallet: address</p>
                            <p>+ entityType: string</p>
                            <p>+ entityId: uint256</p>
                            <p>+ status: TxStatus</p>
                          </div>
                          <div className="pt-2 font-mono text-xs text-muted-foreground">
                            <p>+ record()</p>
                            <p>+ getByActor()</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Wallet className="h-4 w-4 text-primary" />
                            <CardTitle className="text-base">ChangeRequest</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <div className="border-b border-border pb-2 font-mono text-xs">
                            <p>+ id: uint256</p>
                            <p>+ scheduleId: uint256</p>
                            <p>+ requestedBy: address</p>
                            <p>+ requestType: string</p>
                            <p>+ reason: string</p>
                            <p>+ status: RequestStatus</p>
                          </div>
                          <div className="pt-2 font-mono text-xs text-muted-foreground">
                            <p>+ submit()</p>
                            <p>+ approve()</p>
                            <p>+ reject()</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6 rounded-md bg-background p-4">
                      <h4 className="mb-3 text-sm font-semibold">Relationships</h4>
                      <div className="grid gap-2 text-sm md:grid-cols-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs">Schedule</span>
                          <span className="text-muted-foreground">→</span>
                          <span className="font-mono text-xs">Room</span>
                          <Badge variant="outline" className="text-xs">1:1</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs">Schedule</span>
                          <span className="text-muted-foreground">→</span>
                          <span className="font-mono text-xs">Class</span>
                          <Badge variant="outline" className="text-xs">1:1</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs">Schedule</span>
                          <span className="text-muted-foreground">→</span>
                          <span className="font-mono text-xs">Lecturer</span>
                          <Badge variant="outline" className="text-xs">N:1</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs">ChangeRequest</span>
                          <span className="text-muted-foreground">→</span>
                          <span className="font-mono text-xs">Schedule</span>
                          <Badge variant="outline" className="text-xs">N:1</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sequence" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sequence Diagram</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Schedule creation flow from user action to blockchain confirmation
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-border bg-muted/30 p-6">
                    <div className="grid grid-cols-5 gap-4 text-center text-sm">
                      <div className="space-y-2">
                        <div className="rounded-md bg-chart-1/20 p-2 font-semibold text-chart-1">
                          Admin
                        </div>
                        <div className="h-96 border-r-2 border-dashed border-chart-1/50" />
                      </div>
                      <div className="space-y-2">
                        <div className="rounded-md bg-background p-2 font-semibold">
                          Frontend
                        </div>
                        <div className="h-96 border-r-2 border-dashed border-border" />
                      </div>
                      <div className="space-y-2">
                        <div className="rounded-md bg-chart-3/20 p-2 font-semibold text-chart-3">
                          MetaMask
                        </div>
                        <div className="h-96 border-r-2 border-dashed border-chart-3/50" />
                      </div>
                      <div className="space-y-2">
                        <div className="rounded-md bg-chart-2/20 p-2 font-semibold text-chart-2">
                          Smart Contract
                        </div>
                        <div className="h-96 border-r-2 border-dashed border-chart-2/50" />
                      </div>
                      <div className="space-y-2">
                        <div className="rounded-md bg-chart-4/20 p-2 font-semibold text-chart-4">
                          Blockchain
                        </div>
                        <div className="h-96 border-r-2 border-dashed border-chart-4/50" />
                      </div>
                    </div>

                    <div className="relative -mt-96 space-y-6 pt-12">
                      {[
                        { from: 0, to: 1, label: "1. Submit Schedule Form", color: "bg-chart-1" },
                        { from: 1, to: 2, label: "2. Request Signature", color: "bg-background" },
                        { from: 2, to: 1, label: "3. User Signs TX", color: "bg-chart-3" },
                        { from: 1, to: 3, label: "4. Call createSchedule()", color: "bg-background" },
                        { from: 3, to: 3, label: "5. Validate Constraints", color: "bg-chart-2" },
                        { from: 3, to: 4, label: "6. Submit TX to Network", color: "bg-chart-2" },
                        { from: 4, to: 4, label: "7. EVM Execution", color: "bg-chart-4" },
                        { from: 4, to: 3, label: "8. Emit ScheduleCreated", color: "bg-chart-4" },
                        { from: 3, to: 1, label: "9. Return TX Receipt", color: "bg-chart-2" },
                        { from: 1, to: 0, label: "10. Display Confirmation", color: "bg-background" },
                      ].map((step, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <div style={{ width: `${step.from * 20 + 10}%` }} />
                          <div
                            className={`flex-1 rounded px-2 py-1 ${step.color} ${
                              step.color === "bg-background"
                                ? "border border-border"
                                : "text-white dark:text-foreground"
                            }`}
                            style={{
                              maxWidth: `${Math.abs(step.to - step.from) * 20 + 10}%`,
                            }}
                          >
                            {step.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">Modeling Standards</Badge>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              UML 2.5.1 Specification
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Requirement Traceability",
                description: "UML diagrams formally specify actors, data schemas, and interaction pipelines, ensuring decentralized state transitions align with institutional business requirements.",
              },
              {
                title: "Constraint Pipelines",
                description: "Model-driven research emphasizes that UML-aligned constraint pipelines strengthen requirement determinism and stakeholder agreement before contract deployment.",
              },
              {
                title: "Provable Governance",
                description: "UML modeling enables provable governance mapping from system design into append-only decentralized states on the Ethereum blockchain.",
              },
            ].map((item, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
