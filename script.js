// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const apiKey = "";
const apiUrl = "";

function getWeather() {
  const locationInput = document.getElementById("location").value;

  if (locationInput.trim() === "") {
    alert("Please enter a valid location");
    return;
  }

  const fullUrl = `${apiUrl}?q=${locationInput}&appid=${apiKey}&units=metric`;

  fetch(fullUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error.message);
      alert("Error fetching weather data. Please try again.");
    });
}

function displayWeather(data) {
  const weatherInfoContainer = document.querySelector(".weather-info");
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`; // This here

  const weatherHTML = `
    <p>${temperature}°C</p>
        <p>${description}</p>
        <img src="${iconUrl}" alt="Weather Icon">
    `;

  weatherInfoContainer.innerHTML = weatherHTML;
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    
    // Toggle dark mode class on the body
    body.classList.toggle('dark-mode');

    // Toggle sun and moon icons in the theme toggle button
    const themeIcon = document.querySelector('#theme-toggle .theme-icon');
    if (body.classList.contains('dark-mode')) {
        // Dark mode
        themeIcon.innerHTML = '☀️'; // Moon icon
        themeToggle.setAttribute('aria-label', 'Toggle Light Mode');
    } else {
        // Light mode
        themeIcon.innerHTML = '🌙'; // Sun icon
        themeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
    }
}
