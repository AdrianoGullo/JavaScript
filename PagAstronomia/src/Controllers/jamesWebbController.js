const {JW_Photo} = require('../Models/favoritoModel');

exports.index = async (requisicao, resposta) =>{   
    try {
        const photos = await findJamesWebbImages(); 
        resposta.render('jameswebb', { photos: photos });
    } catch (error) {
        console.error('Erro ao buscar fotos:', error);
        resposta.render('src/Views/includes/Errors/404.ejs');
    }
};

async function findJamesWebbImages() {
    try {
        const photos_MongoDB = await JW_Photo.buscaObjeto();

        if (photos_MongoDB.length === 0) {
            const newPhotos = await requestAPI_MarsPhotos();
            return newPhotos;
        } else {
            const cachedPhotos = await photos_MongoDB.slice(0, 6)
            return cachedPhotos;
        }
    } catch (error) {
        console.log(error);
    }
}