# Pinnacle Properties Group — Compliance & Licensing Reference

**Document type**: Compliance / Regulatory Reference
**Version**: 1.0
**Owner**: Pinnacle Properties Group — Legal, Compliance & Operations

---

## 1. Texas Licensing — TREC (Texas Real Estate Commission)

### 1.1 License Types and Structure

| License Type | Who Holds It | Key Requirement |
|---|---|---|
| **Sales Agent** | All Pinnacle front-line agents in Texas | Must be sponsored by a licensed Texas Broker; cannot operate independently |
| **Broker** | Pinnacle's Texas Broker of Record; any agent who obtains broker-level licensure | Can operate independently or sponsor sales agents |

All Pinnacle Texas agents hold Sales Agent licenses. Their licenses are sponsored by the Texas Broker of Record, who is legally responsible for all agent conduct under that sponsorship.

### 1.2 Renewal Cadence and CE Requirements

- **Renewal period**: every **2 years** from the original license issuance date (not a shared calendar date; each agent has their own expiry)
- **Continuing Education (CE) hours required per renewal cycle**: **18 credit hours**
  - Legal Update I (4 hours) — mandatory TREC course; covers changes in real estate law
  - Legal Update II (4 hours) — mandatory TREC course; covers TREC rules changes
  - Elective CE (10 hours) — any TREC-approved elective courses
- **First renewal** (sales agents licensed for the first time): must complete 90 hours of Qualifying Education (SAE — Sales Agent Apprentice Education) in addition to the standard 18 CE hours. This is a one-time requirement.
- **Late renewal**: available within 6 months of expiry with a late fee. After 6 months of expiry, the license cannot be renewed — the individual must re-take the licensing exam.
- **Inactive status**: an agent may request inactive status with TREC. An inactive license is still valid but the agent cannot conduct any real estate brokerage activities. Pinnacle agents on inactive status are removed from active agent rosters and cannot create or participate in transactions.

### 1.3 Broker of Record Responsibilities (Texas)

The Texas Broker of Record at Pinnacle is accountable to TREC for:
- Supervising all sponsored Sales Agents
- Maintaining a written policy for agent supervision and compliance
- Retaining all transaction records for a minimum of **4 years** (TREC requirement; DealDesk retains for 7 years to meet RESPA and internal policy)
- Countersigning CDAs and being the final approver on all commission disbursements
- Handling complaints filed against Pinnacle-sponsored agents
- Renewing the firm's Broker license every 2 years (separate from individual agent renewals)

### 1.4 DealDesk Enforcement Actions for TREC Compliance

| Trigger | DealDesk Action |
|---|---|
| Agent license within 30 days of expiry | Escalating notifications to agent and branch manager at 30, 14, 7 days |
| Agent license expired | Agent status changed to "License Expired"; removed from active agent directory; cannot create or join new transactions |
| Agent CE hours not confirmed 60 days before expiry | Advisory alert to agent and branch manager (DealDesk tracks CE completion uploads; cannot verify directly with TREC) |
| Agent moves to inactive status | Agent status set to Inactive in DealDesk; all active transactions flagged for TC review |

---

## 2. Florida Licensing — FREC (Florida Real Estate Commission)

### 2.1 License Types and Structure

| License Type | Who Holds It | Key Requirement |
|---|---|---|
| **Sales Associate** | All Pinnacle front-line agents in Florida | Must work under a licensed Florida Broker |
| **Broker** | Pinnacle's Florida Broker of Record | Responsible for all Sales Associates at the registered brokerage |
| **Broker Associate** | A broker-licensed individual working under another broker | Less common; same transaction rights as Sales Associate |

### 2.2 Renewal Cadence and CE Requirements

- **Renewal period**: every **2 years**; Florida uses a shared renewal cycle (Sales Associates licensed in even years renew on March 31 of even years; odd years renew March 31 odd years)
- **Continuing Education**: **14 credit hours** per renewal cycle
  - Core Law (3 hours) — mandatory; Florida real estate law updates
  - Ethics (3 hours) — mandatory; business ethics for real estate professionals
  - Elective CE (8 hours) — any FREC-approved elective
