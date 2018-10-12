/*
The Google Maps API for this project is currently set up to use a borrowed
client ID instead of a key. To use an API key instead, do the following:
1) Follow instructions inside `const APIs` in App.js if you haven't already.
2) Paste your API key inside the quotes as instructed below.
3) Save your changes and refresh.
*/

const key = "PASTE_YOUR_API_KEY_HERE"

const url = 'https://maps.googleapis.com/maps/api/js?'
const client = 'gme-nianticinc'
const center = {lat: 41.623069, lng: -93.698223}
module.exports = {
	key, url, client, center
}
