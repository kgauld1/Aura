// Select all the elements in the HTML page 
// and assign them to a variable 
let now_playing = document.querySelector(".now-playing"); 
let track_art = document.querySelector(".track-art"); 
let track_name = document.querySelector(".track-name"); 
let track_artist = document.querySelector(".track-artist"); 
  
let playpause_btn = document.querySelector(".playpause-track"); 
let next_btn = document.querySelector(".next-track"); 
let prev_btn = document.querySelector(".prev-track"); 
  
let seek_slider = document.querySelector(".seek_slider"); 
let volume_slider = document.querySelector(".volume_slider"); 
let curr_time = document.querySelector(".current-time"); 
let total_duration = document.querySelector(".total-duration"); 
  
// Specify globally used values 
let track_index = 0; 
let isPlaying = false; 
let updateTimer; 
  
// Create the audio element for the player 
let curr_track = document.createElement('audio'); 
  
// Define the list of tracks that have to be played 
let track_list = [ 
  { 
    name: "Happily", 
    artist: "lofi kevin", 
    image: "https://cdn.discordapp.com/attachments/744920006105759755/754425660683845862/happy.png", 
    path: "Night_Owl.mp3"
  }, 
  { 
    name: "Sad Days", 
    artist: "generator", 
    image: "https://cdn.discordapp.com/attachments/744920006105759755/754424615362625566/3.png", 
    path: "Enthusiast.mp3"
  }, 
  { 
    name: "Neutral", 
    artist: "👁👄👁", 
    image: "https://cdn.discordapp.com/attachments/744920006105759755/754424611285762098/2.png", 
    path: "Shipping_Lanes.mp3", 
  }, 
]; 

function loadTrack(track_index) { 
  // Clear the previous seek timer 
  clearInterval(updateTimer); 
  resetValues(); 
  
  // Load a new track 
  curr_track.src = track_list[track_index].path; 
  curr_track.load(); 
  
  // Update details of the track 
  track_art.style.backgroundImage =  
     "url(" + track_list[track_index].image + ")"; 
  track_name.textContent = track_list[track_index].name; 
  track_artist.textContent = track_list[track_index].artist; 
  now_playing.textContent =  
     "PLAYING " + (track_index + 1) + " OF " + track_list.length; 
  
  // Set an interval of 1000 milliseconds 
  // for updating the seek slider 
  updateTimer = setInterval(seekUpdate, 1000); 
  
  // Move to the next track if the current finishes playing 
  // using the 'ended' event 
  curr_track.addEventListener("ended", nextTrack); 
  
  // Apply a random background color 
  random_bg_color(); 
} 
  
// function random_bg_color() { 
//   // Get a random number between 64 to 256 
//   // (for getting lighter colors) 
//   let red = Math.floor(Math.random() * 256) + 64; 
//   let green = Math.floor(Math.random() * 256) + 64; 
//   let blue = Math.floor(Math.random() * 256) + 64; 
  
//   // Construct a color withe the given values 
//   let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")"; 
  
//   // Set the background to the new color 
//   document.body.style.background = bgColor; 
// } 
  
// Functiom to reset all values to their default 
function resetValues() { 
  curr_time.textContent = "00:00"; 
  total_duration.textContent = "00:00"; 
  seek_slider.value = 0; 
} 

function playpauseTrack() { 
  // Switch between playing and pausing 
  // depending on the current state 
  if (!isPlaying) playTrack(); 
  else pauseTrack(); 
} 
  
  
function nextTrack() { 
  // Go back to the first track if the 
  // current one is the last in the track list 
  if (track_index < track_list.length - 1) 
    track_index += 1; 
  else track_index = 0; 
  
  // Load and play the new track 
  loadTrack(track_index); 
  playTrack(); 
} 
  
function prevTrack() { 
  // Go back to the last track if the 
  // current one is the first in the track list 
  if (track_index > 0) 
    track_index -= 1; 
  else track_index = track_list.length; 
    
  // Load and play the new track 
  loadTrack(track_index); 
  playTrack(); 
} 

function seekTo() { 
  // Calculate the seek position by the 
  // percentage of the seek slider  
  // and get the relative duration to the track 
  seekto = curr_track.duration * (seek_slider.value / 100); 
  
  // Set the current track position to the calculated seek position 
  curr_track.currentTime = seekto; 
} 
  
function setVolume() { 
  // Set the volume according to the 
  // percentage of the volume slider set 
  curr_track.volume = volume_slider.value / 100; 
} 
  
