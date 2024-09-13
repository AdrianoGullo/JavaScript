const {Events, EventsModel} = require('../../Models/homeModel');


// Upcomingo Events - TheSpaceDevs API
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
        let primeiraAgencia = firstAgencyName(event.data) || "N/A"; 
        let agenciaImg = event.data.agencies[0].logo_url;
        let typeOfMission = event.data.type?.name || "N/A"; 
        let eventDate = changeDateType(event.data.date) || "N/A";
        let eventImage = event.data.feature_image || "default-image.jpg";

        // Determinar status do evento
        let eventEnd = new Date(event.data.date) || new Date();
        let currentDate = new Date();

        let status = "soon";
        if (currentDate > eventEnd) {
            status = "done";
        }

        return {
            img: eventImage,
            title: event.data.name || "N/A",
            description: event.data.description || "N/A",
            date: eventDate,
            mission: typeOfMission,
            status: status,
            index: index + 1,

            
            agencia: primeiraAgencia,
            agenciaImage: agenciaImg,
            agenciaDescription: event.data.agencies[0].description,

            pad: event.data.launches[0]?.pad?.name || "N/A",
            padLocation: event.data.launches[0]?.pad?.location?.name || "N/A",
            padImage: event.data.launches[0]?.pad?.map_image || "default-map-image.jpg", // Imagem padrão para o mapa

            program: event.data.program[0]?.name || "No program specified",
            programDescription: event.data.program[0]?.description || "N/A",
            programImage: event.data.program[0]?.image_url || "default-program-image.jpg", // Imagem padrão para o programa

            rocket: event.data.launches[0]?.rocket?.configuration?.full_name || "N/A"
        };
    });
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

module.exports = {
    api_upcomingEvents,
    requestAPI_UpcomingEvents,
    firstAgencyName,
    formatEvent,
  };