#!/usr/bin/env bash
set -euo pipefail

echo "→ Creating directories…"
mkdir -p prompts docs workflows scripts .github branding

echo "→ Writing root files…"
cat > README.md <<'MD'
# The Kindness Collective (TKC)
**TKC** is the community heart of **SPARK**. It’s where awakened people gather to share stories, practice kindness, and co-create projects. TKC uses a symphony of AI agents to orchestrate cross‑platform content, daily live conversations, and a “Kindness River” that weaves TikTok, Instagram, YouTube, Facebook, LinkedIn, and X into one shared flow.

## Why TKC
- People enter through **story and resonance**… TKC is the welcoming hearth.
- **SPARK** measures and amplifies kindness with quests and rewards.
- Together they form a humane prototype of the Agreement Economy.

## What’s inside
- **/prompts**: Production-ready system prompts for the AI agent orchestra.
- **/docs**: Vision, runbooks, platform strategy, SPARK integration, safety.
- **/workflows**: Pipelines for daily Lives, crossposting, analytics loops.
- **/scripts**: Helper scripts for bootstrapping and Git.
- **/branding**: Seed notes for logo and visual language.

## Quickstart
1. Copy `.env.example` to `.env` and fill values as integrations are added.
2. Read `/docs/kindness-hour-runbook.md` and schedule your first Live.
3. Start with two agents: **Orchestrator** and **Repurposer**. Add others over time.

## Principles
- **Kindness first**… safety and compassion are non‑negotiable.
- **Sovereignty**… voice and consent are honored.
- **Co‑creation**… iteration is normal.
- **Measurement without judgment**… SPARK rewards action and growth.

License: MIT (see `LICENSE`).
MD

cat > LICENSE <<'TXT'
MIT License

Copyright (c) 2025 The Kindness Collective

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction…

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND…
TXT

cat > CODE_OF_CONDUCT.md <<'MD'
# Code of Conduct
- Speak with respect. No harassment or hate.
- Obtain consent for recordings, reposts, and quotes.
- Protect vulnerable participants; escalate to moderators when unsure.
- No medical, legal, or financial advice. Share personal experience only.
- Assume good intent and repair when harm occurs.
MD

cat > CONTRIBUTING.md <<'MD'
# Contributing
Ways to contribute:
- Host or co-host a Kindness Hour.
- Share stories, rituals, and practices.
- Build or refine prompts, workflows, or docs.
- Help with moderation and safety.

## Process
1) Create an issue describing your idea.
2) Open a PR linking the issue.
3) Keep changes small and focused.
MD

cat > ROADMAP.md <<'MD'
# Roadmap
## Phase 0 — Ignite
- TikTok Lives (3x/week)
- Orchestrator + Repurposer agents running
- Kindness River as a Notion or Discord hub

## Phase 1 — Weave
- Add Booking, Community, and Insights agents
- Crosspost to IG Reels, YT Shorts, LinkedIn, FB, X
- Launch guest pipeline with consent flows

## Phase 2 — Flow
- Lightweight Kindness Hub web UI that aggregates streams
- SPARK hooks for kindness quests & rewards
- Rotating host roster + contributor program
MD

cat > .gitignore <<'GIT'
node_modules
*.log
.next
.venv
__pycache__/
.env
.env.*
.DS_Store
GIT

cat > .env.example <<'ENV'
# Fill these as integrations are added. Do not commit real secrets.
RESTREAM_KEY=
YT_API_KEY=
TIKTOK_COOKIE_OR_OAUTH=
IG_ACCESS_TOKEN=
FB_PAGE_TOKEN=
X_BEARER_TOKEN=
NOTION_API_KEY=
NOTION_DB_ID=
ENV

echo "→ Writing prompts…"
cat > prompts/orchestrator.system.md <<'MD'
You are the **Orchestrator Agent** for TKC. Plan and route the daily content rhythm across TikTok, Instagram, YouTube, Facebook, LinkedIn, and X. Produce schedules, guest lineups, show briefs, and task tickets for other agents.

Objectives:
- Maintain a rolling 30‑day calendar of Lives, themes, and guests
- Create show briefs: hook, beats, prompts, CTAs
- File tasks: Repurposer (cut lists), Booking (outreach), Community (comment prompts)

Constraints:
- Honor consent, safety, and do‑not‑contact lists
- Avoid medical/financial claims
- Prioritize kindness, sovereignty, and clarity
MD

cat > prompts/repurposer.system.md <<'MD'
You are the **Repurposer Agent**. From one Live, create within 2 hours:
- 5–10 vertical clips with titles and suggested thumbnails
- 1 LinkedIn carousel outline
- 1 X thread (6–10 posts)
- 1 newsletter draft with key insights and upcoming guests
- A metadata sheet: timestamps, speakers, consent flags, sensitive topics
MD

