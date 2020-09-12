console.log(window.localStorage.length)

if (window.localStorage.length == 0){
  var weeklyData = [{ 
        data: new Array(7).fill(0),
        label: "Neutral",
        borderColor: "grey",
        fill: false
      }, { 
        data: new Array(7).fill(0),
        label: "Happy",
        borderColor: "yellow",
        fill: false
      }, { 
        data: new Array(7).fill(0),
        label: "Sad",
        borderColor: "blue",
        fill: false
      }
    ];

  var dailyData = [{ 
        data: new Array(24).fill(0),
        label: "Neutral",
        borderColor: "grey",
        fill: false
      }, { 
        data: new Array(24).fill(0),
        label: "Happy",
        borderColor: "yellow",
        fill: false
      }, { 
        data: new Array(24).fill(0),
        label: "Sad",
        borderColor: "blue",
        fill: false
      }
    ];
}
else {
  var weeklyData = JSON.parse(localStorage.getItem("weeklyData"))
  var dailyData = JSON.parse(localStorage.getItem("data"))
}


var currentDate = new Date();
var time = currentDate.getHours();
var day = currentDate.getDay();


setInterval(async () => {
  weeklyData = [{ 
        data: new Array(7).fill(0),
        label: "Neutral",
        borderColor: "grey",
        fill: false
      }, { 
        data: new Array(7).fill(0),
        label: "Happy",
        borderColor: "yellow",
        fill: false
      }, { 
        data: new Array(7).fill(0),
        label: "Sad",
        borderColor: "blue",
        fill: false
      }
    ]
}, 60480000)

setInterval(async () => {
  dailyData = [{ 
        data: new Array(24).fill(0),
        label: "Neutral",
        borderColor: "grey",
        fill: false
      }, { 
        data: new Array(24).fill(0),
        label: "Happy",
        borderColor: "yellow",
        fill: false
      }, { 
        data: new Array(24).fill(0),
        label: "Sad",
        borderColor: "blue",
        fill: false
      }
    ]
}, 8640000)

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
      if (dominantEmotion == "neutral"){
        dailyData[0].data[time]++;
        weeklyData[0].data[day]++;
      }
      else if (dominantEmotion == "sad"){
        document.body.style.backgroundImage = "linear-gradient(-100deg, #E2F0CB, #B5EAD7, #88E1F2, #C7CEEA)"
        dailyData[1].data[time]++;
        weeklyData[1].data[day]++;
      }
      else if (dominantEmotion == "happy"){
        document.body.style.backgroundImage = "linear-gradient(-100deg, #FF9AA2, #FFB7B2, #FFDAC1, #E2F0CB)"
        dailyData[2].data[time]++;
        weeklyData[2].data[day]++;
      }
    }
    console.log(dailyData)
    
    localStorage.setItem("data", JSON.stringify(dailyData));
    localStorage.setItem("weeklyData", JSON.stringify(weeklyData));
  }, 1000);
  
})

