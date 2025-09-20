import React, { useEffect, useState } from 'react';
import './Scrollbar.css';
import converter from './converter';
import wind_direction from './wind_degree-converter';
import cloudy from "./new icons/cloudy1.svg";
import day from "./new icons/day.svg";
import borometer from './new icons/barometer.svg';
import humidity from './new icons/humidity.svg';
import warmer from './new icons/thermometer-warmer.svg';
import colder from './new icons/thermometer-colder.svg';
import wind from './new icons/wind.svg';
import sunrise from './new icons/sunrise.svg';
import sunset from './new icons/sunset.svg';
import windDirection from './new icons/windsock.svg';
import lat from './new icons/Location.svg';
import lon from './new icons/location1.svg';
import ocean from './new icons/ocean.svg';
import visibility from './new icons/extreme-smoke.svg';
import wind_gust from './new icons/windsock-weak.svg';
import not_available from './new icons/not-available.svg';
import horizon from './new icons/horizon.svg';

const Weather = () => {
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric');
  const [maindata, setData] = useState({});
  const degreeSybol = '°';
  const [windSpeedUnit, setWindunit] = useState('meter/sec');
  const [temp_unit, setTempunit] = useState(degreeSybol + 'C');
  async function send() {
    const send = await fetch('https://backend-for-resposive-weather-app.vercel.app/info');
    const data = await send.json();
    const location = data?.location?.name;
    const location_trim = location.trim();
    if (location_trim) {
      const location_data =  await fetch(`${import.meta.env.VITE_BASEURl}/${location_trim}/metric`);
      const location_data_json = await location_data.json();
      setData(location_data_json);
    }
  }

  useEffect(() => {
    send();
  }, []);


  const inputHandler = (e) => {
    setCity(e.target.value);
  }

  const cityReset = () => {
    setCity('');
  }

  const unitHandler = (e) => {
    setUnit(e.target.value);
  }

  const enterCather = (event) => {
    if (event.key === "Enter") {
      fetchData();
    }
  }

  const fetchData = async () => {
    try {
      // const baseUrl = import.meta.env.VITE_BASEURl;
      // const key = import.meta.env.VITE_APPID;
      const trimvalue = city.trim();
      const baseUrl = `${import.meta.env.VITE_BASEURl}/${trimvalue}/${unit}`;
      const finalUrl = `${baseUrl}`;
      const data = await fetch(finalUrl);
        const jsondata = await data.json();
        // console.log(jsondata)
      // console.log(jsondata)
      if (jsondata.cod === 200) {
        setData(jsondata);
        console.log(jsondata)

        if (unit === 'metric' || unit === 'standard') {
          setWindunit('meter/sec');
        } else {
          setWindunit('miles/hour');
        }

        if (unit === 'metric') {
          setTempunit(degreeSybol + 'C');
        } else if (unit === 'standard') {
          setTempunit(degreeSybol + 'K');
        } else {
          setTempunit(degreeSybol + 'F');
        }
      } else {
        alert('city not found');
      }
    } catch (err) {
      console.error('error found', err);
    }
  }

  return (
    <>
      <header>
        <h2 className='flex justify-center align-middle text-3xl sm:text-4xl md:text-5xl bg-gradient-to-bl from-purple-400 to-indigo-500 m-auto w-max rounded-md relative top-6 font-light text-center px-4'>
          Welcome to WeatherWave
        </h2>
      </header>
      <div className='container flex flex-col justify-center align-middle m-auto relative top-16 px-4'>
        <div className="main">
          <div className="inputandbutton flex flex-col sm:flex-row justify-center items-center gap-2 mb-4">
            <input
              type="text"
              value={city}
              onInput={inputHandler}
              onKeyDown={enterCather}
              className='bg-gray-200 border-gray-500 rounded w-full sm:w-60 h-9 border font-sans text-left p-2'
              placeholder='Give me city name'
            />
            <div className="flex gap-2">
              <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5" onClick={fetchData}>
                Go
              </button>
              <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5' onClick={cityReset}>
                Clear
              </button>
            </div>
          </div>

          <div className='radio flex flex-col sm:flex-row justify-center items-center gap-4 mb-4'>
            <label className="flex items-center">
              <input onChange={unitHandler} id="metric" type="radio" value="metric" name="default-radio" checked={unit === 'metric'} onKeyDown={enterCather} />
              <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Celsius</span>
            </label>

            <label className="flex items-center">
              <input onChange={unitHandler} id="standard" type="radio" value="standard" name="default-radio" onKeyDown={enterCather} checked={unit === 'standard'} />
              <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kelvin</span>
            </label>

            <label className="flex items-center">
              <input onChange={unitHandler} id="imperial" type="radio" value="imperial" name="default-radio" onKeyDown={enterCather} checked={unit === 'imperial'} />
              <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fahrenheit</span>
            </label>
          </div>

          <div className="icons grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div className="icon-item">
              <img src={maindata?.weather && maindata?.weather[0]?.icon ? `https://openweathermap.org/img/wn/${maindata.weather[0].icon}@2x.png` : maindata?.current?.weather_icons[0] ? maindata?.current?.weather_icons[0] :day} className='h-48 w-full object-contain bg-transparent rounded-[10px]' alt="Day" />
              <p className='text-sm text-center'>{maindata?.weather && maindata?.weather[0].main ? `Overview: ${maindata?.weather[0]?.main}` : maindata?.current?.weather_descriptions?.[0] ? `Overview: ${maindata?.current?.weather_descriptions[0]}` : "Overview..."}</p>
            </div>
            <div className="icon-item">
              <img src={day} className='h-48 w-full object-contain' alt="Day" />
              <p className='text-sm text-center'>{maindata?.main && maindata?.main?.temp ? `Current Temp: ${maindata.main.temp}${temp_unit}` : maindata?.current?.temperature ? `Current Temp: ${maindata?.current?.temperature}` : `Current Temp: ...`}</p>
            </div>
            <div className="icon-item">
              <img src={day} className='h-48 w-full object-contain' alt="Day" />
              <p className='text-sm text-center'>{maindata?.main && maindata?.main?.feels_like ? `Feels Like: ${maindata.main.feels_like}${temp_unit}` : maindata?.current?.feelslike ? `Feels Like: ${maindata?.current?.feelslike}` : `Feels Like: ...`}</p>
            </div>
            <div className="icon-item">
              <img src={colder} className='h-48 w-full object-contain' alt="Day" />
              <p className='text-sm text-center'>{maindata.main && maindata.main.temp_min ? `Temp Min: ${maindata.main.temp_min}${temp_unit}` : `Temp Min: ...`}</p>
            </div>
            <div className="icon-item">
              <img src={warmer} className='h-48 w-full object-contain' alt="Day" />
              <p className='text-sm text-center'>{maindata.main && maindata.main.temp_max ? `Temp Max: ${maindata.main.temp_max}${temp_unit}` : `Temp Max: ...`}</p>
            </div>
            <div className="icon-item">
              <img src={cloudy} className='h-48 w-full object-contain' alt="Day" />
              <p className='text-sm text-center'>{maindata.main && maindata.main ? `Clouds: ${maindata.clouds.all}%` : `Clouds: ...`}</p>
            </div>
            <div className="icon-item">
              <img src={borometer} className='h-48 w-full object-contain' alt="Day" />
              <p className='text-sm text-center'>{maindata.main && maindata.main.pressure ? `Pressure: ${maindata.main.pressure} hPa` : `Pressure: ...`}</p>
            </div>
            <div className="icon-item">
              <img src={humidity} className='h-48 w-full object-contain' alt="Day" />
              <p className='text-sm text-center'>{maindata.main && maindata.main.humidity ? `Humidity: ${maindata.main.humidity}%` : `Humidity: ...`}</p>
            </div>
            <div className="icon-item">
              <img src={ocean} className='h-48 w-full object-contain' alt="Day" />
              <p className='text-sm text-center'>{maindata.main && maindata.main.sea_level ? `Sea Level Pressure: ${maindata.main.sea_level} hPa` : `Sea Level Pressure: ...`}</p>
            </div>
            <div className="icon-item">
              <img src={borometer} className='h-48 w-full object-contain' alt="Day" />
              <p className='text-sm text-center'>{maindata.main && maindata.main.grnd_level ? `Ground Level Pressure: ${maindata.main.grnd_level} hPa` : `Ground Level Pressure: ...`}</p>
            </div>
            <div className="icon-item">
              <img src={wind} className='h-48 w-full object-contain' alt="Day" />
              <p className='text-sm text-center'>{maindata.main && maindata.wind.speed ? `Wind Speed: ${maindata.wind.speed} ${windSpeedUnit}` : `Wind Speed: ...`}</p>
            </div>
            <div className="icon-item">
              <img src={visibility} className='h-48 w-full object-contain' alt="Day" />
              <p className='text-sm text-center'>{maindata.main && maindata.visibility ? `Visibility: ${maindata.visibility / 1000} km` : `Visibility: ...`}</p>
            </div>
            <div className="icon-item">
              <img src={windDirection} className='h-48 w-full object-contain' alt="Day" />
              <p className='text-sm text-center'>{maindata.main && maindata.wind.deg ? `Wind Direction: ${wind_direction(maindata.wind.deg)}` : `Wind Direction: ...`}</p>
            </div>
            <div className="icon-item">
              <img src={wind_gust} className='h-48 w-full object-contain' alt="Day" />
              <p className='text-sm text-center'>{maindata.main && maindata.wind.gust ? `Wind Gust: ${maindata.wind.gust} ${windSpeedUnit}` : `Wind Gust: ...`}</p>
            </div>
            <div className="icon-item">
              <img src={horizon} className='h-48 w-full object-contain' alt="Day" />
              <p className='text-sm text-center'>{maindata && maindata.weather ? `Description: ${maindata.weather[0].description}` : `Description: ...`}</p>
            </div>
            <div className="icon-item">
              <img src={sunrise} className='h-48 w-full object-contain' alt="Day" />
              <p className='text-sm text-center'>{maindata.main && maindata.sys.sunrise ? `Sunrise: ${converter(maindata.sys.sunrise)}` : `Sunrise: ...`}</p>
            </div>
            <div className="icon-item">
              <img src={sunset} className='h-48 w-full object-contain' alt="Day" />
              <p className='text-sm text-center'>{maindata.main && maindata.sys.sunset ? `Sunset: ${converter(maindata.sys.sunset)}` : `Sunset: ...`}</p>
            </div>
            <div className="icon-item">
              <img src={lat} className='h-48 w-full object-contain' alt="Day" />
              <p className='text-sm text-center'>{maindata.main && maindata.coord.lat ? `Lat: ${maindata.coord.lat}` : `Lat: ...`}</p>
            </div>
            <div className="icon-item">
              <img src={lon} className='h-48 w-full object-contain' alt="Day" />
              <p className='text-sm text-center'>{maindata.main && maindata.coord.lon ? `Lon: ${maindata.coord.lon}` : `Lon: ...`}</p>
            </div>
            <div className="icon-item">
              <img src={not_available} className='h-48 w-full object-contain' alt="Day" />
              <p className='text-sm text-center'>{maindata.main && maindata.sys.country ? `Country: ${maindata.sys.country}` : `Country: ...`}</p>
            </div>
            <div className="icon-item">
              <img src={day} className='h-48 w-full object-contain text-wrap' alt="Day" />
              <p className='text-sm text-center'>{maindata.main && maindata.dt ? `Current Time: ${converter(maindata.dt)}` : `Current Time: ...`}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Weather;
