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
    for (let i = 0; i < 5; i++) {
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
        const AtualEvents_MongoDB = await Events.buscaObjeto(); // Ordena por data crescente
        AtualEvents_Results = AtualEvents_MongoDB;
        
        if (AtualEvents_MongoDB.length === 0) {
            const upcomingEvents = await requestAPI_UpcomingEvents();
            return upcomingEvents;
        } else {
            const AtualEvents_First4 = await formatEvent(AtualEvents_MongoDB.slice(0, 4))
            return AtualEvents_First4;
        }
    } catch (error) {
        console.log(error);
    }
}

async function requestAPI_UpcomingEvents() {
    const response = await fetch(`https://ll.thespacedevs.com/2.2.0/event/upcoming/`);
    const dataEvent = await response.json();
    const dataResults = dataEvent.results;
    
    if (!dataEvent.results) {
        throw new Error("Estrutura de dados inválida ou undefined");
    }

    await EventsModel.insertMany(dataResults.map(eventData => ({
        data: eventData,
        createdAt: new Date() // Data de criação atual
    })));

    const upcomingEvents = formatEvent(dataEvent.results.slice(0, 4));
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

function formatEvent(eventos) {
    return eventos.map((event, index) => {
        let primeiraAgencia = firstAgencyName(event.data); 
        let typeOfMission = event.data.type?.name || "N/A"; 
        let eventDate = changeDateType(event.data.date);

        let eventEnd = new Date(event.data.date); // Data do evento
        let currentDate = new Date(); // Data atual

        let status = "soon";

        // Verifica o status do evento
        if (currentDate > eventEnd) {
            status = "done";
        } 

        return {
            img: event.data.feature_image,
            title: event.data.name,
            description: event.data.description,
            date: eventDate,
            agencia: primeiraAgencia,
            mission: typeOfMission, 
            status: status,           
            index: index + 1 
        };
    });
}

async function api_upcomingLaunchs(){
    try{
        const AtualLaunchs_MongoDB = await Launchs.buscaObjeto();

        if (AtualLaunchs_MongoDB.length === 0 ) {
            const upcomingLaunchs = await requestAPI_upcomingLaunchs();
            return upcomingLaunchs;
        } else {
            const AtualLanchs_First4 = await formatLaunchs(AtualLaunchs_MongoDB.slice(0, 4))
            return AtualLanchs_First4;
        }

    }catch(error){
        console.log(error);
    }
};

async function requestAPI_upcomingLaunchs() {
    const launchesResponse = await fetch(`https://ll.thespacedevs.com/2.2.0/launch/upcoming/`);
    const dataLaunch = await launchesResponse.json();
    const dataResults = dataLaunch.results;

    if (!dataLaunch.results) {
        throw new Error("Estrutura de dados inválida ou undefined");
    }

    for (const launchData of dataResults) {
        if (launchData && launchData.window_start && launchData.name) {
            const novoLaunch = new LaunchsModel({ data: launchData });
            await LaunchsModel.create(novoLaunch);
        }
    }
    
    const upcomingLaunchs = formatLaunchs(dataLaunch.results.slice(0, 4));
    return upcomingLaunchs;
}

function formatLaunchs(lancamentos) {
    return lancamentos.map((launch, index) => {
        let launchDate = launch.data.window_start;
        let missionDescription = launch.data.mission?.description || "None";
        let typeOfMission = launch.data.mission?.orbit?.name || "None";
        let status = "soon";


        let currentDate = new Date();
        let windowStart = new Date(launch.data.window_start);
        let windowEnd = new Date(launch.data.window_end);

        if (currentDate > windowEnd) {
            status = "done";
        } else if (currentDate >= windowStart && currentDate <= windowEnd) {
            status = "live";
        }
        

        return {
            img: launch.data.image,
            title: launch.data.name,
            description: missionDescription,
            date: changeDateType(launchDate),
            mission: typeOfMission,
            headAgency: findAgencyAbbrev(launch.data),
            status: status,
            index: index + 1
        };
    });
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

    if (hours < 10){
        if(minutes < 10 & month < 10) formattedDate = `0${hours}:0${minutes} - ${day}/0${month}/${year}`;
        else if (minutes < 10 & month >= 10) formattedDate = `0${hours}:0${minutes} - ${day}/${month}/${year}`;
        else if (minutes > 10 & month < 10) formattedDate = `0${hours}:${minutes} - ${day}/0${month}/${year}`;
    } else {
        if(minutes < 10 & month < 10) formattedDate = `${hours}:0${minutes} - ${day}/0${month}/${year}`;
        else if (minutes < 10 & month >= 10) formattedDate = `${hours}:0${minutes} - ${day}/${month}/${year}`;
        else if (minutes > 10 & month < 10) formattedDate = `${hours}:${minutes} - ${day}/0${month}/${year}`;
    }
    return formattedDate;
}