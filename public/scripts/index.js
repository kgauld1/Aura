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



/// MAGENTA ///



const improvCheckpoint = 'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv'
const improvRNN = new mm.MusicRNN(improvCheckpoint)

//demo sequence
//we can change this
const sequence = {
  ticksPerQuarter: 220,
  totalTime: 28.5,
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
    { pitch: 'Gb4', startTime: 0, endTime: 1 },
    { pitch: 'F4', startTime: 1, endTime: 3.5 },
    { pitch: 'Ab4', startTime: 3.5, endTime: 4 },
    { pitch: 'C5', startTime: 4, endTime: 4.5 },
    { pitch: 'Eb5', startTime: 4.5, endTime: 5 },
    { pitch: 'Gb5', startTime: 5, endTime: 6 },
    { pitch: 'F5', startTime: 6, endTime: 7 },
    { pitch: 'E5', startTime: 7, endTime: 8 },
    { pitch: 'Eb5', startTime: 8, endTime: 8.5 },
    { pitch: 'C5', startTime: 8.5, endTime: 9 },
    { pitch: 'G4', startTime: 9, endTime: 11.5 },
    { pitch: 'F4', startTime: 11.5, endTime: 12 },
    { pitch: 'Ab4', startTime: 12, endTime: 12.5 },
    { pitch: 'C5', startTime: 12.5, endTime: 13 },
    { pitch: 'Eb5', startTime: 13, endTime: 14 },
    { pitch: 'D5', startTime: 14, endTime: 15 },
    { pitch: 'Db5', startTime: 15, endTime: 16 },
    { pitch: 'C5', startTime: 16, endTime: 16.5 },
    { pitch: 'F5', startTime: 16.5, endTime: 17 },
    { pitch: 'F4', startTime: 17, endTime: 19.5 },
    { pitch: 'G4', startTime: 19.5, endTime: 20 },
    { pitch: 'Ab4', startTime: 20, endTime: 20.5 },
    { pitch: 'C5', startTime: 20.5, endTime: 21 },
    { pitch: 'Eb5', startTime: 21, endTime: 21.5 },
    { pitch: 'C5', startTime: 21.5, endTime: 22 },
    { pitch: 'Eb5', startTime: 22, endTime: 22.5 },
    { pitch: 'C5', startTime: 22.5, endTime: 24.5 },
    { pitch: 'Eb5', startTime: 24.5, endTime: 25.5 },
    { pitch: 'G4', startTime: 25.5, endTime: 28.5 }
  ]
}
const quantizedSequence = mm.sequences.quantizeNoteSequence(sequence, 1)



//generation + playing sound

const synth = new Tone.Synth().toDestination()

const startProgram = async () => {
  try {
    await improvRNN.initialize()


    //THIS LINE IS BROKEN
    let improvisedMelody = await improvRNN.continueSequence(quantizedSequence, 60, 1.1, ['Bm', 'Bbm', 'Gb7', 'F7', 'Ab', 'Ab7', 'G7', 'Gb7', 'F7', 'Bb7', 'Eb7', 'AM7'])
    console.log('still working');



    const playOriginalMelody = () => {
      sequence.notes.forEach(note => {
        synth.triggerAttackRelease(Note.fromMidi(note.pitch), note.endTime - note.startTime, note.startTime)
      })
    }

    const playGeneratedMelody = () => {
      improvisedMelody.notes.forEach(note => {
        synth.triggerAttackRelease(Note.fromMidi(note.pitch), note.quantizedEndStep - note.quantizedStartStep, note.quantizedStartStep)
      })
    }
  } catch (error) {
    console.error(error)
  }
}
let started = false;
window.addEventListener('keydown', e => {
  if(!started){
    Tone.start();
    started = true;
  }
  console.log('click');
  startProgram();
});