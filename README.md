# PoseGuard landing page

Static GitHub Pages landing page for PoseGuard.

## Files

- `index.html`
- `styles.css`
- `site.js`
- `.nojekyll`
- `assets/icon-192.png`
- `assets/favicon-32.png`
- `assets/apple-touch-icon.png`
- `assets/slide_1.webp`

The page dynamically loads the latest APK download links from:

`https://api.github.com/repos/incident201/poseValidator/releases/latest`

It expects release assets with names containing `offline` and `online`.

## Cache busting

GitHub Pages caches files for a short period. When changing CSS, JavaScript, or images,
update the `v` query parameter on local asset URLs in `index.html` so browsers request
the new files instead of reusing cached copies.
