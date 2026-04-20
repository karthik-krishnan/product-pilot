# RequireAI — AI-Powered Requirements Studio

A prototype application that helps Product Managers and Product Owners break down high-level requirements into well-defined Epics and User Stories using AI assistance.

## Features

### 1. Context Setup
- **Domain Context** — Capture business landscape, existing products, company environment via rich text input or document upload (PDF, DOCX, TXT, MD)
- **Technology Context** — Capture architecture decisions, API standards, tech stack, ADRs via rich text input or document upload
- Clipboard paste support on both panels

### 2. Requirements Intake
- Free-text high-level requirements input
- Optional **Explore & Brainstorm** mode — AI asks configurable number of probing questions (default: 3) before generating epics
- Each question offers option chips for quick selection plus a free-text override
- Skip option to go straight to epic generation

### 3. Epics View
- AI-generated epics rendered as a responsive columnar card grid
- Each epic card shows priority, category, and tags
- **Edit / Chat** dialog per epic — refine the epic via chat or edit fields directly
- **Break into Stories** button per epic

### 4. Story Breakdown
- Optional **Explore & Brainstorm** mode per epic before story generation
- Same question + option chip interaction pattern
- Generated stories appear in real-time alongside the chat

### 5. Story Validation (INVEST)
- Master-detail split pane — scrollable story list on the left, INVEST analysis on the right
- Each INVEST principle (Independent, Negotiable, Valuable, Estimable, Small, Testable) shows:
  - Adherence status
  - Score bar
  - Feedback and expandable suggestions
- Scales to any number of stories

### 6. User Story Display
- Full Agile story card: *As a / I want to / So that*
- Acceptance Criteria, In Scope, Out of Scope, Assumptions, Cross-Functional Needs
- Inline edit mode with human-in-the-loop refinement
- Copy as Markdown / Export

### 7. AI Provider Selection
- Supports **Anthropic Claude** and **Azure OpenAI**
- Configurable number of clarifying questions per interaction (1–5)

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Hosting | Netlify |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install & Run

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output goes to `dist/` — ready to deploy to Netlify, Vercel, or any static host.

---

## Deployment

### Netlify (recommended)

The repo includes a `netlify.toml` with build settings pre-configured. Connect this repo in the Netlify dashboard and every push to `main` will auto-deploy.

### Netlify Drop (no account needed)

```bash
npm run build
# Drag the dist/ folder to https://app.netlify.com/drop
```

---

## Project Structure

```
src/
├── components/
│   ├── Settings.tsx          # AI provider & preferences
│   ├── ContextCapture.tsx    # Domain & tech context input
│   ├── RequirementsInput.tsx # Requirements intake + AI chat
│   ├── ChatBubble.tsx        # Reusable chat message component
│   ├── EpicsView.tsx         # Columnar epics grid + edit dialog
│   ├── StoryBreakdown.tsx    # Per-epic story generation
│   ├── StoryValidation.tsx   # INVEST validation split pane
│   └── UserStoryDisplay.tsx  # Agile story card view
├── data/
│   └── mockData.ts           # Mock AI responses for prototype
├── types/
│   └── index.ts              # Shared TypeScript types
├── App.tsx                   # App shell + navigation
└── main.tsx                  # Entry point
```

---

## Status

This is currently a **UX prototype** with mocked AI responses. The AI backend wiring (Anthropic / Azure OpenAI API calls) is the next phase of development.
