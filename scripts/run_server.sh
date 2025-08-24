#!/usr/bin/env bash
set -euo pipefail
PORT=8000

echo "🔎 Checking for processes on port $PORT..."
PIDS=$(lsof -nP -iTCP:$PORT -sTCP:LISTEN -t || true)
if [ -n "$PIDS" ]; then
  echo "⚠️  Killing existing processes on port $PORT: $PIDS"
  kill -9 $PIDS || true
fi

echo "🚀 Starting Kindness API on port $PORT..."
nohup python3 server.py > logs/server.log 2>&1 &
PID=$!
echo "✅ Kindness API running in background (PID: $PID)"
echo "📜 Logs: tail -f logs/server.log"
