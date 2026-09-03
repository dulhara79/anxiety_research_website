# Research Website Monorepo Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a safe GitHub Actions workflow that validates `anxiety_research_website/main`, mirrors `research-website/` into `R26-DS-012/apps/research-website/`, and creates or updates one reviewable pull request against the monorepo `main` branch.

**Architecture:** A source-driven GitHub Actions workflow validates the Vite application, checks out the target monorepo with a fine-grained token, rebuilds a deterministic mirror branch from the latest target `main`, and synchronizes only one owned directory. Ownership metadata, path-scope validation, foreign-commit detection, rebase-on-target-move, and `--force-with-lease` prevent unrelated code loss and stale-run overwrites.

**Tech Stack:** GitHub Actions, Bash, Git, GitHub CLI (`gh`), rsync, Node.js 20, npm, Vite

**Spec:** `docs/superpowers/specs/2026-09-03-research-website-monorepo-sync-design.md`

## Global Constraints

- Source repository: `dulhara79/anxiety_research_website`.
- Source branch: `main`.
- Source application root: `research-website/`.
- Target repository: `dulhara79/R26-DS-012`.
- Target base branch: `main`.
- Target mirror root: `apps/research-website/`.
- Target mirror branch: `mirror/research-website/main`.
- Cross-repository secret name: `MONOREPO_SYNC_TOKEN`.
- Never write directly to target `main`.
- Never stage or commit a path outside `apps/research-website/`.
- Never use unrestricted `git push --force`.
- Do not bypass or modify the target repository ruleset from this source workflow.
- Build the source Vite application before any target-repository write.

---

### Task 1: Add the cross-repository synchronization workflow

**Files:**
- Create: `.github/workflows/sync-to-main-repo.yml`

**Interfaces:**
- Consumes: source repository `main`, source directory `research-website/`, secret `MONOREPO_SYNC_TOKEN`.
- Produces: deterministic target branch `mirror/research-website/main`, mirror directory `R26-DS-012/apps/research-website/`, and an open/update PR to target `main`.

- [ ] **Step 1: Add workflow triggers, permissions, concurrency, and constants**

Create `.github/workflows/sync-to-main-repo.yml` with:

```yaml
name: Sync research website to main research repo

on:
  push:
    branches: [main]
  workflow_dispatch:

concurrency:
  group: sync-research-website-to-monorepo
  cancel-in-progress: false

permissions:
  contents: read

env:
  TARGET_REPO: dulhara79/R26-DS-012
  TARGET_BASE: main
  SOURCE_ROOT: research-website
  MIRROR_ROOT: apps/research-website
  MIRROR_BRANCH: mirror/research-website/main
  SYNC_BOT_EMAIL: research-website-sync@users.noreply.github.com
```

- [ ] **Step 2: Validate token and build source before target writes**

Add steps that check out the source, validate `MONOREPO_SYNC_TOKEN`, configure Node.js 20 with npm caching against `research-website/package-lock.json`, run `npm ci`, and run `npm run build` from `research-website/`.

Expected behavior: missing token or failed build exits before the target checkout.

- [ ] **Step 3: Check out target monorepo and establish branch state**

Check out `dulhara79/R26-DS-012` into `monorepo/` with `fetch-depth: 0` and the sync token. Configure Git bot identity, fetch target refs, record the current remote mirror SHA if it exists, and verify every commit on the existing open mirror branch since its merge base with `origin/main` uses `research-website-sync@users.noreply.github.com`.

Expected behavior: a human/foreign commit on the automation branch fails before branch reset or push.

- [ ] **Step 4: Rebuild local mirror branch from latest target main**

Use:

```bash
git checkout -B "$MIRROR_BRANCH" "origin/$TARGET_BASE"
```

Expected behavior: unrelated target changes already merged into `main` are inherited automatically.

- [ ] **Step 5: Validate destination ownership before destructive sync**

Before `rsync --delete`, allow either:

1. no target directory / an empty target directory, or
2. a target `.sync-metadata.json` whose `source_repository` equals `dulhara79/anxiety_research_website`.

Use Python's standard-library `json` module for the ownership check. Any other non-empty directory fails.

- [ ] **Step 6: Mirror only source application files and write provenance**

Run scoped rsync from `source/research-website/` to `monorepo/apps/research-website/` with `--delete` and exclusions for `.git/`, `.github/`, `node_modules/`, `dist/`, `.env`, `.env.*`, caches, and `.DS_Store`.

Then create `.sync-metadata.json` with `source_repository`, `source_branch`, `source_commit`, `source_run_id`, and UTC `synced_at_utc`.

