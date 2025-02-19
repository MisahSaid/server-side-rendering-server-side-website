// Importeer het npm pakket express uit de node_modules map
import express, { response } from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Stel het basis endpoint in
const apiUrl = 'https://fdnd.directus.app/items'

// Haal alle squads uit de WHOIS API op
const squadData = await fetchJson(apiUrl + '/squad')

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)


// TODO: routes voor deze pizza applicatie.. GET
app.get('/', function(request, response) {

  fetchJson('https://fdnd-agency.directus.app/items/tm_story').then((storiesDataUitDeAPI) => {
    response.render('lessons', {stories: storiesDataUitDeAPI.data})
  });
})

app.get('/stories', function(request, response) {

  fetchJson('https://fdnd-agency.directus.app/items/tm_story').then((storiesDataUitDeAPI) => {
    response.render('stories', {stories: storiesDataUitDeAPI.data})
  });
  
})

app.get('/playlistsettings', function(request, response) {

  fetchJson('https://fdnd-agency.directus.app/items/tm_speaker_profile').then((speakerDataUitDeAPI) => {
    response.render('playlistsettings', {speaker: speakerDataUitDeAPI.data})
  });
  
})


// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})