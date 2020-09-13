//generic sequence, can be changed later

let reverb1 = new Tone.Convolver('https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/hm2_000_ortf_48k.mp3').toDestination();
let sadsynth = new Tone.Sampler({
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
}).connect(reverb1);
sadsynth.release.value = 2;


let reverb2 = new Tone.Convolver('https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/hm2_000_ortf_48k.mp3').toDestination();
let neutralsynth = new Tone.Sampler({
  'A0': '/audio/piano-A0.mp3',
  'A1': '/audio/piano-A1.mp3',
  'A2': '/audio/piano-A2.mp3',
  'A3': '/audio/piano-A3.mp3',
  'A4': '/audio/piano-A4.mp3',
  'A5': '/audio/piano-A5.mp3',
  'A6': '/audio/piano-A6.mp3'
}).connect(reverb2);
neutralsynth.release.value = 2;

let reverb3 = new Tone.Convolver('https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/hm2_000_ortf_48k.mp3').toDestination();
let happysynth = new Tone.Sampler({
  'A1': '/audio/guitar-A1.mp3',
  'A2': '/audio/guitar-A2.mp3',
  'A3': '/audio/guitar-A3.mp3',
  'C4': '/audio/guitar-C4.mp3'
}).connect(reverb3);
happysynth.release.value = 2;


let players = {
  'rain': new Tone.Player({
    url: 'audio/rain.mp3',
    loop: true}).toDestination(),
  'nature': new Tone.Player({
    url: 'audio/birdsong.mp3',
    loop: true}).toDestination(),
  'drums': new Tone.Player({
    url: 'audio/drums.wav',
    loop: true}).toDestination(),
  'natureOn': false, 'drumsOn': false
}
players['rain'].volume.value = -2;

const { midi, Note } = Tonal
let chordImprov = {
  'sad': {
    'temp': 0.9,
    'sequence': mm.sequences.quantizeNoteSequence({
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
        { pitch: midi('Gb3'), startTime: 0, endTime: 1 },
        { pitch: midi('F3'), startTime: 1, endTime: 3.5 },
        { pitch: midi('Ab3'), startTime: 3.5, endTime: 4 },
        { pitch: midi('C4'), startTime: 4, endTime: 4.5 },
        { pitch: midi('Eb4'), startTime: 4.5, endTime: 5 },
        { pitch: midi('Gb4'), startTime: 5, endTime: 6 },
        { pitch: midi('F4'), startTime: 6, endTime: 7 },
        { pitch: midi('E4'), startTime: 7, endTime: 8 },
        { pitch: midi('Eb4'), startTime: 8, endTime: 8.5 },
        { pitch: midi('C4'), startTime: 8.5, endTime: 9 },
        { pitch: midi('G3'), startTime: 9, endTime: 11.5 },
        { pitch: midi('F3'), startTime: 11.5, endTime: 12 },
        { pitch: midi('Ab3'), startTime: 12, endTime: 12.5 },
        { pitch: midi('C4'), startTime: 12.5, endTime: 13 },
        { pitch: midi('Eb4'), startTime: 13, endTime: 14 },
        { pitch: midi('D4'), startTime: 14, endTime: 15 },
        { pitch: midi('Db4'), startTime: 15, endTime: 16 },
        { pitch: midi('C4'), startTime: 16, endTime: 16.5 },
        { pitch: midi('F4'), startTime: 16.5, endTime: 17 },
        { pitch: midi('F3'), startTime: 17, endTime: 19.5 },
        { pitch: midi('G3'), startTime: 19.5, endTime: 20 },
        { pitch: midi('Ab3'), startTime: 20, endTime: 20.5 },
        { pitch: midi('C4'), startTime: 20.5, endTime: 21 },
        { pitch: midi('Eb4'), startTime: 21, endTime: 21.5 },
        { pitch: midi('C4'), startTime: 21.5, endTime: 22 },
        { pitch: midi('Eb4'), startTime: 22, endTime: 22.5 },
        { pitch: midi('C4'), startTime: 22.5, endTime: 24.5 },
        { pitch: midi('Eb4'), startTime: 24.5, endTime: 25.5 },
        { pitch: midi('G3'), startTime: 25.5, endTime: 28.5 }
      ]
    }, 1),
    'chords': ['Bm', 'Bbm', 'Gbm7', 'Fm7', 'Abm', 'Abm7', 'Gm7', 'Gbm7', 'Fm7', 'Bbm7', 'Ebm7', 'AM7'],
    'synth': sadsynth
  },

  'happy': {
    'temp': 1.3,
    'sequence': mm.sequences.quantizeNoteSequence({
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
    }, 1),
    'chords': ['Bm', 'Bbm', 'Gb7', 'F7', 'Ab', 'Ab7', 'G7', 'Gb7', 'F7', 'Bb7', 'Eb7', 'AM7'],
    'synth':happysynth
  },

  'neutral': {
    'temp': 1.0,
    'sequence': mm.sequences.quantizeNoteSequence({
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
    }, 1),
    'chords': ['Bm', 'Bbm', 'Gb7', 'F7', 'Ab', 'Ab7', 'G7', 'Gb7', 'F7', 'Bb7', 'Eb7', 'AM7'],
    'synth': neutralsynth
  }
}

///Magenta
const improvRNN = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv')

const natureSounds = new Tone.Players({
  rain: '/audio/rain.mp3',
  birdsong: '/audio/birdsong.mp3'
});//

const drumSounds = new Tone.Players({
  drums: '/audio/drums.wav'
});



let generatedSequence = [];
let generationIntervalTime = Tone.Time('8n').toSeconds()*17;

function generateNext() {
  if (!isPlaying) return;
  if (generatedSequence.length < 10) {
    lastGenerationTask = improvRNN.continueSequence(chordImprov[dominantEmotion].sequence, 20, chordImprov[dominantEmotion].temp, chordImprov[dominantEmotion].chords)
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
    let p = generatedSequence[0];
    //setTimeout(triggerNote(p), Tone.Time('8n').toSeconds()*1000*p.quantizedStartStep);
    window.setTimeout(function(){triggerNote(p,true)}, p.quantizedStartStep*1000*Tone.Time('8n').toSeconds());
    window.setTimeout(function(){triggerNote(p,false)}, (p.quantizedEndStep)*1000*Tone.Time('8n').toSeconds())
    //synth.triggerAttackRelease(Note.fromMidi(p.pitch), p.quantizedEndStep-p.quantizedStartStep, lastStop)
    lastStop += p.quantizedEndStep-p.quantizedStartStep
    generatedSequence.shift();
  }
  setTimeout(play, 1000)
}
function triggerNote(p, a){
  if(a) chordImprov[dominantEmotion].synth.triggerAttack(Note.fromMidi(p.pitch));
  else chordImprov[dominantEmotion].synth.triggerRelease(Note.fromMidi(p.pitch))
  //synth.triggerAttackRelease(Note.fromMidi(p.pitch), p.quantizedEndStep-p.quantizedStartStep)
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
    players['rain'].start();
    players['nature'].start();
    players['drums'].start();
  }
  console.log('click');
  for (let e in chordImprov) chordImprov[e].synth.volume.value = 1; 
  startProgram();
  // Replace icon with the pause icon 
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>'; 
} 
  
function pauseTrack() { 
  // Stop
  console.log('paused');
  for (let e in chordImprov) chordImprov[e].synth.volume.value = 0;
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