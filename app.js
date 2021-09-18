const ip_output = document.getElementById('ip')
const location_output = document.getElementById('location')
const timezone_output = document.getElementById('timezone')
const isp_output = document.getElementById('isp')
const txt_search = document.getElementById('txt-search')
const btn_search = document.getElementById('btn-search')

const GEO_APIKEY = 'at_WdB1rJAU6KqRHbSzveVJWhWmYZVda'
const MAPBOX_TOKEN = 'pk.eyJ1Ijoic3RlcGhlbjAwOSIsImEiOiJja3RpcnVnaDQxNHJqMnltcmJraGFvM2htIn0.SWLQVfB6DGwLTRy7LX79Mw'


const mymap = L.map('map')
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: MAPBOX_TOKEN
        }).addTo(mymap);


const icon = L.icon({
    iconUrl:'images/icon-location.svg',
    iconSize: [50, 64],
    // iconAnchor: [25, 16]
})
const marker = L.marker([0, 0], {icon}).addTo(mymap);

btn_search.addEventListener('click', function(){
    loadData(txt_search.value)
})

function loadData(ip){
    //https://geo.ipify.org/api/v1?apiKey=at_WdB1rJAU6KqRHbSzveVJWhWmYZVda&ipAddress=8.8.8.8

    let url =''
    if(ip){
         url = `https://geo.ipify.org/api/v1?apiKey=${GEO_APIKEY}&ipAddress=${ip}`
    }
    else{
        url = `https://geo.ipify.org/api/v1?apiKey=${GEO_APIKEY}`
    }

    fetch(url)
    .then(res => res.json())
    .then(data => {
        ip_output.textContent = data.ip
        location_output.textContent = `${data.location.city}, ${data.location.country}`
        timezone_output.textContent = 'UTC ' + data.location.timezone
        isp_output.textContent = data.isp
        
        mymap.setView([data.location.lat, data.location.lng], 7)
        // L.LatLng(data.location.lat, data.location.lng)
        marker.setLatLng([data.location.lat, data.location.lng])
    })
    .catch(err => console.error(err))

}

loadData()
