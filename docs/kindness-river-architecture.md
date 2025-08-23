# Kindness River - Architecture (v0)
Goal: unify streams from TikTok, IG, YT, FB, LinkedIn, X into a single view without replacing platforms.

flow (v0):
Source → Notifier (webhooks/API) → Normalizer → Tagger → Aggregator DB
→ Kindness Hub UI + Insights Agent → Topics & Quests
