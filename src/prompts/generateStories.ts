import type { LLMMessage } from '../services/llm/client'
import type { EnterpriseConfig, Workspace, Epic, ClarifyingQuestion, Story } from '../types'
import { parseJSON } from '../services/llm/client'
import { SYSTEM_PROMPT } from './templates/system'
import { generateStoriesTemplate } from './templates/generateStories'
import { buildContextBlock } from '../utils/contextUtils'

export function buildGenerateStoriesPrompt(
  epic: Epic,
  enterprise: EnterpriseConfig | null,
  workspace: Workspace | null,
  questions: ClarifyingQuestion[],
): LLMMessage[] {
  const qaBlock = questions.length > 0
    ? questions.map(q => `Q: ${q.question}\nA: ${q.answer || '(no answer provided)'}`).join('\n\n')
    : '(no discovery questions — generate based on epic details and context)'

  return [
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: generateStoriesTemplate({
        contextBlock: buildContextBlock(enterprise, workspace),
        epicTitle: epic.title,
        epicDescription: epic.description,
        epicCategory: epic.category,
        epicTags: epic.tags.join(', '),
        qaBlock,
      }),
    },
  ]
}

export function parseStories(raw: string, epicId: string): Story[] {
  const data = parseJSON<{ stories: Omit<Story, 'id' | 'epicId'>[] }>(raw)
  return data.stories.map((s, i) => ({
    ...s,
    id: `story-${epicId}-${i + 1}`,
    epicId,
  }))
}
