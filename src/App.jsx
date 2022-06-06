import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios' 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWind, faDroplet, faCloud} from '@fortawesome/free-solid-svg-icons';

function App() {
  
const [obj, setObj] = useState ({})
const [weather, setWeather] = useState ()
const [isFar, setIsFar] = useState(false)



useEffect (() => {
 const success = pos => {
 const lat = pos.coords.latitude
 const lon = pos.coords.longitude
 setObj({lat,lon})
}

navigator.geolocation.getCurrentPosition (success) 
}, [])


useEffect (() => {
 if(obj !== undefined) {
  const ApiKey = `b9a897baf3305b4a03892182006d5b60`
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${obj?.lat}&lon=${obj?.lon}&appid=${ApiKey}&units=metric`

  axios.get(url)
    .then(res => setWeather (res.data))
    .catch(err => console.log(err))
 }
 
}, [obj])

  let tempCelsius = (weather?.main.temp)
  let tempFahrenheit = (weather?.main.temp * 1.8 + 32).toFixed(2)
  let soloIcon = (weather?.weather[0].icon)+".png"
  let urlIcon = `https://openweathermap.org/img/wn/${soloIcon}`  
  

  const changeTemp = () => setIsFar(!isFar) 
  console.log (weather)

   return (
    <div className="App" >
      <div className={((weather?.main.temp > 30) ? "boxAppWarn"  : "boxApp")}>
        <h2 className='nameApp'> Weather App</h2>
        <h2 className='nameCity'> {weather?.name}, {weather?.sys.country} </h2>
        <h2 className='nameDescription'> {weather?.weather[0].description} </h2>
        <img className='icon' src={urlIcon} />
        <h2 className='nameMain'> {weather?.weather[0].main} </h2>
        <h1 className='temp'> {isFar ? tempFahrenheit : tempCelsius} {isFar ? "°F" : "°C"} </h1>
        <button className={((weather?.main.temp > 30) ? "but-temp-warn"  : "but-temp")} onClick={changeTemp}> {isFar ? "Degrees Celsius" : "Degrees Fahrenheit"}</button>
     
      <div className='boxButton'>
        <h3><FontAwesomeIcon icon={faCloud}/> Clouds {weather?.clouds.all} % </h3> 
        <h3><FontAwesomeIcon icon={faWind}/> Wind S. {weather?.wind.speed} m/s </h3>
        <h3><FontAwesomeIcon icon={faDroplet}/> Hum. {weather?.main.humidity} % </h3> 
      </div>
    </div>
   </div>
  )
}

export default App
