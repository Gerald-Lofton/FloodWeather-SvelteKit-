<script>
export let data;

// Function to fetch weather data from the server
  async function getWeather() {
    const cityInput = document.getElementById('city').value;

    try {
      // Fetch weather data from the server
      const response = await fetch('/get-weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: cityInput }),
      });

      if (!response.ok) {
        throw new Error('Error getting weather data');
      }

      const weatherData = await response.json();
      // Convert the temperature to Fahrenheit
      const fahrenheitTemp = Math.round(weatherData.main.temp * 1.8 + 32);

      // Round the humidity to the nearest integer
      const humidity = Math.round(weatherData.main.humidity);

      // Get the weather icon for the current weather condition
      const weatherIcon = getWeatherIcon(weatherData.weather[0].main);

      // Update the weather display
      data = `Current weather in ${weatherData.name}:
        Temperature: ${fahrenheitTemp} degrees Fahrenheit
        Humidity: ${humidity}%
        Wind speed: ${weatherData.wind.speed} meters per second`;

      // Set the weather icon directly in the data
      data += `<br>Weather icon: <img src="${weatherIcon}" alt="Weather icon">`;
    } catch (error) {
      alert(error.message);
    }
  }
function getWeatherIcon(weatherCondition) {
    switch (weatherCondition) {
      case 'sunny':
        return 'http://openweathermap.org/img/wn/01d@2x.png';
      case 'cloudy':
        return 'http://openweathermap.org/img/wn/04d@2x.png';
      case 'rainy':
        return 'http://openweathermap.org/img/wn/09d@2x.png';
      case 'snowy':
        return 'http://openweathermap.org/img/wn/13d@2x.png';
      default:
        return 'http://openweathermap.org/img/wn/01d@2x.png';
    }
  }
</script>
<input type="text" id="city" placeholder="Enter a city" />
<button on:click={getWeather}>Get Weather</button>

{#if data}
  <div class="weather-display">
    {@html data}
  </div>
{:else}
  // <!-- Show a loading message or leave this part empty if you don't want anything to be displayed while loading -->
  <p>Loading...</p>
{/if}


<style>
  body {
    background-color: #1d1f20;
    font-family: sans-serif;
    font-size: 16px;
    margin: 0;
    padding: 0;
  }

  h1 {
    font-size: 24px;
    margin-top: 0;
    color: #ffffff;
  }

  .weather-display {
    width: 500px;
    margin: 0 auto;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #2b2d2e;
  }

  .weather-display h2 {
    font-size: 18px;
    margin-bottom: 0;
    color: #ffffff;
  }

  .weather-display .temperature {
    font-size: 24px;
    font-weight: bold;
    color: #ff0000;
  }

  .weather-display .humidity {
    font-size: 16px;
    color: #ffffff;
  }

  .weather-display .wind-speed {
    font-size: 16px;
    color: #ffffff;
  }
</style>
