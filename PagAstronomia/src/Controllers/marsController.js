exports.index = async (requisicao, resposta) => {
    if(requisicao.session.user) return resposta.render('marsPag', {Mars_apiRequest});
    return resposta.render('login');
};

async function Mars_apiRequest(roverMars, page, solMarte){
    let API_KEY = process.env.NASA_API;
    let response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverMars}/photos?sol=${solMarte}&page=${page}&api_key=${API_KEY}`);

    let dadosMars = await response.json();
    console.log(dadosMars);
    if(dadosMars.length == 0){
        //adicionar badge avisando que não tem fotos para esse dia
        return;
    }
    const album = document.getElementById('album');

    for (let index = 0; index < dadosMars.photos.length; index++) {
        adicionaFotoNoAlbum(album, dadosMars.photos[index]);
    }
};

exports.module = Mars_apiRequest;