# Requirements Prompt — Pinnacle Properties Group DealDesk

## How to use this file

Copy the text inside the box below and paste it into the **Requirements Intake** screen of the tool.
Upload `agent-and-transaction-journey.md` and `compliance-and-licensing.md` to the **Domain Context** file upload area.
Paste or upload `domain-context.md` as domain text and `technical-context.md` as tech context.

---

## Requirements Text (paste this)

```
Build DealDesk, a unified agent operations platform for Pinnacle Properties Group — a large independent
residential brokerage with 3,200 active agents across Texas and Florida.

The platform must cover the following capabilities:

1. AGENT LIFECYCLE MANAGEMENT
   - Recruiting pipeline: track prospects from first contact through application, pre-license, license
     pending, and into onboarding. Assign recruiter ownership; track source (referral, event, web).
   - Onboarding workflow: multi-step checklist per new agent (E&O insurance enrollment, MLS association
     setup, DocuSign identity verification, commission plan selection, direct deposit via Stripe Connect,
     state license upload and verification). Each step can be completed by the agent or marked complete
     by a Recruiting Admin. Onboarding is blocked until all required steps are checked off.
   - License and E&O tracking: store TREC or FREC license number, issue date, expiry date, and renewal
     status per agent. Store E&O insurance certificate, policy number, and expiry date. Automated nightly
     check triggers escalating alerts at 30-day, 14-day, 7-day, and day-of expiry. E&O expiry
     automatically blocks the agent from creating new transactions. License expiry automatically moves
     agent to "License Expired" status.
   - Commission plan management: assign each agent one of four plan types (Standard Split, Cap Model,
     Graduated Split, Team Model). Plan parameters (split percentages, cap amount, tier thresholds) are
     configurable by Finance. Plan changes take effect at the agent's next anniversary date.
   - Offboarding workflow: voluntary or involuntary. Voluntary: agent submits transfer request; pending
     commissions held in escrow until all open CDAs are signed; MLS association transfer workflow.
     Involuntary: immediate transaction hold; Broker of Record approval required; commissions escrowed.

2. TRANSACTION MANAGEMENT
   - Create a deal: agent or TC creates a transaction record specifying transaction type (buyer
     representation, listing/seller representation, dual agency, referral-in, referral-out, new
     construction), property address, MLS listing ID (if applicable), client names, estimated close date,
     and gross commission.
   - Milestone timeline: each transaction progresses through a configurable milestone chain. Default
     milestones: Lead/Prospect → Contract Accepted → Under Contract → Inspection Period → Appraisal →
     Clear to Close → Closed. Each milestone has a target date, actual date, required document checklist,
     and responsible party (agent or TC).
   - Document checklist enforcement: the system must prevent advancement to the next milestone until all
     required documents for the current milestone are uploaded, approved, and — where required —
     countersigned via DocuSign. Enforcement is hard-block, not advisory.
   - TC assignment: a Transaction Coordinator can be assigned to any transaction by a Branch Manager or
     auto-assigned based on office routing rules. Once assigned, the TC owns the document and milestone
     workflow; the agent retains visibility but cannot override TC document decisions.
   - Dual agency workflow: if transaction type is Dual Agency, the system must present a dual agency
     consent form to both buyer and seller via DocuSign before the transaction can advance past Contract
     Accepted. Branch Manager must approve the dual agency designation.
   - MLS listing linkage: transactions for listing or buyer representation must be linked to the
     corresponding MLS listing ID. MLS status changes (e.g., Active → Pending) automatically update the
     corresponding DealDesk milestone.

3. COMMISSION ENGINE
   - Configurable split structures: the engine must support Standard Split (fixed %), Cap Model (split
     until annual cap reached, then 100% to agent), Graduated Split (tiered % by production volume),
     and Team Model (team lead override % applied before agent split). All plan parameters configurable
     by Finance without a code deployment.
   - Cap tracking: for cap-model agents, maintain a running year-to-date accumulator of brokerage-side
     commission paid. Cap resets on the agent's anniversary date. Display cap progress as a percentage
     and remaining dollar amount on the agent's dashboard.
   - GCI calculations: on every transaction, calculate Gross Commission Income, agent net (after split
     and any desk fees or transaction fees), brokerage net, and referral fee payable (if referral-in
     transaction). All calculations must be idempotent; the same inputs always produce the same output.
     Every recalculation is logged with a version hash.
   - CDA generation: once a transaction reaches the Closed milestone and all checklist documents are
     accepted, the Commission Engine generates a Commission Disbursement Authorization (CDA) PDF
     containing: property address, closing date, gross sales price, gross commission, split breakdown
     by recipient, referral fee (if applicable), any deductions, and agent net payout amount. The CDA
     is sent via DocuSign for broker countersignature.
   - Disbursement scheduling: after the CDA is countersigned via DocuSign (confirmed by webhook), the
     Disbursement Service initiates a Stripe Connect payout to the agent's connected bank account.
     Standard ACH (2 business days) is default; instant payout (1.5% fee, same-day) is available per
     agent preference. Disbursement record syncs to QuickBooks Online as a journal entry.

4. MLS AND LISTING INTEGRATION
   - MLS sync: poll NTREIS (DFW/North Texas), HAR (Houston), and Stellar MLS (Florida) every 15 minutes
     for listing status changes. Status changes trigger EventBridge events consumed by Transaction
     Service to update milestone timelines.
   - Listing status mapping: map MLS status codes to DealDesk milestones. Example: NTREIS "Active Under
     Contract" → DealDesk "Contract Accepted"; "Pending" → "Under Contract"; "Closed" → "Closed."
   - MLS sync failure handling: if three consecutive sync jobs fail for a listing, alert the assigned TC
     and branch manager. Manual re-sync available from the admin console.
   - Listing creation from DealDesk (Phase 2): agents on listing representation transactions can initiate
     a new MLS listing record from within DealDesk, pre-populated with property data and pushed to the
     appropriate MLS via RESO API write-back. Phase 1 is read-only from MLS.

5. COMPLIANCE DOCUMENT VAULT
   - Per-transaction required document checklists: the system maintains a configurable library of required
     documents per transaction type and milestone. Examples: Buyer Representation Agreement (milestone:
     Contract Accepted), Seller's Disclosure Notice (milestone: Contract Accepted, Texas only), Lead-Based
     Paint Disclosure (milestone: Contract Accepted, homes built before 1978), Radon Gas Disclosure
     (milestone: Contract Accepted, Florida only), Executed Contract (milestone: Under Contract),
     Inspection Report (milestone: Inspection Period), Appraisal Report (milestone: Appraisal),
     Closing Disclosure / HUD-1 (milestone: Clear to Close), Final CDA (milestone: Closed).
   - DocuSign integration: documents requiring e-signature are sent from DealDesk via DocuSign. Signer
     routing is configurable (agent → client → broker, or client → agent). Completed envelopes are
     automatically retrieved and stored in the Document Vault.
   - State-mandated form library: DealDesk maintains a versioned library of TREC standard forms and FREC
     standard forms. When a new version of a form is published by the regulatory body, the library is
     updated and all transactions created after the effective date use the new version.
   - Broker review and approval: certain documents (CDAs, dual agency disclosures, listing agreements)
     require broker review within DealDesk before being sent to clients. The broker review queue is
     accessible from the admin console.
   - RESPA/TRID compliance: for purchase transactions with a mortgage, DealDesk must track the Loan
     Estimate delivery date and Closing Disclosure delivery date, and enforce the 3-business-day waiting
     period before closing. A compliance alert is raised if the closing date falls within the waiting period.
   - Document retention: all documents stored in S3; 7-year retention enforced by S3 lifecycle policy
     (Standard for 3 years, Glacier for years 3–7).

6. BROKERAGE ANALYTICS
   - Agent production dashboards: each agent sees their own year-to-date GCI, unit count, active
     transactions, cap progress (if on cap plan), and estimated commission on pending transactions.
   - GCI and unit leaderboards: branch-level and company-wide leaderboards by GCI, unit count, and
     sales volume. Configurable time periods (MTD, QTD, YTD, trailing 12 months). Visible to branch
     managers and above.
   - Cap progress per agent: Finance and branch managers see a cap progress report showing all cap-model
     agents, their YTD brokerage-side commission paid, remaining cap amount, and projected cap date
     based on trailing 90-day production velocity.
   - Office P&L: branch manager and finance view showing gross commission income by office, less
     referral fees paid out, less agent payouts, equals brokerage net revenue. Exportable as CSV.
   - Recruiting pipeline funnel: recruiting admin and branch manager see a funnel view of prospects at
     each pipeline stage, conversion rates, days-in-stage, and source attribution.

The platform must integrate with:
- NTREIS, HAR, and Stellar MLS (RESO Web API and IDX feeds)
- DocuSign (e-signatures on CDAs, listing agreements, disclosure forms)
- Stripe Connect (commission disbursements to agent bank accounts)
- QuickBooks Online (accounting sync per closed transaction)
- Calendly (showing appointment scheduling, Phase 1 agent portal embed)
- Follow Up Boss (read-only legacy CRM sync, Phase 1 only; deprecated in Phase 2)

Phase 1 (8 months): Agent lifecycle management, Transaction management, Commission Engine (Texas markets
only — NTREIS and HAR MLS), Compliance Document Vault core features, Stripe disbursement.
Phase 2: MLS write-back (listing creation from DealDesk), Florida market onboarding (Stellar MLS),
Compliance Vault advanced features (TRID timeline enforcement, form library versioning),
Analytics v2 (office P&L, recruiting funnel, cap projection engine), Follow Up Boss deprecation.
```

