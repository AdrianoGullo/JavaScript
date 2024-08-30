const { createConnection } = require('mongoose');
const apodAPI = require('./homeIncludes/apodAPIController');
const eventsAPI = require('./homeIncludes/eventsAPIController');
const launchsAPI = require('./homeIncludes/launchsAPIController');

const {Mars, MarsModel } = require('../Models/homeModel');


exports.index = async (requisicao, resposta) =>{   
    try{
        const apods = await apodAPI.apiAPOD_dayPicture(); 
        const EventsData = await eventsAPI.api_upcomingEvents(); 
        const LaunchsData = await launchsAPI.api_upcomingLaunchs(); 
        const MarsPhotos = await Mars_apiRequest();
        resposta.render('index.ejs', {apods, EventsData, LaunchsData, MarsPhotos});
    } catch(error){
        console.log(error),
        resposta.render('/includes/Errors/404.ejs');
    }
};


// Mars Rover Photos API - NASA (Rovers: curiosity, opportuniy e perceverence)
async function Mars_apiRequest(){
    try {
        const MarsPhotos_MongoDB = await Mars.buscaObjeto();

        if (MarsPhotos_MongoDB.length === 0) {
            const newPhotos = await requestAPI_MarsPhotos();
            return newPhotos;
        } else {
            const cachedPhotos = await MarsPhotos_MongoDB.slice(0, 6)
            return cachedPhotos;
        }
    } catch (error) {
        console.log(error);
    }
};

async function requestAPI_MarsPhotos() {
    let API_KEY = process.env.NASA_API;
    let response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=${API_KEY}`);

    let dataMars = await response.json();
    let dataMars_Results = dataMars.photos;

    if (!dataMars.photos) {
        throw new Error("Estrutura de dados inválida ou undefined");
    }

    await MarsModel.insertMany(dataMars_Results.map(marsPhotos => ({
        data: marsPhotos,
    })));

    const homeHighlightsPhotos = dataMars_Results.slice(0, 6);
    return homeHighlightsPhotos;
}