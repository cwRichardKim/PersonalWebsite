#!/usr/bin/env bash
set -euo pipefail

cleanup() {
  if [[ -n "${TW_PID:-}" ]] && kill -0 "$TW_PID" 2>/dev/null; then
    kill "$TW_PID" 2>/dev/null || true
    wait "$TW_PID" 2>/dev/null || true
  fi
  if [[ -n "${JEKYLL_PID:-}" ]] && kill -0 "$JEKYLL_PID" 2>/dev/null; then
    kill "$JEKYLL_PID" 2>/dev/null || true
    wait "$JEKYLL_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM

npm run tw:watch &
TW_PID=$!

bundle exec jekyll serve &
JEKYLL_PID=$!

while true; do
  if ! kill -0 "$TW_PID" 2>/dev/null; then
    if wait "$TW_PID"; then
      TW_STATUS=0
    else
      TW_STATUS=$?
    fi
    if [[ "$TW_STATUS" -ne 0 ]]; then
      echo "Tailwind watch exited with status $TW_STATUS"
      exit "$TW_STATUS"
    fi
    echo "Tailwind watch exited unexpectedly."
    exit 1
  fi

  if ! kill -0 "$JEKYLL_PID" 2>/dev/null; then
    wait "$JEKYLL_PID"
    exit $?
  fi

  sleep 1
done
