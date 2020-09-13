

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

//generation code


let reverb = new Tone.Convolver('https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/hm2_000_ortf_48k.mp3').toDestination();
//reverb.wet.value = 0.25;

//const synth = new Tone.Synth().toDestination().connect(reverb)
let synth = new Tone.Sampler({
  C3: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-c3.mp3',
  'D#3': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-ds3.mp3',
  'F#3': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-fs3.mp3',
  A3: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-a3.mp3',
  C4: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-c4.mp3',
  'D#4': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-ds4.mp3',
  'F#4': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-fs4.mp3',
  A4: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-a4.mp3',
  C5: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-c5.mp3',
  'D#5': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-ds5.mp3',
  'F#5': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-fs5.mp3',
  A5: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-a5.mp3'
}).connect(reverb);
synth.release.value = 2;

let chordImprov = {
  'sad': ['Bm', 'Bbm', 'Gb7', 'F7', 'Ab', 'Ab7', 'G7', 'Gb7', 'F7', 'Bb7', 'Eb7', 'AM7'],
  'happy': [],
  'neutral': []
}
// const natureSounds = new Tone.Players({
//   rain: 'https://lofi-ai-assets.s3.amazonaws.com/nature/rain.wav'
// });



let generatedSequence = [];
let generationIntervalTime = Tone.Time('8n').toSeconds();
let emotion = 'sad';

function generateNext() {
  if (!isPlaying) return;
  if (generatedSequence.length < 10) {
    lastGenerationTask = improvRNN.continueSequence(quantizedSequence, 20, 1.3, chordImprov[emotion])
      .then(genSeq => {
        generatedSequence = generatedSequence.concat(
          genSeq.notes
        );
        setTimeout(generateNext, generationIntervalTime * 1000);
      });
  } else {
    setTimeout(generateNext, generationIntervalTime * 1000);
  }
}

const play = async() => {
  while(isPlaying && generatedSequence.length != 0){
    console.log(isPlaying);
    let p = generatedSequence[0];
    synth.triggerAttackRelease(Note.fromMidi(p.pitch), p.quantizedEndStep-p.quantizedStartStep, lastStop)
    lastStop += p.quantizedEndStep-p.quantizedStartStep
    generatedSequence.shift();
  }
  setTimeout(play, 1000)
}


const startProgram = async () => {
  await improvRNN.initialize()
  generateNext();
  play(generatedSequence);
}

let started = false;
let lastStop = 0;

function playTrack() { 
  // Play
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
  // Stop
  console.log('paused');
  generatedSequence = [];
  // Replace icon with the play icon 
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';; 
} 




// Specify globally used values 
let isPlaying = false; 
let updateTimer; 
  
// Create the audio element for the player 
let curr_track = document.createElement('audio'); 


function playpauseTrack() {
  if (!isPlaying) playTrack(); 
  else pauseTrack(); 
  isPlaying = !isPlaying;
} 



