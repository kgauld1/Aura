var dailyData = JSON.parse(localStorage.getItem("data"));
var weeklyData = JSON.parse(localStorage.getItem("weeklyData"));

var piechartData = [];
for (let i=0; i<3; i++){
  dailyData[i].data = dailyData[i].data.map(function(item) { return item/60 })
  weeklyData[i].data = weeklyData[i].data.map(function(item) { return item/60 })

  piechartData[i] = dailyData[i].data.reduce(function(a,b){
  return a+b;
  }, 0);
}

new Chart(document.getElementById("daily-graph"), {
  type: 'line',
  data: {
    labels: ["12:00 am", "1:00 am", "2:00 am", "3:00 am", "4:00 am", "5:00 am", "6:00 am", "7:00 am", "8:00 am", "9:00 am", "10:00 am", "11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm", "7:00 pm", "8:00 pm", "9:00 pm", "10:00 pm", "11:00 pm"],
    datasets: dailyData
    },
  options: {
    title: {
      display:true,
      text: 'Emotions per Hour',
      responsive: true,
      maintainAspectRatio: true
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Minutes'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Hour'
        }
      }]
    }
  }
})


new Chart(document.getElementById("weekly-graph"), {
  type: 'line',
  data: {
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    datasets: weeklyData
    },
  options: {
    title: {
      display:true,
      text: 'Emotions During the Past Seven Days',
      responsive: true,
      maintainAspectRatio: true
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Minutes'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Day'
        }
      }]
    }
  }
})

new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
      labels: ["Neutral", "Happy", "Sad"],
      datasets: [
        {
          label: "Moods",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
          data: piechartData,
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Your Moods in a Day'
      }
    }
});