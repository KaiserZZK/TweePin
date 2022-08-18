const apiKey = 'pk.eyJ1IjoiemVrYWktemhhbmciLCJhIjoiY2w2bnlyZHA3MDF1MjNkbnpianhzMzFwNCJ9.yDdO6Nzj2o-a2W4j3gA2uQ';

const myMap = L.map('map').setView([40.8063624, -73.9659283], 17);
// 40.806366, -73.9653799

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 30,
    attribution: '© OpenStreetMap',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: apiKey
}).addTo(myMap);

// Adding Marker
const marker = L.marker([40.8067494, -73.9671481]).addTo(myMap);



/* to-do:
- automatically detect user location with Google API?
- connect twitter info to Marker?
- styling? 
*/