#!/bin/bash
# Auto-commit vault changes after Write/Edit operations
# Uses git status to find changed files (no stdin parsing needed)

# Determine vault root
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
VAULT_ROOT=$(cd "$SCRIPT_DIR/../.." && pwd)
cd "$VAULT_ROOT" || exit 0

# Vault content directories to auto-commit
DIRS="tasks projects people ideas daily weekly"

# Collect all changed/new files in vault content directories
CHANGED_FILES=()
for DIR in $DIRS; do
  # Modified tracked files
  while IFS= read -r file; do
    [ -n "$file" ] && CHANGED_FILES+=("$file")
  done < <(git diff --name-only -- "$DIR/" 2>/dev/null)

  # Staged files
  while IFS= read -r file; do
    [ -n "$file" ] && CHANGED_FILES+=("$file")
  done < <(git diff --cached --name-only -- "$DIR/" 2>/dev/null)

  # Untracked files
  while IFS= read -r file; do
    [ -n "$file" ] && CHANGED_FILES+=("$file")
  done < <(git ls-files --others --exclude-standard -- "$DIR/" 2>/dev/null)
done

# Exit if nothing to commit
[ ${#CHANGED_FILES[@]} -eq 0 ] && exit 0

# Deduplicate
UNIQUE_FILES=($(printf '%s\n' "${CHANGED_FILES[@]}" | sort -u))

# Stage all changed vault files
git add "${UNIQUE_FILES[@]}"

# Build commit message
if [ ${#UNIQUE_FILES[@]} -eq 1 ]; then
  FILE="${UNIQUE_FILES[0]}"
  FOLDER=$(echo "$FILE" | cut -d'/' -f1)
  FILENAME=$(basename "$FILE" .md)

  # Convert plural folder to singular
  case "$FOLDER" in
    tasks) TYPE="task" ;;
    projects) TYPE="project" ;;
    people) TYPE="person" ;;
    ideas) TYPE="idea" ;;
    daily) TYPE="daily plan" ;;
    weekly) TYPE="weekly summary" ;;
    *) TYPE="$FOLDER" ;;
  esac

  # New or updated?
  if git diff --cached --diff-filter=A --name-only | grep -q "^${FILE}$"; then
    MSG="cos: new $TYPE - $FILENAME"
  else
    MSG="cos: update $TYPE - $FILENAME"
  fi
else
  # Multiple files - summarise
  NEW_COUNT=$(git diff --cached --diff-filter=A --name-only | wc -l | tr -d ' ')
  MOD_COUNT=$(git diff --cached --diff-filter=M --name-only | wc -l | tr -d ' ')
  PARTS=()
  [ "$NEW_COUNT" -gt 0 ] 2>/dev/null && PARTS+=("${NEW_COUNT} new")
  [ "$MOD_COUNT" -gt 0 ] 2>/dev/null && PARTS+=("${MOD_COUNT} updated")
  SUMMARY=$(IFS=', '; echo "${PARTS[*]}")
  MSG="cos: batch commit - ${SUMMARY:-${#UNIQUE_FILES[@]} files}"
fi

git commit -m "$MSG"
git push
exit 0
