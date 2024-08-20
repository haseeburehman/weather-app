/*              https://api.openweathermap.org/data/2.5/forecast?q=lahore&appid=b74c01e6f443c970bd15a97617e755e8&units=metric  */
let weather={
    apiKey:"218dff218d6823d319accebb1abff065",
    fetchWeather: function(cityName){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}
               &unit=metric
               &appid=${this.apiKey}`)
        .then((response)=> response.json())
        .then((data)=>this.showWeather(data))
    },
    showWeather:function(data){
        const{name}=data;
        const{temp,humidity}=data.main;
        const {icon,description}=data.weather[0];
        const {speed}=data.wind;

        function celciusToKelvin(kelvinTemp){
            const celciusTemp = kelvinTemp - 273.15;
            return celciusTemp.toFixed(2);
        }
        
        document.querySelector(".city-name").textContent=`Weather in ${name}`;
        document.querySelector(".temp").textContent=`${celciusToKelvin(temp)}°C`;
        document.querySelector(".icon").src=`https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".description").textContent=description;
        document.querySelector(".humidity").textContent=`Humidity: ${humidity}%`;
        document.querySelector(".wind").textContent=`Wind: ${speed} m/s`;

        document.querySelector(".card").classList.remove("display");
        document.querySelector(".heading-container").classList.remove("city");
        document.querySelector(".container").classList.remove("cont");
        document.querySelector(".input-bar").classList.remove("bar");
    },
    search:function(){
       this.fetchWeather(document.querySelector(".search-bar").value);
    }

}
document.querySelector(".btn").addEventListener("click",function(){
    weather.search();
});
document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if(event.key=="Enter"){
        weather.search();
    }
})