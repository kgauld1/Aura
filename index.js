const express = require('express');

const app = express();
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.sendFile('index');
});
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/public/levels.html');
});

app.listen(3000, () => {
  console.log('server started');
});


