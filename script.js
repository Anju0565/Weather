let key = "7939d2caca1ab49aa34e7a2890c58556"

    let time_div = document.getElementById("time");

    let iframe = document.getElementById("gmap_canvas");
    function displayTime(){
        let curr = new Date();

        let date = document.createElement("h2");
        date.innerHTML=  curr.toDateString();
        
        let time = document.createElement("h2");
        time.innerHTML = curr.toLocaleTimeString();
    
        time_div.append(date,time);
    }
    displayTime()

    let left_side = document.getElementById("left_side");
    async function getWeather(){
        try{
            let city = document.getElementById("city").value;
            let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&time=UTC`);
            let data = await res.json();
            left_side.innerText = "";
            display(data);
            console.log(data);
        }
        catch(err){
            console.log("error: ",err);
        }
    }
    function display(data){
        let name = document.createElement("h3");
        name.innerText = data.name;

        let min_temp = document.createElement("h4");
        min_temp.innerHTML =  "Min-Temp: "+data.main.temp_min+"&#8451";

        let max_temp = document.createElement("h4");
        max_temp.innerHTML =  "Max-Temp: "+data.main.temp_max+"&#8451";

        let pressure = document.createElement("h4");
        pressure.innerHTML =  "Pressure: "+data.main.pressure;

        let wind = document.createElement("h4");
        wind.innerHTML =  "Wind: "+data.wind.speed+"m/sec";

        let sunrise = document.createElement("h4");
        sunrise.innerHTML =  "Sunrise: "+window.moment(data.sys.sunrise).format("HH:mm a");

        let sunset = document.createElement("h4");
        sunset.innerHTML =  "Sunset: "+window.moment(data.sys.sunset).format("HH:mm a");

        iframe.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

        left_side.append(name,min_temp,max_temp,pressure,wind,sunrise,sunset);
    }
