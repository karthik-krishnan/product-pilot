import type { APISettings, UploadedFile } from '../../types'
import { callAnthropic } from './providers/anthropic'
import { callOpenAI }    from './providers/openai'
import { callAzureOpenAI } from './providers/azure'
import { callGoogle }    from './providers/google'
import { callOllama }    from './providers/ollama'
import { callDemo }      from './providers/demo'

// Re-export shared primitives so existing import paths keep working
export type { LLMMessage } from './shared'
export { LLMError, parseJSON } from './shared'

// ─── Provider detection ───────────────────────────────────────────────────────

export function isDemo(settings: APISettings): boolean {
  return settings.provider === 'demo'
}

export function hasValidKey(settings: APISettings): boolean {
  switch (settings.provider) {
    case 'demo':         return false
    case 'anthropic':    return !!settings.anthropicKey.trim()
    case 'openai':       return !!settings.openaiKey.trim()
    case 'azure-openai': return !!settings.azureKey.trim() && !!settings.azureEndpoint.trim() && !!settings.azureDeployment.trim()
    case 'google':       return !!settings.googleKey.trim()
    case 'ollama':       return !!settings.ollamaEndpoint.trim() && !!settings.ollamaModel.trim()
  }
}

export function isLiveMode(settings: APISettings): boolean {
  return !isDemo(settings) && hasValidKey(settings)
}

// ─── Factory ──────────────────────────────────────────────────────────────────

import type { LLMMessage } from './shared'

/**
 * promptType is only used by the demo provider to select its canned response.
 * All real providers ignore it.
 */
export async function callLLM(
  messages: LLMMessage[],
  settings: APISettings,
  files: UploadedFile[] = [],
  promptType?: string,
): Promise<string> {
  switch (settings.provider) {
    case 'demo':         return callDemo(promptType)
    case 'anthropic':    return callAnthropic(messages, settings, files)
    case 'openai':       return callOpenAI(messages, settings, files)
    case 'azure-openai': return callAzureOpenAI(messages, settings, files)
    case 'google':       return callGoogle(messages, settings, files)
    case 'ollama':       return callOllama(messages, settings, files)
  }
}
