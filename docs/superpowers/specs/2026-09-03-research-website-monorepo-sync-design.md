# Research Website Monorepo Sync Design

## Context

`dulhara79/anxiety_research_website` is the development repository for the research website. The deployable Vite/React application is rooted at `research-website/`.

`dulhara79/R26-DS-012` is the protected research monorepo. Application surfaces already live under `apps/`, so the website will be mirrored to `apps/research-website/`.

The monorepo already uses automated component mirrors. The website sync should follow the same operational model while protecting unrelated research code from accidental modification.

## Goal

After a commit or pull request is merged into `anxiety_research_website/main`, automatically validate the website, mirror the current website source into `R26-DS-012/apps/research-website/`, and create or update a pull request targeting `R26-DS-012/main`.

The automation must never directly push to the target `main` branch.

## Source and destination

- Source repository: `dulhara79/anxiety_research_website`
- Source branch: `main`
- Source application root: `research-website/`
- Target repository: `dulhara79/R26-DS-012`
- Target branch: `main`
- Target mirror root: `apps/research-website/`
- Target automation branch: `mirror/research-website/main`

Only the contents of `research-website/` are mirrored. Repository-root files from the source repository are not copied into the monorepo.

## Trigger model

The workflow runs on:

1. `push` to source `main`, which covers direct commits and merged pull requests.
2. `workflow_dispatch` for controlled manual retries.

The workflow uses a concurrency group with `cancel-in-progress: false`, so rapid source pushes are serialized rather than racing.

## Validation before synchronization

Before any target-repository write, the workflow must:

1. Check out the exact source commit that triggered the run.
2. Use Node.js 20.
3. Run `npm ci` in `research-website/`.
4. Run `npm run build` in `research-website/`.
5. Stop immediately if the cross-repository token is missing.

A broken website must not generate a target sync branch or pull request.

## Authentication

The source repository must define an Actions secret named `MONOREPO_SYNC_TOKEN`.

Use a fine-grained GitHub token limited to `dulhara79/R26-DS-012` with the minimum permissions required for this workflow:

- Contents: Read and write
- Pull requests: Read and write
- Metadata: Read

The built-in source-repository `GITHUB_TOKEN` remains read-only and is not used for cross-repository writes.

## Mirror ownership and deletion safety

`apps/research-website/` becomes an automation-owned mirror.

On the first sync, the workflow may create the directory because it does not currently exist.

On later syncs, if the destination is non-empty but does not contain a valid `.sync-metadata.json` manifest identifying `dulhara79/anxiety_research_website` as its source, the workflow must abort before running destructive synchronization. This prevents a misconfigured workflow from deleting a manually maintained directory that merely happens to have the same name.

Once ownership is established, source deletions are intentionally propagated inside `apps/research-website/` using scoped `rsync --delete`. Deletion is never allowed outside that mirror root.

The mirror excludes generated, secret, dependency, and machine-local content:

- `.git/`
- `.github/`
- `node_modules/`
- `dist/`
- `.env` and `.env.*`
- common caches
- `.DS_Store`

## Provenance

Every synchronized tree contains `apps/research-website/.sync-metadata.json` recording at least:

- source repository
- source branch
- source commit SHA
- source run ID
- synchronization timestamp

This makes the target copy traceable to an exact source revision.

## Target branch lifecycle

The workflow uses one deterministic target branch: `mirror/research-website/main`.

For every run:

1. Fetch the latest `R26-DS-012/main`.
2. Record the current remote mirror-branch SHA, if the mirror branch exists.
3. Refuse to overwrite an open mirror branch that contains commits not authored by the website sync bot.
4. Rebuild the local mirror branch from the latest target `main`.
5. Apply only the website mirror changes.
6. Commit the synchronized tree.
7. Re-fetch target `main`; if it moved during the run, rebase the mirror commit onto the new `main` and fail safely if a conflict occurs.
8. Push with `--force-with-lease` against the previously observed mirror-branch SHA. Never use an unrestricted force push.

This design preserves newly merged monorepo work and prevents stale jobs from overwriting a newer mirror branch.

## Change-scope protection

The workflow stages only `apps/research-website/` and then explicitly inspects the staged filenames. If any staged path falls outside `apps/research-website/`, the workflow fails before commit or push.

No existing monorepo component directory, root file, workflow, or documentation file is modified by the mirror operation.

## Pull request lifecycle

The workflow searches for an open pull request whose head is `mirror/research-website/main` and base is `main`.

- If one exists, the workflow updates its title and body after pushing the new source revision.
- If none exists, the workflow creates one.
- If a previous sync PR was merged or closed, the next source change creates a new PR.

The PR body identifies the exact source commit and clearly states that only `apps/research-website/` is automation-owned and synchronized.

The workflow never automatically merges the target pull request.

## Existing monorepo protections

`R26-DS-012/main` is protected and requires review/code-owner policy. The website workflow must not bypass or weaken these controls.

The current monorepo ruleset also globally requires status contexts named `Validate TC-WPN mirror` and `Change scope`, while the workflow that emits those checks is path-filtered to the TC-WPN component. A website-only pull request can therefore be created correctly but may remain blocked from normal merge until the monorepo protection/check configuration is generalized. This source-repository change will not spoof those statuses or modify the target ruleset.

## Failure behavior

The workflow must fail without modifying the target remote when any of these conditions occurs:

- website build fails
- sync token is missing or invalid
- existing target mirror directory has no valid ownership manifest
- manual/foreign commits are detected on the bot-owned mirror branch
- staged changes escape the mirror root
- target `main` changes in a way that causes a rebase conflict
- the mirror branch changed since the workflow observed it, causing the force-with-lease to fail
- GitHub rejects branch push or PR creation/update

A failed run is retriable through `workflow_dispatch` after the underlying issue is corrected.

## Success criteria

The implementation is complete when:

1. A workflow exists at `.github/workflows/sync-to-main-repo.yml`.
2. It triggers on source `main` pushes and manual dispatch.
3. It validates the Vite application before target writes.
4. It mirrors only `research-website/` into `R26-DS-012/apps/research-website/`.
5. It uses deterministic branch/PR behavior and serialized runs.
6. It protects unrelated target code through scoped staging and path validation.
7. It protects the mirror branch from stale or manual overwrite through authorship checks and force-with-lease.
8. It records source provenance.
9. The workflow YAML and shell logic pass local/static verification.
10. The implementation is delivered through a pull request to `anxiety_research_website/main`.
