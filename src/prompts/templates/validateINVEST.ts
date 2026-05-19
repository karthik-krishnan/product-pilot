export function validateINVESTTemplate({
  title,
  asA,
  iWantTo,
  soThat,
  storyPoints,
  acceptanceCriteria,
  inScope,
  outOfScope,
  assumptions,
  crossFunctionalNeeds,
}: {
  title: string
  asA: string
  iWantTo: string
  soThat: string
  storyPoints: string
  acceptanceCriteria: string
  inScope: string
  outOfScope: string
  assumptions: string
  crossFunctionalNeeds: string
}): string {
  return `Evaluate the following user story rigorously against each INVEST principle. Be honest and specific — not every story will score well.

USER STORY:
Title: ${title}
As a: ${asA}
I want to: ${iWantTo}
So that: ${soThat}
Story Points: ${storyPoints}

Acceptance Criteria:
${acceptanceCriteria}

In Scope:
${inScope}

Out of Scope:
${outOfScope}

Assumptions:
${assumptions}

Cross-Functional Needs:
${crossFunctionalNeeds}

Return this exact JSON schema:
{
  "independent": {
    "adheres": <true if deliverable without coordinating with another story or team dependency>,
    "score": <0–100 integer>,
    "feedback": "<1–2 sentences explaining the assessment>",
    "suggestions": ["<specific, actionable improvement — 0–3 items>"]
  },
  "negotiable": {
    "adheres": <true if implementation details are open to discussion, not over-specified>,
    "score": <0–100>,
    "feedback": "<1–2 sentences>",
    "suggestions": []
  },
  "valuable": {
    "adheres": <true if delivers clear, measurable value to users or the business>,
    "score": <0–100>,
    "feedback": "<1–2 sentences>",
    "suggestions": []
  },
  "estimable": {
    "adheres": <true if team can commit to an estimate with reasonable confidence>,
    "score": <0–100>,
    "feedback": "<1–2 sentences>",
    "suggestions": []
  },
  "small": {
    "adheres": <true if fits comfortably within one sprint — typically ≤ 8 story points>,
    "score": <0–100>,
    "feedback": "<1–2 sentences>",
    "suggestions": []
  },
  "testable": {
    "adheres": <true if all acceptance criteria are specific and objectively verifiable>,
    "score": <0–100>,
    "feedback": "<1–2 sentences>",
    "suggestions": []
  }
}

Scoring guide:
- 85–100: Excellent, principle is clearly satisfied.
- 65–84:  Good, with minor gaps — set adheres: true.
- 45–64:  Needs work — set adheres: false.
- 0–44:   Significant problem — set adheres: false.
Provide 1–3 suggestions only when score < 85. Empty array otherwise.`
}
