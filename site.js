const RELEASE_API_URL = "https://api.github.com/repos/incident201/poseValidator/releases/latest";
const LATEST_RELEASE_URL = "https://github.com/incident201/poseValidator/releases/latest";

function findApkAsset(release, marker) {
  if (!release || !Array.isArray(release.assets)) {
    return null;
  }

  const normalizedMarker = marker.toLowerCase();

  return release.assets.find((asset) => {
    const name = String(asset.name || "").toLowerCase();
    return name.includes(normalizedMarker) && name.endsWith(".apk");
  }) || null;
}

async function loadLatestRelease() {
  const status = document.getElementById("release-status");
  const offlineButton = document.getElementById("download-offline");
  const onlineButton = document.getElementById("download-online");

  try {
    const response = await fetch(RELEASE_API_URL, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const release = await response.json();
    const offlineAsset = findApkAsset(release, "_offline_");
    const onlineAsset = findApkAsset(release, "_online_");

    if (release.tag_name) {
      status.textContent = `Latest release: ${release.tag_name}`;
    } else {
      status.textContent = "Latest release loaded.";
    }

    if (offlineAsset && offlineAsset.browser_download_url) {
      offlineButton.href = offlineAsset.browser_download_url;
      offlineButton.setAttribute("download", "");
    }

    if (onlineAsset && onlineAsset.browser_download_url) {
      onlineButton.href = onlineAsset.browser_download_url;
      onlineButton.setAttribute("download", "");
    }

    if (!offlineAsset || !onlineAsset) {
      status.textContent = `${status.textContent} Direct APK links were not found, so buttons may open the release page instead.`;
    }
  } catch (error) {
    console.warn("Could not load latest release", error);
    status.textContent = "Could not load direct APK links. Buttons open the latest GitHub release page.";
    offlineButton.href = LATEST_RELEASE_URL;
    onlineButton.href = LATEST_RELEASE_URL;
  }
}

loadLatestRelease();
