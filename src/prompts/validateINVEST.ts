import type { LLMMessage } from '../services/llm/client'
import type { Story, INVESTValidation } from '../types'
import { parseJSON } from '../services/llm/client'
import { SYSTEM_PROMPT } from './templates/system'
import { validateINVESTTemplate } from './templates/validateINVEST'

const fmt = (items: string[]) => items.map(x => `  - ${x}`).join('\n')

export function buildValidateINVESTPrompt(story: Story): LLMMessage[] {
  return [
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: validateINVESTTemplate({
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
      }),
    },
  ]
}

export function parseINVESTValidation(raw: string): INVESTValidation {
  return parseJSON<INVESTValidation>(raw)
}
