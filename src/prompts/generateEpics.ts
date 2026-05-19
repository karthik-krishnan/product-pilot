import type { LLMMessage } from '../services/llm/client'
import type { EnterpriseConfig, Workspace, ClarifyingQuestion, Epic } from '../types'
import { parseJSON } from '../services/llm/client'
import { SYSTEM_PROMPT } from './templates/system'
import { generateEpicsTemplate } from './templates/generateEpics'
import { buildContextBlock } from '../utils/contextUtils'

export function buildGenerateEpicsPrompt(
  requirements: string,
  enterprise: EnterpriseConfig | null,
  workspace: Workspace | null,
  questions: ClarifyingQuestion[],
): LLMMessage[] {
  const qaBlock = questions.length > 0
    ? questions.map(q => `Q: ${q.question}\nA: ${q.answer || '(no answer provided)'}`).join('\n\n')
    : '(no clarifying questions — generate based on requirements and context alone)'

  return [
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: generateEpicsTemplate({
        contextBlock: buildContextBlock(enterprise, workspace),
        requirements,
        qaBlock,
      }),
    },
  ]
}

export function parseEpics(raw: string): Epic[] {
  const data = parseJSON<{ epics: Epic[] }>(raw)
  return data.epics.map(e => ({ ...e, stories: [] }))
}
