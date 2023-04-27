const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const https = require('https')

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const apiUrl = 'https://ergast.com/api/f1/current/next.json'



app.get('/', (req, res) => {
    https.get(apiUrl, (response) => {
        response.on('data', (data) => {
          const raceData = JSON.parse(data)
          if (raceData.MRData.RaceTable.Races.length === 0) {
            res.render('nodata');
          } else {
            const nextRaceName = raceData.MRData.RaceTable.Races[0].raceName
            const nextRaceDate = raceData.MRData.RaceTable.Races[0].date
            const nextRaceTime = raceData.MRData.RaceTable.Races[0].time

            const convertedDate = new Date(nextRaceDate).toLocaleString('no', { month: 'long', day:'numeric'})

            const semiConvertedTime = nextRaceDate + 'T' + nextRaceTime
            const convertedTime = new Date(semiConvertedTime).toLocaleTimeString('no', {hour: 'numeric', minute: 'numeric'})

            const raceDataObj = {
                name: nextRaceName,
                date: convertedDate,
                time: convertedTime
            }

          res.render('index', {raceItems: raceDataObj})
          }
        })
    })
    
    
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});
