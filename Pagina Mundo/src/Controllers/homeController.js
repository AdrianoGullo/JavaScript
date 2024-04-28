const { createConnection } = require('mongoose');

exports.index = async (requisicao, resposta) =>{   
    try{
        const PictureData = await api_dayPicture(); 
        const EventsData = await api_upcomingEvents(); 
        const LaunchsData = await api_upcomingLaunchs(); 
        resposta.render('index.ejs', {PictureData, EventsData, LaunchsData});
    } catch(error){
        console.log(error),
        resposta.render('/includes/Errors/404.ejs');
    }
};

async function api_dayPicture(){
        let API_KEY = process.env.NASA_API;
        let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
        let data = await response.json();
        return data;
};

async function api_upcomingEvents(){
    try{
        const response = await fetch(`https://ll.thespacedevs.com/2.2.0/event/upcoming/`);
        const dataEvent = await response.json();
        const upcomingEvents = dataEvent.results.slice(0, 4).map((event, index) => {
            let primeiraAgencia = event.agencies[0]?.abbrev || "N/A"; 
            let typeOfMission = event.type?.name || "N/A"; 
    
            return {
                img: event.feature_image,
                title: event.name,
                description: event.description,
                date: changeDateType(event.date),
                agencia: primeiraAgencia,
                mission: typeOfMission, 
                index: index + 1 
            };
        });
    
        return upcomingEvents;
    }catch(error){
        console.log(error);
    }
};

async function api_upcomingLaunchs(){
    try{
        const launches = await fetch(`https://ll.thespacedevs.com/2.2.0/launch/upcoming/`);
        const launchEvent = await launches.json();
    
        const upcomingLaunchs = launchEvent.results.slice(0, 4).map((launch, index) => {
            let windowStart = launch.window_start;
            let missionDescription = launch.mission?.description || "None";
            let typeOfMission = launch.mission.orbit.name || "None";
            let agencia = launch.mission.agencies[0].abbrev || "None";
    
            return {
                img: launch.image,
                title: launch.name,
                description: missionDescription,
                date: changeDateType(windowStart),
                mission: typeOfMission,
                headAgency: agencia,
                index: index + 1
            };
        });
        return upcomingLaunchs;
    }catch(error){
        console.log(error);
    }
};

// dataEvent.results[index].date contém a data no formato "2024-04-15T14:45:00Z"
function changeDateType(dataEvent){
    let dateObj = new Date(dataEvent);
    let day = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    
    let formattedDate;

    if(minutes < 10 & month < 10) formattedDate = `Data: ${hours}:0${minutes} - ${day}/0${month}/${year}`;
    else if (minutes < 10 & month >= 10) formattedDate = `Data: ${hours}:0${minutes} - ${day}/${month}/${year}`;
    else if (minutes > 10 & month < 10) formattedDate = `Data: ${hours}:${minutes} - ${day}/0${month}/${year}`;
    
    return formattedDate;
}