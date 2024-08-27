const { createConnection } = require('mongoose');
const functions_API = require('../Controllers/homeController');

const {Events, EventsModel, Launchs, LaunchsModel} = require('../Models/homeModel');

exports.index = async (requisicao, resposta) => {
    if(requisicao.session.user) {
        const EventsData = await requireDataBase_events(); 
        const LaunchsData = await requireDataBase_launch();
        return resposta.render('newsPag', {EventsData, LaunchsData});
    }    
    return resposta.render('login');
};

async function requireDataBase_events() {
    try {
        const db_events = await Events.buscaObjeto(); // Ordena por data crescente
        const formated_db_events = formatEvent(db_events);
        return formated_db_events;
    } catch (error) {
        console.log(error);
    }
}

async function requireDataBase_launch() {
    try {
        const db_launchs = await Launchs.buscaObjeto(); // Ordena por data crescente
        const formated_db_launchs = formatLaunchs(db_launchs);
        return formated_db_launchs;
    } catch (error) {
        console.log(error);
    }
}

function formatEvent(eventos) {
    return eventos.map((event, index) => {
        return {
            img: event.data.feature_image,
            title: event.data.name,
            description: event.data.description,
            index: index + 1 
        };
    });
}

function formatLaunchs(lancamentos) {
    return lancamentos.map((launch, index) => {
        let missionDescription = launch.data.mission?.description || "None";
        let typeOfMission = launch.data.mission?.orbit?.name || "None";

        return {
            img: launch.data.image,
            title: launch.data.name,
            description: missionDescription,
            mission: typeOfMission,
            index: index + 1
        };
    });
}