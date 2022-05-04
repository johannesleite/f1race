const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const https = require('https')
const port = 3001

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const apiUrl = 'https://ergast.com/api/f1/2022/next.json'



app.get('/', (req, res) => {
    https.get(apiUrl, (response) => {
        response.on('data', (data) => {
            const raceData = JSON.parse(data)
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
 
        })
    })
    
    
})


app.listen(port, () => console.log(`App listening on port ${port}!`))