cat > prompts/community.system.md <<'MD'
You are the **Community Agent**. Nurture conversations with warmth and boundaries.

Daily loop:
- Post 1 question per platform inviting story-sharing
- Reply to top 20 comments with reflective prompts
- Surface 5 highlights to the Orchestrator for the next show
MD

cat > prompts/connector.system.md <<'MD'
You are the **Connector Agent**. Spot resonance between communities and propose low-friction bridges:
- Co‑hosts, stitched clips, playlist swaps, kindness quests
Weekly: identify 10 collaborators per platform and propose 3 concrete bridges.
MD

cat > prompts/booking.system.md <<'MD'
You are the **Booking Agent**. Manage guest outreach, scheduling, and prep.

Deliverables:
- Outreach email/DM
- Guest brief (topic, flow, tech check, consent link)
- Day‑of reminders and post‑show gratitude note
MD

cat > prompts/live-producer.system.md <<'MD'
You are the **Live Producer Agent**. Create a run‑of‑show, manage overlays/titles, and track beats in real time for Repurposer.

Checklist:
- 10s cold open hook
- 3‑act beats with story prompts
- CTAs to TKC community and SPARK quests
- Closing reflection + teaser
MD

cat > prompts/insights.system.md <<'MD'
You are the **Insights Agent**. Transcribe Lives, summarize themes, and map needs/conflicts using NVC and Strategic Intervention.

Outputs:
- 1‑page show summary with quotes
- Needs map + recommended interventions
- 3 topic ideas from trend movement
MD

cat > prompts/compliance.system.md <<'MD'
You are the **Compliance Agent**. Review content for safety, claims, consent, and platform policies. Flag risks and suggest safe rewrites.

Scope:
- Avoid medical/financial claims and personal data exposure
- Respect platform community guidelines and ad rules
MD

cat > prompts/sparkle-scribe.system.md <<'MD'
You are the **Sparkle Scribe Agent**. Translate stories into SPARK‑friendly “kindness quests.”

Per quest:
- Title + 1‑sentence purpose
- Steps and simple proof (photo, text reflection, witness)
- Reward suggestion + why it matters
MD

echo "→ Writing docs…"
cat > docs/vision.md <<'MD'
# TKC Vision
TKC is a sanctuary for awakened humans to practice kindness and co-create. We broadcast daily resonance, weave communities across platforms, and translate inspiration into action through SPARK.
MD

cat > docs/platform-strategy.md <<'MD'
# Platform Strategy
**TikTok**: Daily Live home base.  
**Instagram**: Reels + carousels; behind-the-scenes.  
**YouTube**: Shorts + long-form archives; playlists by theme/guest.  
**LinkedIn**: Carousels/threads; professional reflections; collaborator calls.  
**Facebook**: Group discussion; Live mirroring.  
**X**: Threads; real-time conversation.
MD

cat > docs/kindness-hour-runbook.md <<'MD'
# Kindness Hour — Runbook
Cadence: start 3×/week, grow to daily.
Flow:
1) Hook (10s)  2) Check‑in Q  3) Story + reflection  4) Collective wisdom  
5) Kindness quest CTA  6) Gratitude + teaser

Roles:
- Producer tracks timestamps
- Community collects highlights
- Repurposer clips within 2 hours
MD

cat > docs/ai-orchestra.md <<'MD'
# AI Orchestra
Modular team that plans, produces, repurposes, connects, and learns.

- Orchestrator: calendar + briefs
- Live Producer: run-of-show
- Repurposer: clips + crossposting
- Community: conversations
- Connector: collaborations
- Booking: guests + consent
- Insights: analysis + trends
- Compliance: safety
- Sparkle Scribe: kindness quests

RACI: Orchestrator owns schedule; Producer leads Live; Repurposer owns post.
MD

cat > docs/spark-integration.md <<'MD'
# SPARK Integration
Map stories to **kindness quests** and reward effort/learning.

Examples:
- Share a courage story → reflection + 1 witness = micro‑reward
- Welcome a newcomer → screenshot + short note = micro‑reward
- Host a circle → recording + consent log = larger reward
MD

cat > docs/community-guidelines.md <<'MD'
# Community Guidelines
- Kindness, sovereignty, consent
- Trauma-aware; invite resourcing and breaks
- No diagnosis/prescriptions; share personal experience only
MD

cat > docs/brand-voice.md <<'MD'
# Brand Voice
Tone: warm, invitational, clear.  
Pillars:
- Awakening is normal and messy
- Kindness is a practice
- We grow faster together
MD

cat > docs/guest-pipeline.md <<'MD'
# Guest Pipeline
1) Outreach with brief + consent link  
2) Scheduling + tech check  
3) Day-of run-of-show  
4) Post-show gratitude + highlights
MD

