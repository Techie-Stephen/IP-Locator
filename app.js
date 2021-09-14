const ip_output = document.getElementById('ip')
const location_output = document.getElementById('location')
const timezone_output = document.getElementById('timezone')
const isp_output = document.getElementById('isp')
const txt_search = document.getElementById('txt-search')
const btn_search = document.getElementById('btn-search')

const mymap = L.map('map').setView([0, 0], 5);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1Ijoic3RlcGhlbjAwOSIsImEiOiJja3RpcnVnaDQxNHJqMnltcmJraGFvM2htIn0.SWLQVfB6DGwLTRy7LX79Mw'
        }).addTo(mymap);
const marker = L.marker([0, 0]).addTo(mymap);


btn_search.addEventListener('click', function(){
    let ip = txt_search.value
    loadData(ip)
})

function loadData(ip){
    const apiKey = 'at_WdB1rJAU6KqRHbSzveVJWhWmYZVda'
    //https://geo.ipify.org/api/v1?apiKey=at_WdB1rJAU6KqRHbSzveVJWhWmYZVda&ipAddress=8.8.8.8

    let url =''
    if(ip){
         url = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=8.8.8.8`
    }
    else{
        url = `https://geo.ipify.org/api/v1?apiKey=${apiKey}`
    }
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        console.log(mymap)

        ip_output.textContent = data.ip
        location_output.textContent = `${data.location.city}, ${data.location.country}`
        timezone_output.textContent = 'UTC ' + data.location.timezone
        isp_output.textContent = data.isp
        
        // L.map.setView([data.location.lat, data.location.lng], 13);
        
        L.LatLng(data.location.lat, data.location.lng)
        marker.setLatLng([data.location.lat, data.location.lng])
    })
    .catch(err => console.error(err))

}

loadData()