- **First renewal**: Sales Associates must complete **45 hours of post-licensing education** before their first renewal. This is a one-time requirement and is separate from the 14 CE hours. Failure to complete post-licensing education results in license null and void (not merely inactive).
- **Involuntary inactive**: if a Sales Associate's license expires without renewal, the license becomes involuntarily inactive. The individual has a 6-month window to reactivate with a late fee before the license becomes null and void.
- **Voluntary inactive**: agent may place their license on voluntary inactive status. Inactive agents cannot conduct real estate activities.

### 2.3 Key Differences: TREC vs FREC

| Dimension | TREC (Texas) | FREC (Florida) |
|---|---|---|
| CE hours per cycle | 18 hours | 14 hours |
| Mandatory CE courses | Legal Update I & II | Core Law + Ethics |
| Renewal cycle | Rolling (individual expiry date) | Shared (March 31 biennial) |
| First renewal requirement | 90-hour SAE | 45-hour post-licensing |
| Record retention requirement | 4 years (TREC); 7 years (RESPA) | 5 years (FREC); 7 years (RESPA) |
| Discipline body | TREC | FREC (part of DBPR) |

### 2.4 Broker of Record Responsibilities (Florida)

- Must be registered as the "Broker" for the Pinnacle Florida entity with FREC
- Responsible for retaining all transaction records for **5 years** (FREC requirement; DealDesk uses the 7-year RESPA standard)
- Must maintain an office escrow account in compliance with FREC escrow rules
- Must provide adequate supervision and training for all Sales Associates

---

## 3. RESPA — Real Estate Settlement Procedures Act

### 3.1 Applicability

RESPA applies to all **federally related mortgage transactions** — which covers the vast majority of Pinnacle's buyer representation and listing representation transactions, since most residential purchases involve a mortgage from a federally regulated or insured lender.

### 3.2 TRID (TILA-RESPA Integrated Disclosure) Compliance

TRID governs the Loan Estimate (LE) and Closing Disclosure (CD) forms for purchase and refinance transactions:

| Form | Timing Requirement | DealDesk Enforcement |
|---|---|---|
| **Loan Estimate** | Delivered to buyer within **3 business days** of loan application | DealDesk checklist tracks LE delivery date; alert raised if not uploaded within 3 business days of "Contract Accepted" milestone |
| **Closing Disclosure** | Delivered to buyer at least **3 business days** before consummation (closing) | DealDesk records CD delivery date (timestamp of DocuSign send or manual upload); automatically calculates the earliest allowable closing date; compliance alert raised if close date is earlier than allowed |
| **Three-day waiting period** | 3 business days between CD delivery and closing; cannot be waived except for specific bona fide personal financial emergency | DealDesk milestone validation prevents "Clear to Close" from being marked if CD delivery date + 3 business days > scheduled close date |

### 3.3 Kickback and Fee Splitting Prohibitions

RESPA Section 8 prohibits the payment of anything of value in exchange for the referral of settlement service business. This applies to title, escrow, mortgage, appraisal, and inspection referrals.

- **DealDesk impact**: Any affiliated business arrangement (AfBA) where Pinnacle refers clients to an affiliated title company, mortgage company, or other settlement service provider must be disclosed using the AfBA disclosure form at the time of referral.
- DealDesk maintains an AfBA disclosure in its TREC/FREC form library; the TC checklist automatically adds the AfBA disclosure when a transaction involves an affiliated provider (configurable per office).

### 3.4 Document Retention

RESPA requires retention of all settlement-related documents for **5 years** from settlement. DealDesk applies the more conservative 7-year standard to all transaction documents, enforced by the S3 lifecycle policy.

---

## 4. Fair Housing Act

### 4.1 Protected Classes

The federal Fair Housing Act prohibits discrimination based on:
- Race, Colour, National Origin, Religion, Sex, Familial Status, Disability

Texas and Florida have additional state-level protected classes. Pinnacle applies the broadest set across all markets.

### 4.2 Agent Training Requirements

- All Pinnacle agents must complete a **Fair Housing training module** annually
- Training completion is tracked in DealDesk against each agent's profile (completion date, course provider, certificate upload)
- Agents more than 12 months past their last Fair Housing training receive a compliance alert in DealDesk; branch manager receives a weekly roll-up of overdue agents
- New agents must complete Fair Housing training as part of the onboarding checklist before achieving Active status

### 4.3 Advertising and Listing Review

