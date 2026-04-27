# Pinnacle Properties Group — Agent & Transaction Journey Map

**Document type**: UX Research / Business Analysis
**Version**: 1.0
**Owner**: Pinnacle Properties Group — DealDesk Product Team

---

## Overview

This document maps three primary journeys across the DealDesk platform, covering the perspectives of a new agent joining Pinnacle, a Transaction Coordinator managing a deal lifecycle, and a Branch Manager conducting daily operations. Each journey captures the current fragmented-tool experience alongside the target DealDesk state, highlighting the specific pain points that motivated the platform build.

---

## Journey 1 — New Agent Onboarding and First Transaction

### Persona: Marcus Delgado, 29, newly licensed Sales Agent, DFW market

**Background**: Marcus passed his Texas Sales Agent exam three weeks ago. He was recruited by a Pinnacle regional manager at a real estate school career fair. He has a TREC license number but has not yet been activated by a broker. He has no prior experience with a brokerage platform.

**Goal**: Get licensed under Pinnacle's sponsorship, complete onboarding, and close his first buyer representation transaction within 60 days.

---

### Stage 1: Recruit to License Pending

| Step | Marcus's Action | Recruiter/Admin Action | Current State (Pain) | DealDesk Future State |
|---|---|---|---|---|
| 1 | Submits interest via Pinnacle careers page | Recruiter adds Marcus to Follow Up Boss pipeline | Recruiter manages Marcus in FUB; no link to onboarding system | DealDesk recruiting pipeline captures Marcus from web form; recruiter dashboard shows source and stage |
| 2 | Receives recruiter outreach; schedules discovery call via Calendly link | Recruiter logs call notes in FUB | Call notes live only in FUB; not visible to branch manager | DealDesk recruiter record includes timeline, notes, and interview outcomes in one place |
| 3 | Passes TREC exam; emails license number to recruiting admin | Recruiting admin manually enters license into a spreadsheet | License data in spreadsheet; no validation against TREC records | DealDesk validates TREC license number format; flags for manual verification upload |
| 4 | — | Recruiting admin changes Marcus's status to "License Pending" | Status tracked in FUB tag; easy to miss | DealDesk stage progression: Recruit → License Pending; branch manager notified automatically |

**Pain point (current)**: The recruiter, the recruiting admin, and the branch manager each have a partial view of Marcus's status across FUB, a spreadsheet, and email. There is no single source of truth.

---

### Stage 2: Onboarding

| Step | Marcus's Action | Admin/System Action | Current State (Pain) | DealDesk Future State |
|---|---|---|---|---|
| 5 | Receives onboarding email with checklist link | Recruiting admin manually emails checklist PDF | Checklist is a PDF in email; no tracking of completion | DealDesk onboarding checklist is a live task list in the agent portal; each item tracked with completion timestamp |
| 6 | Uploads E&O insurance certificate via DealDesk | System records policy number and expiry date | Accounting team manually files E&O certificates in a shared drive folder | DealDesk stores certificate in Document Vault; nightly expiry check scheduled immediately |
| 7 | Completes DocuSign ID verification | DocuSign envelope sent automatically | Agent must visit the office to sign; delays onboarding by days | DocuSign envelope triggered on checklist step; completed remotely in minutes |
| 8 | Selects commission plan (80/20 Standard Split) | Commission Engine records plan assignment | Finance sends an email confirming plan; no system record | Commission Engine activates plan on activation date; plan visible on Marcus's agent profile |
| 9 | Links bank account via Stripe Connect onboarding flow | Stripe Connected Account created; verified by Disbursement Service | Agent emails voided cheque to accounting; accounting manually sets up ACH in QuickBooks | Stripe Connect onboarding embedded in DealDesk; bank account verified in minutes; no manual ACH setup |
| 10 | Completes MLS association (NTREIS application) | NTREIS association confirmed; agent status set to Active | Admin checks NTREIS portal separately; updates spreadsheet | MLS association step in DealDesk checklist; confirmed by admin and recorded on agent profile |

**Pain point (current)**: Average time from license number received to Active status is 11 business days due to manual coordination across email, a PDF checklist, QuickBooks, and the shared drive. Two agents in 2023 began showing homes before their E&O was confirmed, creating an uninsured liability exposure.

