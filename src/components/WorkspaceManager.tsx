import { useState, useRef } from 'react'
import {
  X, Building2, Layers, Plus, Trash2, Edit3, Check, BookOpen, Cpu,
  Upload, FileText, AlertTriangle, Loader2, ChevronDown, ChevronUp,
} from 'lucide-react'
import type { EnterpriseConfig, Workspace, UploadedFile, APISettings } from '../types'
import { makeWorkspaceId } from '../services/enterprise'
import { readFileContent, supportsNativePDF } from '../utils/files'

// ─── File chip (reused for both enterprise and workspace panels) ──────────────

function FileChip({ file, onRemove }: { file: UploadedFile; onRemove: () => void }) {
  const isUnsupported = file.contentType === 'unsupported'
  return (
    <div className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs border ${
      isUnsupported ? 'bg-red-50 border-red-200' : 'bg-brand-50 border-brand-200'
    }`}>
      {file.loading
        ? <Loader2 className="w-3.5 h-3.5 text-brand-400 animate-spin shrink-0" />
        : isUnsupported
          ? <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
          : <FileText className="w-3.5 h-3.5 text-brand-500 shrink-0" />
      }
      <span className={`font-medium truncate max-w-[140px] ${isUnsupported ? 'text-red-600' : 'text-brand-700'}`}>
        {file.name}
      </span>
      {!file.loading && (
        <span className={isUnsupported ? 'text-red-400' : 'text-brand-400'}>
          {isUnsupported ? 'unsupported' : `${(file.size / 1024).toFixed(0)} KB`}
        </span>
      )}
      <button onClick={onRemove} className={`ml-1 ${isUnsupported ? 'text-red-300 hover:text-red-600' : 'text-brand-300 hover:text-brand-600'}`}>
        <X className="w-3 h-3" />
      </button>
    </div>
  )
}

// ─── Reusable context text + file panel ──────────────────────────────────────

function ContextSection({
  label, icon, accentColor, textValue, onTextChange, files, onFilesChange, placeholder, nativePDF,
}: {
  label: string
  icon: React.ReactNode
  accentColor: string
  textValue: string
  onTextChange: (v: string) => void
  files: UploadedFile[]
  onFilesChange: (f: UploadedFile[]) => void
  placeholder: string
  nativePDF: boolean
}) {
  const fileRef = useRef<HTMLInputElement>(null)

  const processFiles = async (rawFiles: File[]) => {
    const placeholders: UploadedFile[] = rawFiles.map(f => ({
      id: Math.random().toString(36).slice(2),
      name: f.name, size: f.size, type: f.type, loading: true,
    }))
    onFilesChange([...files, ...placeholders])
    const resolved = await Promise.all(rawFiles.map(async (f, i) => {
      const { content, contentType } = await readFileContent(f)
      const effectiveType = contentType === 'pdf' && !nativePDF ? 'unsupported' : contentType
      return { ...placeholders[i], content, contentType: effectiveType, loading: false } as UploadedFile
    }))
    onFilesChange([...files, ...resolved])
  }

  return (
    <div>
      <div className={`flex items-center gap-2 mb-2`}>
        <div className={`w-6 h-6 rounded-md flex items-center justify-center ${accentColor}`}>{icon}</div>
        <span className="text-xs font-semibold text-gray-700">{label}</span>
      </div>
      <textarea
        className="textarea-field text-xs"
        rows={5}
        placeholder={placeholder}
        value={textValue}
        onChange={e => onTextChange(e.target.value)}
      />
      <div className="flex items-center justify-between mt-1.5 mb-2">
        <span className="text-xs text-gray-400">{textValue.length.toLocaleString()} chars</span>
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 font-medium"
        >
          <Upload className="w-3 h-3" /> Attach file
        </button>
        <input ref={fileRef} type="file" multiple accept=".pdf,.txt,.md" className="hidden"
          onChange={e => { processFiles(Array.from(e.target.files || [])); e.target.value = '' }} />
      </div>
      {files.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {files.map(f => (
            <FileChip key={f.id} file={f} onRemove={() => onFilesChange(files.filter(x => x.id !== f.id))} />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── WorkspaceRow ─────────────────────────────────────────────────────────────

function WorkspaceRow({
  ws, isActive, nativePDF, onSelect, onUpdate, onDelete,
}: {
  ws: Workspace
  isActive: boolean
  nativePDF: boolean
  onSelect: () => void
  onUpdate: (ws: Workspace) => void
  onDelete: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [draft, setDraft] = useState(ws)
  const [editing, setEditing] = useState(false)

  const hasContext = draft.domainText || draft.techText || draft.domainFiles.length > 0 || draft.techFiles.length > 0

  const save = () => { onUpdate(draft); setEditing(false) }

  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${isActive ? 'border-brand-400 bg-brand-50/30' : 'border-gray-200 bg-white'}`}>
      {/* Header row */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={onSelect}
          className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
            isActive ? 'border-brand-500 bg-brand-500' : 'border-gray-300 hover:border-brand-400'
          }`}
        >
          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
        </button>

        {editing ? (
          <input
            autoFocus
            className="flex-1 text-sm font-medium border-b border-brand-400 bg-transparent outline-none text-gray-800"
            value={draft.name}
            onChange={e => setDraft(p => ({ ...p, name: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && save()}
          />
        ) : (
          <span className="flex-1 text-sm font-medium text-gray-800">{ws.name}</span>
        )}

        {isActive && (
          <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full font-medium">Active</span>
        )}
        {hasContext && !isActive && (
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Has context</span>
        )}

        <div className="flex items-center gap-1 ml-auto">
          {editing ? (
            <button onClick={save} className="p-1.5 text-brand-600 hover:text-brand-700">
              <Check className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button onClick={() => setEditing(true)} className="p-1.5 text-gray-400 hover:text-gray-600">
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          )}
          <button onClick={() => setExpanded(p => !p)} className="p-1.5 text-gray-400 hover:text-gray-600">
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <button onClick={onDelete} className="p-1.5 text-gray-300 hover:text-red-500">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expandable context area */}
      {expanded && (
        <div className="border-t border-gray-100 px-4 py-4 flex flex-col gap-4 bg-gray-50/50">
          <ContextSection
            label="Domain Context"
            icon={<BookOpen className="w-3.5 h-3.5 text-emerald-600" />}
            accentColor="bg-emerald-50"
            textValue={draft.domainText}
            onTextChange={v => setDraft(p => ({ ...p, domainText: v }))}
            files={draft.domainFiles}
            onFilesChange={f => setDraft(p => ({ ...p, domainFiles: f }))}
            placeholder="Team-specific domain — product area, personas, business rules, glossary..."
            nativePDF={nativePDF}
          />
          <ContextSection
            label="Technology Context"
            icon={<Cpu className="w-3.5 h-3.5 text-violet-600" />}
            accentColor="bg-violet-50"
            textValue={draft.techText}
            onTextChange={v => setDraft(p => ({ ...p, techText: v }))}
            files={draft.techFiles}
            onFilesChange={f => setDraft(p => ({ ...p, techFiles: f }))}
            placeholder="Team's tech stack — frameworks, services, APIs, architecture decisions..."
            nativePDF={nativePDF}
          />
          <div className="flex justify-end">
            <button onClick={save} className="btn-primary text-xs px-4 py-1.5 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> Save workspace
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main WorkspaceManager modal ──────────────────────────────────────────────

interface Props {
  enterpriseConfig: EnterpriseConfig | null
  workspaces: Workspace[]
  activeWorkspaceId: string | null
  settings: APISettings
  onEnterpriseChange: (config: EnterpriseConfig) => void
  onWorkspacesChange: (workspaces: Workspace[]) => void
  onActiveWorkspaceChange: (id: string) => void
  onClose: () => void
}

export default function WorkspaceManager({
  enterpriseConfig,
  workspaces,
  activeWorkspaceId,
  settings,
  onEnterpriseChange,
  onWorkspacesChange,
  onActiveWorkspaceChange,
  onClose,
}: Props) {
  const nativePDF = supportsNativePDF(settings.provider)
  const [tab, setTab] = useState<'enterprise' | 'workspaces'>('enterprise')

  // Enterprise draft
  const [entDraft, setEntDraft] = useState<EnterpriseConfig>(
    enterpriseConfig ?? { name: '', domainText: '', domainFiles: [], techText: '', techFiles: [] }
  )
  const [entSaved, setEntSaved] = useState(false)

  const saveEnterprise = () => {
    onEnterpriseChange(entDraft)
    setEntSaved(true)
    setTimeout(() => setEntSaved(false), 2000)
  }

  const addWorkspace = () => {
    const ws: Workspace = {
      id: makeWorkspaceId(),
      name: 'New Workspace',
      domainText: '', domainFiles: [], techText: '', techFiles: [],
    }
    const updated = [...workspaces, ws]
    onWorkspacesChange(updated)
    if (!activeWorkspaceId) onActiveWorkspaceChange(ws.id)
  }

  const updateWorkspace = (ws: Workspace) => {
    onWorkspacesChange(workspaces.map(w => w.id === ws.id ? ws : w))
  }

  const deleteWorkspace = (id: string) => {
    const updated = workspaces.filter(w => w.id !== id)
    onWorkspacesChange(updated)
    if (activeWorkspaceId === id && updated.length > 0) onActiveWorkspaceChange(updated[0].id)
    else if (activeWorkspaceId === id) onActiveWorkspaceChange('')
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center">
            <Layers className="w-4 h-4 text-brand-600" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Organisation & Workspaces</h2>
            <p className="text-xs text-gray-400">Configure company-wide context and team workspaces</p>
          </div>
          <button onClick={onClose} className="ml-auto text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6 pt-1">
          {([
            { id: 'enterprise', label: 'Enterprise', icon: Building2 },
            { id: 'workspaces', label: 'Workspaces', icon: Layers },
          ] as const).map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                tab === t.id ? 'border-brand-500 text-brand-600' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              <t.icon className="w-3.5 h-3.5" />{t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {tab === 'enterprise' && (
            <div className="flex flex-col gap-5">
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Organisation name</label>
                <input
                  className="input-field"
                  placeholder="e.g. Acme Corp, RetailCo, HealthFirst"
                  value={entDraft.name}
                  onChange={e => setEntDraft(p => ({ ...p, name: e.target.value }))}
                />
              </div>
              <ContextSection
                label="Enterprise Domain Context"
                icon={<BookOpen className="w-3.5 h-3.5 text-emerald-600" />}
                accentColor="bg-emerald-50"
                textValue={entDraft.domainText}
                onTextChange={v => setEntDraft(p => ({ ...p, domainText: v }))}
                files={entDraft.domainFiles}
                onFilesChange={f => setEntDraft(p => ({ ...p, domainFiles: f }))}
                placeholder="Company-wide domain — business model, customer segments, key regulations, product portfolio, org structure..."
                nativePDF={nativePDF}
              />
              <ContextSection
                label="Enterprise Technology Context"
                icon={<Cpu className="w-3.5 h-3.5 text-violet-600" />}
                accentColor="bg-violet-50"
                textValue={entDraft.techText}
                onTextChange={v => setEntDraft(p => ({ ...p, techText: v }))}
                files={entDraft.techFiles}
                onFilesChange={f => setEntDraft(p => ({ ...p, techFiles: f }))}
                placeholder="Company-wide tech standards — cloud provider, security policies, approved platforms, shared services, ADRs..."
                nativePDF={nativePDF}
              />
              <div className="flex justify-end">
                <button onClick={saveEnterprise} className="btn-primary flex items-center gap-2 text-xs px-4 py-2">
                  {entSaved ? <Check className="w-3.5 h-3.5" /> : null}
                  {entSaved ? 'Saved!' : 'Save enterprise context'}
                </button>
              </div>
            </div>
          )}

          {tab === 'workspaces' && (
            <div className="flex flex-col gap-3">
              <p className="text-xs text-gray-500">
                Each workspace represents a team or product group. Select an active workspace before starting a session — its context is combined with the enterprise context for the AI.
              </p>

              {workspaces.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl">
                  <Layers className="w-8 h-8 text-gray-200 mx-auto mb-3" />
                  <p className="text-sm text-gray-400 font-medium mb-1">No workspaces yet</p>
                  <p className="text-xs text-gray-300">Create your first workspace to get started</p>
                </div>
              ) : (
                workspaces.map(ws => (
                  <WorkspaceRow
                    key={ws.id}
                    ws={ws}
                    isActive={ws.id === activeWorkspaceId}
                    nativePDF={nativePDF}
                    onSelect={() => onActiveWorkspaceChange(ws.id)}
                    onUpdate={updateWorkspace}
                    onDelete={() => deleteWorkspace(ws.id)}
                  />
                ))
              )}

              <button
                onClick={addWorkspace}
                className="flex items-center gap-2 justify-center px-4 py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-xs text-gray-500 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add workspace
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-100 flex justify-end">
          <button onClick={onClose} className="btn-secondary text-xs px-4 py-2">Done</button>
        </div>
      </div>
    </div>
  )
}