---

## Suggested Answers to Clarifying Questions

| Question theme | Suggested answer |
|---|---|
| Primary users | Licensed agents (buyer's agents and listing specialists), Transaction Coordinators, Branch Managers, Broker of Record, Finance/Accounting, Recruiting Admins |
| Compliance requirements | RESPA/TRID (document delivery timestamps, 3-day waiting period), TREC (Texas license renewal, CE tracking), FREC (Florida license renewal), Fair Housing Act training, E&O insurance expiry enforcement |
| Key integrations | NTREIS + HAR + Stellar MLS (RESO Web API), DocuSign (CDAs + disclosure forms), Stripe Connect (commission disbursements), QuickBooks Online (accounting), Calendly (showing schedules) |
| Commission plan complexity | Four plan types in production: Standard Split (80/20), Cap Model (80/20 to $22K cap, then 100%), Graduated Split (tiered by volume), Team Model (team lead override). Cap resets on anniversary date, not calendar year. |
| MLS integration scope | Phase 1: read-only (status changes trigger milestone updates). Phase 2: RESO write-back for listing creation. Three MLS systems across two states. |
| Document workflow | DocuSign for all e-signatures. State-mandated form library (TREC/FREC) versioned in DealDesk. Hard-block enforcement — milestone cannot advance with missing documents. |
| Release phasing | Phase 1 MVP: agent lifecycle, transaction management, Commission Engine (Texas), Stripe disbursement — 8 months. Phase 2: Florida markets, MLS write-back, Analytics v2 — months 9–16. |
| Dual agency handling | Written consent from both parties required before transaction advances past Contract Accepted. Branch Manager approval of dual agency designation required. Separate document checklist. |
| Analytics needs | Agent dashboard (cap progress, GCI YTD), branch leaderboards, office P&L (Phase 2), recruiting funnel (Phase 2). No PII in analytics exports beyond agent name and license number. |