---

### Stage 3: First Transaction and Cap Milestone

| Step | Marcus's Action | System/Admin Action | Current State (Pain) | DealDesk Future State |
|---|---|---|---|---|
| 11 | Represents buyer on $385,000 purchase; creates transaction in DealDesk | Transaction Service creates record; TC auto-assigned based on DFW routing rules | Marcus would manually email TC with deal details; TC creates spreadsheet row | Deal creation in DealDesk pre-populates milestone timeline; TC receives system notification |
| 12 | Uploads buyer representation agreement | Document Vault stores document; checklist item marked complete | TC chases Marcus via email; document lands in a dotloop room without checklist enforcement | DealDesk checklist shows green checkmark; milestone cannot advance without this document |
| 13 | Links MLS listing ID to transaction | MLS Sync Service fetches current listing status from NTREIS | No MLS linkage in current system; TC manually monitors NTREIS portal | Listing status change (Active → Active Under Contract) auto-updates DealDesk milestone |
| 14 | Seller accepts offer; transaction moves to Under Contract | Commission Engine calculates preliminary GCI: $11,550 (3% × $385,000); Marcus net: $9,240 (80%) | TC updates spreadsheet; accounting updates commission tracker separately | Commission preview visible to Marcus and TC in real time; cap accumulator shows $2,310 added to brokerage-side |
| 15 | Transaction closes; CDA generated | Commission Engine generates CDA PDF; DocuSign envelope sent to Branch Manager then Broker of Record | Accounting creates CDA manually in Word; emails for signature; tracks returned copies in inbox | CDA auto-generated, DocuSign routing pre-configured; Marcus sees disbursement status in his portal |
| 16 | Broker countersigns CDA | Disbursement Service receives `cda.countersigned` event; Stripe payout initiated ($9,240 standard ACH) | Accounting manually initiates ACH in QuickBooks after receiving signed CDA via email | Payout initiates within minutes of countersignature; Marcus sees "Disbursement Initiated" notification |

**Cap milestone event (later in the year)**: When Marcus's brokerage-side commission accumulator reaches $22,000, the Commission Engine automatically switches his plan to 100% retention for the remainder of his anniversary year. Marcus receives a "Cap Reached!" notification. His dashboard shows cap progress at 100% and celebrates the milestone.

**Pain point (current)**: Commission disbursement takes an average of 6–9 business days from close because of the manual CDA creation, email signature chain, and manual QuickBooks ACH setup. Agents frequently call the accounting team to ask about their money.

---

## Journey 2 — Transaction Coordinator Managing a Listing Transaction

### Persona: Sandra Kowalski, 37, Transaction Coordinator, Houston office

**Background**: Sandra manages 22 active transactions simultaneously across 6 agents in the HAR (Houston) market. She is not licensed; her role is purely administrative and compliance-focused. She currently works across dotloop, a Google Sheets transaction tracker, and email.

**Goal**: Take a new listing transaction from TC assignment through close, ensuring all documents are collected on time and the CDA is ready for countersignature on closing day.

---

### Stage 1: Receive Assignment and Create Transaction

| Step | Action | Current State (Pain) | DealDesk Future State |
|---|---|---|---|
| 1 | Agent Ashley submits a new listing on a $529,000 Houston home | Ashley emails Sandra: "New listing, here are the details." Sandra creates a new row in her transaction spreadsheet and a new dotloop room | No standard form; Sandra recreates the same data entry each time in two different systems |
| 2 | Sandra receives TC assignment notification | — | DealDesk Transaction Service auto-assigns Sandra based on Houston office routing; notification sent via email and in-app |
| 3 | Sandra reviews transaction record: property address, MLS ID, estimated close date, gross commission $15,870 (3% listing side) | Sandra's spreadsheet shows close date and commission estimate; she opens NTREIS (wrong — HAR is Houston) to check listing status | Sandra opens the transaction in DealDesk; HAR MLS listing status is displayed inline; commission preview populated by Commission Engine |

---

### Stage 2: Collect Documents and Chase Missing Items

