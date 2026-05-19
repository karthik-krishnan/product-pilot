import type { LLMMessage } from '../services/llm/client'
import type { Epic, Story, EnterpriseConfig, Workspace, ChatEntry } from '../types'
import { storyChatSystemPrompt, storyChatContextTemplate } from './templates/storyChat'
import { buildContextBlock } from '../utils/contextUtils'

export function buildStoryChatMessages(
  story: Story,
  epic: Epic,
  enterprise: EnterpriseConfig | null,
  workspace: Workspace | null,
  history: ChatEntry[],
  userMessage: string,
): LLMMessage[] {
  const acList = story.acceptanceCriteria.length > 0
    ? story.acceptanceCriteria.map((ac, i) => `  ${i + 1}. ${ac}`).join('\n')
    : '  (none defined)'

  const list = (items: string[], fallback: string) =>
    items.length > 0 ? items.join('; ') : fallback

  return [
    { role: 'system', content: storyChatSystemPrompt },
    {
      role: 'user',
      content: storyChatContextTemplate({
        epicTitle: epic.title,
        epicDescription: epic.description,
        storyTitle: story.title,
        asA: story.asA,
        iWantTo: story.iWantTo,
        soThat: story.soThat,
        priority: story.priority,
        storyPoints: story.storyPoints != null ? String(story.storyPoints) : 'unestimated',
        acceptanceCriteria: acList,
        inScope: list(story.inScope, '(not specified)'),
        outOfScope: list(story.outOfScope, '(not specified)'),
        assumptions: list(story.assumptions, '(none)'),
        crossFunctionalNeeds: list(story.crossFunctionalNeeds, '(none)'),
        contextBlock: buildContextBlock(enterprise, workspace),
      }),
    },
    ...history
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    { role: 'user', content: userMessage },
  ]
}
