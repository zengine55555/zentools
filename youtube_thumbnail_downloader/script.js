    function getThumbnail() {

      const url = document.getElementById("videoUrl").value;

      const videoId = extractVideoId(url);



      if (videoId) {

        const thumbnailContainer = document.getElementById("thumbnailContainer");

        thumbnailContainer.innerHTML = `

          <div class="thumbnail-item">

            <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="HQ Thumbnail" />

            <button onclick="downloadThumbnail('${videoId}', 'hq')">Download HQ</button>

          </div>

          <hr />

          <div class="thumbnail-item">

            <img src="https://img.youtube.com/vi/${videoId}/mqdefault.jpg" alt="MQ Thumbnail" />

            <button onclick="downloadThumbnail('${videoId}', 'mq')">Download MQ</button>

          </div>

          <hr />

          <div class="thumbnail-item">

            <img src="https://img.youtube.com/vi/${videoId}/sddefault.jpg" alt="SD Thumbnail" />

            <button onclick="downloadThumbnail('${videoId}', 'sd')">Download SD</button>

          </div>

        `;

      } else {

        alert("Invalid YouTube URL! Please enter a valid URL.");

      }

    }



    function extractVideoId(url) {

      const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

      const match = url.match(regex);

      return match ? match[1] : null;

    }



    async function downloadThumbnail(videoId, quality) {

  const qualityMap = {

    hq: "hqdefault.jpg",

    mq: "mqdefault.jpg",

    sd: "sddefault.jpg",

  };



  const imageUrl = `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}`;

  console.log(`Attempting to download thumbnail from: ${imageUrl}`);



  try {

    const response = await fetch(imageUrl);

    if (!response.ok) throw new Error("Failed to fetch the image.");



    const blob = await response.blob();

    const blobUrl = URL.createObjectURL(blob);



    const link = document.createElement("a");

    link.href = blobUrl;

    link.download = `${videoId}_${qualityMap[quality]}`;

    document.body.appendChild(link);

    link.click();



    document.body.removeChild(link);

    URL.revokeObjectURL(blobUrl);

    console.log("Download initiated.");

  } catch (error) {

    console.error("Download error:", error);

    // Open the image URL in a new tab if the fetch fails

    window.open(imageUrl, "_blank");

    alert("Failed to download the thumbnail. The image has been opened in a new tab.");

  }

}
