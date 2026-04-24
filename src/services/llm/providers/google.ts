import type { APISettings, UploadedFile } from '../../../types'
import { LLMMessage, LLMError } from '../shared'

export async function callGoogle(messages: LLMMessage[], s: APISettings, files: UploadedFile[], jsonMode = true): Promise<string> {
  const system = messages.find(m => m.role === 'system')?.content
  const chat = messages.filter(m => m.role !== 'system')

  const supported = files.filter(f => f.content && (f.contentType === 'pdf' || f.contentType === 'text'))

  const contents = chat.map((m, i) => {
    const parts: object[] = []
    if (m.role === 'user' && i === chat.length - 1 && supported.length) {
      supported.forEach(f => {
        if (f.contentType === 'pdf') {
          parts.push({ inlineData: { mimeType: 'application/pdf', data: f.content } })
        } else {
          parts.push({ text: `--- Attached: ${f.name} ---\n${f.content}` })
        }
      })
    }
    parts.push({ text: m.content })
    return { role: m.role === 'assistant' ? 'model' : 'user', parts }
  })

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${s.googleModel}:generateContent?key=${s.googleKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
        contents,
        generationConfig: { ...(jsonMode ? { responseMimeType: 'application/json' } : {}), maxOutputTokens: 4096 },
      }),
    },
  )
  if (!res.ok) throw new LLMError('Google', res.status, await res.text())
  const data = await res.json()
  return data.candidates[0].content.parts[0].text
}
