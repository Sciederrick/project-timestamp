// server.js
// where your node app starts

// init project
require('dotenv').config()
let express = require('express')
let moment = require('moment')
let app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
let cors = require('cors')
app.use(cors({optionSuccessStatus: 200}))  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

//empty date parameter
app.get("/api/timestamp/", function (req, res) {
  let date = new Date()
  res.json({
    "unix": date.getTime(),
    "utc": date.toUTCString()
  })
})

// non-empty date parameter
app.get("/api/timestamp/:date_string", function (req, res) {
  let date_string = req.params.date_string
  // validate for correct date input -->2011-10-10T14:48:00  OR -->2011-10-10
  if (moment(date_string, "YYYY-MM-DDTHH:mm:ss", true).isValid() || moment(date_string, "YYYY-MM-DD", true).isValid()) {
    let date = new Date(date_string) || new Date()
    res.json({
      "unix": date.getTime(),
      "utc": date.toUTCString()
    })
  }
  else if(/\d/.test(date_string)) {
    let int_date_string = parseInt(date_string)
    let date = new Date(int_date_string)
    res.json({
      "unix": int_date_string,
      "utc": date.toUTCString()
    })
  } else {
    res.json({
      "error": "Invalid Date"
    })
  }
})



// listen for requests :)
let listener = app.listen(process.env.PORT||5000, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
