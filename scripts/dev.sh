#!/usr/bin/env bash

# Force local-CA mode (.localhost domains). Tailscale mode is never used in
# this repo: this machine exports PORTLESS_TAILSCALE=1 in ~/.zshrc, but the
# tailnet has no HTTPS capability, so portless would exit with an error
# before starting any dev server.
export PORTLESS_TAILSCALE=0
export PORTLESS_FUNNEL=0

# Start portless proxy, capturing output to determine if we started it.
# If the proxy was already running (e.g. from `portless service install`),
# we leave it alone on exit instead of killing it.
OUTPUT=$(portless proxy start 2>&1)
START_EXIT=$?
echo "$OUTPUT"

# Exit if proxy failed to start (config mismatch, sudo denied, etc.)
if [ "$START_EXIT" -ne 0 ]; then
  exit "$START_EXIT"
fi

# Only stop the proxy on exit if we started it.
if ! echo "$OUTPUT" | grep -q "already running"; then
  trap 'portless proxy stop' EXIT
fi

turbo dev
