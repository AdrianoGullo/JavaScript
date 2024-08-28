exports.index = async (requisicao, resposta) => {
    if(requisicao.session.user) {
        let dadosMars = await Mars_apiRequest('curiosity', 1, 1000);
        return resposta.render('marsPag', {dadosMars});
    }
    return resposta.render('login');
};

async function Mars_apiRequest(roverMars, page, solMarte){
    let API_KEY = process.env.NASA_API;
    let response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverMars}/photos?sol=${solMarte}&page=${page}&api_key=${API_KEY}`);

    let dadosMars = await response.json();

    if (!dadosMars.photos || dadosMars.photos.length === 0) {
        console.error("Nenhuma foto foi encontrada para o sol ou página especificados.");
        return { photos: [] };
    }

    return dadosMars;
}


exports.module = Mars_apiRequest;