- Listing descriptions submitted to MLS from DealDesk must not contain language that indicates a preference or limitation based on any protected class
- DealDesk does not perform automated language scanning in Phase 1; the compliance policy requires the listing agent to certify that the description has been reviewed before MLS submission
- Phase 2 consideration: integration of a language review API to flag potentially discriminatory phrasing before MLS submission

### 4.4 Violation Reporting

- Complaints filed against a Pinnacle agent for a Fair Housing violation are tracked in DealDesk as a compliance case
- Compliance cases are visible to the Broker of Record and branch manager only (not to other agents)
- Broker of Record must respond to the regulatory body within the required timeframe; DealDesk tracks response deadlines

---

## 5. E&O Insurance

### 5.1 Requirements and Coverage

- **Requirement**: E&O insurance is required for all active Pinnacle agents. Pinnacle maintains a group E&O policy; individual agents are enrolled under the group policy.
- **Coverage**: $1,000,000 per claim; $3,000,000 aggregate (group policy)
- **New construction exclusion**: standard E&O policy excludes new construction transactions. Agents handling new construction must have a separate new construction rider on file.
- **Individual agent certificates**: each agent's enrollment or individual certificate is stored in the Document Vault under their agent profile. Policy number, effective date, and expiry date are indexed.

### 5.2 Expiry Tracking and Enforcement

| Days Until Expiry | DealDesk Action |
|---|---|
| 30 days | Email and in-app notification to agent; email to branch manager |
| 14 days | Escalated email to agent; branch manager receives daily digest item |
| 7 days | Email to agent, branch manager, and broker admin |
| 0 (expiry date) | Agent status automatically changed to "E&O Expired"; agent blocked from creating new transactions or joining a transaction as an active participant |
| Past expiry (existing transactions) | Existing in-progress transactions are flagged with a compliance warning; TC and branch manager notified; transactions not blocked but require branch manager acknowledgement to proceed |

### 5.3 Renewal Workflow

When an agent renews their E&O enrollment or receives a new certificate:
1. Agent uploads the new certificate in DealDesk (or Recruiting Admin uploads on their behalf)
2. Document Vault Service extracts or records the new expiry date
3. Agent Service updates the E&O expiry date on the agent profile
4. If the agent was in "E&O Expired" status, status reverts to "Active" upon confirmation of valid certificate
5. Audit log entry records who uploaded the certificate and when

---

## 6. Commission Disbursement Authorization (CDA) Requirements

### 6.1 What Must Appear on a CDA

A legally valid CDA for Pinnacle must include:

| Field | Description |
|---|---|
| Property address | Full street address, city, state, zip of the transaction property |
| Closing date | Actual or scheduled closing date |
| Gross sales price | Contract purchase price |
| Gross commission | Total commission on the transaction (amount and percentage) |
| Listing brokerage | Name and license number |
| Cooperating brokerage | Name and license number (if applicable) |
| Each payee and their share | Agent name, license number, and dollar amount to be disbursed |
| Referral fee | Payee brokerage name, amount, and basis (if referral-in transaction) |
| Transaction fees / deductions | Any desk fees, transaction coordination fees, or other deductions from agent gross |
| Broker of Record signature block | Signature, license number, date |
| Pinnacle Properties Group entity name | Must match the entity name on the broker license |

### 6.2 Countersignature Requirements

- All CDAs must be countersigned by the Broker of Record or a broker designee with written delegation authority
- For CDAs with gross commission ≥ $25,000: Branch Manager signature required as first step; Broker of Record countersigns second
- For CDAs with gross commission < $25,000: Broker of Record countersigns directly (Branch Manager approval step skipped)
- DocuSign routing is pre-configured to enforce this signing order; the Disbursement Service will not process a payout until all required signatures are confirmed via DocuSign webhook

### 6.3 Record Retention

- All signed CDAs must be retained for **7 years** from the closing date (more conservative than the 4-year TREC requirement and 5-year FREC requirement)
- CDAs are stored in S3 under the Document Vault Service with a lifecycle policy that prevents deletion before the 7-year mark
- CDAs are indexed in DynamoDB by transaction ID, agent ID, and closing date for rapid retrieval during audits

---

## 7. Audit Trail Requirements

### 7.1 Scope

Every change to the following records must produce an immutable audit log entry:

