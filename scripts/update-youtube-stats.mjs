import fs from "fs/promises";

const CHANNEL_URL = "https://www.youtube.com/@seamaftab/about";

async function updateYouTubeStats() {
  const response = await fetch(CHANNEL_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",

      "Accept-Language":
        "en-US,en;q=0.9"
    }
  });

  if (!response.ok) {
    throw new Error(
      `YouTube returned ${response.status}`
    );
  }

  const html = await response.text();


  const subscriberMatch =
    html.match(/([0-9,.]+[KMB]?) subscribers/i);

  const videoMatch =
    html.match(/([0-9,]+) videos/i);

  const viewsMatch =
    html.match(/([0-9,]+) views/i);


  if (
    !subscriberMatch &&
    !videoMatch &&
    !viewsMatch
  ) {
    throw new Error(
      "Could not find YouTube statistics."
    );
  }


  const stats = {
    subscribers:
      subscriberMatch?.[1] ?? null,

    videos:
      videoMatch?.[1] ?? null,

    views:
      viewsMatch?.[1] ?? null,

    updatedAt:
      new Date().toISOString()
  };


  await fs.mkdir("data", {
    recursive: true
  });


  await fs.writeFile(
    "data/youtube-stats.json",
    JSON.stringify(stats, null, 2)
  );


  console.log("YouTube statistics updated:");
  console.log(stats);
}


updateYouTubeStats().catch((error) => {
  console.error(error);

  process.exit(1);
});