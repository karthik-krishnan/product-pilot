# Pinnacle Properties Group — DealDesk Technical Context

## Platform Architecture

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                               CLIENT LAYER                                       │
│                                                                                  │
│  ┌───────────────────┐  ┌──────────────────────┐  ┌────────────────────────┐    │
│  │   Agent Portal    │  │    Admin Console      │  │  Agent Mobile App      │    │
│  │  (React 18 + TS   │  │  (React 18 + TS       │  │  (React Native         │    │
│  │   Vite + Tailwind)│  │   Vite + Tailwind)    │  │   iOS + Android)       │    │
│  │                   │  │                       │  │                        │    │
│  │  Agents, TCs      │  │  Branch Mgrs, Broker  │  │  Showing schedule,     │    │
│  │  transactions,    │  │  Accounting, Recruiting│  │  transaction status,   │    │
│  │  documents, cap   │  │  dashboards, CDAs      │  │  commission preview    │    │
│  └────────┬──────────┘  └──────────┬────────────┘  └───────────┬────────────┘    │
└───────────┼─────────────────────────┼────────────────────────────┼────────────────┘
            │  HTTPS + WSS            │  HTTPS                    │  HTTPS
┌───────────▼─────────────────────────▼────────────────────────────▼────────────────┐
│              API GATEWAY — AWS API Gateway + CloudFront CDN                       │
│       JWT (Cognito)  •  Rate limits  •  WAF OWASP rules  •  OpenAPI 3.1          │
└──────┬──────────┬──────────┬─────────────┬────────────┬──────────┬────────────────┘
       │          │          │             │            │          │
┌──────▼───┐ ┌────▼─────┐ ┌──▼──────────┐ ┌▼─────────┐ ┌▼───────┐ ┌▼──────────────┐
│  Agent   │ │Transaction│ │ Commission  │ │ Document │ │  MLS   │ │ Disbursement  │
│  Service │ │  Service  │ │  Engine     │ │  Vault   │ │  Sync  │ │  Service      │
│          │ │           │ │             │ │  Service │ │ Service│ │               │
│ Cognito  │ │ Aurora PG │ │ Aurora PG   │ │ S3 +     │ │ SQS +  │ │ Stripe        │
│ + Node   │ │ + Node    │ │ + Node      │ │ DynamoDB │ │ Node   │ │ Connect       │
└──────┬───┘ └────┬──────┘ └──────┬──────┘ └──────────┘ └───┬────┘ └───────────────┘
       │          │               │                          │
┌──────▼──────────▼───────────────▼──────────────────────────▼─────────────────────┐
│              AMAZON EVENTBRIDGE — Transaction Milestone Events                    │
│   deal.created  •  milestone.updated  •  cda.countersigned  •  cap.reached       │
│   license.expiring  •  eo.expired  •  mls.status.changed  •  commission.released │
└────────┬──────────────────┬────────────────────────────────────────────────────────┘
         │                  │
┌────────▼──────┐  ┌─────────▼─────────────────────────────────────────────────────┐
│ Notification  │  │  COTS / External Integrations                                  │
│ Service       │  │                                                                │
│               │  │  ┌─────────────┐  ┌───────────┐  ┌────────────┐  ┌─────────┐  │
│ SQS + Node    │  │  │  DocuSign   │  │  Stripe   │  │  QBO       │  │ NTREIS  │  │
│ (email, push, │  │  │  eSignature │  │  Connect  │  │  Online    │  │  HAR    │  │
│  in-app)      │  │  │  API        │  │  Payouts  │  │  REST API  │  │ Stellar │  │
└───────────────┘  │  └─────────────┘  └───────────┘  └────────────┘  └─────────┘  │
                   │  ┌─────────────┐  ┌───────────┐                               │
                   │  │  Calendly   │  │ Follow Up │                               │
                   │  │  v2 API     │  │ Boss API  │                               │
                   │  └─────────────┘  └───────────┘                               │
                   └────────────────────────────────────────────────────────────────┘
