# Pinnacle Properties Group — Domain Context

## About the Organisation

**Pinnacle Properties Group** is a large independent residential real estate brokerage with **3,200 active agents** across two states. The company operates **28 regional offices** — 18 in Texas (concentrated in Dallas-Fort Worth, Houston, Austin, and San Antonio metro areas) and 10 in Florida (Tampa Bay and Greater Orlando). Pinnacle closed approximately **18,500 transactions** in the prior fiscal year representing roughly **$6.2 billion in gross sales volume**.

Pinnacle is fully independent — it operates under its own brand and is not a franchise of a national network — which means its commission structures, compliance workflows, and technology decisions are entirely self-determined. The brokerage employs a **Broker of Record** in each state who holds legal responsibility for all agent activity.

The internal platform being built to consolidate agent-facing and brokerage-admin operations is called **DealDesk**. Today, Pinnacle's operations run across four disconnected systems: **dotloop** (document management), **Follow Up Boss** (CRM / lead pipeline), **QuickBooks Online** (accounting), and a home-grown **Excel/Google Sheets transaction tracker** managed by Transaction Coordinators. Agents also reference a separate spreadsheet for commission cap tracking maintained by the accounting team and updated monthly. The friction between these systems creates delays in commission disbursement, compliance gaps, and significant manual work for Transaction Coordinators and the accounting team.

---

## Business Domain Concepts

### User Personas

| Persona | Description | Key Needs |
|---|---|---|
| **Buyer's Agent** | Represents buyers; manages showings, offers, and closing coordination | Transaction status, commission preview, showing schedule, document checklist |
| **Listing Specialist** | Represents sellers; manages listing creation, pricing, open houses, and offers received | MLS listing management, offer tracking, listing document compliance, seller communication |
| **Transaction Coordinator (TC)** | Brokerage staff (not agents) who manage the document and milestone lifecycle of each transaction | Document collection, deadline tracking, compliance checklist, CDA preparation |
| **Branch Manager** | Manages a regional office; oversees agent production, compliance, and recruiting | Agent production dashboard, compliance exceptions, CDA approval queue, recruiting pipeline |
| **Broker of Record** | Licensed broker holding state-level responsibility for all agent conduct | Supervision alerts, license compliance, dual agency approvals, audit trail access |
| **Recruiting Admin** | Manages incoming agent applications and onboarding pipeline | Application status, license verification queue, onboarding task assignment |
| **Accounting / Finance** | Disburses commissions, reconciles with QuickBooks, manages cap tracking | Commission calculation accuracy, CDA countersignature status, Stripe disbursement queue, QBO sync |
| **Agent (General)** | Any active licensed agent at Pinnacle; may play buyer's agent or listing role depending on transaction | My transactions, my cap progress, commission estimates, document upload, E&O expiry alerts |

### Transaction Types

| Type | Description | Notes |
|---|---|---|
| **Buyer Representation** | Agent represents the buyer in a purchase | Most common transaction type; buyer's agent commission typically paid by seller |
| **Seller / Listing Representation** | Agent represents the seller; lists property on MLS | Listing agent earns listing-side commission; may co-broke with buyer's agent |
| **Dual Agency** | Single agent (or same brokerage) represents both buyer and seller | Requires written consent from both parties; reduced commission split or flat fee structure; state disclosure rules apply |
| **Referral-In** | External brokerage refers a buyer or seller to Pinnacle | Pinnacle agent earns full side; referral fee paid back to referring brokerage (capped at 35% of gross commission) |
| **Referral-Out** | Pinnacle agent refers a client to an agent at another brokerage | Pinnacle earns a referral fee from the receiving brokerage; no transaction management required beyond fee tracking |
| **New Construction** | Agent represents buyer purchasing a new-build home | Builder typically pays buyer's agent; often builder contracts rather than standard TREC/FREC forms; separate document checklist |

### Commission Structures

Pinnacle supports four commission plan types. Every agent is assigned exactly one plan, configured at onboarding and adjustable at anniversary.

