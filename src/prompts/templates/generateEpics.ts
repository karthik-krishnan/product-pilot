export function generateEpicsTemplate({
  contextBlock,
  requirements,
  qaBlock,
}: {
  contextBlock: string
  requirements: string
  qaBlock: string
}): string {
  return `Generate a comprehensive set of epics from the requirements below. Each epic should represent a coherent business capability.

CONTEXT:
${contextBlock}

RAW REQUIREMENTS:
${requirements}

CLARIFYING Q&A:
${qaBlock}

Return this exact JSON schema:
{
  "epics": [
    {
      "id": "epic-1",
      "title": "<concise epic name, e.g. 'Product Search & Discovery'>",
      "description": "<2–3 sentences covering what this epic encompasses and why it matters to the business>",
      "priority": "High" | "Medium" | "Low",
      "category": "<functional area, e.g. 'Search', 'User Management', 'Payments', 'Admin'>",
      "tags": ["tag1", "tag2"]
    }
  ]
}

Rules:
- Generate one epic per distinct business capability. Do not merge unrelated capabilities; do not create sub-features as separate epics.
- Each epic must be a business capability — not a technical task, sprint, or team deliverable.
- Priorities should reflect business value and delivery dependencies (what must come first).
- Include 2–5 short, lowercase tags per epic.
- Use consistent, descriptive category names — they will be used to group epics visually. Related epics should share the same category string exactly.
- There is no upper limit on epic count — generate as many as the requirements genuinely warrant. A focused product may need 4; a broad platform may need 15 or more.
- Use sequential IDs: epic-1, epic-2, etc.`
}