| Step | Document Required | Current State (Pain) | DealDesk Future State |
|---|---|---|---|
| 4 | Listing Agreement (signed by seller and agent) | Sandra emails Ashley: "Did you get the listing agreement signed?" Ashley emails back a PDF. Sandra uploads to dotloop. No checklist enforcement. | DealDesk checklist item "Listing Agreement" shows as outstanding. Sandra can send a DocuSign request directly from the vault. Status visible to Ashley in real-time. |
| 5 | Seller's Disclosure Notice (TREC required) | Sandra emails client directly, attaches TREC form PDF. Client signs, scans, emails back. Sandra uploads to dotloop. | DealDesk state-mandated form library has the current TREC Seller's Disclosure Notice version. Sandra sends via DocuSign from DealDesk. Completed envelope auto-stored in vault. |
| 6 | Lead-Based Paint Disclosure (property built 1971) | Sandra Googles to find the HUD LBP form. Downloads, emails to client. Uploads scan to dotloop when returned. | DealDesk detects "year built = 1971" and automatically adds LBP Disclosure to the checklist as a required document. |
| 7 | MLS listing goes Active in HAR | Sandra periodically checks HAR portal; updates spreadsheet manually when she notices the status change | MLS Sync Service detects "Active" status in HAR; DealDesk records the listing active date; Sandra receives an in-app notification |

**Pain point (current)**: Sandra spends approximately 90 minutes per transaction in the first week chasing documents across email. She has no automated way to know which documents are missing without manually cross-referencing her spreadsheet against dotloop.

---

### Stage 3: Milestone Updates, Commission Preview, CDA Request

| Step | Action | Current State (Pain) | DealDesk Future State |
|---|---|---|---|
| 8 | Offer received and accepted; HAR listing moves to "Option Pending" | Sandra updates her spreadsheet; updates dotloop status manually | MLS Sync Service detects "Option Pending" in HAR; Transaction Service moves milestone to "Contract Accepted"; Sandra notified |
| 9 | Inspection period checklist: collect inspection report, any repair addenda | Sandra emails Ashley: "Get me the inspection report and any addenda." Tracks in spreadsheet. | DealDesk inspection milestone checklist shows required items; Ashley uploads directly; Sandra reviews and accepts |
| 10 | Closing Disclosure received from title company | Sandra uploads PDF to dotloop. Notes the issue date in her spreadsheet. TRID tracking not enforced. | Sandra uploads CD to DealDesk; Document Vault records delivery date; TRID 3-day waiting period calculated automatically; alert raised if close date is too soon |
| 11 | All milestone documents accepted; transaction reaches Closed milestone | Sandra emails accounting: "Ready for CDA on [address], commission is $X." Accounting creates CDA manually in Word. | Commission Engine detects all required documents are accepted; CDA PDF generated automatically with full commission breakdown; Sandra reviews and requests CDA from DealDesk |
| 12 | CDA sent for countersignature | Sandra follows up with branch manager and broker via email; tracks signature status in her inbox | DealDesk sends DocuSign envelope to Branch Manager, then Broker of Record; Sandra sees signature status in real time on the transaction page |
| 13 | Broker countersigns; Stripe payout initiated | Sandra notifies accounting to process ACH payment in QuickBooks | Disbursement Service detects `cda.countersigned` event; Stripe payout to agent initiated automatically; accounting sees QBO journal entry created |

**Pain point (current)**: Sandra has no visibility into where a CDA is in the signature chain. Her most common weekly task is sending follow-up emails to the broker asking "Have you had a chance to sign the CDA for [address]?" In a busy month she manages this for 6–8 closings simultaneously.

---

### Stage 4: Archive and Close

| Step | Action | Current State (Pain) | DealDesk Future State |
|---|---|---|---|
| 14 | Transaction fully closed; all documents collected | Sandra archives dotloop room; updates spreadsheet to "Closed"; emails agent a recap | Fragmented archive across dotloop + spreadsheet + email | DealDesk transaction marked Closed; all documents in vault; audit trail complete; 7-year retention applied automatically |

---

## Journey 3 — Branch Manager Morning Operations Review

### Persona: Renata Osei, 44, Branch Manager, Austin office (185 active agents, 9 TCs)

**Background**: Renata oversees Pinnacle's Austin office — the second-largest by agent headcount. She is a licensed broker herself. Her morning routine involves reviewing production numbers, compliance exceptions, and her CDA approval queue before her 9 AM team huddle.