| Plan | Description | Example |
|---|---|---|
| **Standard Split** | Agent and brokerage share gross commission at a fixed ratio for all transactions | Agent keeps 80%; brokerage retains 20% (80/20 split) |
| **Cap Model** | Agent pays brokerage a percentage of each commission until reaching an annual cap, after which the agent retains 100% for the remainder of the year | Agent on 80/20 plan with a $22,000 annual cap; once the agent has paid $22,000 to the brokerage, all subsequent GCI is kept by the agent |
| **Team Model** | A Team Lead receives a portion of the team's gross commission and pays sub-agents a negotiated sub-split | Team Lead earns 30% override on every team member transaction; sub-agent earns 60% (brokerage 10%) |
| **Graduated Split** | Split ratio improves in tiers as the agent crosses production milestones within the calendar year | Tier 1: 70/30 up to $5M sales volume; Tier 2: 75/25 from $5M–$10M; Tier 3: 80/20 above $10M |

**Key commission concepts:**

- **GCI (Gross Commission Income)**: The total commission dollars earned on a transaction before any splits or deductions. On a $500,000 sale at 3% buyer-side commission, GCI = $15,000.
- **CDA (Commission Disbursement Authorization)**: The formal document issued per transaction that specifies exactly how the gross commission is to be split and distributed. The CDA must be countersigned by the Broker of Record (or designee) before any disbursement can occur. CDAs are a legal and compliance requirement.
- **Cap Tracking**: The year-to-date total of brokerage-side commission paid by a cap-model agent. Tracked per agent against their individual cap amount. Cap resets on the agent's anniversary date (not calendar year).
- **E&O (Errors & Omissions Insurance)**: Required for all active agents. Pinnacle maintains a group E&O policy and tracks individual expiry dates. If an agent's E&O record lapses, the agent is blocked from creating new transactions.

### Agent Lifecycle

```
RECRUIT → PRE-LICENSE → LICENSE PENDING → ONBOARDING → ACTIVE → TOP PRODUCER → TEAM LEAD
                                                                               ↓
                                                         VOLUNTARY OFFBOARD / INVOLUNTARY OFFBOARD
```

| Stage | Description | DealDesk Actions |
|---|---|---|
| **Recruit** | Lead in recruiting pipeline; not yet applied | CRM record, recruiter notes, source tracking |
| **Pre-License** | Has enrolled in licensing course; no license yet | Monitor course progress; cannot access transaction features |
| **License Pending** | Passed state exam; awaiting TREC/FREC license issuance | License number placeholder; background check status tracking |
| **Onboarding** | License active; completing Pinnacle onboarding tasks | Checklist: E&O enrollment, MLS association, DocuSign ID verification, commission plan selection, direct deposit setup |
| **Active** | Fully licensed and onboarded; can create and participate in transactions | Full DealDesk access; cap tracking begins |
| **Top Producer** | Designation for agents closing ≥ 24 units or ≥ $8M GCI in a rolling 12 months | Badge on agent profile; eligible for enhanced split negotiation |
| **Team Lead** | Active agent who has registered a team; sub-agents operate under them | Additional team management views; override commission calculated and tracked |
| **Voluntary Offboard** | Agent submits resignation; license transferred to another broker | License release workflow; pending commissions held until all CDAs signed; MLS associations transferred |
| **Involuntary Offboard** | Terminated for cause or compliance violation | Immediate transaction hold; Broker of Record review required; commissions escrowed pending resolution |

### MLS Systems

Pinnacle agents operate across three MLS jurisdictions:

| MLS | Coverage | System | Listing Status Codes |
|---|---|---|---|
| **NTREIS** (North Texas Real Estate Information Systems) | DFW, Collin County, Tarrant County | RESO Web API + IDX feed | Active, Active Under Contract, Pending, Closed, Withdrawn, Expired, Cancelled, Hold |
| **HAR** (Houston Association of REALTORS) | Greater Houston metro | IDX Data Feed + RESO API (partial) | Active, Option Pending, Pending, Sold, Withdrawn, Expired, Temp Off Market |
| **Stellar MLS** | Central and Southwest Florida (Tampa, Orlando, Sarasota) | RESO Web API | Active, Active With Contract, Pending, Closed, Withdrawn, Expired, Cancelled, Incomplete |

