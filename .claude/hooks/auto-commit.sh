#!/bin/bash
# Auto-commit vault changes after Write/Edit operations

FILE_PATH=$(node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{try{const j=JSON.parse(d);console.log(j?.tool_input?.file_path||j?.tool_input?.filePath||'');}catch(e){console.log('');}});")

# Exit if no file path
if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Get relative path from vault root (normalize backslashes for Windows)
# Fall back to deriving vault root from the file path itself if CLAUDE_PROJECT_DIR is unset
if [ -n "$CLAUDE_PROJECT_DIR" ]; then
  VAULT_ROOT=$(echo "$CLAUDE_PROJECT_DIR" | tr '\\' '/')
elif [ -n "${BASH_SOURCE[0]}" ]; then
  # Derive vault root from this script's location (.claude/hooks/auto-commit.sh)
  SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
  VAULT_ROOT=$(cd "$SCRIPT_DIR/../.." && pwd)
else
  FILE_PATH_FWD=$(echo "$FILE_PATH" | tr '\\' '/')
  # Walk up from file until we find .git
  DIR="$FILE_PATH_FWD"
  while [ "$DIR" != "/" ] && [ "$DIR" != "." ]; do
    DIR=$(dirname "$DIR")
    if [ -d "$DIR/.git" ]; then
      VAULT_ROOT="$DIR"
      break
    fi
  done
fi
FILE_PATH=$(echo "$FILE_PATH" | tr '\\' '/')
REL_PATH="${FILE_PATH#$VAULT_ROOT/}"

# Only auto-commit vault content directories
case "$REL_PATH" in
  tasks/*|projects/*|people/*|ideas/*|daily/*|weekly/*)
    ;;
  *)
    exit 0
    ;;
esac

# Extract type and filename
FOLDER=$(echo "$REL_PATH" | cut -d'/' -f1)
FILENAME=$(basename "$REL_PATH" .md)

# Convert plural folder to singular for commit message
case "$FOLDER" in
  tasks) TYPE="task" ;;
  projects) TYPE="project" ;;
  people) TYPE="person" ;;
  ideas) TYPE="idea" ;;
  daily) TYPE="daily plan" ;;
  weekly) TYPE="weekly summary" ;;
  *) TYPE="$FOLDER" ;;
esac

cd "$VAULT_ROOT" || exit 0

# Check if file has changes
if git diff --quiet "$FILE_PATH" 2>/dev/null && git diff --cached --quiet "$FILE_PATH" 2>/dev/null; then
  # Check if it's a new untracked file
  if ! git ls-files --error-unmatch "$FILE_PATH" 2>/dev/null; then
    git add "$FILE_PATH"
    git commit -m "cos: new $TYPE - $FILENAME"
  fi
else
  git add "$FILE_PATH"
  git commit -m "cos: update $TYPE - $FILENAME"
fi

exit 0
