const geoKey = "";
const sky_url = "https://api.darksky.net/forecast/";
const skyKey = "";
getForecast();

document.querySelector("#search").addEventListener("click", function(){
    let placeName = document.querySelector("#place_name").value.toLowerCase();
    console.log(placeName)
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${placeName}&key=${geoKey}&language=en&pretty=1&no_annotations=1`
    getGeoCode(url);
})

let lat, lng; 
const options={
    method: 'GET',
    mode: 'cors'
}

function getGeoCode(url) {
    console.log(url)
    const req = new Request(url, options);

    fetch(req)
        .then((response) => {
            if(response.ok){
                return response.json();
            }else {
                throw new Error("Bad Http!");
            }
        })
        .then((jsonData) => {
            console.log(jsonData.results);
            return jsonData.results[0];

        }).then((x) => {

            let gCode = x.geometry;
            let city = x.components.city || x.components.state;
            let country = x.components.country;
            let place = `${city}, ${country}`;
            
            getForecast(gCode.lat, gCode.lng, place);
        })
        .catch((err) => {
            console.log(err.message);
        })
}

function getDay(date) {
    let d = new Date(date*1000);
    let weekday = new Array(7);
    weekday[0] = "SUN";
    weekday[1] = "MON";
    weekday[2] = "TUE";
    weekday[3] = "WED";
    weekday[4] = "THU";
    weekday[5] = "FRI";
    weekday[6] = "SAT";
  
    let dayOfWeek = weekday[d.getDay()];
    return dayOfWeek;
  }


function getHour(time){
    const data_hour = new Date(time * 1000);
    const hours = data_hour.getHours();
    const minutes = data_hour.getMinutes().toString();
    if (minutes === "0"){
        return `${hours}:${minutes}0`;
    }
    else{
        return `${hours}:${minutes}`;
    }
}

function getForecast(lat=59.3251172 , lng=18.0710935, place= "Stockholm, Sweden") {
    let uri = `${sky_url}${skyKey}/${lat},${lng}?units=si&lang=en`;
    let options = {
        method: 'GET', 
        mode: 'cors'
    }

    const req = new Request(uri, options);
    let docFrg = new DocumentFragment();
    let docFrg_daily = new DocumentFragment();
    const div_container = document.querySelector("#hourly_container");
    const div_container_daily = document.querySelector("#daily_container");
    div_container.innerHTML = "";
    div_container_daily.innerHTML = "";
    


    fetch(req)
        .then((response) => {
            if(response.ok){
                return response.json();
            }else{
                throw new Error('Bad Http!');
            }
        })
        .then((jsonData) => {
            let wData_daily = jsonData.daily.data;

            let wData = jsonData.hourly.data;
            let tempsList =[];

            // Weather daily for next 7 days
            for(let j= 0; j<7; j++){
                let day = wData_daily[j];
                const div_data_daily = document.createElement("div");
                
                div_data_daily.classList.add("forecast_daily");

                let timestamp = day.time;
                div_data_daily.id = 'td_'+ timestamp.toString();
                
                // display high- low-temp
                let lowTemp = day.temperatureLow;
                let highTemp = day.temperatureHigh;
                const span_temp = document.createElement("span");
                span_temp.classList.add("daily_temp")
                span_temp.innerHTML = `<h4 id="lowTemp">${lowTemp}</h4>  <h4 id="highTemp">${highTemp}</h4>`;

            
                // display icon
                const span_icon_daily = document.createElement("span");
                span_icon_daily.setAttribute("id", "icon_daily");
                span_icon_daily.innerHTML= `<img src="./img/${day.icon}.png" alt=${day.icon}>`;


                // display day of the week
                const span_date = document.createElement("span");
                const weekDay = getDay(day.time);
                span_date.textContent = weekDay;
                span_date.setAttribute("id", "week_day");

                // display summary for day
                const span_sum_daily = document.createElement("span");
                span_sum_daily.textContent = day.summary;
                span_sum_daily.classList.add("sum_daily");


                // display sunrise and sunset
                const span_sun = document.createElement("span");
                span_sun.classList.add("sunTime");
                span_sun.innerHTML = `<img class="sunrise_icon" src="./img/sunrise.png"><h4 id="sunrise">${getHour(day.sunriseTime)}</h4> 
                <img class="sunset_icon" src="./img/sunset.png"> <h4 id="sunset">${getHour(day.sunsetTime)}</h4>`;


                div_data_daily.appendChild(span_icon_daily);
                div_data_daily.appendChild(span_date);
                div_data_daily.appendChild(span_temp);
                div_data_daily.appendChild(span_sum_daily);
                div_data_daily.appendChild(span_sun);

                docFrg_daily.appendChild(div_data_daily);

            }
            div_container_daily.appendChild(docFrg_daily);
            


            // weather hourly for next 24 hours
            for(let i=0; i<24; i++){
                let hour = wData[i];
                const div_data = document.createElement("div");
                div_data.classList.add("forecast");
                // display temprature
                let timestamp = hour.time;
                div_data.id = 'ts_'+ timestamp.toString();

                const temp = parseInt(hour.temperature);
                tempsList.push(temp);

                div_data.textContent = temp.toString().concat("\u00B0");

                // display wind speed
                const span_wind = document.createElement("span");
                let windSpeed = hour.windSpeed * 0.44704;
                span_wind.setAttribute("class","wind");
                span_wind.textContent = `Wind: ${windSpeed.toPrecision(2)} m/s`;


                // display humidity
                const span_humidity = document.createElement("span");
                let humidity = hour.humidity;
                span_humidity.setAttribute("class","humidity");
                span_humidity.textContent = `Humidity: ${humidity.toPrecision(1)}`;


                // display weather icon and city name
                document.querySelector(".city").innerHTML= place;
                const span_icon = document.createElement("span");
                span_icon.setAttribute("id", "icon");
                span_icon.innerHTML= `<img src="./img/${hour.icon}.png" alt=${hour.icon}>`;

                // highlight the raining hour
                if(hour.icon == "rain"){
                    div_data.classList.add("rain");
                }
                

                // display time
                const span_time = document.createElement("span");
                span_time.textContent = getHour(timestamp);
                span_time.setAttribute("id", "time");


                // append elements to div
                div_data.appendChild(span_time);
                div_data.appendChild(span_icon);
                div_data.appendChild(span_wind);
                div_data.appendChild(span_humidity);
                
                // append div to docFRg in every loop
                docFrg.appendChild(div_data);
                
            };
            // append docFrg to container when loop finished
            div_container.appendChild(docFrg);


            // highlight sunrise, sunset, coldest and warmest hours of day
            let div_hour = document.querySelectorAll(".forecast");

            tempsList.filter((temp, index) => {
                let hotHour = Math.max(...tempsList);
                let coldHour = Math.min(...tempsList);

                if(temp == hotHour){
                    div_hour[index].classList.add("hot");
                }else if(temp == coldHour){
                    div_hour[index].classList.add("cold");
                }
            })

        })
        .catch( (err) => {
            console.log("Error: ", err.message);
        })

}
