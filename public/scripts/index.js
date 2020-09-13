const now_playing = document.querySelector(".now-playing"); 
const track_art = document.querySelector(".track-art"); 
const track_name = document.querySelector(".track-name"); 
const playpause_btn = document.querySelector(".playpause-track"); 
const next_btn = document.querySelector(".next-track"); 
const prev_btn = document.querySelector(".prev-track"); 

var track_index = 0, basedOnMood = true;

// Check if local storage is empty
// If true, then initialize daily and weekly data structures
// If false, grab the data that is currently in local storage
let weeklyData = JSON.parse(localStorage.getItem("weeklyData"))
let dailyData = JSON.parse(localStorage.getItem("data"))


if(weeklyData == null){
  weeklyData = [{
      data: new Array(7).fill(0),
      label: "Neutral",
      borderColor: "#3e95cd",
      fill: false
    }, { 
      data: new Array(7).fill(0),
      label: "Happy",
      borderColor: "#8e5ea2",
      fill: false
    }, { 
      data: new Array(7).fill(0),
      label: "Sad",
      borderColor: "#3cba9f",
      fill: false
    }
  ];
}

if(dailyData == null){
  dailyData = [{ 
      data: new Array(24).fill(0),
      label: "Neutral",
      borderColor: "#3e95cd",
      fill: false
    }, { 
      data: new Array(24).fill(0),
      label: "Happy",
      borderColor: "#8e5ea2",
      fill: false
    }, { 
      data: new Array(24).fill(0),
      label: "Sad",
      borderColor: "#3cba9f",
      fill: false
    }
  ];
}

// Get the current time and day
var currentDate = new Date();
var time = currentDate.getHours();
var day = currentDate.getDay();


// Webcam video implementation
const video = document.getElementById('video');
function startVideo(){
  navigator.getUserMedia(
    {video: true},
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

// Load faceapi models
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
]).then(startVideo);

var img_list = {
  'neutral':"https://cdn.discordapp.com/attachments/744920006105759755/754424611285762098/2.png",
  'happy': "https://cdn.discordapp.com/attachments/744920006105759755/754425660683845862/happy.png",
  'sad': "https://cdn.discordapp.com/attachments/744920006105759755/754424615362625566/3.png",
}
var emotions = ['neutral', 'happy', 'sad'];


var dominantEmotion = "neutral", dominantVal = 0;
// Check for expression every second
video.addEventListener("playing", () => {
  setInterval(async () => {
    if (basedOnMood){
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

      // Find the dominant facial expression
      if (detections.length != 0){
        for (var emotion in detections[0]["expressions"]){
          if (detections[0]["expressions"][emotion] > dominantVal){
            dominantVal = detections[0]["expressions"][emotion];
            dominantEmotion = emotion;
          }
        }

        // Store emotions with day or time in data structure and change colors for happy or sad
        if (dominantEmotion == "neutral"){
          track_index = 0;
          dailyData[0].data[time]++;
          weeklyData[0].data[day]++;
        }
        else if (dominantEmotion == "sad"){
          track_index = 2;
          document.body.style.backgroundImage = "linear-gradient(-100deg, #E2F0CB, #B5EAD7, #88E1F2, #C7CEEA)"
          dailyData[1].data[time]++;
          weeklyData[1].data[day]++;
        }
        else if (dominantEmotion == "happy"){
          track_index = 1;
          document.body.style.backgroundImage = "linear-gradient(-100deg, #FF9AA2, #FFB7B2, #FFDAC1, #E2F0CB)"
          dailyData[2].data[time]++;
          weeklyData[2].data[day]++;
        }
      }
      
      // Update local storage with new data
      localStorage.setItem("data", JSON.stringify(dailyData));
      localStorage.setItem("weeklyData", JSON.stringify(weeklyData));
    
      track_art.style.backgroundImage =  "url(" + img_list[dominantEmotion] + ")"; 
      now_playing.textContent =  "PLAYING " + (track_index + 1) + " OF 3"; 
      track_name.textContent = dominantEmotion.charAt(0).toUpperCase() + dominantEmotion.slice(1);
    }
    
  }, 1000);
  
})



function loadTrack(track_index) { 
  // Update details of the track 
  dominantEmotion = emotions[track_index];
  track_art.style.backgroundImage =  "url(" + img_list[emotions[track_index]] + ")"; 
  track_name.textContent = emotions[track_index].charAt(0).toUpperCase() + emotions[track_index].slice(1);
  now_playing.textContent =  "PLAYING " + (track_index + 1) + " OF 3"; 
} 
  
function nextTrack() { 
  if (!basedOnMood){
    // Go back to the first track if the current one is the last in the track list 
  if (track_index < 2) 
    track_index += 1; 
  else track_index = 0; 
  
  loadTrack(track_index); 
  }
} 
  
function prevTrack() { 
  if (!basedOnMood){
    // Go back to the last track if the 
    // current one is the first in the track list 
    if (track_index > 1) 
      track_index -= 1; 
    else track_index = 0; 
      
    loadTrack(track_index);  
  }
} 


// Toggle changes
function toggleOptions(){
  if (document.getElementById("camera-option").checked){
    video.play();
    document.getElementById('video-div').style.display = "inline";
    document.querySelector(".rightside").style.marginRight = "100px"
  }
  else {
    video.pause();
    
    document.getElementById('video-div').style.display = "none";
    document.querySelector(".rightside").style.marginRight = "35%";
  }

  if (document.getElementById('mood-option').checked){
    basedOnMood = true;
  }
  else {
    basedOnMood = false;
  }

  if (document.getElementById('nature-option').checked){
    natureOn = true;
  }
  else {
    natureOn = false;
  }

  if (document.getElementById('drum-option').checked){
    drumOn = true;
  }
  else {
    drumOn = false;
  }
}