```

## Services Reference

| Service | Responsibility | Technology |
|---|---|---|
| **Agent Service** | Agent profile management, lifecycle state machine (recruit → offboard), license and E&O record tracking, cap plan assignment | Node.js 20, Express, Aurora PostgreSQL 15 |
| **Transaction Service** | Deal creation, milestone timeline management, TC assignment, document checklist enforcement, listing linkage | Node.js 20, Express, Aurora PostgreSQL 15 |
| **Commission Engine** | Commission calculation (all plan types), GCI computation, cap accumulator, CDA generation, idempotent recalculation on milestone change | Node.js 20, Express, Aurora PostgreSQL 15; stateless calculation layer |
| **Document Vault Service** | Per-transaction document storage and metadata, DocuSign envelope management, state-mandated form library (TREC/FREC forms), broker review workflow | Node.js 20, Express, S3 + DynamoDB metadata index |
| **MLS Sync Service** | Polls NTREIS, HAR, Stellar MLS every 15 minutes; ingests listing status changes; emits `mls.status.changed` events to EventBridge | Node.js 20, SQS-scheduled job, RESO Web API clients |
| **Disbursement Service** | Listens for `cda.countersigned` events; initiates Stripe Connect payouts to agents; syncs disbursement records to QBO | Node.js 20, Stripe Connect API, QBO REST API |
| **Notification Service** | Email (SES), in-app alerts, mobile push (FCM/APNs) for transaction milestones, compliance alerts, commission events | Node.js 20, SQS FIFO, AWS SES, Firebase FCM |
| **Reporting Service** | Agent production dashboards, GCI leaderboards, cap progress, office P&L, recruiting funnel metrics | Node.js 20, read-replica Aurora PostgreSQL, OpenSearch aggregations |

## Tech Stack

### Frontend — Agent Portal and Admin Console
- **Framework**: React 18 + TypeScript, Vite build toolchain
- **Styling**: Tailwind CSS + Radix UI component primitives
- **State management**: React Query v5 (server state, caching, background refetch); Zustand (local UI state)
- **Forms**: React Hook Form + Zod schema validation
- **Rich text** (listing descriptions): TipTap editor
- **Charts / dashboards**: Recharts for production dashboards; Nivo for geographic distribution maps
- **WebSocket**: native browser WebSocket for real-time transaction update notifications (milestone changes, CDA status)

### Frontend — Agent Mobile App
- **Framework**: React Native 0.74 (iOS 16+, Android 11+); Expo managed workflow
- **Key screens**: Today's showings (Calendly embed), My transactions (milestone status), Commission tracker (cap progress, GCI YTD), Document upload (camera → S3 presigned URL)
- **Offline**: React Query persistence adapter with MMKV local store; transaction status readable offline; uploads queue when offline

### Backend
- **Runtime**: Node.js 20 LTS; Express 4 for REST services
- **API style**: REST + OpenAPI 3.1 spec-first; all endpoints documented in OpenAPI before implementation
- **Real-time**: WebSocket via AWS API Gateway WebSocket API for transaction milestone broadcast
- **Auth**: AWS Cognito User Pools; JWT RS256 tokens; role claims: `agent`, `tc`, `branch_manager`, `broker_admin`, `finance`
- **Primary database**: Amazon Aurora PostgreSQL 15 (transactions, agents, commissions, disbursements) — Multi-AZ in us-east-1
- **Document / file store**: Amazon S3 (contract PDFs, CDA PDFs, disclosure forms, agent onboarding docs); DynamoDB for per-document metadata index (transaction ID, document type, upload timestamp, DocuSign envelope ID, review status)
- **Event bus**: Amazon EventBridge — transaction milestone events, commission-triggered events, compliance alert events
- **Queue**: Amazon SQS — DocuSign webhook ingestion (FIFO), MLS sync job scheduling (Standard), disbursement processing (FIFO, deduplication on CDA ID)
- **Search**: Amazon OpenSearch Service — agent directory search (name, license number, market); listing search within DealDesk
- **Feature flags**: LaunchDarkly — gating Florida market rollout, experimental Commission Engine v2 logic, new analytics widgets

### Infrastructure & DevOps
- **Cloud**: AWS; primary region **us-east-1** (N. Virginia); disaster recovery region **us-west-2** (Oregon) for Aurora global database read replica and S3 cross-region replication
- **IaC**: AWS CDK v2 (TypeScript); all infrastructure version-controlled; no manual console changes in production
- **CI/CD**: GitHub Actions — lint + type-check → unit tests → integration tests (Testcontainers + Aurora local) → E2E (Playwright against staging) → manual promote to production
- **Secrets**: AWS Secrets Manager (DocuSign API keys, Stripe secret keys, QBO OAuth tokens, MLS API credentials); rotated quarterly
- **Observability**: AWS CloudWatch + X-Ray distributed tracing; Datadog APM for cross-service latency; PagerDuty for P1/P2 alerts; custom CloudWatch dashboard per office for compliance alert volumes
- **Container registry**: Amazon ECR; all services deployed as ECS Fargate containers (not Lambda, due to long-running MLS sync jobs)

## COTS Integrations

| Product | Role | Integration Point |
|---|---|---|
| **DocuSign** | E-signatures on CDAs, listing agreements, disclosure forms, dual agency consent | Document Vault Service → DocuSign eSignature REST API; webhook callback → SQS FIFO for `cda.countersigned` event |
| **Stripe Connect** | Commission disbursements to agent bank accounts (ACH standard 2-day + instant payout option) | Disbursement Service → Stripe Connect Payouts API; agent bank accounts stored as Stripe Connected Accounts |
| **QuickBooks Online** | Accounting sync: commission income journal entries, referral fee payables, agent deductions | Disbursement Service → QBO REST API (OAuth 2.0); one journal entry per closed transaction |
| **NTREIS MLS** | Listing data, status changes, sold data for DFW and North Texas markets | MLS Sync Service → NTREIS RESO Web API (OAuth 2.0 + bearer token); 15-minute polling via SQS scheduled job |
| **HAR MLS** | Listing data and status updates for Houston market | MLS Sync Service → HAR IDX feed (nightly full + delta) + RESO API (partial) |
| **Stellar MLS** | Listing data and status updates for Florida markets | MLS Sync Service → Stellar RESO Web API (OAuth 2.0); 15-minute polling |
| **Calendly** | Showing appointment scheduling embedded in agent portal and mobile app | Calendly v2 API; OAuth 2.0; webhook for appointment creation/cancellation |
| **Follow Up Boss** | Legacy CRM sync during Phase 1 transition (read-only contact and lead data) | Agent Service → Follow Up Boss REST API; one-way sync, deprecated at Phase 2 |

## Key Architectural Constraints

- **CDA-to-disbursement integrity**: The Disbursement Service may only initiate a Stripe payout after receiving a confirmed `cda.countersigned` event from EventBridge, which is triggered by a DocuSign webhook callback confirming all required signatories have signed. No payout can be manually initiated outside this event flow; the Disbursement Service has no direct UI trigger.
- **Commission Engine idempotency**: The Commission Engine recalculates commissions on every transaction milestone change. Given the same set of inputs (transaction record, agent plan, current cap balance, GCI amount), the engine must always produce the same output. Recalculations are logged with a calculation version hash; any change in output requires explicit audit trail entry.
- **MLS sync SLA and failure handling**: MLS Sync Service runs every 15 minutes via SQS-scheduled message. If three consecutive sync jobs fail for a given listing (detected via dead-letter queue monitoring), a `mls.sync.failed` alert is emitted to EventBridge, which triggers a notification to the assigned TC and branch manager. Manual sync can be triggered from the admin console.
- **Document retention — 7-year RESPA requirement**: All compliance documents (CDAs, disclosure forms, contracts, addenda) must be retained for a minimum of 7 years. S3 lifecycle policy: documents are stored in Standard tier for 3 years, then automatically transitioned to S3 Glacier Flexible Retrieval for years 3–7, then deleted. DynamoDB metadata records are retained for 7 years.
- **E&O insurance nightly check**: A scheduled EventBridge rule runs nightly at 01:00 CT and invokes the Agent Service to check all active agents' E&O expiry dates. Agents expiring within 30 days receive an escalating notification series (30 days, 14 days, 7 days, day-of). Agents whose E&O has lapsed are automatically transitioned to "E&O Expired" status, which blocks new transaction creation.
- **Role-based data isolation**: An agent in the DFW market must not be able to view commission details, cap balances, or transaction documents for agents in other offices, except for shared dual-agency or referral transactions. Branch managers see only their own office. The Broker of Record role has cross-office read access.

## Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Availability** | 99.9% for Agent Portal, Transaction Service, and Commission Engine during business hours (07:00–21:00 CT); 99.5% overall monthly |
| **Latency** | p95 transaction page load < 1,000 ms; commission calculation < 500 ms; CDA PDF generation < 3 seconds |
| **Data retention** | Compliance documents: 7 years (RESPA); commission and audit records: 7 years; agent activity logs: 3 years |
| **Compliance audit trail** | Every change to a transaction record, commission calculation, or agent status must be logged with actor identity (user ID + role), timestamp (UTC), previous value, new value, and source IP. Audit logs are append-only and cannot be deleted. |
| **Test coverage** | Unit ≥ 80% (Commission Engine: 95% minimum due to financial calculation criticality); integration ≥ 60%; Playwright E2E on all transaction milestone and CDA disbursement critical paths |
| **Disaster recovery** | RPO ≤ 1 hour (Aurora global database replication); RTO ≤ 4 hours for full platform restore from us-west-2 DR region |
| **MLS sync freshness** | Listing status updates must be reflected in DealDesk within 20 minutes of MLS source change under normal operating conditions |
