import type { LLMMessage } from '../services/llm/client'
import type { EnterpriseConfig, Workspace, ClarifyingQuestion } from '../types'
import { parseJSON } from '../services/llm/client'
import { SYSTEM_PROMPT } from './templates/system'
import { clarifyingQuestionsTemplate } from './templates/clarifyingQuestions'
import { buildContextBlock } from '../utils/contextUtils'

export function buildClarifyingQuestionsPrompt(
  requirements: string,
  enterprise: EnterpriseConfig | null,
  workspace: Workspace | null,
  range: [number, number],
): LLMMessage[] {
  const [min, max] = range
  return [
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: clarifyingQuestionsTemplate({
        min,
        max,
        contextBlock: buildContextBlock(enterprise, workspace),
        requirements,
      }),
    },
  ]
}

export function parseClarifyingQuestions(raw: string): ClarifyingQuestion[] {
  const data = parseJSON<{ questions: ClarifyingQuestion[] }>(raw)
  return data.questions
}