MLS listing status changes are the primary trigger for transaction milestone updates in DealDesk. A listing moving from Active to Pending in NTREIS, for example, triggers a "Contract Accepted" milestone in the corresponding DealDesk transaction.

### State Licensing

**Texas — TREC (Texas Real Estate Commission)**

- License types: **Sales Agent** (sponsored by a broker) and **Broker** (independent)
- All Pinnacle agents hold Sales Agent licenses sponsored by the Pinnacle Broker of Record for Texas
- License renewal: every **2 years** from date of issuance
- Continuing Education: **18 credit hours** per renewal cycle, including mandatory courses (Legal Update I and II — 4 hrs each, plus electives)
- Inactive status: agent may place license on inactive with TREC; inactive agents cannot conduct real estate activities
- Reinstatement: within 6 months of expiry at late fee; after 6 months requires re-examination
- Broker of Record (Texas): must hold a Texas Broker license; responsible for all sponsored agent conduct and records

**Florida — FREC (Florida Real Estate Commission)**

- License types: **Sales Associate** and **Broker**
- All Pinnacle Florida agents hold Sales Associate licenses
- License renewal: every **2 years** (March 31 odd years for initial cohort)
- Continuing Education: **14 credit hours** per renewal cycle, including 3 hrs of Core Law and 3 hrs of Ethics
- First renewal: 45 hours of post-licensing education required (one-time requirement for new licensees)
- Broker of Record (Florida): must hold a Florida Broker license

**E&O Insurance**

- Required for all active agents at Pinnacle
- Pinnacle carries a group E&O policy with a per-claim limit of $1,000,000 and aggregate $3,000,000
- Individual agent certificates tracked by DealDesk; expiry triggers 30-day warning, 14-day warning, and day-of-expiry block on new transactions
- New construction transactions excluded from standard E&O; separate rider required

---

## Compliance & Regulatory Context

### RESPA (Real Estate Settlement Procedures Act)
- Applies to all residential transactions with federally related mortgage loans
- Requires delivery of the **Loan Estimate** within 3 business days of loan application and the **Closing Disclosure** at least 3 business days before closing (TRID rules)
- Prohibits kickbacks and unearned fee splitting with settlement service providers
- **Affiliated Business Arrangement (AfBA)** disclosures required if Pinnacle refers clients to affiliated entities (title, mortgage, insurance)
- DealDesk must timestamp all disclosure deliveries and retain for 7 years

### TILA-RESPA Integrated Disclosure (TRID)
- Governs Loan Estimate and Closing Disclosure forms for purchase and refinance transactions
- "Three-day waiting period" between Closing Disclosure delivery and closing must be tracked per transaction
- DealDesk compliance checklist includes TRID timeline validation

### Fair Housing Act
- Prohibits discrimination based on race, colour, national origin, religion, sex, familial status, or disability
- Texas adds additional protected classes under TREC rules; Florida under FREC
- All Pinnacle agents must complete Fair Housing training annually; DealDesk tracks completion certificates
- Advertising review: listing descriptions must be reviewed for discriminatory language before MLS submission

### Texas Disclosure Requirements (TREC)
- **Seller's Disclosure Notice**: required for most residential sales; agent must deliver and retain signed copy
- **Lead-Based Paint Disclosure**: required for homes built before 1978
- **HOA Addendum**: required for properties in an HOA
- **MUD Disclosure**: required for properties in a Municipal Utility District

### Florida Disclosure Requirements (FREC)
- **Seller's Property Disclosure**: required; agents must document delivery
- **Radon Gas Disclosure**: required on all Florida residential contracts
- **Homeowners Association Disclosure**: required if applicable
- **Energy Efficiency Rating Brochure**: required to be provided to buyers

