const {Events, EventsModel, Launchs, LaunchsModel} = require('../Models/homeModel');

exports.index = async (requisicao, resposta) => {
    if(requisicao.session.user) {
        const EventsData = await requireDataBase_events(); 
        const LaunchsData = await requireDataBase_launch();
        return resposta.render('eventsPag.ejs', {EventsData, LaunchsData});
    }
    return resposta.render('login');
};

