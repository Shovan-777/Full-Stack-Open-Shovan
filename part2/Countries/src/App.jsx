import { useState, useEffect } from "react";
import axios from "axios";

const App= ()=>
{
  const [search,setSearch]=useState('');
  const [countries, setCountries]=useState([]);
  const [message, setMessage]= useState('');
  const [selected, setSelected] = useState(null);
  const [weather, setWeather] = useState(null);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setSelected(null);
    setWeather(null);
  }

  useEffect(()=>{
    if(search.trim() !== "")
    {
      axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response)=>{
        const filtered= response.data.filter((country)=> 
          country.name.common.toUpperCase().startsWith(search.toUpperCase())
        );

        if (filtered.length >10) {
          setCountries([]);
          setMessage('Too many matches, specify another filter');
        } else {
          setCountries(filtered);
          setMessage('');
        }
      })
      .catch((error) => {
        setCountries([]);
        setMessage('No match');
      });
    }
    else{
      setCountries([]);
      setMessage('');
    }
  },[search]);

  const apiKey = '0e541161700c0fdf667aec5e530be5e5';

  const fetchWeather = (capital) => {
    if (capital) {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;

      axios
        .get(weatherUrl)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          setWeather(null);
          console.error("Error fetching weather data:", error);
        });
    }
  }

  const handleShowDetails = (country) => {
    if (selected === country.cca3) {
      setSelected(null); 
    } else {
      setSelected(country.cca3); 
      fetchWeather(country.capital[0]); 
    }
  }

  useEffect(() => {
    if (countries.length === 1 && countries[0].capital) {
      fetchWeather(countries[0].capital[0]);
    }
  }, [countries]);

  return (
    <>
      find countries 
      <input
        type="text"
        value={search}
        onChange={handleSearch}
      />
      {message && <p>{message}</p>}

      {countries.length > 1 ? (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}{" "}
              <button onClick={() => handleShowDetails(country)}>
                {selected === country.cca3 ? "Hide Details" : "Show Details"}
              </button>
              {selected === country.cca3 && (
                <div>
                  <p><strong>Capital:</strong> {country.capital ? country.capital[0] : "No Capital"}</p>
                  <p><strong>Area:</strong> {country.area} km sq</p>
                  <p><strong>Languages:</strong> {Object.values(country.languages).join(", ")}</p>
                  <img src={country.flags.svg} alt={`${country.name.common} flag`} width="157px" />
                  {weather ? (
                    <div>
                      <h3>Weather in {country.capital[0]}</h3>
                      <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
                      <p><strong>Weather:</strong> {weather.weather[0].description}</p>
                      <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
                      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" />
                    </div>
                  ) : (
                    <p>Loading weather data...</p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (countries.length === 1 && (
          <div>
            <h2>{countries[0].name.common}</h2>
            <p><strong>Capital:</strong> {countries[0].capital ? countries[0].capital[0] : "No Capital"}</p>
            <p><strong>Area:</strong> {countries[0].area} km sq</p>
            <p><strong>Languages:</strong> {Object.values(countries[0].languages).join(", ")}</p>
            <img src={countries[0].flags.svg} alt={`${countries[0].name.common} flag`} width="157px" />
            {weather ? (
              <div>
                <h3>Weather in {countries[0].capital[0]}</h3>
                <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
                <p><strong>Weather:</strong> {weather.weather[0].description}</p>
                <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" />
              </div>
            ) : (
              <p>Loading weather data...</p>
            )}
          </div>
        )
      )}
    </>
  );
}

export default App;
