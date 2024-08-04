document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('preview');
    const options = document.getElementById('options');
    const output = document.getElementById('output');

    // Start video stream
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => {
            video.srcObject = stream;
            video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
            video.play();
            requestAnimationFrame(tick);
        });

    function tick() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            });
            if (code) {
                output.innerText = `QR Code Data: ${code.data}`;
            }
        }
        requestAnimationFrame(tick);
    }

    options.addEventListener("change", () => {
        const selectedOption = options.value;
        console.log(`Selected Option: ${selectedOption}`);
        // Perform actions based on the selected option
    });
});