**Goal**: In under 30 minutes, understand the health of her office — production on track, compliance items addressed, pending CDAs approved, recruiting pipeline reviewed.

---

### Morning Review: Dashboard Walk-Through

| Step | What Renata Reviews | Current State (Pain) | DealDesk Future State |
|---|---|---|---|
| 1 | **Production overview**: how many transactions are active, how many closed this month, total GCI MTD | Renata asks her assistant to pull the Google Sheets transaction tracker and count rows | DealDesk branch dashboard shows real-time: 67 active transactions, 14 closed this month, $412,000 GCI MTD |
| 2 | **Agent production alerts**: any agent with zero transactions in 60+ days | Renata doesn't have this view; she asks each team lead verbally during huddles | DealDesk highlights agents with no active transactions in 60+ days; Renata can send a check-in task to the agent's recruiter |
| 3 | **Compliance exceptions**: any agents with expired or expiring E&O; any transactions with overdue document checklist items | Renata checks her email for any alerts; often discovers issues only when a TC raises them | DealDesk compliance panel shows: 2 agents with E&O expiring in 14 days, 1 agent with E&O expired (already blocked), 4 transactions with overdue document items |
| 4 | **CDA approval queue**: CDAs waiting for her countersignature (gross commission ≥ $25,000 threshold) | DocuSign emails arrive in Renata's inbox mixed with all other email; she sometimes misses CDAs on busy days | DealDesk CDA queue shows 3 CDAs awaiting her approval; she can review the commission breakdown inline and sign via DocuSign from the DealDesk interface |
| 5 | **Dual agency reviews**: any active transactions requiring her dual agency designation approval | No current workflow; TCs email Renata when a dual agency situation arises | DealDesk dual agency approval queue shows 1 pending; Renata reviews the dual agency consent form, approves the designation, and DocuSign is triggered to send consent forms to both parties |
| 6 | **Recruiting pipeline**: how many prospects in each stage; any stalled recruits | Renata has read access to FUB but rarely checks it; recruiting admin sends a weekly email summary | DealDesk recruiting funnel view shows: 8 prospects (Recruit stage), 3 License Pending, 2 Onboarding. One prospect has been in Recruit stage for 45 days without contact — flagged |

---

### End-of-Month P&L Review (Finance View)

| Step | What Renata Reviews | Current State (Pain) | DealDesk Future State |
|---|---|---|---|
| 7 | **Office gross commission income**: total GCI collected by brokerage from all Austin transactions this month | Accounting emails a QBO export; Renata manually cross-references with the transaction spreadsheet | DealDesk Reporting Service shows Austin office P&L: $218,000 gross brokerage commission (brokerage-side across all splits); less $14,000 referral fees paid; = $204,000 brokerage net |
| 8 | **Cap-approaching agents**: agents close to or past their cap (lose brokerage income, but good for retention) | No real-time visibility; accounting updates cap spreadsheet monthly | DealDesk shows 11 Austin agents within $3,000 of their cap; 4 agents already capped this month. Renata sees this is good for retention but plans for the revenue dip next month. |
| 9 | **Agent leaderboard**: top 10 agents by GCI YTD; recognition program planning | Accounting emails an Excel file monthly | DealDesk leaderboard is live; Renata filters by Austin office, YTD GCI. She identifies 2 agents who hit Top Producer threshold (≥ $8M GCI) this year and initiates the badge award workflow. |

---

## Emotional Journey Summary

| Journey | High Point | Low Point | Opportunity |
|---|---|---|---|
| New agent onboarding | Cap milestone notification — "You've reached your cap, keep 100%" | Waiting 11 days to go Active because E&O, bank, and MLS setup are uncoordinated | Parallel onboarding checklist with automated triggers cuts time-to-active to 2–3 business days |
| Transaction Coordinator | All checklist items green on closing day — no last-minute document chase | Chasing the broker for a CDA countersignature via email on a busy Thursday | DocuSign CDA queue + real-time signature status in DealDesk eliminates the follow-up loop |
| Branch Manager | Live P&L and compliance dashboard visible before morning huddle | Discovering an agent had an expired E&O only after they opened a new transaction | Nightly E&O check with automated block prevents uninsured transactions entirely |
