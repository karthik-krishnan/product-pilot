import type { APISettings, UploadedFile } from '../../../types'
import { LLMMessage, LLMError } from '../shared'

function buildContent(text: string, files: UploadedFile[]): string | object[] {
  const supported = files.filter(f => f.content && (f.contentType === 'pdf' || f.contentType === 'text'))
  if (!supported.length) return text
  const blocks: object[] = supported.map(f => ({
    type: 'document',
    title: f.name,
    source: f.contentType === 'pdf'
      ? { type: 'base64', media_type: 'application/pdf', data: f.content }
      : { type: 'text', data: f.content },
  }))
  blocks.push({ type: 'text', text })
  return blocks
}

export async function callAnthropic(messages: LLMMessage[], s: APISettings, files: UploadedFile[]): Promise<string> {
  const system = messages.find(m => m.role === 'system')?.content
  const chat = messages.filter(m => m.role !== 'system')

  const anthropicMessages = chat.map((m, i) => {
    if (m.role === 'user' && i === chat.length - 1 && files.length) {
      return { role: m.role, content: buildContent(m.content, files) }
    }
    return m
  })

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': s.anthropicKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      ...(system ? { system } : {}),
      messages: anthropicMessages,
    }),
  })
  if (!res.ok) throw new LLMError('Anthropic', res.status, await res.text())
  const data = await res.json()
  return data.content[0].text
}
