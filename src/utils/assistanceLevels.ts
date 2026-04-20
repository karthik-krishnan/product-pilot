import type { AssistanceLevel } from '../types'

export interface LevelMeta {
  id: AssistanceLevel
  name: string
  tagline: string
  description: string
  range: [number, number]   // [min, max] questions inclusive; [0,0] = skip entirely
  color: string
  trackColor: string
}

export const ASSISTANCE_LEVELS: LevelMeta[] = [
  {
    id: 0,
    name: 'Streamlined',
    tagline: 'Just generate',
    description: 'Skip AI exploration entirely — ideal for experienced BAs who know exactly what they need.',
    range: [0, 0],
    color: 'text-gray-600',
    trackColor: 'bg-gray-400',
  },
  {
    id: 1,
    name: 'Light Touch',
    tagline: 'Quick sense-check',
    description: 'One or two targeted questions to catch obvious gaps before generating.',
    range: [1, 2],
    color: 'text-emerald-600',
    trackColor: 'bg-emerald-400',
  },
  {
    id: 2,
    name: 'Collaborative',
    tagline: 'Balanced dialogue',
    description: 'A short back-and-forth to align on scope, personas, and cross-functional needs.',
    range: [2, 3],
    color: 'text-brand-600',
    trackColor: 'bg-brand-500',
  },
  {
    id: 3,
    name: 'Thorough',
    tagline: 'Deep alignment',
    description: 'Structured exploration of requirements, edge cases, and dependencies.',
    range: [3, 4],
    color: 'text-amber-600',
    trackColor: 'bg-amber-400',
  },
  {
    id: 4,
    name: 'Deep Dive',
    tagline: 'Full discovery',
    description: 'Comprehensive AI-led discovery — great for junior BAs or complex, high-risk features.',
    range: [4, 5],
    color: 'text-violet-600',
    trackColor: 'bg-violet-500',
  },
]

export function getQuestionCount(level: AssistanceLevel): number {
  const { range } = ASSISTANCE_LEVELS[level]
  const [min, max] = range
  if (min === max) return min
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getLevelMeta(level: AssistanceLevel): LevelMeta {
  return ASSISTANCE_LEVELS[level]
}
