import React, {useState, useEffect} from 'react';
import axios from 'axios';
import WeatherIcon from './components/WeatherIcon';



function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState('metric');
  const [windUnit, setWindUnit] = useState('KMH');
 

  const apiKey = '3e5e84536b05b87ebc3b7f5d52698ba4';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;

  

  const searchLocation = (event) => {

    if (event.key === 'Enter') {

      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })

      setLocation('');
      

    }

    
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    setWindUnit(windUnit === 'KMH' ? 'MPH' : 'KMH');
  };



  useEffect(() => {
    if (location !== '') {
      const fetchData = async () => {
        try {
          const response = await axios.get(url);
          setData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
      
    }
  }, [location, url]);


  const convertTemperature = (temp) => {
    if (unit === 'metric') {
      return `${temp.toFixed()}°C`;
    } else if (unit === 'imperial') {
      const fahrenheit = (temp * 9) / 5 + 32;
      return `${fahrenheit.toFixed()}°F`;
    }

    return '';
  };
  
  const convertWindSpeed = (speed) => {
    if (unit === 'metric' && windUnit === 'KMH') {
      return `${speed.toFixed()} KMH`;
    } else if (unit === 'imperial' && windUnit === 'KMH') {
      const mph = speed / 1.60934;
      return `${mph.toFixed()} MPH`;
    } else if (unit === 'imperial' && windUnit === 'MPH') {
      return `${speed.toFixed()} MPH`;
    } else if (unit === 'metric' && windUnit === 'MPH') {
      const kmh = speed * 1.60934;
      return `${kmh.toFixed()} KMH`;
    }

    return '';
  };



  return (
    <div className="app">
      <div className='title'>Weather App</div>
     <div className='search'>
      <input
      value={location}
      onChange= {event => setLocation(event.target.value)}
      onKeyPress={searchLocation}
      placeholder='Enter Location'
      type='text'/>

     </div>
     <div className='container'>
        <div className='top'>
          <div className='location'>
            <h3>{data.name}</h3>
          </div>
          <div className='temp'>
          {data.main && <h1>The current temperature is: <p>{convertTemperature(data.main.temp)}</p></h1>}

                         {data.weather ? (
                          <div className='weather-icon'>
                            <WeatherIcon weatherCondition={data.weather[0].main} />
                          </div>
                         ) : null}
            
          </div>
          <div className='description'>
            {data.main ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&

        <div className='bottom'>
          <div className='feels'>
            {data.main && <p className="bold">{convertTemperature(data.main.feels_like)}</p>}     
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            {data.wind ? <p className='bold'>{convertWindSpeed(data.wind.speed)}</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>

        }


        <button className="unit-toggle" onClick={toggleUnit}>
          Selected Unit: {unit === 'metric' ? 'Celsius' : 'Fahrenheit'} | Wind Speed Unit: {windUnit}
        </button>


       
          </div>
        </div>

     
  );
}

export default App;
