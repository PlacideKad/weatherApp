async function getLocation(){
    let data=await fetch("http://ip-api.com/json/?lang=fr").catch(err=>console.log(err));
    let dataJson=await data.json();
    return{
        "city":dataJson.city,
        "country":dataJson.country,
        "lat":dataJson.lat,
        "lon":dataJson.lon,
        "regionName":dataJson.regionName
    };
}
async function getWeather(){
    let id='b08649a70e70d1544151adf371856d39';
    let location=await getLocation();
    let weatherData=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${id}&units=metric&lang=fr`);
    let weatherDataJson=await weatherData.json();
    return weatherDataJson;
}
function setWeatherIcon(weather){
    document.querySelector(".icon").
    innerHTML=`<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt=''>`;
}
function setTown(weather){
    let townName=weather.name;
    document.querySelector(".town").textContent=townName;
}
function setTime(weather){
    let timeStamp=weather.dt
    document.querySelector(".time").textContent=new Date(timeStamp*1000).toLocaleString();
}
function setTemperature(weather){
    let temp=weather.main.temp
    document.querySelector(".temperature").textContent=`${temp}°C`
}
function urlImage(name){
    return `./assets/${name}.jpg`
}
function setTheme(weather){
    let id=weather.weather[0].icon;
    let body=document.querySelector("body");
    let box=document.querySelector(".town-time");
    body.style.backgroundImage=`url(${urlImage(id)})`;
    if(id.slice(-1)==="d"){
        let yellow="rgb(255,187,0)";
        body.style.color=yellow;
        box.style.borderLeftColor=yellow;
    }
    else{
        if(id==="01n"|id==="02n"|id==="03n"){
            let purple="rgb(255,187,0)";
            body.style.color=purple;
            box.style.borderLeftColor=purple;
        }
        else if(id==="13n"){
            let white="white";
            body.style.color=white;
            box.style.borderLeftColor=white;
  
        }
        else{
            let blue="rgb(142,153,253)";
            body.style.color=blue;
            box.style.borderLeftColor=blue;
        }
    }
}

async function render(){
    let weather=await getWeather();
    setTheme(weather);
    setWeatherIcon(weather);
    setTime(weather);
    setTown(weather);
    setTemperature(weather);
}
render();
