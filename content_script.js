function addScreenshotButton() {
    let controls = document.querySelector("#top-level-buttons-computed"); // Container for Like/Dislike buttons

    if (!controls || document.getElementById("screenshot-btn")) return; // Avoid duplicate buttons

    // Create the button
    let button = document.createElement("button");
    button.id = "screenshot-btn";
    button.innerText = "📸 Screenshot";
    button.style.cssText = `
        background: #ff0000;
        color: white;
        border: none;
        padding: 8px;
        margin-left: 10px;
        cursor: pointer;
        border-radius: 5px;
        font-size: 14px;
    `;

    // Add click event to capture a screenshot
    button.addEventListener("click", captureScreenshot);

    // Append the button to the YouTube controls
    controls.appendChild(button);
}

// Function to capture the screenshot
function captureScreenshot() {
    const d=new Date();
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

    let imageUrl = canvas.toDataURL(`image/png/`);

    let link = document.createElement("a");
    link.href = imageUrl;
    link.download = `youtube_screenshot${d.getTime()}.png`;
    link.click();
}

// Run the function when the page loads
setTimeout(addScreenshotButton, 3000);

// Re-add button if YouTube UI updates dynamically (e.g., changing videos without reload)
let observer = new MutationObserver(() => {
    addScreenshotButton();
});
observer.observe(document.body, { childList: true, subtree: true });

// Listen for the "S" key press (without Ctrl/Alt)
document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "s" && !event.ctrlKey && !event.metaKey && !event.altKey) {
        captureScreenshot();
    }
});
