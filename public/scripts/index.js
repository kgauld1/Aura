const video = document.getElementById('video');

function startVideo(){
  navigator.getUserMedia(
    {video: true},
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
]).then(startVideo);

video.addEventListener("playing", () => {
  
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

    var dominantEmotion = "neutral", dominantVal = 0;
    if (detections.length != 0){
      for (var emotion in detections[0]["expressions"]){
        if (detections[0]["expressions"][emotion] > dominantVal){
          dominantVal = detections[0]["expressions"][emotion];
          dominantEmotion = emotion;
        }
      }

      //console.log(dominantEmotion)
      if (dominantEmotion == "sad"){
        document.body.style.backgroundImage = "linear-gradient(-100deg, #E2F0CB, #B5EAD7, #88E1F2, #C7CEEA)"
      }
      else if (dominantEmotion == "happy"){
        document.body.style.backgroundImage = "linear-gradient(-100deg, #FF9AA2, #FFB7B2, #FFDAC1, #E2F0CB)"
      }
    }
    
  }, 1000);
})
