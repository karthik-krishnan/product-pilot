import type { APISettings, UploadedFile } from '../../../types'
import { LLMMessage, LLMError, injectFilesIntoMessages } from '../shared'

export async function callAzureOpenAI(messages: LLMMessage[], s: APISettings, files: UploadedFile[], jsonMode = true): Promise<string> {
  const url = `${s.azureEndpoint}/openai/deployments/${s.azureDeployment}/chat/completions?api-version=2024-02-15-preview`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'api-key': s.azureKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: injectFilesIntoMessages(messages, files),
      ...(jsonMode ? { response_format: { type: 'json_object' } } : {}),
      max_tokens: 4096,
    }),
  })
  if (!res.ok) throw new LLMError('Azure OpenAI', res.status, await res.text())
  const data = await res.json()
  return data.choices[0].message.content
}
