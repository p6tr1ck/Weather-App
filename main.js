const search = document.querySelector('.search')
const maxTemp = document.querySelector('.max-temp')
const minTemp = document.querySelector('.min-temp')
const htmlDate = document.querySelector('.date')
const weatherImage = document.querySelector('.weather-image')
const city = document.querySelector('.city')
const temperature = document.querySelector('.temperature-city')
const weatherDescription = document.querySelector('.weather-description')
const feelsLike = document.getElementById('feels-like')
const humidity = document.getElementById('humidity')
const wind = document.getElementById('wind')
const precipitation = document.getElementById('precipitation')
const celsius = document.getElementById('celsius')
const farenheit = document.getElementById('farenheit')

search.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        fetchData(search.value)
    }
})

const fetchData = (value) => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=2a905e8c89c3422ca2a184358231108&q=${value}&days=1&aqi=no&alerts=no`)
    .then(response => response.json())
    .then(data => changeTime(data))
}

function changeTime(data) {
    let date = data.location.localtime.split(' ')[1]
    let hours = null
    data = data
    if (date[0] === '0') {
        hours = `12:${date.slice(2)} am`
    } else if (date[1] === ':') {
        date += ' ' + 'am'
    }
    hours = (date.slice(0, 2) > 12) ? `${(parseInt(date.slice(0,2))-12)}${date.slice(2)} pm` : 
    date + ' ' + 'am'
    changeContent(data, hours)
}

function changeContent(data, time) {
    if (data.location.name === data.location.region) {
        city.textContent = `${data.location.name}, ${data.location.country}`
    } else {
        city.textContent = `${data.location.name}, ${data.location.region}`
    }
    celsius.onclick = () => {
        maxTemp.textContent = `Max: ${Math.round(data.forecast.forecastday[0].day.maxtemp_c)}\u00B0`
        minTemp.textContent = `Min: ${Math.round(data.forecast.forecastday[0].day.mintemp_c)}\u00B0`
        temperature.textContent = `${Math.round(data.current.temp_c)}\u00B0`
        feelsLike.textContent = `${Math.round(data.current.feelslike_c)}\u00B0`
        wind.textContent = Math.round(data.current.wind_kph) + ' kph'
    } 
    farenheit.onclick = () => {
        changeContent(data, time)
    }
    
    weatherDescription.textContent = data.current.condition.text
    temperature.textContent = `${Math.round(data.current.temp_f)}\u00B0`
    maxTemp.textContent = `Max: ${Math.round(data.forecast.forecastday[0].day.maxtemp_f)}\u00B0`
    minTemp.textContent = `Min: ${Math.round(data.forecast.forecastday[0].day.mintemp_f)}\u00B0`
    htmlDate.textContent = data.current.last_updated.split(' ')[0] + ' ' + time
    weatherImage.src = `${data.current.condition.icon}`
    feelsLike.textContent = `${Math.round(data.current.feelslike_f)}\u00B0`
    humidity.textContent = data.current.humidity + '%'
    wind.textContent = Math.round(data.current.wind_mph) + ' mph'
    precipitation.textContent = data.current.precip_in
}