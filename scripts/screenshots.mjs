import { chromium } from 'playwright'
import { mkdirSync } from 'fs'

mkdirSync('docs/screenshots', { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage()
await page.setViewportSize({ width: 1280, height: 800 })
const full = { fullPage: false }

// ── 1. Context Setup ──────────────────────────────────────────────────────────
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
await page.screenshot({ path: 'docs/screenshots/01-context.png', ...full })
console.log('✓ 01-context.png')

// ── 2. Requirements ───────────────────────────────────────────────────────────
await page.fill('textarea', 'RetailCo — mid-market e-commerce platform. Goals: reduce CSAT tickets 40%, increase repeat purchase rate. Existing: SAP inventory, Salesforce CRM, custom POS.')
await page.click('button:has-text("Continue to Requirements")')
await page.waitForTimeout(400)
await page.screenshot({ path: 'docs/screenshots/02-requirements.png', ...full })
console.log('✓ 02-requirements.png')

// ── 3. Epics grid ─────────────────────────────────────────────────────────────
await page.click('button:has-text("Generate Epics Directly")')
// Wait until epics cards appear
await page.waitForSelector('text=Generated Epics', { timeout: 10000 }).catch(() => {})
await page.waitForTimeout(600)
await page.screenshot({ path: 'docs/screenshots/03-epics.png', ...full })
console.log('✓ 03-epics.png')

// ── 4. Story cards ────────────────────────────────────────────────────────────
// Click exact "Stories" button on first epic card (not "All Stories" toggle)
await page.locator('button').filter({ hasText: /^\s*Stories\s*$/ }).first().click()
await page.waitForTimeout(600)
// Click "Generate Stories" (the primary action on StoryBreakdown when empty)
const genBtn = page.locator('button').filter({ hasText: 'Generate Stories Now' })
if (await genBtn.count() > 0) {
  await genBtn.first().click()
  console.log('  Clicked Generate Stories Now')
} else {
  console.log('  No Generate Stories Now button found')
}
// Wait for story cards to appear
await page.waitForSelector('text=As a', { timeout: 15000 }).catch(() => console.log('  Warning: As a not found'))
await page.waitForTimeout(600)
await page.screenshot({ path: 'docs/screenshots/04-stories.png', ...full })
console.log('✓ 04-stories.png')

// ── 5. Validate modal ─────────────────────────────────────────────────────────
const validateBtns = page.locator('button').filter({ hasText: /Validate/ })
const count = await validateBtns.count()
console.log(`  Found ${count} Validate/Re-validate buttons`)
if (count > 0) {
  await validateBtns.first().click()
  await page.waitForTimeout(1800)
  await page.screenshot({ path: 'docs/screenshots/05-validate.png', ...full })
  console.log('✓ 05-validate.png')
} else {
  // Dump all button texts for debugging
  const allBtns = await page.locator('button').allTextContents()
  console.log('  All buttons:', allBtns.slice(0, 15).join(' | '))
}

// ── 6. All Stories table ──────────────────────────────────────────────────────
await page.keyboard.press('Escape')
await page.waitForTimeout(300)
await page.locator('nav').locator('button').filter({ hasText: 'Epics' }).click()
await page.waitForTimeout(400)
await page.locator('button:has-text("All Stories")').click()
await page.waitForTimeout(400)
await page.screenshot({ path: 'docs/screenshots/06-all-stories.png', ...full })
console.log('✓ 06-all-stories.png')

await browser.close()
console.log('\nAll screenshots saved to docs/screenshots/')
