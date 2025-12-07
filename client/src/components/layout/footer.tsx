import { Link } from "wouter";
import { Blocks, Github, Twitter } from "lucide-react";
import { SiEthereum } from "react-icons/si";

const footerLinks = {
  platform: [
    { href: "/features", label: "Features" },
    { href: "/architecture", label: "Architecture" },
    { href: "/transactions", label: "Transactions" },
  ],
  resources: [
    { href: "/about", label: "About" },
    { href: "/uml", label: "UML Diagrams" },
    { href: "/wallet", label: "Wallet Setup" },
  ],
  roles: [
    { href: "/dashboard/admin", label: "Admin Dashboard" },
    { href: "/dashboard/lecturer", label: "Lecturer Dashboard" },
    { href: "/dashboard/student", label: "Student Dashboard" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Blocks className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">BLOKADEMI</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Decentralized scheduling governance platform built on Ethereum smart contracts.
              Transparent, immutable, and conflict-free academic scheduling.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Ethereum"
              >
                <SiEthereum className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Platform
            </h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Resources
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Dashboards
            </h4>
            <ul className="space-y-2">
              {footerLinks.roles.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            Built with blockchain technology for academic excellence.
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by Ethereum Smart Contracts
          </p>
        </div>
      </div>
    </footer>
  );
}
