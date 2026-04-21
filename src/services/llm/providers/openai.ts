import type { APISettings, UploadedFile } from '../../../types'
import { LLMMessage, LLMError, injectFilesIntoMessages } from '../shared'

export async function callOpenAI(messages: LLMMessage[], s: APISettings, files: UploadedFile[]): Promise<string> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${s.openaiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: s.openaiModel,
      messages: injectFilesIntoMessages(messages, files),
      response_format: { type: 'json_object' },
      max_tokens: 4096,
    }),
  })
  if (!res.ok) throw new LLMError('OpenAI', res.status, await res.text())
  const data = await res.json()
  return data.choices[0].message.content
}
