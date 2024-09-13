async function index (requisicao, resposta) {
    if(requisicao.session.user) {
        let page = 1, sol = 1000; rover = 'curiosity';
        let dadosMars = await Mars_apiRequest('curiosity', page, sol);
        return resposta.render('marsPag', {dadosMars, page, sol});
    }
    return resposta.render('login');
};

// marsController.js
async function Mars_apiRequest(roverMars, page, solMarte) {
    let API_KEY = process.env.NASA_API;
    let response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverMars}/photos?sol=${solMarte}&page=${page}&api_key=${API_KEY}`);
    let dadosMars = await response.json();
    if (!dadosMars.photos || dadosMars.photos.length === 0) {
        console.error("Nenhuma foto foi encontrada para o sol ou página especificados.");
        return { photos: [] };
    }
    return dadosMars;
}

module.exports = { index, Mars_apiRequest };