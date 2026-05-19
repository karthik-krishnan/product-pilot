export function clarifyingQuestionsTemplate({
  min,
  max,
  contextBlock,
  requirements,
}: {
  min: number
  max: number
  contextBlock: string
  requirements: string
}): string {
  return `You are helping a BA clarify requirements before writing epics. Ask between ${min} and ${max} clarifying questions — exactly as many as are genuinely needed to resolve the most important ambiguities. Do not pad to reach ${max}; do not stop short of ${min} unless the requirements are already fully unambiguous.

CONTEXT:
${contextBlock}

RAW REQUIREMENTS:
${requirements}

Return this exact JSON schema:
{
  "questions": [
    {
      "id": "q1",
      "question": "<specific, decision-forcing question>",
      "options": ["<concrete option A>", "<concrete option B>", "<concrete option C>"]
    }
  ]
}

Rules:
- Only ask questions where the answer will materially change scope, architecture, user roles, integrations, compliance constraints, or the definition of MVP vs later phases.
- Each question must be independently valuable — if a question's answer wouldn't change what gets built, drop it.
- Do not ask about things already clearly stated in the requirements.
- Do not ask about UI preferences, error message wording, minor validations, or implementation details that can be resolved during delivery.
- Provide 3–4 concrete, mutually exclusive options per question that represent meaningfully different product directions — not stylistic variations.`
}
