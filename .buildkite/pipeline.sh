#!/bin/bash

set -euo pipefail

PIPELINE=${PIPELINE:-build}

function build() {
  cat <<EOF
steps:
  - name: ":desktop_computer: Automation"
  - command: "./scripts/buildkite-automation.sh"
EOF
}

$PIPELINE