var moodDict = {"neutral": 0, "happy": 1, "sad": 2, "disguted": 3, "anger": 4, "fearful": 5, "surprise": 6}

var labels = ["12:00 am", "1:00 am", "2:00 am", "3:00 am", "4:00 am", "5:00 am", "6:00 am", "7:00 am", "8:00 am", "9:00 am", "10:00 am", "11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm", "7:00 pm", "8:00 pm", "9:00 pm", "10:00 pm", "11:00 pm"]

var datasets = [{ 
        data: [],
        label: "Neutral",
        borderColor: "grey",
        fill: false
      }, { 
        data: [],
        label: "Happy",
        borderColor: "yellow",
        fill: false
      }, { 
        data: [],
        label: "Sad",
        borderColor: "blue",
        fill: false
      }, { 
        data: [],
        label: "Disgusted",
        borderColor: "green",
        fill: false
      }, { 
        data: [],
        label: "Anger",
        borderColor: "red",
        fill: false
      }, { 
        data: [],
        label: "Fearful",
        borderColor: "purple",
        fill: false
      }, { 
        data: [],
        label: "Surprise",
        borderColor: "orange",
        fill: false
      }
    ]

datasets[0].data.push();
console.log(datasets[0].data);