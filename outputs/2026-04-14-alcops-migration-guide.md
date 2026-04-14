---
type: output
created: 2026-04-14
title: ALCops Migration Guide for Developers
source: https://alcops.dev/docs/lintercop-migration/
---

# Migrating from BusinessCentral.LinterCop to ALCops

A step-by-step guide for migrating an AL project from `BusinessCentral.LinterCop` to the ALCops analyzer suite.

## Background

ALCops reorganises LinterCop's rules across **six specialised analyzers**:

| Analyzer | Prefix | Covers |
|---|---|---|
| ApplicationCop | `AC` | Conventions, labels, permissions, UX |
| DocumentationCop | `DC` | XML docs, comments |
| FormattingCop | `FC` | Style, formatting, visual consistency |
| LinterCop | `LC` | Complexity, modern AL patterns, code quality |
| PlatformCop | `PC` | Platform correctness, runtime safety, API |
| TestAutomationCop | `TC` | Test code structure |

Because rules have been renumbered (e.g. old `LC0001` → new `PC0001`), every place a rule ID appears must be reviewed: ruleset file, `app.json`, `#pragma` directives, and VSCode settings.

---

## Step 1 — Install the ALCops extension

1. Uninstall the `BusinessCentral.LinterCop` extension if present.
2. In VSCode: `Ctrl+Shift+X` → search **"ALCops"** → Install.
   Or from a terminal:
   ```
   code --install-extension Arthurvdv.alcops
   ```
3. Reload VSCode (`Ctrl+Shift+P` → **Developer: Reload Window**).
4. The ALCops item in the status bar lets you toggle which cops are active. Leave them all on for now — you will disable rules via ruleset, not by disabling entire analyzers.

The extension auto-downloads the analyzer DLLs on first use.

---

## Step 2 — Update VSCode workspace settings

Open the workspace `.vscode/settings.json`.

### Remove the old LinterCop analyzer entry

Look for any line referencing `BusinessCentral.LinterCop.dll` inside `al.codeAnalyzers` and delete it.

### Add the ALCops analyzers

If you used the ALCops extension install (Step 1), you do **not** need to list the DLLs manually — the extension injects them. Skip to Step 3.

For manual / CLI / build-server setups, add the following (keep `${CodeCop}` / `${UICop}` if you already used them):

```json
"al.codeAnalyzers": [
    "${CodeCop}",
    "${UICop}",
    "${analyzerFolder}ALCops.ApplicationCop.dll",
    "${analyzerFolder}ALCops.DocumentationCop.dll",
    "${analyzerFolder}ALCops.FormattingCop.dll",
    "${analyzerFolder}ALCops.LinterCop.dll",
    "${analyzerFolder}ALCops.PlatformCop.dll",
    "${analyzerFolder}ALCops.Common.dll"
]
```

**`ALCops.Common.dll` is mandatory** — it is a shared dependency of every cop. Builds fail silently or produce missing-type errors without it.

### Remove LinterCop-specific VSCode settings

Delete any keys starting with `bcLinterCop.` or similar from the workspace settings. These are replaced by `ALCops.json` (Step 3) and the ruleset file (Step 4).

---

## Step 3 — Replace `LinterCop.json` with `ALCops.json`

If the project has a `LinterCop.json` at its root, it needs to be replaced.

1. Create a new file `ALCops.json` at the project root (next to `app.json`).
2. Use this as the starting template — enable each cop you want active:

   ```json
   {
       "analyzers": {
           "ApplicationCop":    { "enabled": true },
           "DocumentationCop":  { "enabled": true },
           "FormattingCop":     { "enabled": true },
           "LinterCop":         { "enabled": true },
           "PlatformCop":       { "enabled": true },
           "TestAutomationCop": { "enabled": true }
       }
   }
   ```

3. Review the old `LinterCop.json` for any custom thresholds or rule-specific settings. Most LinterCop config keys do not carry over 1:1 — the equivalent control in ALCops is the ruleset action (Step 4). Where LinterCop used numeric thresholds (e.g. maintainability index cutoffs), ALCops generally splits these into two separate rules at fixed severities (e.g. LC0007 info / LC0008 warning) that you enable or disable individually.
4. Delete `LinterCop.json`.
5. Reload the VSCode window after changes to `ALCops.json`.

---

## Step 4 — Update `acora.ruleset.json`

Every `LCxxxx` entry in the ruleset must be remapped to its new prefix.

### Procedure

