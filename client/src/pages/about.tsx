import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/public-layout";
import {
  Blocks,
  GraduationCap,
  Target,
  Users,
  Shield,
  Database,
  ArrowRight,
  Globe,
  Code2,
  BookOpen,
} from "lucide-react";

export default function AboutPage() {
  return (
    <PublicLayout>
      <div className="min-h-screen pt-20">
      <section className="px-4 py-12 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4">About BLOKADEMI</Badge>
          <h1 className="font-display text-3xl font-bold md:text-5xl">
            Decentralized Scheduling
            <br />
            <span className="text-muted-foreground">for Education</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            BLOKADEMI is a technical platform that enforces conflict-aware schedule
            state governance using Ethereum smart contracts, transforming how
            academic institutions manage and validate scheduling operations.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-card/50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Badge variant="outline" className="mb-4">Vision</Badge>
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Transparent Academic Governance
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                In Indonesia and globally, educational scheduling systems continue evolving,
                yet most platforms rely on centralized architectures where schedule records
                can be overwritten or modified silently without leaving traceable evidence.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                BLOKADEMI addresses this limitation by leveraging blockchain technology
                as a decentralized and append-only ledger, enabling distributed replication,
                immutability, and multi-stakeholder verification that strengthen integrity
                governance for scheduling records.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Globe, label: "Decentralized", value: "Network" },
                  { icon: Shield, label: "Immutable", value: "Records" },
                  { icon: Users, label: "Multi-stakeholder", value: "Validation" },
                  { icon: Database, label: "Permanent", value: "Audit Trails" },
                ].map((item, i) => (
                  <Card key={i}>
                    <CardContent className="p-4 text-center">
                      <item.icon className="mx-auto mb-2 h-8 w-8 text-primary" />
                      <p className="font-semibold">{item.value}</p>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">Research Foundation</Badge>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Built on Academic Research
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              BLOKADEMI is developed based on extensive research into blockchain-based
              scheduling systems and decentralized governance patterns.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Literature Review",
                points: [
                  "Blockchain as distributed ledger technology",
                  "Smart contract deterministic execution",
                  "UML-based system modeling",
                  "Privacy-preserving identity abstraction",
                ],
              },
              {
                icon: Code2,
                title: "Technical Implementation",
                points: [
                  "Solidity smart contracts on Ethereum",
                  "EVM-enforced state constraints",
                  "MetaMask wallet authentication",
                  "Remix IDE deployment pipeline",
                ],
              },
              {
                icon: Target,
                title: "Governance Goals",
                points: [
                  "Conflict-aware schedule validation",
                  "Non-destructive state mutations",
                  "Auditable transaction history",
                  "Decentralized trust model",
                ],
              },
            ].map((item, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/20">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {item.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card/50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">Key Innovations</Badge>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              What Makes BLOKADEMI Different
            </h2>
          </div>

          <div className="mt-12 space-y-6">
            {[
              {
                title: "EVM-Enforced Conflict Prevention",
                description: "Unlike most blockchain scheduling implementations that store schedules without validation, BLOKADEMI encodes native schedule collision prevention as Solidity require assertions executed at the EVM level prior to transaction commit.",
                highlight: "Validation happens before storage, not after",
              },
              {
                title: "Non-Destructive State Mutations",
                description: "The system transforms delete operations into auditable schedule status state mutations, preserving irreversible history. Schedules are never deleted; they transition to archived status.",
                highlight: "Complete history preservation",
              },
              {
                title: "Privacy-Preserving Identity",
                description: "Institutional actors sign scheduling transactions using MetaMask wallet signatures, ensuring privacy-conscious authorization without storing credentials in a centralized database.",
                highlight: "No personal data in centralized storage",
              },
              {
                title: "UML-Aligned Contract Design",
                description: "The platform is modeled using UML diagrams (Use Case, Class, Sequence) to establish requirement traceability into deterministic smart contract governance layers.",
                highlight: "Traceable architecture specification",
              },
            ].map((item, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="font-bold">{i + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-bold">{item.title}</h3>
                      <p className="mt-2 text-muted-foreground">{item.description}</p>
                      <Badge variant="outline" className="mt-3">
                        {item.highlight}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">Research Team</Badge>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Developed by Bina Nusantara University
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              BLOKADEMI is the result of collaborative research between the School of
              Information Systems and School of Computer Science.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              { name: "Yosef Jason Henry", dept: "School of Information Systems" },
              { name: "Jakeem Bismaputra", dept: "School of Computer Science" },
              { name: "Jullian Louis Sanly", dept: "School of Computer Science" },
              { name: "Almer Ali Javier", dept: "School of Computer Science" },
              { name: "Kylee Valencia", dept: "School of Computer Science" },
              { name: "Andien Dwi Novika", dept: "Computer Science Department" },
            ].map((person, i) => (
              <Card key={i}>
                <CardContent className="p-4 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <GraduationCap className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-semibold">{person.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{person.dept}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Bina Nusantara University, Jakarta, Indonesia 11480
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card/50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Explore the Platform
          </h2>
          <p className="mt-4 text-muted-foreground">
            Learn more about BLOKADEMI&apos;s features, architecture, and how
            blockchain technology transforms academic scheduling.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/features">
              <Button className="gap-2">
                View Features
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/architecture">
              <Button variant="outline" className="gap-2">
                Architecture Overview
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
