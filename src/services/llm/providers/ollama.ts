import type { APISettings, UploadedFile } from '../../../types'
import { LLMMessage, LLMError, injectFilesIntoMessages } from '../shared'

export async function callOllama(messages: LLMMessage[], s: APISettings, files: UploadedFile[]): Promise<string> {
  const res = await fetch(`${s.ollamaEndpoint}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: s.ollamaModel,
      messages: injectFilesIntoMessages(messages, files),
      stream: false,
      format: 'json',
    }),
  })
  if (!res.ok) throw new LLMError('Ollama', res.status, await res.text())
  const data = await res.json()
  return data.message.content
}