1. Open `acora.ruleset.json`.
2. For each rule ID starting with `LC`, consult the **full mapping table** at <https://alcops.dev/docs/lintercop-migration/> and replace with the new ID.
3. Keep the `action` value as-is (`None` / `Info` / `Warning` / `Error` / `Hidden`).
4. Add a short `justification` noting the old code, so future-you can audit the migration.

### Example

**Before:**
```json
{
    "name": "Acora Ruleset",
    "rules": [
        { "id": "LC0001", "action": "Warning" },
        { "id": "LC0004", "action": "None" },
        { "id": "LC0021", "action": "Error" }
    ]
}
```

**After:**
```json
{
    "name": "Acora Ruleset",
    "rules": [
        { "id": "PC0001", "action": "Warning", "justification": "was LC0001" },
        { "id": "AC0001", "action": "None",    "justification": "was LC0004" },
        { "id": "AC0004", "action": "Error",   "justification": "was LC0021" }
    ]
}
```

### Watch out for split / merged rules

- **`LC0003` and `LC0012`** (hardcoded object IDs) are now a single rule — `LC0003`. Deduplicate.
- **`LC0009` / `LC0010`** (complexity + maintainability combined) are now four separate rules:
  Maintainability `LC0007` (info) / `LC0008` (warning); Cyclomatic `LC0009` (info) / `LC0010` (warning). Pick whichever severities you want.
- **`LC0044`** (TransferFields) is split into `PC0020` (type mismatch) and `PC0021` (name mismatch). Add both.

### Unmapped rules — decide per project

These legacy codes have **no direct ALCops equivalent**. Remove them from the ruleset and note if the check still matters:

- `LC0029`
- `LC0058`
- `LC0091` — "Translatable texts should be translated"
- `LC0092` — "Names must match pattern restrictions"

---

## Step 5 — Update `app.json` `suppressWarnings`

```json
// Before
"suppressWarnings": ["LC0001", "LC0004"]

// After
"suppressWarnings": ["PC0001", "AC0001"]
```

Use the same mapping table as Step 4. Drop any entries for unmapped rules (Step 4, end).

---

## Step 6 — Update `#pragma` directives in AL code

Search the entire project (VSCode: `Ctrl+Shift+F`) for:

```
#pragma warning disable LC
```

For each hit, replace `LC` with the new analyzer prefix for that rule. Also update the matching `#pragma warning restore LC...` line.

**Before:**
```al
#pragma warning disable LC0001
table 50100 MyTable { ... }
#pragma warning restore LC0001
```

**After:**
```al
#pragma warning disable PC0001
table 50100 MyTable { ... }
#pragma warning restore PC0001
```

Do not leave a mix of old and new IDs — an unmapped `LC` pragma becomes a silent no-op and its warning will light up everywhere it used to be suppressed.

---

## Step 7 — Verify the build

1. Reload VSCode (`Ctrl+Shift+P` → **Developer: Reload Window**).
2. Run a full compile (`Ctrl+Shift+P` → **AL: Package**) or `AL: Compile` on the workspace.
3. Review the Problems pane:
   - **Expected**: the same *kinds* of warnings you had before, under new IDs.
   - **Investigate**: any warning that wasn't appearing before — it is usually either (a) a rule you forgot to suppress in the new ruleset, or (b) a pragma you missed renaming.
4. Commit the migration as a single changeset so reviewers can diff the ID renames in isolation.

---

## Migration checklist

- [ ] Uninstall `BusinessCentral.LinterCop`, install `ALCops`
- [ ] `.vscode/settings.json` — remove old analyzer, add new DLLs if manual
- [ ] Create `ALCops.json` at project root
- [ ] Delete `LinterCop.json`
- [ ] Remap every ID in `acora.ruleset.json`
- [ ] Remap every ID in `app.json` `suppressWarnings`
- [ ] Remap every `#pragma warning disable/restore LCxxxx` in `.al` files
- [ ] Handle split rules (`LC0009`/`LC0010`, `LC0044`)
- [ ] Handle merged rules (`LC0003`/`LC0012`)
- [ ] Decide what to do with unmapped rules (`LC0029`, `LC0058`, `LC0091`, `LC0092`)
- [ ] Full compile and review Problems pane
- [ ] Commit as one changeset

---

## References

- Migration & full rule mapping table: <https://alcops.dev/docs/lintercop-migration/>
- Analyzer reference: <https://alcops.dev/docs/analyzers/>
- Configuration reference: <https://alcops.dev/docs/getting-started/configuration/>
- VSCode install: <https://alcops.dev/docs/getting-started/vscode/>
