#!/bin/sh
# Rebuilds ../docs (the static site) without installing Node locally: Vite runs inside Docker.
# Install + build happen on the container's own disk (faster and avoids Windows bind-mount problems).
cd "$(dirname "$0")/.." || exit 1
MSYS_NO_PATHCONV=1 docker run --rm -v "$(pwd):/repo" node:20-alpine sh -c \
  "mkdir /b && cp -r /repo/source /b/source && cd /b/source && npm install --no-audit --no-fund && npm run build && rm -rf /repo/docs && cp -r /b/docs /repo/docs"