function seekUpdate() { 
  let seekPosition = 0; 
  
  // Check if the current track duration is a legible number 
  if (!isNaN(curr_track.duration)) { 
    seekPosition = curr_track.currentTime * (100 / curr_track.duration); 
    seek_slider.value = seekPosition; 
  
    // Calculate the time left and the total duration 
    let currentMinutes = Math.floor(curr_track.currentTime / 60); 
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60); 
    let durationMinutes = Math.floor(curr_track.duration / 60); 
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60); 
  
    // Add a zero to the single digit time values 
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; } 
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; } 
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; } 
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; } 
  
    // Display the updated duration 
    curr_time.textContent = currentMinutes + ":" + currentSeconds; 
    total_duration.textContent = durationMinutes + ":" + durationSeconds; 
  } 
} 

// Load the first track in the tracklist 
//loadTrack(track_index); 






///Magenta
const improvRNN = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv')


//generic sequence, can be changed later
const { midi, Note } = Tonal

const sequence = {
  ticksPerQuarter: 220,
  totalTime: 58,
  timeSignatures: [
    {
      time: 0,
      numerator: 4,
      denominator: 4
    }
  ],
  tempos: [
    {
      time: 0,
      qpm: 120
    }
  ],
  notes: [
    { pitch: midi('Gb4'), startTime: 0, endTime: 1 },
    { pitch: midi('F4'), startTime: 1, endTime: 3.5 },
    { pitch: midi('Ab4'), startTime: 3.5, endTime: 4 },
    { pitch: midi('C5'), startTime: 4, endTime: 4.5 },
    { pitch: midi('Eb5'), startTime: 4.5, endTime: 5 },
    { pitch: midi('Gb5'), startTime: 5, endTime: 6 },
    { pitch: midi('F5'), startTime: 6, endTime: 7 },
    { pitch: midi('E5'), startTime: 7, endTime: 8 },
    { pitch: midi('Eb5'), startTime: 8, endTime: 8.5 },
    { pitch: midi('C5'), startTime: 8.5, endTime: 9 },
    { pitch: midi('G4'), startTime: 9, endTime: 11.5 },
    { pitch: midi('F4'), startTime: 11.5, endTime: 12 },
    { pitch: midi('Ab4'), startTime: 12, endTime: 12.5 },
    { pitch: midi('C5'), startTime: 12.5, endTime: 13 },
    { pitch: midi('Eb5'), startTime: 13, endTime: 14 },
    { pitch: midi('D5'), startTime: 14, endTime: 15 },
    { pitch: midi('Db5'), startTime: 15, endTime: 16 },
    { pitch: midi('C5'), startTime: 16, endTime: 16.5 },
    { pitch: midi('F5'), startTime: 16.5, endTime: 17 },
    { pitch: midi('F4'), startTime: 17, endTime: 19.5 },
    { pitch: midi('G4'), startTime: 19.5, endTime: 20 },
    { pitch: midi('Ab4'), startTime: 20, endTime: 20.5 },
    { pitch: midi('C5'), startTime: 20.5, endTime: 21 },
    { pitch: midi('Eb5'), startTime: 21, endTime: 21.5 },
    { pitch: midi('C5'), startTime: 21.5, endTime: 22 },
    { pitch: midi('Eb5'), startTime: 22, endTime: 22.5 },
    { pitch: midi('C5'), startTime: 22.5, endTime: 24.5 },
    { pitch: midi('Eb5'), startTime: 24.5, endTime: 25.5 },
    { pitch: midi('G4'), startTime: 25.5, endTime: 28.5 }
  ]
}

const quantizedSequence = mm.sequences.quantizeNoteSequence(sequence, 1)
console.log(quantizedSequence)

//generation code
const synth = new Tone.Synth().toDestination()
const startProgram = async () => {
  await improvRNN.initialize()
  let improvisedMelody = await improvRNN.continueSequence(quantizedSequence, 60, 1.3, ['Bm', 'Bbm', 'Gb7', 'F7', 'Ab', 'Ab7', 'G7', 'Gb7', 'F7', 'Bb7', 'Eb7', 'AM7'])

  const playGeneratedMelody = () => {
    improvisedMelody.notes.forEach(note => {
      console.log(note);
      console.log(note.quantizedStartStep);
      synth.triggerAttackRelease(Note.fromMidi(note.pitch), note.quantizedEndStep - note.quantizedStartStep, note.quantizedStartStep)
    })
  }

  playGeneratedMelody()
}

let started = false;


function playTrack() { 
  // Play the loaded track 
  if(!started){
    Tone.start();
    started = true;
  }
  console.log('click');
  startProgram();
  
  // Replace icon with the pause icon 
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>'; 
} 
  
function pauseTrack() { 
  // Pause the loaded track 
  // curr_track.pause(); 
  // isPlaying = false; 
  
  // Replace icon with the play icon 
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';; 
} 