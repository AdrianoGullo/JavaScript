const mongoose = require('mongoose');

const JWimage = new mongoose.Schema({
    _id: String, // ID da foto
    title: String,
    url: String,
    categoria: { type: String, default: 'jameswebb' }, // Categoria padrão para James Webb
    curtidas: { type: Number, default: 0 }
});

JWimage.buscaObjeto = async function() {
    return await JamesWebbModel.find().sort({ date: -1 });
};

const JW_Photo = mongoose.model('JW_Photo', JWimage);

module.exports = JW_Photo;