#!/bin/bash
set -e
set -x
set -u

if [ "$TRAVIS" != "true" ]; then
  echo "Skipping deploy - this is not running on Travis; skipping."
  exit 0
fi

if [ "$TRAVIS_BRANCH" != "master" ]; then
  echo "Skipping deploy - this is not the master branch; skipping."
  exit 0
fi

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo "Skipping deploy - this is a pull request; skipping."
  exit 0
fi

if [ "$TRAVIS_SECURE_ENV_VARS" != "true" ]; then
  echo "Skipping deploy - this has no access to secure env vars; skipping."
  exit 0
fi

COMMIT_MESSAGE="$(git log --format=%s -n 1)"
if [[ "$COMMIT_MESSAGE" == *"[skip-ci]"* ]]; then
  echo "Commit subject ends with \"[skip-ci]\", skipping."
	exit 0
fi

# configure git to act as the slashxbot
git config user.name "SLASH X BOT"
git config user.email "slashxsocial@gmail.com"

# clone the current prod.slashx.co
git clone https://${GH_TOKEN}@github.com/slashsquad/prod.slashx.co.git prod

# update docs directory
rm -rf prod/docs
cp -r dist prod/docs

# push the new version
cd prod
git add docs
git commit -m "Deploy new version 🚀"
git push origin master
