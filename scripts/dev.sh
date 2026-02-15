#!/usr/bin/env bash
set -euo pipefail

cleanup() {
  if [[ -n "${TW_PID:-}" ]] && kill -0 "$TW_PID" 2>/dev/null; then
    kill "$TW_PID" 2>/dev/null || true
    wait "$TW_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM

npm run tw:watch &
TW_PID=$!

bundle exec jekyll serve
