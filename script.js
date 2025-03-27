let getLocation=async()=>{
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

let getWeather=async()=>{
    let id='b08649a70e70d1544151adf371856d39';
    let location=await getLocation();
    let weatherData=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${id}&units=metric&lang=fr`);
    let weatherDataJson=await weatherData.json();
    document.querySelector(".icon").
    innerHTML=`<img src="https://openweathermap.org/img/wn/${weatherDataJson.weather[0].icon}@2x.png" alt=''>`;
}
getWeather();