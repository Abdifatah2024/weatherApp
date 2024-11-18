const apiKey = "25affaa24f045acf9c8708bef54ae27d"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("city").value;
  const forecastDiv = document.getElementById("forecast");
  const spinner = document.getElementById("spinner");
  forecastDiv.innerHTML = ""; // Clear previous results

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  // Show the spinner
  spinner.style.display = "block";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=32&appid=${apiKey}`
    );
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const forecasts = data.list.filter((_, index) => index % 8 === 0); // 8 timestamps = 1 day

    forecasts.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000);
      const dayDiv = document.createElement("div");
      dayDiv.className = "day";

      dayDiv.innerHTML = `
        <h3>${date.toDateString()}</h3>
        <p><strong>Temp:</strong> ${forecast.main.temp}°C</p>
        <p><strong>Weather:</strong> ${forecast.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${forecast.main.humidity}%</p>
      `;

      forecastDiv.appendChild(dayDiv);
    });
  } catch (error) {
    alert(error.message);
  } finally {
    // Hide the spinner
    spinner.style.display = "none";
  }
}

