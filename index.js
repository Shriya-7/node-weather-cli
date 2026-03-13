const https = require("https");

// Get city from command line
const city = process.argv[2];

if (!city) {
  console.log("Please provide a city name.");
  console.log('Example: node index.js "London"');
  process.exit(1);
}

// Free weather API (no API key needed)
const url = `https://wttr.in/${city}?format=j1`;

https.get(url, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    try {
      const weather = JSON.parse(data);

      const temp = weather.current_condition[0].temp_C;
      const desc = weather.current_condition[0].weatherDesc[0].value;

      console.log(`Weather in ${city}: ${temp}°C, ${desc}`);
    } catch (error) {
      console.log("Error reading weather data.");
    }
  });
}).on("error", () => {
  console.log("Error fetching weather data.");
});