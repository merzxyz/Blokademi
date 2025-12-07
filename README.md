# BLOKADEMI - Decentralized Academic Scheduling Platform

## Overview

BLOKADEMI is a blockchain-powered academic scheduling governance platform built on Ethereum smart contracts. It provides transparent, immutable, and conflict-free scheduling management for educational institutions through decentralized state transitions. The platform supports three role-based interfaces (Admin, Lecturer, Student) and enforces scheduling rules through smart contract validation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript and Vite
- **UI Library**: Shadcn/UI components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom Material Design-inspired theme system
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation

**Design System**:
- Typography: Inter (UI/body), Space Grotesk (headings), JetBrains Mono (technical data)
- Color system: HSL-based with CSS custom properties for theme switching (dark/light mode)
- Component library follows Material Design principles with elevation, clear hierarchy, and data-rich layouts
- Responsive grid system optimized for dashboard layouts and schedule tables

**Key Design Decisions**:
- Material Design chosen for data-dense, utility-focused application requiring clarity and trust
- Role-based UI consistency with adaptive interfaces for admin, lecturer, and student personas
- Technical professionalism conveyed through clean design and monospace fonts for blockchain data

### Backend Architecture

**Runtime**: Node.js with Express.js
- **Type Safety**: TypeScript with strict mode enabled
- **API Pattern**: RESTful API with `/api` prefix
- **Session Management**: Express sessions (configuration supports both in-memory and PostgreSQL session stores)
- **Build System**: ESBuild for server bundling, Vite for client bundling
- **Development**: Hot Module Replacement (HMR) via Vite middleware

**Storage Interface**:
- Abstract `IStorage` interface defining core data operations
- Initial implementation: `MemStorage` (in-memory storage)
- Designed for easy migration to persistent database (PostgreSQL via Drizzle ORM)

**Server Organization**:
- `server/index.ts`: Express app initialization and middleware setup
- `server/routes.ts`: API route registration (currently placeholder for implementation)
- `server/storage.ts`: Data access layer with interface-based design
- `server/static.ts`: Static file serving for production builds

### Database Schema (Drizzle ORM)

**Database**: PostgreSQL (configured but not yet provisioned)
- **ORM**: Drizzle ORM with schema-first design
- **Migrations**: Drizzle Kit for schema migrations
- **Type Safety**: Drizzle-Zod integration for runtime validation

**Core Tables**:
1. **users**: Wallet-based authentication (walletAddress as unique identifier), role-based access (admin/lecturer/student), optional display names
2. **rooms**: Physical classroom management with capacity, building/floor info, facilities list, availability status
3. **classes**: Course definitions with code, credits, semester, max students, descriptions
4. **lecturers**: Lecturer profiles linked to wallet addresses with department and specialization
5. **schedules**: Schedule entries linking classes, rooms, lecturers with time slots (day, start/end times) and validation status (pending/validated/archived)

**Design Rationale**:
- Wallet addresses serve as primary authentication mechanism (blockchain-aligned identity)
- Normalized schema separating entities for conflict detection and validation
- Status fields enable workflow management (pending → validated → archived)

### Blockchain Integration

**Platform**: Ethereum-based smart contracts (implementation pending)
- **Wallet Provider**: MetaMask or compatible Web3 wallet
- **Wallet Context**: React context managing connection state, user role, and address
- **Transaction Recording**: All schedule operations designed to be recorded on-chain as immutable audit trail

**Integration Points**:
- Wallet connection/disconnection flow
- Role assignment and verification
- Schedule creation, validation, and archival transactions
- Conflict detection before blockchain submission
- Transaction history and blockchain explorer links

**Design Philosophy**:
- Frontend-first development approach with blockchain integration layer prepared
- Local storage persistence for wallet state during development
- Transaction status tracking (pending, confirmed, failed)

### Authentication & Authorization

**Wallet-Based Authentication**:
- No traditional username/password system
- Ethereum wallet address serves as unique identifier
- Role assignment (admin/lecturer/student) stored in database and wallet context
- Session persistence via localStorage for development convenience

**Authorization Model**:
- Role-based access control (RBAC) with three primary roles
- Dashboard routes segregated by role (`/dashboard/admin`, `/dashboard/lecturer`, `/dashboard/student`)
- Protected routes enforcing role-specific access

## External Dependencies

### UI Component Libraries
- **Radix UI**: Unstyled, accessible component primitives for dialogs, dropdowns, popovers, tooltips, and form controls
- **Shadcn/UI**: Pre-styled Radix UI components with Tailwind CSS
- **Lucide React**: Icon library for consistent iconography
- **React Icons**: Additional icons (specifically SiEthereum, SiSolidity for branding)

### Styling & Design
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Class Variance Authority**: Component variant management
- **clsx & tailwind-merge**: Conditional class name handling

### Form & Data Management
- **React Hook Form**: Performant form state management
- **Zod**: Schema validation with TypeScript integration
- **@hookform/resolvers**: Zod resolver for React Hook Form
- **TanStack Query**: Server state management with caching and invalidation

### Database & ORM
- **PostgreSQL**: Primary database (requires DATABASE_URL environment variable)
- **Drizzle ORM**: Type-safe SQL query builder
- **Drizzle Kit**: Schema migration tooling
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Development Tools
- **TypeScript**: Static type checking across entire codebase
- **Vite**: Fast frontend build tool with HMR
- **ESBuild**: High-performance server bundling
- **tsx**: TypeScript execution for development scripts

### Third-Party Services (Planned)
- **Ethereum Node Provider**: Infura, Alchemy, or custom node for blockchain interaction
- **IPFS**: Potential decentralized storage for schedule metadata
- **Blockchain Explorer API**: Etherscan or equivalent for transaction verification links

### Build & Deployment
- **Scripts**: `dev` (development server), `build` (production build), `start` (production server), `db:push` (database schema push)
- **Environment**: NODE_ENV for environment-specific configuration
- **Asset Handling**: Vite-managed static assets with custom alias configuration (`@`, `@shared`, `@assets`)