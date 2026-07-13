export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "PulseComp",
  slug: "competitor-pulse",
  tagline: "Spot what your competitor changed",
  description: "Paste an old and new version of a competitor's page or copy; get a diff of what moved - pricing, claims, features. For founders who keep an eye on the market.",
  toolTitle: "Diff versions",
  resultLabel: "Your diff",
  ctaLabel: "Compare",
  features: [
  "Added / removed lines",
  "Pricing watch",
  "Claim shifts",
  "Copy-ready"
],
  inputs: [
  {
    "key": "before",
    "label": "Previous version",
    "type": "textarea",
    "placeholder": "Starter $9 - 1 project\nPro $29 - 5 projects"
  },
  {
    "key": "after",
    "label": "Current version",
    "type": "textarea",
    "placeholder": "Starter $12 - 1 project\nPro $29 - 5 projects\nTeam $99 - unlimited"
  }
] as InputField[],
  systemPrompt: "You are a competitive analyst. Given a before and after version of a competitor page, produce a clean diff: added lines, removed lines, and a one-line note on what strategic change it signals (e.g. price hike, new tier).",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "Unlimited"
  },
  {
    "tier": "Pro",
    "price": "$15/mo",
    "desc": "Saved rivals, alerts"
  },
  {
    "tier": "Team",
    "price": "$39/mo",
    "desc": "Weekly digest, API"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const before = (inputs['before'] || '').split(/\n/).map(s => s.trim()).filter(Boolean)
  const after = (inputs['after'] || '').split(/\n/).map(s => s.trim()).filter(Boolean)
  const bset = new Set(before), aset = new Set(after)
  const added = after.filter(l => !bset.has(l))
  const removed = before.filter(l => !aset.has(l))
  let out = 'COMPETITOR DIFF\n\n'
  out += 'ADDED (' + added.length + '):\n' + (added.map(l => '  + ' + l).join('\n') || '  (none)') + '\n\n'
  out += 'REMOVED (' + removed.length + '):\n' + (removed.map(l => '  - ' + l).join('\n') || '  (none)')
  return out + '\n\n--- (Mock line diff. Add OPENAI_API_KEY for semantic change summary.)'
}
}
