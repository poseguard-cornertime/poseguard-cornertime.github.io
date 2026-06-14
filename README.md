# PoseGuard landing page

Static GitHub Pages landing page for PoseGuard.

## Files

- `index.html`
- `styles.css`
- `.nojekyll`
- `assets/icon-192.png`
- `assets/favicon-32.png`
- `assets/apple-touch-icon.png`
- `assets/slide_1.webp`

APK download links are stored directly in `index.html`. Update the release version and
asset filenames there when publishing a new PoseGuard release. This avoids GitHub API
rate limits in visitors' browsers.

## Cache busting

GitHub Pages caches files for a short period. When changing CSS or images,
update the `v` query parameter on local asset URLs in `index.html` so browsers request
the new files instead of reusing cached copies.
