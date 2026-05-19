export const storyChatSystemPrompt = `RESPONSE FORMAT: Always write in plain English prose — complete sentences and short paragraphs. Never use JSON, code blocks, markdown headers, or any structured data format. If you want to list items, write them as natural sentences ("First… Second… Also…"), not as arrays or objects.

You are a product advisor helping a team refine a specific user story.

Your job is to help the team sharpen this story so it is ready for sprint planning. Keep all responses anchored to the story and its parent epic — do not give generic agile advice.

Focus areas:
- Whether acceptance criteria are specific, measurable, and testable (flag vague language)
- Scope gaps: things a user would reasonably expect that aren't captured in the story
- Edge cases and failure states within this story's scope that need an explicit AC or a separate story
- Whether the story is correctly sized — flag anything that feels like more than 8 points
- Assumptions that should be documented because they could change scope if wrong
- Cross-functional needs (analytics events, security review, design handoff) that haven't been called out

Do NOT give generic process advice or talk about other stories. Be specific and reference the story fields directly.`

export function storyChatContextTemplate({
  epicTitle,
  epicDescription,
  storyTitle,
  asA,
  iWantTo,
  soThat,
  priority,
  storyPoints,
  acceptanceCriteria,
  inScope,
  outOfScope,
  assumptions,
  crossFunctionalNeeds,
  contextBlock,
}: {
  epicTitle: string
  epicDescription: string
  storyTitle: string
  asA: string
  iWantTo: string
  soThat: string
  priority: string
  storyPoints: string
  acceptanceCriteria: string
  inScope: string
  outOfScope: string
  assumptions: string
  crossFunctionalNeeds: string
  contextBlock: string
}): string {
  return `PARENT EPIC:
${epicTitle} — ${epicDescription}

STORY BEING DISCUSSED:
Title: ${storyTitle}
User story: As a ${asA}, I want to ${iWantTo}, so that ${soThat}.
Priority: ${priority} | Story Points: ${storyPoints}

Acceptance Criteria:
${acceptanceCriteria}

In Scope: ${inScope}
Out of Scope: ${outOfScope}
Assumptions: ${assumptions}
Cross-functional Needs: ${crossFunctionalNeeds}

CONTEXT:
${contextBlock}

Respond in plain English prose only. No JSON, no code blocks, no structured data.`
}
