// Import Vite's SSR utils and axios
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { createServer } from 'vite';
import axios from 'axios';

const openWeatherMapApiKey = process.env.OPENWEATHERMAP_API_KEY;

// Function to fetch weather data from OpenWeatherMap API
async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherMapApiKey}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error getting weather data');
  }
}

// Create the Vite server with SSR
async function createViteServer() {
  const indexFilePath = resolve(__dirname, 'index.html');
  const app = await createServer({
    server: { middlewareMode: 'ssr' },
    configFile: false,
  });

  return {
    handler: app.middlewares,
    getIndexContent: () => readFileSync(indexFilePath, 'utf-8'),
  };
}

export async function handle({ request, resolve }) {
  const { handler, getIndexContent } = await createViteServer();

  const city = request.body.city || 'London'; // Default city (you can change this)

  if (request.path === '/get-weather' && request.method === 'POST') {
    try {
      const weatherData = await getWeather(city);
      return {
        body: weatherData,
        headers: { 'Content-Type': 'application/json' },
      };
    } catch (error) {
      return {
        status: 500,
        body: { error: 'Error getting weather data' },
        headers: { 'Content-Type': 'application/json' },
      };
    }
  }

  // For other requests, let Vite handle them
  const response = await handler(request);

  // Modify the response content to include the initial data required by the client-side code
  const pageContent = await getIndexContent();
  const modifiedPageContent = pageContent.replace(
    '<body>',
    `<body><script>window.__initialData__ = ${JSON.stringify({
      city,
    })}</script>`
  );

  return {
    ...response,
    body: modifiedPageContent,
  };
}
