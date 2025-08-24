#!/usr/bin/env bash
set -euo pipefail

BASE="http://localhost:8000"

# 1) Health
curl -fsS "$BASE/health" >/dev/null

# 2) Submit
sid=$(curl -fsS -X POST "$BASE/submit" -H "Content-Type: application/json" \
  -d '{"content":"Shared a kind word"}' | python3 -c 'import sys,json;print(json.load(sys.stdin)["submission_id"])')

# 3) Verify
vid=$(curl -fsS -X POST "$BASE/verify" -H "Content-Type: application/json" \
  -d "{\"submission_id\":$sid}" | python3 -c 'import sys,json;print(json.load(sys.stdin)["verification_id"])')

# 4) Reward
rid=$(curl -fsS -X POST "$BASE/reward" -H "Content-Type: application/json" \
  -d "{\"verification_id\":$vid}" | python3 -c 'import sys,json;print(json.load(sys.stdin)["reward_id"])')

# 5) Feed shows the submission
curl -fsS "$BASE/feed?limit=10" | grep -q "\"id\": $sid"

echo "✅ Smoke OK — sid=$sid vid=$vid rid=$rid"
