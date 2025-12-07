# BLOKADEMI Design Guidelines

## Design Approach

**Selected Framework**: Material Design (Data-Rich Applications)
**Rationale**: BLOKADEMI is a utility-focused, information-dense platform requiring clarity, trust, and efficient data display. Material Design's elevation system, clear hierarchy, and proven patterns for complex dashboards align perfectly with blockchain transaction displays, schedule management, and role-based interfaces.

**Core Principles**:
1. **Trust Through Clarity**: Every blockchain interaction must be transparent and understandable
2. **Data Hierarchy**: Complex schedule and transaction data requires clear visual organization
3. **Role-Based Consistency**: Admin, Lecturer, and Student interfaces share design language but adapt to role needs
4. **Technical Professionalism**: Convey blockchain security and immutability through clean, confident design

---

## Typography System

**Font Families** (via Google Fonts CDN):
- **Primary**: Inter (UI, body text, data tables)
- **Display**: Space Grotesk (headings, hero sections)
- **Monospace**: JetBrains Mono (transaction hashes, addresses, technical data)

**Type Scale**:
- Hero Display: text-6xl md:text-7xl lg:text-8xl, font-bold (Space Grotesk)
- Page Titles: text-4xl md:text-5xl, font-bold (Space Grotesk)
- Section Headings: text-2xl md:text-3xl, font-semibold (Space Grotesk)
- Card Titles: text-xl font-semibold (Inter)
- Body Text: text-base leading-relaxed (Inter)
- Technical Data: text-sm font-mono (JetBrains Mono) for hashes, addresses
- Captions/Labels: text-xs md:text-sm font-medium uppercase tracking-wide

---

## Layout & Spacing System

**Tailwind Spacing Primitives**: Use units of **2, 4, 8, 12, 16** consistently
- Micro spacing (gaps, padding between related items): p-2, gap-2, space-y-2
- Component internal spacing: p-4, gap-4
- Section spacing: py-12 md:py-16 lg:py-20
- Page margins: px-4 md:px-8 lg:px-12
- Container max-width: max-w-7xl

**Grid System**:
- Dashboard layouts: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8
- Schedule tables: Full-width responsive tables with horizontal scroll
- Landing page features: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

---

## Component Library

### Navigation
- **Top Navigation Bar**: Fixed position, frosted glass effect (backdrop-blur-md), contains logo, main nav links, MetaMask connection status
- **Role-Based Sidebar** (Dashboards): Collapsible on mobile, fixed on desktop (w-64), role indicator at top, navigation grouped by function
- **Breadcrumbs**: text-sm with separator icons for deep navigation (Schedule > Room Management > Edit Room)

### MetaMask Integration
- **Wallet Connection Button**: Prominent in header, displays truncated address when connected (0x1234...5678), status indicator (connected/disconnected)
- **Connection Modal**: Centered overlay explaining MetaMask requirement, benefits of wallet-based auth, connection steps
- **Wallet Info Card**: Shows connected address, network, recent transaction count in dashboard sidebar

### Landing Page Structure (8 Sections)

1. **Hero Section** (90vh): 
   - Large heading explaining "Decentralized Scheduling Governance on Ethereum"
   - Subheading about transparency, immutability, conflict prevention
   - Dual CTA buttons (Get Started, View Architecture)
   - **Hero Image**: Abstract blockchain network visualization or Ethereum-style geometric patterns overlaying schedule grid mockup
   - Background: Subtle gradient with geometric patterns suggesting blockchain nodes

2. **Problem Statement** (py-16): 
   - Two-column layout: Problem (traditional centralized scheduling issues) | Solution (blockchain benefits)
   - Icons for each pain point (silent modifications, lack of audit trails, conflict risks)

3. **Key Features Grid** (py-20):
   - 3-column grid (2 on tablet, 1 on mobile)
   - Feature cards with icons: Immutable Records, Smart Contract Validation, Cryptographic Signing, Privacy-Preserving Identity, Conflict Prevention, Audit Trails
   - Each card: Icon (top), title, 2-3 sentence description

4. **How It Works** (py-20):
   - Horizontal timeline/process flow showing: Schedule Creation → Smart Contract Validation → EVM Processing → Immutable Storage → Blockchain Confirmation
   - Step cards with numbers, connecting lines

5. **Architecture Overview** (py-16):
   - Visual diagram representation (can be SVG illustration or detailed text breakdown)
   - Three layers: Frontend (React) → Smart Contracts (Solidity) → Blockchain (Ethereum)
   - Technology badges with icons (MetaMask, Ethereum, Solidity, etc.)

