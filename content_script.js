// Function to capture the screenshot
function captureScreenshot() {
    let video = document.querySelector("video");
    if (!video) {
        alert("No video found!");
        return;
    }

    let canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    let imageUrl = canvas.toDataURL("image/png");

    let link = document.createElement("a");
    link.href = imageUrl;
    link.download = `youtube_screenshot_${Date.now()}.png`;
    link.click();
}

// Listen for the "S" key press (without Ctrl/Alt)
document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "s" && !event.ctrlKey && !event.metaKey && !event.altKey) {
        captureScreenshot();
    }
});
