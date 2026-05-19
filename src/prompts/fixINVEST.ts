import type { LLMMessage } from '../services/llm/client'
import type { Story, INVESTItem, FixProposal } from '../types'
import { parseJSON } from '../services/llm/client'
import { SYSTEM_PROMPT } from './templates/system'
import { fixINVESTTemplate } from './templates/fixINVEST'

const fmt = (items: string[]) => items.map(x => `  - ${x}`).join('\n')

export function buildFixINVESTPrompt(
  story: Story,
  principleKey: string,
  principleLabel: string,
  item: INVESTItem,
): LLMMessage[] {
  return [
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: fixINVESTTemplate({
        principleKey,
        principleLabel,
        title: story.title,
        asA: story.asA,
        iWantTo: story.iWantTo,
        soThat: story.soThat,
        storyPoints: story.storyPoints != null ? String(story.storyPoints) : 'not estimated',
        acceptanceCriteria: fmt(story.acceptanceCriteria),
        inScope: fmt(story.inScope),
        outOfScope: fmt(story.outOfScope),
        assumptions: fmt(story.assumptions),
        crossFunctionalNeeds: fmt(story.crossFunctionalNeeds),
        score: item.score,
        feedback: item.feedback,
        suggestions: item.suggestions.map(s => `  - ${s}`).join('\n'),
        epicId: story.epicId,
        priority: story.priority,
      }),
    },
  ]
}

export function parseFixProposal(raw: string): FixProposal {
  return parseJSON<FixProposal>(raw)
}
