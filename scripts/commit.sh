#!/usr/bin/env bash
set -euo pipefail
MSG=${1:-"chore: update"}
git add -A
git commit -m "$MSG" || true
