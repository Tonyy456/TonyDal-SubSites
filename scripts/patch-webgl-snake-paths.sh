#!/usr/bin/env bash
# Rewrites root-absolute texture URLs in the webgl-snake Vite bundle so assets load under /subsites/webgl-snake/.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BUNDLE="$ROOT/webgl-snake/assets/index-eb0496a7.js"

if [[ ! -f "$BUNDLE" ]]; then
  echo "error: bundle not found: $BUNDLE" >&2
  exit 1
fi

perl -pi -e '
  s|"/snake.jpg"|"snake.jpg"|g;
  s|"/mario.jpg"|"mario.jpg"|g;
  s|"/right.png"|"right.png"|g;
  s|"/left.png"|"left.png"|g;
  s|"/top.png"|"top.png"|g;
  s|"/bottom.png"|"bottom.png"|g;
  s|"/front.png"|"front.png"|g;
  s|"/back.png"|"back.png"|g;
' "$BUNDLE"

echo "patched $BUNDLE"
