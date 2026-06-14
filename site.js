const RELEASE_API_URL = "https://api.github.com/repos/incident201/poseValidator/releases/latest";
const RELEASE_FALLBACK_URL = "https://github.com/incident201/poseValidator/releases/latest";

function findApkAsset(release, flavorName) {
  const flavor = flavorName.toLowerCase();

  return release.assets.find((asset) => {
    const name = asset.name.toLowerCase();

    return (
      name.endsWith(".apk") &&
      (
        name.includes(`_${flavor}_`) ||
        name.includes(`-${flavor}-`) ||
        name.includes(flavor)
      )
    );
  });
}

async function loadLatestRelease() {
  const status = document.getElementById("release-status");
  const offlineButton = document.getElementById("download-offline");
  const onlineButton = document.getElementById("download-online");

  offlineButton.href = RELEASE_FALLBACK_URL;
  onlineButton.href = RELEASE_FALLBACK_URL;

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
    const offlineAsset = findApkAsset(release, "offline");
    const onlineAsset = findApkAsset(release, "online");

    status.textContent = `Latest release: ${release.tag_name}`;

    if (offlineAsset?.browser_download_url) {
      offlineButton.href = offlineAsset.browser_download_url;
    }

    if (onlineAsset?.browser_download_url) {
      onlineButton.href = onlineAsset.browser_download_url;
    }

    if (!offlineAsset || !onlineAsset) {
      status.textContent = `Latest release: ${release.tag_name}. Some APK links were not found automatically.`;
    }
  } catch (error) {
    status.textContent = "Direct APK links could not be loaded. Use the latest GitHub release page.";
  }
}

loadLatestRelease();
