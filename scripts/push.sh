#!/usr/bin/env bash
set -euo pipefail
BR=${1:-main}
git push -u origin "$BR"
