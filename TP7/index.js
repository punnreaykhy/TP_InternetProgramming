const express = require('express')
const fs = require('fs');
const app = express()

app.get('/', function (req, res) {
  fs.readFile('src/ex1.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    
    res.send(data);
  });
})

app.get('/detail', function (req, res) {
  res.send('You are in my detail page')
})

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});