6. **Role-Based Access** (py-20):
   - Three-column showcase of Admin/Lecturer/Student dashboards
   - Screenshot-style cards showing key features for each role
   - Permission matrix table below

7. **Trust & Transparency** (py-16):
   - Statistics cards: Transaction count, Successful validations, Active users, Prevented conflicts
   - Blockchain verification visual (hash example, timestamp, block number)

8. **CTA Section** (py-20):
   - Centered content, large heading "Ready to Transform Your Scheduling?"
   - Dual CTAs: Connect Wallet | Explore Documentation
   - Background: Elevated card on subtle gradient

### Dashboard Components

**Admin Dashboard**:
- **Quick Actions Grid**: 2x2 grid of primary actions (Create Schedule, Add Room, Manage Classes, Validate Pending)
- **Schedule Overview Table**: Full-width responsive table, columns for Time Slot, Room, Class, Lecturer, Status, Actions
- **Validation Queue**: Card showing pending schedules requiring validation, count badge, priority indicators
- **Resource Statistics**: Cards showing total rooms, classes, lecturers, active schedules
- **Recent Activity Feed**: Timeline of recent blockchain transactions related to schedules

**Lecturer Dashboard**:
- **My Schedules Table**: Personal schedule view with validation status
- **Change Request Form**: Card with form fields, wallet signature requirement indicator
- **Validation Interface**: Approve/reject schedules assigned for review, signature required
- **Upcoming Classes**: Calendar-style view of next 7 days

**Student Dashboard**:
- **Schedule Viewer**: Read-only table, highlighted current time slot
- **Course Selection**: Available courses grid with enrollment status, capacity indicators
- **My Enrolled Courses**: Cards showing course details, room, lecturer, schedule
- **Academic Calendar**: Month view with important dates

### Data Display Components

**Schedule Table**:
- Sticky header row with Time Slot | Day | Room | Class | Lecturer | Status
- Status badges: Pending (outlined), Validated (solid), Conflict (alert style), Archived (muted)
- Row hover states for interactivity
- Mobile: Cards stacking instead of table

**Transaction History Table**:
- Columns: TX Hash | Timestamp | Action Type | Details | Status
- TX Hash in monospace font, truncated with copy button
- Expandable row details showing full blockchain data
- Filter controls: Date range, action type, user role
- Pagination at bottom

**Resource Cards** (Rooms, Classes, Lecturers):
- Compact card: Header with resource name, capacity/details section, availability indicator, edit/view actions
- Grid display: 3 columns on desktop, 2 on tablet, 1 on mobile
- Quick stats overlay on hover

**Conflict Indicator**:
- Alert-style banner when conflicts detected
- Lists conflicting resources (Room X already booked at Time Y)
- Resolution suggestions
- Cannot proceed until resolved

**Smart Contract Validation Alert**:
- Toast notifications for transaction states: Pending, Confirmed, Failed
- Modal for signature requests (MetaMask integration)
- Success confirmation with transaction hash, block explorer link

### Forms & Inputs

- **Text Inputs**: Outlined style with floating labels, helper text below
- **Dropdowns**: Native select with custom styling, icon indicators
- **Date/Time Pickers**: Calendar popover, time selection dropdown
- **Checkbox Groups**: For multi-select (resources, days of week)
- **Submit Buttons**: Primary action, disabled state while transaction pending, shows loading spinner during blockchain confirmation

---

## Images

**Hero Section**: Full-width background image (1920x1080) showing abstract blockchain network visualization with Ethereum nodes, smart contract flow diagrams, or geometric schedule grid patterns. Semi-transparent overlay for text readability.

**Feature Icons**: Use Heroicons (via CDN) for: lock (immutability), shield-check (validation), key (cryptography), eye-slash (privacy), clock (audit trails), alert-triangle (conflicts)

**Dashboard Illustrations**: Small accent images showing schedule grids, blockchain blocks, or wallet connection flows where appropriate in empty states

---

## Animations

**Minimal, Purposeful Only**:
- Wallet connection: Subtle pulse on connection button
- Transaction pending: Spinner/loading state
- Form validation: Shake animation on error
- Success confirmations: Gentle fade-in for toast notifications
- **NO** scroll-triggered animations, parallax effects, or decorative motion

---

## Accessibility

- Maintain WCAG AA contrast ratios throughout
- Keyboard navigation for all interactive elements
- ARIA labels for blockchain-specific data (transaction hashes, wallet addresses)
- Screen reader announcements for transaction state changes
- Focus indicators on all form inputs and buttons

---

This design creates a professional, trustworthy platform that communicates blockchain security and immutability while maintaining usability for diverse academic user roles.