- [ ] **Step 7: Stage and assert exact blast radius**

Run:

```bash
git add -A -- "$MIRROR_ROOT"
CHANGED=$(git diff --cached --name-only)
OUTSIDE=$(printf '%s\n' "$CHANGED" | grep -v "^${MIRROR_ROOT}/" || true)
```

Fail if `OUTSIDE` is non-empty. If the staged diff is empty, set `changed=false` and stop before commit/push/PR steps.

- [ ] **Step 8: Commit, refresh target main, and resolve target movement safely**

Commit with bot identity and source SHA in the message. Fetch target again. If `origin/main` moved since the branch base was created, rebase the single sync commit onto the refreshed `origin/main`. If the rebase conflicts, abort and fail without pushing.

- [ ] **Step 9: Push with compare-and-swap semantics**

If the mirror branch existed at start, push using:

```bash
git push origin "HEAD:refs/heads/$MIRROR_BRANCH" \
  "--force-with-lease=refs/heads/$MIRROR_BRANCH:$REMOTE_MIRROR_SHA"
```

If it did not exist, create it with a normal push.

Expected behavior: a newer remote mirror update causes this run to fail instead of overwriting it.

- [ ] **Step 10: Create or update exactly one target pull request**

Use `gh pr list --repo "$TARGET_REPO" --head "$MIRROR_BRANCH" --base "$TARGET_BASE" --state open` to find an existing PR. Edit it if present; otherwise create it. The body must include the full source SHA, source commit URL, mirror path, and warning that the mirror branch is bot-owned.

Do not merge the PR automatically.

- [ ] **Step 11: Commit workflow implementation**

Commit only `.github/workflows/sync-to-main-repo.yml` with:

```bash
git commit -m "ci: sync research website to monorepo"
```

### Task 2: Verify workflow structure and safety invariants

**Files:**
- Test: `.github/workflows/sync-to-main-repo.yml`

**Interfaces:**
- Consumes: completed workflow from Task 1.
- Produces: evidence that YAML is parseable and critical safety controls are present before PR creation.

- [ ] **Step 1: Parse workflow YAML**

Load the workflow using a YAML parser and verify it parses without syntax errors.

Expected: parse succeeds.

- [ ] **Step 2: Verify trigger and branch constants**

Assert the file contains all exact values:

```text
push -> main
workflow_dispatch
TARGET_REPO: dulhara79/R26-DS-012
TARGET_BASE: main
SOURCE_ROOT: research-website
MIRROR_ROOT: apps/research-website
MIRROR_BRANCH: mirror/research-website/main
```

Expected: all present exactly once in the effective configuration.

- [ ] **Step 3: Verify safety controls**

Assert the workflow contains:

```text
npm ci
npm run build
rsync -a --delete
.sync-metadata.json
git add -A -- "$MIRROR_ROOT"
grep -v "^${MIRROR_ROOT}/"
--force-with-lease
research-website-sync@users.noreply.github.com
gh pr list
gh pr create
```

Assert it does not contain an unrestricted push command matching `git push --force `.

- [ ] **Step 4: Review staged change scope in source repository**

Compare the feature branch against source `main` and verify changed files are limited to:

```text
.github/workflows/sync-to-main-repo.yml
docs/superpowers/specs/2026-09-03-research-website-monorepo-sync-design.md
docs/superpowers/plans/2026-09-03-research-website-monorepo-sync.md
```

Expected: no application code is modified.

### Task 3: Open and inspect the source-repository pull request

**Files:**
- No new files.

**Interfaces:**
- Consumes: `feature/research-website-monorepo-sync`.
- Produces: reviewable PR targeting `anxiety_research_website/main`.

- [ ] **Step 1: Open PR**

Create a PR titled:

```text
ci: sync research website to main research repo
```

The description must summarize validation, destination isolation, deterministic PR behavior, provenance, `force-with-lease`, and the required `MONOREPO_SYNC_TOKEN` setup.

- [ ] **Step 2: Fetch PR diff and verify expected files**

Inspect the PR changed filenames and workflow patch. Confirm there are exactly three changed files and no source application changes.

- [ ] **Step 3: Report target-repository prerequisite clearly**

State that after this source PR is merged, `MONOREPO_SYNC_TOKEN` must exist in `anxiety_research_website` with target Contents read/write and Pull requests read/write. Also state that the target repository's currently global TC-WPN required checks may need separate monorepo ruleset cleanup before a website-only sync PR can merge normally.
