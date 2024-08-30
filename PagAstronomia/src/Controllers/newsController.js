const { createConnection } = require('mongoose');
const events_API = require('./homeIncludes/eventsAPIController');
const launchs_API = require('./homeIncludes/launchsAPIController');

const {Events, Launchs} = require('../Models/homeModel');

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
        const formated_db_events = events_API.formatEvent(db_events);
        return formated_db_events;
    } catch (error) {
        console.log(error);
    }
}

async function requireDataBase_launch() {
    try {
        const db_launchs = await Launchs.buscaObjeto(); // Ordena por data crescente
        const formated_db_launchs = launchs_API.formatLaunchs(db_launchs);
        return formated_db_launchs;
    } catch (error) {
        console.log(error);
    }
}