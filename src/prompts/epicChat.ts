import type { LLMMessage } from '../services/llm/client'
import type { Epic, EnterpriseConfig, Workspace, ChatEntry } from '../types'
import { buildContextBlock } from '../utils/contextUtils'

/**
 * Builds the full message array for a multi-turn epic chat.
 *
 * Context injected:
 *  - Enterprise + workspace context (company-wide then team-specific)
 *  - Raw product requirements
 *  - Full epic portfolio (so the AI can reason about dependencies & overlap)
 *  - The specific epic being discussed
 *  - Conversation history so far
 *  - The new user message
 */
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

  const systemPrompt = `RESPONSE FORMAT: Always write in plain English prose — complete sentences and short paragraphs. Never use JSON, code blocks, markdown headers, or any structured data format. If you want to list items, write them as natural sentences ("First… Second… Also…"), not as arrays or objects.

You are a strategic product advisor helping a product team explore and refine an epic.

Your job is to ask probing questions and surface insights that will meaningfully shape how this epic is scoped, sequenced, and built. Keep every response grounded in the product requirements and the epic portfolio provided.

Focus areas:
- Scope boundaries: what is genuinely in this epic vs what should be a separate epic or deferred to a later phase
- Cross-epic dependencies and sequencing risks visible from the portfolio
- Business rules and edge cases that would materially change the stories or architecture
- Integration points, data flows, or non-functional requirements with real delivery impact
- Assumptions baked into the epic description that, if wrong, would change scope significantly
- Trade-offs worth making explicit before stories are written (e.g. MVP vs full scope, build vs buy)

Do NOT discuss: UI layout preferences, coding conventions, minor UX polish, or implementation technology choices.

Be concise and direct. Ask one focused question at a time when probing.`

  const contextBlock = `PRODUCT REQUIREMENTS:
${rawRequirements || '(not provided)'}

CONTEXT:
${buildContextBlock(enterprise, workspace)}

EPIC PORTFOLIO — other epics for this product:
${portfolioSummary}

THE EPIC BEING DISCUSSED:
Title: ${epic.title}
Priority: ${epic.priority} | Category: ${epic.category}
Description: ${epic.description}${epic.tags.length > 0 ? `\nTags: ${epic.tags.join(', ')}` : ''}

Respond in plain English prose only. No JSON, no code blocks, no structured data.`

  const messages: LLMMessage[] = [
    { role: 'system',    content: systemPrompt },
    { role: 'user',      content: contextBlock },
    ...history
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    { role: 'user', content: userMessage },
  ]

  return messages
}
