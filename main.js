const api = {
  key: "28fd15358cdecbc1a1dfef367e71acef",
  base: "https://api.openweathermap.org/data/2.5/",
};

const search = document.querySelector(".search");
const search_btn = document.querySelector(".btn");
search_btn.addEventListener("click", getInput);

function getInput(event) {
  event.preventDefault();
  if (event.type == "click") {
    getData(search.value);
    console.log(search.value);
  }
}

function getData() {
  fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then((response) => {
      return response.json();
    })
    .then(displayData);
}

function displayData(response) {
  console.log(response);
  if (response.cod === "404") {
    const error = document.querySelector(".error");
    error.textContent = "Please enter a valid city";
    error.setAttribute("style", "color: red; fontSize: 16px");
    search.value = "";
  } else {
    const city = document.querySelector(".city");
    city.innerText = `${response.name}, ${response.sys.country}`;

    const today = new Date();
    const date = document.querySelector(".date");
    date.innerText = dateFunction(today);

    const temp = document.querySelector(".temp");
    temp.innerHTML = `<i class="fas fa-light fa-temperature-half"></i> ${Math.round(
      response.main.temp
    )} <span>°C</span>`;

    const weather = document.querySelector(".weather");
    weather.innerText = `Weather: ${response.weather[0].main}`;

    const tempRange = document.querySelector(".temp-range");
    tempRange.innerText = `Temp Range: ${Math.round(
      response.main.temp_min
    )}°C / ${Math.round(response.main.temp_max)}°C`;

    const weatherIcon = document.querySelector(".weather-icon");
    const iconURL = "http://openweathermap.org/img/w/";
    weatherIcon.src = iconURL + response.weather[0].icon + ".png";

    search.value = "";
  }
}

function dateFunction(d) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}

const btn = document.getElementById("toogler");
const btn_icon = document.getElementById("toogler-icon");
const contain = document.getElementById("contain");
const input = document.getElementById("search");
btn.onclick = function () {
  if (contain.getAttribute("data-theme") != "dark") {
    contain.setAttribute("data-theme", "dark");
    btn_icon.setAttribute("class", "fas fa-solid fa-sun");
    input.setAttribute("style", "color: white;");
  } else {
    contain.setAttribute("data-theme", "");
    btn_icon.setAttribute("class", "fas fa-solid fa-moon");
    input.setAttribute("data-theme", "dark");
  }
};
