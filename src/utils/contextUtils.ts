import type { EnterpriseConfig, Workspace, UploadedFile } from '../types'

/**
 * Builds a single labelled context block for injection into LLM prompts.
 * Enterprise context (company-wide) appears first; workspace context (team-specific) second.
 */
export function buildContextBlock(
  enterprise: EnterpriseConfig | null,
  workspace: Workspace | null,
): string {
  const parts: string[] = []

  if (enterprise && (enterprise.domainText || enterprise.techText)) {
    const eName = enterprise.name || 'Company-wide'
    const lines: string[] = []
    if (enterprise.domainText) lines.push(`Domain:\n${enterprise.domainText}`)
    if (enterprise.techText)   lines.push(`Technology:\n${enterprise.techText}`)
    parts.push(`ENTERPRISE CONTEXT — ${eName}:\n${lines.join('\n\n')}`)
  }

  if (workspace && (workspace.domainText || workspace.techText)) {
    const lines: string[] = []
    if (workspace.domainText) lines.push(`Domain:\n${workspace.domainText}`)
    if (workspace.techText)   lines.push(`Technology:\n${workspace.techText}`)
    parts.push(`WORKSPACE CONTEXT — ${workspace.name}:\n${lines.join('\n\n')}`)
  }

  return parts.length > 0 ? parts.join('\n\n') : '(no context provided)'
}

/**
 * Aggregates all uploaded files from enterprise + workspace for passing to the LLM provider.
 */
export function getAllContextFiles(
  enterprise: EnterpriseConfig | null,
  workspace: Workspace | null,
): UploadedFile[] {
  return [
    ...(enterprise?.domainFiles ?? []),
    ...(enterprise?.techFiles ?? []),
    ...(workspace?.domainFiles ?? []),
    ...(workspace?.techFiles ?? []),
  ]
}
