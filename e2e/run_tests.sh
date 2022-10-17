#!/bin/bash

set -ueo pipefail

#environment
env=$1

#cucumber tag
tag=$2

export COMMON_CONFIG_FILE=env/common.env
export NODE_ENV=$env

#run cucumber tests & on failure run postcucumber
#yarn run cucumber:$env --profile $tag || yarn run postcucumber
if ! yarn run cucumber:$env --profile $tag; then
  yarn run postcucumber;
  exit 1;
fi