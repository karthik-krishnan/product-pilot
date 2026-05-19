import type { LLMMessage } from '../services/llm/client'
import type { Epic, EnterpriseConfig, Workspace, ChatEntry } from '../types'
import { epicChatSystemPrompt, epicChatContextTemplate } from './templates/epicChat'
import { buildContextBlock } from '../utils/contextUtils'

export function buildEpicChatMessages(
  epic: Epic,
  allEpics: Epic[],
  enterprise: EnterpriseConfig | null,
  workspace: Workspace | null,
  rawRequirements: string,
  history: ChatEntry[],
  userMessage: string,
): LLMMessage[] {
  const otherEpics = allEpics.filter(e => e.id !== epic.id)
  const portfolioSummary = otherEpics.length > 0
    ? otherEpics.map(e => `• [${e.priority}] ${e.title} — ${e.description}`).join('\n')
    : '(no other epics yet)'

  return [
    { role: 'system', content: epicChatSystemPrompt },
    {
      role: 'user',
      content: epicChatContextTemplate({
        rawRequirements,
        contextBlock: buildContextBlock(enterprise, workspace),
        portfolioSummary,
        epicTitle: epic.title,
        epicPriority: epic.priority,
        epicCategory: epic.category,
        epicDescription: epic.description,
        epicTags: epic.tags.length > 0 ? epic.tags.join(', ') : '',
      }),
    },
    ...history
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    { role: 'user', content: userMessage },
  ]
}
