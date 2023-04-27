// Get DOM elements
const camera = document.getElementById('camera');
const captureBtn = document.getElementById('capture-btn');
const canvas = document.getElementById('canvas');
const overlay = document.querySelector('.overlay');
const capturedPhoto = document.getElementById('captured-photo');
const share = document.getElementById('share-btn');
const downloadButton = document.getElementById('download-btn');
const close = document.getElementById('close-btn');
const downloadLink = document.getElementById('download-link');

// const toggleBtn = document.getElementById('toggle-btn');

navigator.mediaDevices.getUserMedia({ video: true })
// navigator.mediaDevices.getUserMedia({ camera: { facingMode: 'environment' } })
.then((stream) => {
    camera.srcObject = stream;
})
.catch((error) => {
    console.error('Error accessing camera:', error);
});






// Capture photo when capture button is clicked
captureBtn.addEventListener('click', () => {
    
    close.style.display = 'block';
    captureBtn.style.display = 'none';
    downloadButton.style.display = 'block';
    share.style.display = 'block';
    // Draw video frame onto canvas
    canvas.width = camera.videoWidth;
    canvas.height = camera.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(camera, 0, 0, canvas.width, canvas.height);

    // Convert canvas to base64 data URL
    const dataURL = canvas.toDataURL();

    // Display captured photo on overlay
    capturedPhoto.src = dataURL;
    overlay.style.opacity = 1;
    console.log("hello");
});
// function closebutton(){
//     alert("hii")
//     overlay.style.opacity = 1;
//     console.log("helo")
// }
// Hide overlay when captured photo is clicked
capturedPhoto.addEventListener('click', () => {
    overlay.style.opacity = 0;
});

// Hide overlay when close button is clicked
share.addEventListener('click', () => {
    // const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check%20out%20this%20cool%20image!&hashtags=coolimage`;
    // window.open(shareUrl, "_blank");
    navigator.share(capturedPhoto)
    
  });
  downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = capturedPhoto.src;
    link.download = "your-image-name.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
  
  close.addEventListener('click', () => {
    close.style.display = 'none';
    downloadButton.style.display = 'none';
    share.style.display = 'none';
    overlay.style.opacity = 0;
    captureBtn.style.display = 'block';
});