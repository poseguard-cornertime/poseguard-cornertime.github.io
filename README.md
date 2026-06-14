# PoseGuard landing page

Static landing page for GitHub Pages.

Target repository:

```text
https://github.com/poseguard-cornertime/poseguard.github.io
```

Target site URL:

```text
https://poseguard-cornertime.github.io/poseguard.github.io/
```

If this repository is renamed or moved to an owner named `poseguard` with the repository name `poseguard.github.io`, the site URL will be:

```text
https://poseguard.github.io/
```

## How to publish

1. Copy all files from this archive into the root of the GitHub Pages repository.
2. Commit and push to `main`.
3. Open repository settings.
4. Go to `Pages`.
5. Set source to `Deploy from a branch`.
6. Select `main` and `/root`.
7. Save and wait for GitHub Pages deployment.

## APK download buttons

The page does not hardcode APK filenames. It requests the latest release from:

```text
https://api.github.com/repos/incident201/poseValidator/releases/latest
```

Then it finds APK assets containing:

```text
_offline_
_online_
```

and uses their `browser_download_url` values for the download buttons.

If the API request fails, both buttons fall back to:

```text
https://github.com/incident201/poseValidator/releases/latest
```
