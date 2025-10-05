const video = document.getElementById('myVideo');

// Stop the video after 40 seconds
setTimeout(() => {
  video.pause();
}, 40000); // 40,000 milliseconds = 40 seconds