cat > docs/content-calendar.md <<'MD'
# Content Calendar — Starter
Mon: Awakening stories
Tue: Practices that help
Wed: Relationships & boundaries
Thu: Purpose & creativity
Fri: Shadow with kindness
Sat: Community showcase
Sun: Restorative circle
MD

cat > docs/moderation-and-safety.md <<'MD'
# Moderation & Safety
- Two moderators present during Lives
- Clear escalation path for distress
- Remove harmful comments + follow up with care
- Store consent logs privately
MD

cat > docs/kindness-river-architecture.md <<'MD'
# Kindness River — Architecture (v0)
Goal: unify streams from TikTok, IG, YT, FB, LinkedIn, X into a single view without replacing platforms.

flow (v0):
Source → Notifier (webhooks/API) → Normalizer → Tagger → Aggregator DB
→ Kindness Hub UI + Insights Agent → Topics & Quests
MD

cat > docs/notion-schema.md <<'MD'
# Notion Database Schema (v1)
## 1) Content Calendar
- Name (Title), Type (Select), Status (Select), Air Date (Date), Window (Select)
- Hosts (People), Guest (Relation → Guests), Platforms (Multi-select)
- Episode (Relation → Episodes), SPARK Quest (Relation → Quests)
- Cut-list URL (URL), Consent Verified (Checkbox), Assets (Relation), Notes
## 2) Episodes
- Name, Air Date/Time, Run of Show, Hosts, Guest, Timestamps, Transcript URL, Insights, Consent Pack
## 3) Guests
- Name, Handle, Email/DM, Bio, Topics, Availability, Episodes, Consent Signed
## 4) Assets
- Name, Type, Storage URL, Episode, Platform, Publish Status
## 5) Insights
- Name, Episode, Summary, Quotes, Themes, Next Topics
## 6) Consents
- Name, Episode, Guest, Signed At, Storage URL
## 7) Quests (SPARK)
- Name, Purpose, Steps, Proof Type, Reward, Episode
## 8) Tasks
- Name, Type, Assignee, Due, Status, Linked Episode
MD

cat > docs/content-calendar-2w.md <<'MD'
# Two-Week Content Calendar Seed (America/Chicago)
Window: Aug 25 – Sep 7, 2025
# …(full two-week plan as provided earlier; keep as-is)…
MD

echo "→ Workflows…"
cat > workflows/daily-live-pipeline.md <<'MD'
# Daily Live Pipeline
Before:
- Orchestrator publishes show brief and invites guest
- Producer sets overlays/titles/beats
During:
- Producer tracks timestamps
- Community prompts comments and gathers highlights
After (within 2 hours):
- Repurposer generates clips, threads, and newsletter draft
- Insights publishes summary and trend notes
- Sparkle Scribe posts a kindness quest
MD

cat > workflows/crossposting-pipeline.md <<'MD'
# Crossposting Pipeline
Input: recorded Live + timestamps + consent
Steps:
1) Cut vertical clips
2) Auto-caption + proof
3) Apply platform templates (titles/tags)
4) Schedule publishing over 48 hours
MD

cat > workflows/analytics-and-insight-loop.md <<'MD'
# Analytics & Insight Loop
- Track engagement, saves, and comment quality
- Identify emergent themes
- Recommend 3 next topics each week
MD

echo "→ Scripts…"
cat > scripts/oi_tasks.md <<'MD'
# OI Tasks
## First push:
git add -A
git commit -m "feat: apply TKC blueprint"
git push -u origin main
## Update cycle:
./scripts/commit.sh "chore: update docs"
./scripts/push.sh
MD

cat > scripts/commit.sh <<'SH'
#!/usr/bin/env bash
set -euo pipefail
MSG=${1:-"chore: update"}
git add -A
git commit -m "$MSG" || true
SH

cat > scripts/push.sh <<'SH'
#!/usr/bin/env bash
set -euo pipefail
BR=${1:-main}
git push -u origin "$BR"
SH
chmod +x scripts/*.sh || true

echo "→ GitHub templates…"
mkdir -p .github
cat > .github/ISSUE_TEMPLATE.md <<'MD'
## Summary
## Why now
## Proposed change
## Risks and safety
## Definition of done
MD

cat > .github/PULL_REQUEST_TEMPLATE.md <<'MD'
## What changed
## Why it matters
## Safety and consent checks
## Screenshots
## Linked issues
MD

echo "→ Branding…"
cat > branding/logo-notes.md <<'MD'
# Logo Notes
Simple circle with subtle radiance. Warm gold on indigo.
MD

cat > branding/typography-and-palette.md <<'MD'
# Typography & Palette
Headlines: clean modern sans
Body: warm humanist sans
Palette: Midnight indigo, soft gold, gentle cream, leaf green accents
MD

echo "→ Commit & push…"
git add -A
git commit -m "feat: apply TKC blueprint (prompts, docs, workflows, scripts, branding)" || true
git push -u origin main
echo "✅ Done."
