const { createConnection } = require('mongoose');
const { APOD, APODModel, Events, EventsModel, Launchs, LaunchsModel } = require('../Models/homeModel');

exports.index = async (requisicao, resposta) =>{   
    try{
        const apods = await api_dayPicture(); 
        const EventsData = await api_upcomingEvents(); 
        const LaunchsData = await api_upcomingLaunchs(); 
        resposta.render('index.ejs', {apods, EventsData, LaunchsData});
    } catch(error){
        console.log(error),
        resposta.render('/includes/Errors/404.ejs');
    }
};

async function api_dayPicture() {
    try {
        // Recuperar todos os objetos APOD do banco de dados
        const apods = await APOD.buscaObjeto();
        const API_KEY = process.env.NASA_API;
        const today = new Date();

        if (apods.length === 0) {
            for (let i = 1; i < 6; i++) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                const formattedDate = date.toISOString().split('T')[0];
                const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${formattedDate}`);
                const data = await response.json();
                const novoAPOD = new APODModel({ data });
                await novoAPOD.save();
                apods.push(novoAPOD); // Adicionar o novo APOD à lista
            }
        } else {
            // Se houver registros no banco de dados
            const latestApodDate = apods[0].data.date;
            const date = new Date(today);
            date.setDate(date.getDate() - 0);

            if (latestApodDate === date) {
                return apods;
            } else {
                await APOD.delete(apods[apods.length - 1]._id);
                const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
                const data = await response.json();
                const novoAPOD = new APODModel({ data });
                await novoAPOD.save();
                apods.push(novoAPOD);
            }
        }
        return apods;

    } catch (error) {
        console.error('Erro em requisição - APOD', error);
        throw error;
    }
}

async function api_upcomingEvents(){
    try{
        const response = await fetch(`https://ll.thespacedevs.com/2.2.0/event/upcoming/`);
        const dataEvent = await response.json();
        if (!dataEvent.results || !Array.isArray(dataEvent.results)) {
            throw new Error("Estrutura de dados inválida ou undefined");
        }
        const upcomingEvents = dataEvent.results.slice(1, 5).map((event, index) => {
            let primeiraAgencia = obterNomePrimeiraAgencia(event); 
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

function obterNomePrimeiraAgencia(event) {
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
        const launches = await fetch(`https://ll.thespacedevs.com/2.2.0/launch/upcoming/`);
        const launchEvent = await launches.json();
    
        const upcomingLaunchs = launchEvent.results.slice(0, 4).map((launch, index) => {
            let windowStart = launch.window_start;
            let missionDescription = launch.mission?.description || "None";
            let typeOfMission = launch.mission.orbit.name || "None";
            let agencia = obterAbbrevAgencia(launch);
    
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

function obterAbbrevAgencia(launch) {
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