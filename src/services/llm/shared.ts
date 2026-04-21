import type { UploadedFile } from '../../types'
import { injectTextFiles } from '../../utils/files'

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export class LLMError extends Error {
  constructor(
    public provider: string,
    public status: number,
    message: string,
  ) {
    super(`[${provider}] ${status}: ${message}`)
    this.name = 'LLMError'
  }
}

export function parseJSON<T>(raw: string): T {
  const cleaned = raw
    .replace(/^```(?:json)?\s*/m, '')
    .replace(/\s*```\s*$/m, '')
    .trim()
  return JSON.parse(cleaned) as T
}

export function injectFilesIntoMessages(messages: LLMMessage[], files: UploadedFile[]): LLMMessage[] {
  const textContent = injectTextFiles(files)
  if (!textContent) return messages
  return messages.map((m, i) =>
    m.role === 'user' && i === messages.length - 1
      ? { ...m, content: m.content + textContent }
      : m,
  )
}