- **Transaction record**: creation, milestone change, TC assignment, void/cancellation, status change
- **Commission calculation**: every recalculation, plan change applied, cap reset, CDA generation
- **Agent record**: status change, plan assignment, E&O expiry update, license number change, offboarding
- **Document record**: upload, version replacement, rejection, approval, DocuSign envelope sent/completed
- **CDA record**: generation, routing, signature events, disbursement initiated, disbursement completed

### 7.2 Audit Log Entry Format

Each audit log entry must contain:

| Field | Description |
|---|---|
| `event_id` | Unique identifier (UUID v4) |
| `event_type` | Structured code (e.g., `transaction.milestone.updated`, `commission.cda.generated`) |
| `actor_id` | User ID of the person or service account that triggered the change |
| `actor_role` | Role at time of event (`agent`, `tc`, `branch_manager`, `broker_admin`, `finance`, `system`) |
| `entity_type` | The type of record changed (`transaction`, `agent`, `commission`, `document`, `cda`) |
| `entity_id` | ID of the specific record changed |
| `previous_value` | JSON snapshot of the relevant fields before the change |
| `new_value` | JSON snapshot of the relevant fields after the change |
| `timestamp` | UTC timestamp (ISO 8601) |
| `source_ip` | IP address of the request (for human-initiated events) |
| `request_id` | API Gateway request ID for correlation |

### 7.3 Retention and Immutability

- Audit logs are stored in a dedicated append-only DynamoDB table with no delete permissions granted to any application role
- Logs are also streamed to S3 (Glacier after 1 year) for long-term retention
- **Retention period**: 7 years from the event date, matching the document retention standard
- Audit log access is restricted to Broker of Record, Finance (read-only), and the engineering on-call team for incident investigation; no agent-level access to audit logs beyond their own activity

---

## 8. Dual Agency Rules by State

### 8.1 Texas Dual Agency

- **Permitted**: Yes. Texas law permits dual agency (referred to in TREC rules as "intermediary" representation)
- **Designation**: The broker must be designated as the intermediary; if the broker assigns different sponsored agents to each party, those are "appointed agents" under the intermediary
- **Written consent required**: The broker must obtain written consent from both the buyer and seller before the intermediary relationship begins — the consent must appear in the listing agreement (seller) and buyer representation agreement (buyer)
- **Conduct restrictions**: the intermediary (or appointed agents) may not disclose a buyer's maximum price they are willing to pay; may not disclose seller's minimum acceptable price; must treat both parties fairly
- **DealDesk workflow**: when Dual Agency is selected as transaction type, DealDesk automatically adds the Intermediary Consent disclosure to the checklist for both buyer and seller. The Branch Manager must approve the intermediary designation. Neither party can advance past "Contract Accepted" until both consent forms are DocuSigned.

### 8.2 Florida Dual Agency

- **Permitted**: Yes. Florida law permits transaction brokerage (which is the default relationship) and single agent representation; full dual agency (as a single agent for both parties) is permitted only with written consent
- **Transaction broker vs single agent**: most Florida Pinnacle transactions use transaction broker status (limited representation of both parties), which does not require written consent but does require disclosure of the no-fiduciary relationship
- **Single agent dual representation**: if a Pinnacle agent is a single agent for both buyer and seller, written consent (Consent to Transition to Transaction Broker or Dual Agency Consent) must be obtained from both parties
- **Required disclosures**: Florida requires the "No Brokerage Relationship" or "Transaction Broker" disclosure at the first point of contact or before the agent shows any property
- **DealDesk workflow**: for Florida transactions, the Transaction Broker Disclosure is automatically added to the onboarding checklist for both buyer and seller. If single-agent dual representation is elected, the same sequential DocuSign consent workflow as Texas is applied.

### 8.3 Comparison Table

| Dimension | Texas (TREC) | Florida (FREC) |
|---|---|---|
| Term used | Intermediary | Transaction Broker / Dual Agent |
| Default relationship | Single agent unless broker designation made | Transaction Broker (limited representation) |
| Written consent required | Yes, in listing agreement and BRA | Yes, if electing single agent dual representation; disclosure only for transaction broker |
| DealDesk enforcement | Hard-block: consent forms required before Contract Accepted milestone | Hard-block for single agent dual; soft disclosure required for transaction broker |
| Conduct restrictions | Confidentiality of price limits for both parties | Cannot advocate for one party over the other |
