import type { EnterpriseConfig, Workspace } from '../types'

const ENTERPRISE_KEY      = 'productpilot_enterprise'
const WORKSPACES_KEY      = 'productpilot_workspaces'
const ACTIVE_WORKSPACE_KEY = 'productpilot_active_workspace'

// ─── Enterprise Config ────────────────────────────────────────────────────────

export function loadEnterpriseConfig(): EnterpriseConfig | null {
  try {
    const raw = localStorage.getItem(ENTERPRISE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function saveEnterpriseConfig(config: EnterpriseConfig): void {
  try { localStorage.setItem(ENTERPRISE_KEY, JSON.stringify(config)) } catch { /* ignore */ }
}

export function clearEnterpriseConfig(): void {
  try { localStorage.removeItem(ENTERPRISE_KEY) } catch { /* ignore */ }
}

// ─── Workspaces ───────────────────────────────────────────────────────────────

export function loadWorkspaces(): Workspace[] {
  try {
    const raw = localStorage.getItem(WORKSPACES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function saveWorkspaces(workspaces: Workspace[]): void {
  try { localStorage.setItem(WORKSPACES_KEY, JSON.stringify(workspaces)) } catch { /* ignore */ }
}

// ─── Active Workspace ─────────────────────────────────────────────────────────

export function loadActiveWorkspaceId(): string | null {
  try { return localStorage.getItem(ACTIVE_WORKSPACE_KEY) } catch { return null }
}

export function saveActiveWorkspaceId(id: string | null): void {
  try {
    if (id) localStorage.setItem(ACTIVE_WORKSPACE_KEY, id)
    else localStorage.removeItem(ACTIVE_WORKSPACE_KEY)
  } catch { /* ignore */ }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function makeWorkspaceId(): string {
  return `ws-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}
