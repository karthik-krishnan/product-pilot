import type { LLMMessage } from '../services/llm/client'
import type { ContextCapture, Epic, ClarifyingQuestion, Story } from '../types'
import { parseJSON } from '../services/llm/client'
import { SYSTEM_PROMPT } from './system'

export function buildGenerateStoriesPrompt(
  epic: Epic,
  context: ContextCapture,
  questions: ClarifyingQuestion[],
): LLMMessage[] {
  const qaBlock = questions.length > 0
    ? questions.map(q => `Q: ${q.question}\nA: ${q.answer || '(no answer provided)'}`).join('\n\n')
    : '(no discovery questions — generate based on epic details and context)'

  return [
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: `You are a senior product manager breaking down an epic into a complete, production-ready set of user stories for a real engineering team.

DOMAIN CONTEXT:
${context.domainText || '(none provided)'}

TECHNICAL CONTEXT:
${context.techText || '(none provided)'}

EPIC:
Title: ${epic.title}
Description: ${epic.description}
Category: ${epic.category}
Tags: ${epic.tags.join(', ')}

STORY DISCOVERY Q&A:
${qaBlock}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BEFORE writing any stories, mentally walk through ALL of the following coverage areas and ask yourself: does this epic require a story here? Only skip an area if it genuinely does not apply.

1. CORE HAPPY PATH — the primary user action working end-to-end
2. ALL USER ROLES — different roles (end user, admin, guest, power user, ops team) may need separate stories
3. DATA ENTRY & VALIDATION — form fields, constraints, error messages, character limits
4. EMPTY STATES — what the user sees before any data exists (first-time use, no results, no content)
5. ERROR & FAILURE STATES — API failures, network errors, timeouts, partial failures, retry flows
6. LOADING & ASYNC STATES — skeleton screens, progress indicators, optimistic UI
7. EDITING & UPDATING — updating existing records, conflict resolution, autosave
8. DELETION & ARCHIVAL — soft delete, confirmation dialogs, undo/restore
9. SEARCH, FILTER & SORT — discovery and navigation within the feature
10. PAGINATION & INFINITE SCROLL — large dataset handling
11. PERMISSIONS & ACCESS CONTROL — who can see/do what; unauthorised state handling
12. NOTIFICATIONS & COMMUNICATIONS — emails, in-app alerts, webhooks triggered by actions
13. AUDIT & HISTORY — activity logs, change history, who did what and when
14. MOBILE & RESPONSIVE — touch targets, layout differences, device-specific behaviour
15. ACCESSIBILITY — keyboard navigation, screen reader support, colour contrast, ARIA labels
16. PERFORMANCE — load time SLAs, caching, lazy loading where the epic implies scale
17. INTEGRATIONS — third-party systems, webhooks, data sync, API contracts
18. REPORTING & ANALYTICS — dashboards, exports, event tracking this feature must emit
19. ONBOARDING & FIRST-RUN — tooltips, walkthroughs, empty-state CTAs for new users
20. SETTINGS & PREFERENCES — user-configurable behaviour within this feature

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Return this exact JSON schema:
{
  "stories": [
    {
      "title": "<concise story title>",
      "asA": "<specific user role — be precise: 'registered shopper', 'warehouse admin', 'guest user', not just 'user'>",
      "iWantTo": "<concrete action the user wants to perform>",
      "soThat": "<specific business value or user outcome — avoid vague phrases like 'have a good experience'>",
      "acceptanceCriteria": [
        "<specific, testable criterion with measurable thresholds where relevant>",
        "<scale count to complexity: 2–3 for simple stories (1–3 pts), 4–5 for medium (5 pts), 5–7 for complex (8 pts)>"
      ],
      "inScope": ["<what is explicitly included in this story>"],
      "outOfScope": ["<capabilities users might assume are included but are NOT in this story — be specific>"],
      "assumptions": ["<assumption the team is making that if wrong would change scope or estimate>"],
      "crossFunctionalNeeds": ["<specific team or system dependency, e.g. 'Analytics: emit search_query_submitted event with result_count', 'Security: penetration test required before go-live'>"],
      "priority": "High" | "Medium" | "Low",
      "storyPoints": <fibonacci: 1, 2, 3, 5, 8>
    }
  ]
}

Rules:
- Every story must satisfy all INVEST principles: Independent, Negotiable, Valuable, Estimable, Small, Testable.
- Every story must be ≤ 8 story points. Split anything larger into two or more independent stories.
- Acceptance criteria must be specific and verifiable — no vague terms like "should work", "must be fast", "user-friendly".
- outOfScope must name real things users would reasonably expect, not obvious non-starters.
- crossFunctionalNeeds must name the specific team or system and the specific ask — not just "talk to Analytics".
- Do not pad with trivial stories. Do not omit real capabilities to hit a lower count. A thorough epic breakdown is typically 8–20 stories.
- Prioritise ruthlessly: High = must-have for launch, Medium = important but not blocking, Low = nice-to-have or post-launch.`,
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
