const {JamesWebb, JamesWebbModel} = require('../../Models/homeModel');

// Upcomingo Events - TheSpaceDevs API
async function api_JamesWebbImages() {
    try {
        const mongoDB_cached = await JamesWebb.buscaObjeto();
        
        if (mongoDB_cached.length === 0) {
            const upcomingEvents = await requestAPI_jamesWebb(1, 10);
            return upcomingEvents;
        } else {
            return mongoDB_cached;
        }
    } catch (error) {
        console.log(error);
    }
}

async function requestAPI_jamesWebb(page, perPage) {
    const API_KEY = process.env.jamesWeb_API;

    fetch(`https://api.jwstapi.com/all/type/jpg?page=${page}&perPage=${perPage}`, {
    method: 'GET',
    headers: {
        'X-API-KEY': API_KEY
    }
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        JamesWebbModel.insertMany(data.body.map(dataImages => ({
            data: dataImages,
        })));
        
        return data.body;
    })
    .catch(error => {
        console.error('Erro:', error);
    });
    
}

module.exports = {
    api_JamesWebbImages,
    requestAPI_jamesWebb
}