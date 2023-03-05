const submitbtn =document.getElementById('submitbtn');
const cityName =document.getElementById('cityName');
const city_name =document.getElementById('city_name');
const temp =document.getElementById('temp');
const temp_status =document.getElementById('temp_status');
const datahide =document.querySelector('.data_hide');
const day =document.getElementById("day");
const today_date =document.getElementById("today_date");

let date = new Date();
const getCurrentDay = () => {
    let dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday","thursday", "Friday", "Saturday"];
    let currentDay = date.getDay();
    let totaldays= dayArray[currentDay];
    return totaldays;
}
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "De"];
    const month = date.getMonth();
    const monthdate = date.getDate();
// console.log(getCurrentDay());
day.innerText=getCurrentDay();
today_date.innerText=`${monthdate} ${months[month]}`;

const getInfo =async(event)=>{
    event.preventDefault();
    let citiVal =cityName.value;
    // console.log(citiVal);
    if (citiVal==="") {
        city_name.innerText=`Pleace write the name before search`;
        datahide.classList.add('data_hide');
    }else{
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?appid=fd438fd4960bbba7dd1a25fd271a9d6a&q=${citiVal}&units=metric`;
        const response = await fetch(url);
        const data =await response.json();
        // console.log(data);
        const arrData =[data];
        // console.log(arrData);
        city_name.innerText=`${arrData[0].name}, ${arrData[0].sys.country}`;
        // console.log(arrData[0].name);
        temp.innerText=arrData[0].main.temp;
        // temp_status.innerText=arrData[0].weather[0].main;
        // console.log(arrData[0].weather[0].main);
        let tempMood =arrData[0].weather[0].main;
        //condition to check sunny or cloudy
        
        const sunriseTimestamp = arrData[0].sys.sunrise; // example Unix timestamp representing the sunrise time in UTC format
const sunsetTimestamp = arrData[0].sys.sunset; // example Unix timestamp representing the sunset time in UTC format

const isDaytime = (date.getTime() >= sunriseTimestamp * 1000 && date.getTime() < sunsetTimestamp * 1000);

if (isDaytime) {
    if(tempMood=='Clear'){
        temp_status.innerHTML ="<i class='fa fa-sun' style='color:#FDB813' aria-hidden='true'></i>" ;
    }else if (tempMood=='Clouds'){
        temp_status.innerHTML ="<i class='fa fa-cloud' aria-hidden='true'></i>" ;
    }else if (tempMood=='Rain'){
        temp_status.innerHTML ="<i class='fa fa-cloud-rain' aria-hidden='true'></i>" ;
    }else if (tempMood=='Haze'){
        temp_status.innerHTML ="<i class='fa fa-cloud-sun' style='color:#FDB813' aria-hidden='true'></i>" ;
    }else{
        temp_status.innerHTML ="<i class='fa fa-sun' style='color:#FDB813' aria-hidden='true'></i>" ; 
    }
} else {
    if(tempMood=='Clear'){
        temp_status.innerHTML ="<i class='fa fa-moon' aria-hidden='true'></i>" ;
    }else if (tempMood=='Clouds'){
        temp_status.innerHTML ="<i class='fas fa-cloud-moon' aria-hidden='true'></i>" ;
    }else if (tempMood=='Rain'){
        temp_status.innerHTML ="<i class='fas fa-cloud-moon-rain' aria-hidden='true'></i>" ;
    }else if (tempMood=='Haze'){
        temp_status.innerHTML ="<i class='fa fa-cloud-moon' style='color:#FDB813' aria-hidden='true'></i>" ;
    }else{
        temp_status.innerHTML ="<i class='fa fa-moon' aria-hidden='true'></i>" ; 
    }
}
        datahide.classList.remove('data_hide');
        // console.log(temp_status);
        } catch(err){
            err="Pleace Enter the Name properly";
            city_name.innerText=err;
            datahide.classList.add('data_hide');
        }
    }


};

submitbtn.addEventListener('click',getInfo);

// catch error 
// data hide 
// classlist 