---

## Business Rules

1. **CDA countersignature gates disbursement**: A Commission Disbursement Authorization must be fully countersigned by the Broker of Record (or designated approving branch manager) via DocuSign before the Disbursement Service may initiate a Stripe payout. No exceptions.
2. **Transaction document checklist enforcement**: An agent or TC cannot mark a transaction milestone as "Complete" if any required documents in that milestone's checklist are missing or unaccepted. The system enforces this at the milestone level, not as an advisory.
3. **E&O expiry blocks new transactions**: An agent whose E&O insurance record has lapsed or expired may not create or join a new transaction in DealDesk. Existing transactions in progress are flagged but not blocked, with branch manager notification.
4. **Dual agency requires written consent from both parties**: Any transaction where one agent (or the same brokerage) represents both buyer and seller must have a signed dual agency consent form from each party before the transaction can advance past the "Contract Accepted" milestone.
5. **Cap resets on agent anniversary date**: For agents on a cap plan, the brokerage-side commission accumulator resets to zero on the agent's individual anniversary date (the date they joined Pinnacle), not on January 1. The Commission Engine must track and apply the correct reset date per agent.
6. **Referral fees capped at 35% of gross commission**: Inbound referral fees paid to a referring brokerage cannot exceed 35% of the gross commission earned on that transaction. The Commission Engine enforces this cap and flags any CDA where the referral fee would exceed the limit.
7. **Branch manager must approve CDAs above the office threshold**: CDAs where the gross commission exceeds $25,000 require branch manager approval before the Broker of Record countersignature workflow begins. CDAs under $25,000 can go directly to the Broker of Record queue.
8. **Void or cancellation above $10,000 requires Broker of Record review**: If a transaction is voided after a commission has been calculated and a CDA has been generated, and the gross commission was above $10,000, the Broker of Record must explicitly approve the void in DealDesk before the transaction is closed.
9. **MLS listing status changes must sync within 15 minutes**: DealDesk pulls MLS status updates every 15 minutes via scheduled SQS job. If an MLS sync job fails three consecutive times for the same listing, a compliance alert is raised to the TC assigned to that transaction.
10. **Agent license expiry blocks active status**: If a TREC or FREC license renewal date passes without a confirmed renewal in DealDesk, the agent's status is automatically changed to "License Expired" and they are removed from the active agent directory. They cannot be re-activated until the license renewal is confirmed and uploaded.

---

## Integration Landscape

| System | Purpose | Protocol / Method |
|---|---|---|
| **NTREIS MLS** | Listing data, status updates, sold data for DFW and North Texas | RESO Web API (OAuth 2.0); IDX feed for public search |
| **HAR MLS** | Listing data and status updates for Greater Houston | IDX data feed (nightly + delta); RESO API (partial coverage) |
| **Stellar MLS** | Listing data and status updates for Florida markets | RESO Web API (OAuth 2.0) |
| **DocuSign** | E-signatures on CDAs, listing agreements, disclosure forms | DocuSign eSignature REST API + webhook callbacks |
| **Stripe** | Commission disbursements to agents via ACH / instant payout | Stripe Connect + Payouts API |
| **QuickBooks Online** | Accounting sync: commission income, referral fee expenses, agent deductions | QBO REST API (OAuth 2.0); transactional sync per closed deal |
| **Calendly** | Showing appointment scheduling for buyer's agents | Calendly v2 API; embed widget in agent portal |
| **Follow Up Boss** | Legacy CRM (leads, client records) — read-only sync during Phase 1; deprecated in Phase 2 | Follow Up Boss REST API |
| **Skyslope** | Legacy document vault — migration source only; no new writes after DealDesk launch | Skyslope REST API (read-only data migration) |
| **AWS Cognito** | Identity and access management for agents, TCs, admins | Cognito User Pools + Identity Pools |
