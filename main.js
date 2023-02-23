let address = document.getElementById("address");
let buton = document.getElementById("start");
let temp = document.getElementById("temp");
let stat = document.getElementById("weather_status");
let icon = document.getElementById("weather_icon");
let feelslike = document.getElementById("feelslike");
let time = document.getElementById("time");

const weather_key = "";
const location_key = "";


buton.addEventListener("click", async function()
{

    const url = "https://api.tomtom.com/search/2/geocode/" + address.value + ".json?key=" + location_key;

    const locatie = await fetch(url);
    const coord = await locatie.json();

    coordinates = coord.results[0].position;

    const weather = "https://api.openweathermap.org/data/2.5/weather?lat=" + coordinates.lat + "&lon=" + coordinates.lon + "&appid=" + weather_key;
    const response = await fetch(weather)

    const data = await response.json();

    console.log(data);

    display(data);

}); 


window.addEventListener("load", async function()
{
    navigator.geolocation.getCurrentPosition(here);
});

async function here(position)
{
    lat = position.coords.latitude; 
    lon = position.coords.longitude;

    const weather = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + weather_key;
    
    const response = await fetch(weather);
    const data = await response.json();
    console.log(data);

    display(data);
}

function check_temp(temp)
{
    var check = temp.toString();
    if(check[0] != '-')
    {
        if(check[1] == '.') 
            if(check[2] >= 5) temp = Math.ceil(temp);
                else temp = Math.floor(temp);
            else 
            {
                if(check[3] >=5) temp = Math.ceil(temp);
                else temp = Math.floor(temp);
            }
    }
    else
    {
        if(check[2] == '.') 
            if(check[3] <= 5) temp = Math.ceil(temp);
                else temp = Math.floor(temp);
            else 
            {
                if(check[4] <= 5) temp = Math.ceil(temp);
                else temp = Math.floor(temp);
            }
    }

    return temp
}

function display(data)
{
    let exact_temp = data.main.temp - 273.15;
    let feels = data.main.feels_like -273.15;

    exact_temp = check_temp(exact_temp);
    feels = check_temp(feels);

    temp.innerHTML = "Location: " + data.name + "</br> Temperature: " + exact_temp + "°C";
    feelslike.innerHTML = "Feels like: " + feels + "°C";

    
    stat.innerHTML = data.weather[0].main;
    switch(data.weather[0].main)
    {
        case 'Clouds': 
        icon.src = "clouds.png";
        break;

        case 'Snow':
        icon.src = "snow.png";
        break;

        case 'Clear':
        icon.src = "sun.png";
        break;

        case 'Rain':
        icon.src = "rain.png";
        break;

        default:
        icon.src = "";
        break;
    }  

}
