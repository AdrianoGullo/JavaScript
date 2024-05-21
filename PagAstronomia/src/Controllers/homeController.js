const { createConnection } = require('mongoose');
const { APOD, APODModel, Events, EventsModel, Launchs, LaunchsModel } = require('../Models/homeModel');

exports.index = async (requisicao, resposta) =>{   
    try{
        const apods = await apiAPOD_dayPicture(); 
        const EventsData = await api_upcomingEvents(); 
        const LaunchsData = await api_upcomingLaunchs(); 
        resposta.render('index.ejs', {apods, EventsData, LaunchsData});
    } catch(error){
        console.log(error),
        resposta.render('/includes/Errors/404.ejs');
    }
};

async function apiAPOD_dayPicture() {
    try {
        // Recuperar todos os objetos APOD do banco de dados
        const apods = await APOD.buscaObjeto();
        const API_KEY = process.env.NASA_API;
        const today = new Date();

        if (apods.length === 0) {
            await requestAPODs_lastFiveDays(apods, today, API_KEY);
        } else {
            apods.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
            const latestApodDate = apods[0].data.date;
            const dataAtual = new Date(today);

            if (latestApodDate === dataAtual) {
                return apods;
            } else {
                await APOD.apagarBanco({});
                apods.length = 0;
                await requestAPODs_lastFiveDays(apods, today, API_KEY);
            }
        }
        return apods;
    } catch (error) {
        console.error('Erro em requisição - APOD', error);
        throw error;
    }
}

async function requestAPODs_lastFiveDays(apods, today, API_KEY) {
    for (let i = 1; i < 6; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const formattedDate = date.toISOString().split('T')[0];
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${formattedDate}`);
        const data = await response.json();
        const novoAPOD = new APODModel({ data });
        await novoAPOD.save();
        apods.push(novoAPOD); 
    }
}

async function api_upcomingEvents() {
    try {
        const AtualEvents_MongoDB = await Events.buscaObjeto();

        if (AtualEvents_MongoDB.length === 0) {
            const upcomingEvents = await requestAPI_UpcomingEvents();
            AtualEvents_MongoDB.push(upcomingEvents); 
            return upcomingEvents;
        } else {
            AtualEvents_MongoDB.sort((a, b) => new Date(b.results.date) - new Date(a.results.date));
            const latestApodDate = new Date(AtualEvents_MongoDB[0].results.date);
            const dataAtual = new Date(today);

            if (latestApodDate.getTime() === dataAtual.getTime()) {
                return AtualEvents_MongoDB;
            } else {
                await Events.apagarBanco({});
                AtualEvents_MongoDB.length = 0;
                const upcomingEvents = await requestAPI_UpcomingEvents();
                AtualEvents_MongoDB.push(upcomingEvents);
                return upcomingEvents;
            }
        }
    } catch(error) {
        console.log(error);
    }
}

async function requestAPI_UpcomingEvents() {
    const response = await fetch(`https://ll.thespacedevs.com/2.2.0/event/upcoming/`);
    const dataEvent = await response.json();
    console.log(dataEvent);

    const novoEvents = new EventsModel({ dataEvent });
    await novoEvents.save();

    if (!dataEvent.results) {
        throw new Error("Estrutura de dados inválida ou undefined");
    }

    const upcomingEvents = dataEvent.results.slice(1, 5).map((event, index) => {
        let primeiraAgencia = firstAgencyName(event); 
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
}

function firstAgencyName(event) {
    if (event && event.agencies) {
        if (Array.isArray(event.agencies) && event.agencies.length > 0) {
            return event.agencies[0].name || "N/A";
        } else if (!Array.isArray(event.agencies)) {
            return event.agencies.name || "N/A";
        }
    }
    return "N/A";
}

async function api_upcomingLaunchs(){
    try{
        const AtualLaunchs_MongoDB = await Launchs.buscaObjeto();
        if (AtualLaunchs_MongoDB.length === 0) {
            const upcomingLaunchs = await requestAPI_upcomingLaunchs();
            AtualLaunchs_MongoDB.push(upcomingLaunchs); 
            return upcomingLaunchs;
        } else {
            AtualLaunchs_MongoDB.sort((a, b) => new Date(b.results.net) - new Date(a.results.net));
            const latestLaunchDate = new Date(AtualLaunchs_MongoDB[0].results.net);
            const dataAtual = new Date(today);

            if (latestLaunchDate.getTime() === dataAtual.getTime()) {
                return AtualLaunchs_MongoDB;
            } else {
                await Launchs.apagarBanco({});
                AtualLaunchs_MongoDB.length = 0;
                const upcomingLaunchs = await requestAPI_upcomingLaunchs();
                AtualLaunchs_MongoDB.push(upcomingLaunchs);
                return upcomingLaunchs;
            }
        }    
    }catch(error){
        console.log(error);
    }
};

async function requestAPI_upcomingLaunchs() {
    const launches = await fetch(`https://ll.thespacedevs.com/2.2.0/launch/upcoming/`);
    const dataLaunch = await launches.json();
    console.log(dataLaunch);

    const novoLaunchs = new LaunchsModel({ dataLaunch });
    await novoLaunchs.save();

    if (!dataLaunch.results) {
        throw new Error("Estrutura de dados inválida ou undefined");
    }
    
    const upcomingLaunchs = launchEvent.results.slice(0, 4).map((launch, index) => {
    let windowStart = launch.window_start;
    let missionDescription = launch.mission?.description || "None";
    let typeOfMission = launch.mission.orbit.name || "None";
    let agencia = findAgencyAbbrev(launch);
    
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
}

function findAgencyAbbrev(launch) {
    if (launch && launch.mission && launch.mission.agencies && Array.isArray(launch.mission.agencies) && launch.mission.agencies.length > 0) {
        return launch.mission.agencies[0].abbrev || "None";
    }
    return "None";
}

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