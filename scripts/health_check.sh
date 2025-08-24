#!/usr/bin/env bash
set -euo pipefail
curl -fsS http://localhost:8000/health | grep -q '"ok": true'
echo "Health OK"
