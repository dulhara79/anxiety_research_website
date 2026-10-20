# Updating website assets from Google Drive

The site uses the shared Drive root folder `1rZO2JY0AXn-8hMcWATE3dAFqUXSGwaPd`.
Image slots resolve by **filename inside their designated folder**, not by uploading order:
`images/home`, `images/components`, `images/banners`, `images/system`, and `images/team`.
The final presentation is the newest .pptx inside `documents/5. Final Report & Presentation/Final Presentation PPT`.

## Why updates previously failed

The deployed React bundle stored static Drive IDs. Uploading a replacement creates a new ID and leaves the old one displayed. Google thumbnail and browser caches can also retain thumbnails at a stable URL. The new manifest includes each file's Drive modification timestamp as a cache version.

## Enabling automatic updates (repository administrator)

1. Create a Google Cloud service account with **read-only Drive API** access. Enable the Drive API in the Google Cloud project.
2. Share the top-level research Drive folder (and ensure nested items are readable) with the service account email as **Viewer**. Do not make private participant data publicly available.
3. In GitHub repository Settings → Secrets and variables → Actions, add `GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON` containing the full service-account JSON. Do not commit credentials.
4. After this PR is merged to `main`, run Actions → **Refresh research assets from Drive** → Run workflow once. Scheduled checks then run hourly. When the manifest changes, GitHub commits it to main; the existing deployment pipeline must deploy main for visitors to receive it.

If the secret is not configured, scheduled runs fail safely and will not update the site. Drive assets must be publicly viewable to website visitors; read-only service-account access does not make private files public.

## Replacing images

Upload the new file into the same folder with the same filename (e.g. `team/layathma.jpg`). If uploading a new file with the same name rather than using **Manage versions**, the sync chooses the most recently modified matching image. Avoid ambiguous duplicate filenames, especially in the final presentation folder.

For immediate manual updates, run `npm run drive:sync` locally with the credential and push the generated manifest. Until the workflow is enabled and deployed, changing Drive alone does **not** rebuild the website.

## Limits

This is not instant client-side synchronization; the site updates after the next hourly check, GitHub commit and deployment. Browser refreshing does not replace an older deployed JavaScript bundle. The file ID and modified-time cache key are stable until the manifest refreshes. The schedule may have minor timing delays.
