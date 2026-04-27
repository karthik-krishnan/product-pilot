# ProductPilot Demo Script — Pinnacle Properties Group DealDesk

**Time**: ~8 minutes end-to-end
**Audience**: Product managers, engineering leads, real estate technology prospects, brokerage operations leaders
**Mode**: Demo provider (no API key required)
**Differentiator vs other demos**: Commission cap complexity, state licensing enforcement (TREC + FREC), multi-MLS integration, CDA-to-disbursement event flow, dual agency compliance workflow — none of these appear in QSR or healthcare demos

---

## Before You Start

Have this folder open in a file browser for drag-and-drop uploads.

| File | Used as | Upload to |
|---|---|---|
| `domain-context.md` | Business domain knowledge: commission structures, agent lifecycle, MLS systems, business rules | Domain Context — text or file upload |
| `technical-context.md` | Microservices architecture, COTS integrations, EventBridge event flow | Tech Context — text or file upload |
| `agent-and-transaction-journey.md` | Agent onboarding, TC transaction, branch manager operations journey maps | Domain Context — file upload |
| `compliance-and-licensing.md` | TREC, FREC, RESPA/TRID, Fair Housing, E&O, CDA requirements, dual agency | Domain Context — file upload |
| `requirements-prompt.md` | Requirements text to paste | Requirements Intake screen |

---

## Step 1 — Configure Domain Context (~1 min)

1. Open Settings → confirm provider is **Demo**
2. Set Assistance Level to **Balanced**
3. Paste `domain-context.md` contents into the Domain Context text area
4. Drag `agent-and-transaction-journey.md` and `compliance-and-licensing.md` into the file upload zone

   > _"This is Pinnacle Properties Group — a large independent residential brokerage with 3,200 agents across Texas and Florida, 18,500 transactions a year, about $6.2 billion in sales volume. They're building an internal platform called DealDesk to replace four disconnected tools: dotloop for documents, Follow Up Boss for CRM, QuickBooks for accounting, and a Google Sheets transaction tracker. The domain context gives the platform everything it needs to know about how real estate brokerage operations actually work — commission splits, cap plans, MLS systems, CDA workflows. That's what makes the stories specific rather than generic."_

---

## Step 2 — Configure Tech Context (~45 sec)

1. Click Tech Context
2. Paste `technical-context.md` (or upload the file)

   > _"The stack is a React 18 agent portal and admin console, a React Native mobile app for agents in the field, and a Node.js / Aurora PostgreSQL backend. There are eight distinct services: Agent Service, Transaction Service, Commission Engine, Document Vault, MLS Sync, Disbursement Service, Notification Service, Reporting Service. The key integration constraint is that the Disbursement Service can only fire a Stripe payout after receiving a confirmed DocuSign webhook event on the CDA — that's a hard architectural rule, not an advisory one. The tech context makes sure that constraint shows up in acceptance criteria."_

---

## Step 3 — Requirements Intake (~1 min)

1. Paste the requirements text from `requirements-prompt.md`
2. Click **Analyse / Start**

   > _"Six capability areas: agent lifecycle management, transaction management, commission engine, MLS and listing integration, compliance document vault, and brokerage analytics. This is a realistic product brief for a mid-to-large independent brokerage that's outgrown spreadsheets. Phase 1 is Texas-only — NTREIS and HAR MLS — for 8 months. Phase 2 brings in the Florida market on Stellar MLS and the more advanced analytics."_

---

## Step 4 — Clarifying Questions (~1.5 min)

Walk through 2–3 questions. Suggested answers:

- **Primary users**: _"Licensed agents — buyer's agents and listing specialists — plus Transaction Coordinators who manage the document and milestone workflow, Branch Managers who run regional offices, the Broker of Record who countersigns CDAs, and the Finance team who handles disbursements."_
- **Commission plan complexity**: _"Four plan types in production simultaneously. Standard split at 80/20. Cap model — agent pays the brokerage 20% until they hit a $22,000 annual cap, then they keep 100% for the rest of their anniversary year. Graduated split by production volume. And team model where the team lead takes an override on every sub-agent deal. The cap resets on the agent's individual anniversary date, not January 1 — that's a common trip wire in simple implementations."_
- **Key integrations**: _"NTREIS, HAR, and Stellar MLS for listing status sync via RESO Web API. DocuSign for CDAs and disclosure forms. Stripe Connect for commission payouts. QuickBooks Online for accounting. Calendly for showing schedules embedded in the agent portal."_
- **Compliance requirements**: _"TREC for Texas license renewal and CE tracking. FREC for Florida. RESPA and TRID — specifically the 3-business-day Closing Disclosure waiting period that has to be enforced per transaction. Fair Housing training tracking. And E&O insurance expiry monitoring with hard blocks on new transactions when coverage lapses."_

**Slider demo** (optional):
- Set to **Streamlined** → "A brokerage ops team that already knows their requirements can skip the Q&A entirely."
- Reset to **Balanced** → proceed

---

## Step 5 — Epics (~1.5 min)

