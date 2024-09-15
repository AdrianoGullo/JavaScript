const { createConnection } = require('mongoose');
const { JW_Photo, JW_Insight } = require('../Models/favoritoModel');
const fs = require('fs').promises;
const path = require('path');

exports.index = async (requisicao, resposta) => {
    try {
        const photos = await readFile_json('../Views/includes/json/jameswebb_img.json');
        const insights = await readFile_json('../Views/includes/json/jameswebb_insights.json');
        resposta.render('jameswebb', { photos, insights });
    } catch (error) {
        console.error('Erro ao buscar fotos:', error);
        resposta.status(500).render('includes/Errors/404.ejs');
    }
};

async function findJamesWebbImages() {
    try {
        // Busca as imagens no MongoDB
        const photos_MongoDB = await JW_Photo.buscaObjeto();

        if (photos_MongoDB.length === 0) {
            console.log('Nenhuma imagem encontrada no banco de dados. Lendo arquivo JSON...');
            return newPhotos;
        } else {
            console.log('Imagens encontradas no MongoDB');
            return photos_MongoDB;
        }
    } catch (error) {
        console.error('Erro ao buscar imagens:', error);
        throw new Error('Falha ao buscar imagens');
    }
}

async function findJamesWebbInsights() {
    try {
        const Insights_MongoDB = await JW_Insight.buscaObjeto();

        if (Insights_MongoDB.length === 0) {
            console.log('Nenhum insight encontrado no banco de dados. Lendo arquivo JSON...');
            const newInsights = await readFile_json('../Views/includes/json/jameswebb_insights.json');
            const savedInsights = await JW_Insight.insertMany(newInsights);
            return savedInsights;
        } else {
            console.log('Insights encontrados no MongoDB');
            return Insights_MongoDB;
        }
    } catch (error) {
        console.error('Erro ao buscar imagens:', error);
        throw new Error('Falha ao buscar imagens');
    }
}

async function readFile_json(jsonpath) {
    try {
        const filePath = path.join(__dirname, jsonpath);  // Caminho para o arquivo JSON
        const data = await fs.readFile(filePath, 'utf8');  // Lê o arquivo
        const photos = JSON.parse(data);  // Converte para um objeto JavaScript
        return photos;
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error);
        throw new Error('Falha ao ler o arquivo JSON');
    }
}