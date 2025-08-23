#!/usr/bin/env bash
set -euo pipefail
# Convert CRLF→LF
find . -type f ! -path './.git/*' -print0 | while IFS= read -r -d '' f; do
  perl -0777 -pe 's/\r\n/\n/g' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
done
# Replace curly quotes & ellipsis with ASCII
find . -type f ! -path './.git/*' -print0 | while IFS= read -r -d '' f; do
  perl -CSAD -Mutf8 -pe 's/"/"/g; s/"/"/g; s/'/'"'"'/g; s/'/'"'"'/g; s/-/-/g; s/-/-/g; s/.../.../g;' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
done
# Trim trailing spaces
find . -type f ! -path './.git/*' -print0 | while IFS= read -r -d '' f; do
  perl -0777 -pe 's/[ \t]+(\r?\n)/$1/g' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
done
git add -A
echo "Sanitize complete."