AI generates 5–8 epics. Expected: Agent Lifecycle Management, Transaction Management, Commission Engine, MLS & Listing Integration, Compliance Document Vault, Brokerage Analytics, Disbursement & Accounting, Notifications & Alerts.

   > _"Notice the Commission Engine is its own epic — not buried inside Transaction Management. That's because the cap model, anniversary date resets, team overrides, and CDA generation are complex enough to warrant independent story breakdowns. And the MLS & Listing Integration epic is separate from Transaction Management because it crosses three different MLS systems with different APIs — NTREIS, HAR, and Stellar — each with their own status code vocabulary."_

Point out:
- Phase 1 / Phase 2 labels — Texas-only Phase 1; Florida market in Phase 2
- Tags referencing NTREIS, HAR, Stellar MLS, DocuSign, Stripe — the COTS products by name
- Compliance Document Vault epic referencing TREC and FREC form library

Click **Generate Stories** on **Commission Engine**.

---

## Step 6 — Story Breakdown (~2 min)

Walk through 2–3 stories:

1. **Calculate commission for a cap-model agent** — point out the anniversary-date reset logic in the acceptance criteria, the idempotency requirement from the domain context ("same inputs, same output, always"), the audit log entry on every recalculation referencing the Commission Engine service
2. **Generate and route a CDA for countersignature** — point out the $25,000 threshold rule appearing in AC (branch manager approval required above threshold), DocuSign routing order, and the architectural constraint that payout cannot begin until `cda.countersigned` event is received from EventBridge
3. Click **Generate Stories** on **Compliance Document Vault** to show the state-specific complexity: TREC Seller's Disclosure requirement for Texas, Radon Gas Disclosure required for Florida, Lead-Based Paint Disclosure for pre-1978 homes, TRID 3-day waiting period enforcement

   > _"This is where having the compliance document in the context pays off. The story for 'Enforce TRID three-day waiting period' knows about the Closing Disclosure delivery date, the 3-business-day calculation, and references both the Document Vault Service and the Transaction Service milestone validation. It cites the RESPA requirement by name. Without the compliance context those would be completely blank."_

**Show story editing:**
- Click **Split Story** on the MLS Sync story (which covers all three MLS systems) → AI sub-divides by MLS system (NTREIS, HAR, Stellar) — each with its own API client and status code mapping
- Show **INVEST validation** on a large commission calculation story → fix suggestion separates cap accumulator logic from CDA generation

---

## Step 7 — INVEST Validation (~45 sec)

Click the **Validate** tab on the story "As an agent, I want to see my commission disbursement status so I know when my payout will arrive."

   > _"The validator identifies that this story spans two services — the Disbursement Service monitoring the Stripe payout status and the Notification Service sending the agent alert — and crosses the DocuSign webhook dependency. It recommends splitting by the event boundary: one story for the DocuSign CDA countersignature event triggering the Stripe payout, and a separate story for the agent-facing disbursement status display. That's exactly the kind of cross-service coupling that creates sprint pain when it surfaces in the middle of an integration sprint."_

- Click **Fix with AI** → revised stories each have a single service owner; AC references the `cda.countersigned` EventBridge event specifically

---

## Step 8 — Export (~30 sec)

Export as **CSV** or **JIRA JSON**.

   > _"Backlog ready for sprint planning. If you're running a large independent brokerage with agents across multiple markets and a mix of cap structures and team models, you're typically managing this across four to six separate tools — dotloop, a CRM, a spreadsheet cap tracker, QuickBooks, and email chains for CDA signatures. The stories coming out of this session already know the service boundaries, the integration constraints, the state licensing rules, and the financial calculation requirements. A BA and a tech lead could have spent two sprints getting here — and they still wouldn't have caught the anniversary-date cap reset edge case in the Commission Engine stories."_

---

## Key Talking Points

| Point | Evidence in demo |
|---|---|
| Commission cap complexity | Anniversary-date reset, four plan types, team override logic — all appear correctly in Commission Engine story AC |
| CDA-to-disbursement flow | `cda.countersigned` EventBridge event gates Stripe payout; hard architectural constraint appears in Disbursement Service stories |
| State licensing enforcement | TREC 18-hour CE, FREC 14-hour CE, E&O nightly expiry check with automatic status block — each in Agent Lifecycle stories |
| Multi-MLS integration | NTREIS, HAR, Stellar as separate integration stories; each with correct API type (RESO Web API vs IDX feed) and status code mapping |
| Dual agency compliance | Written consent hard-block before milestone advance; Branch Manager approval step; state-specific workflows (Texas intermediary vs Florida transaction broker) |
| TRID waiting period | 3-business-day Closing Disclosure rule enforced at the milestone level in Compliance Document Vault stories |
| Form library versioning | TREC and FREC state-mandated forms versioned in DealDesk; new form versions applied only to transactions after effective date |
| Role-based data isolation | Agent cannot see other agents' commission details; branch manager scoped to own office; Broker of Record has cross-office read — all in story AC |
