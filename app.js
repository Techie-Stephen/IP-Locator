const ip_output = document.getElementById('ip')
const location_output = document.getElementById('location')
const timezone_output = document.getElementById('timezone')
const isp_output = document.getElementById('isp')
const txt_search = document.getElementById('txt-search')
const btn_search = document.getElementById('btn-search')


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
        ip_output.innerText = data.ip
        location_output.innerText = `${data.location.city}, ${data.location.country}`
        timezone_output.innerText = 'UTC ' + data.location.timezone
        isp_output.innerText = data.isp
    })
    .catch(err => console.error(err))
}

loadData()