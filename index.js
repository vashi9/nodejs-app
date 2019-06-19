var express = require('express')
var app = express()

//Define request response in root URL (/)
app.get('/', function (req, res) {
  res.send('Hello Rupeek!')
})

//Launch listening server on port 8081
app.listen(5004, function () {
  console.log('app listening on port 5004!')
})
