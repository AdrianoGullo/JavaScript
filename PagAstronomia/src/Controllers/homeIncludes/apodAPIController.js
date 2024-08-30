const { APOD, APODModel} = require('../../Models/homeModel');


// Astronomic Picture of the Day - APOD API - NASA
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

module.exports = {
    requestAPODs_lastFiveDays,
    apiAPOD_dayPicture
  };