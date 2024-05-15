const mongoose = require('mongoose');

//Modelagem dos dados
const homeSchema = new mongoose.Schema({
    titulo: String,
    data: Number,
    objetivo: { type: String, required: true},
});


// Cache de Dados do API - Astronomic Picture of Day (APOD)
const APODSchema = new mongoose.Schema({
    data: { type: mongoose.Schema.Types.Mixed, required: true }
});

const APODModel = mongoose.model('APOD_api', APODSchema);

function APOD(body) {
    this.body = body;
    this.errors = [];
    this.imagem = null;
}

APOD.buscaPorId = async function(id) {
    return await APODModel.findById(id);
};

APOD.buscaObjeto = async function() {
    return await APODModel.find().sort({ date: -1 });
};

APOD.delete = async function(id) {
    return await APODModel.findOneAndDelete({ _id: id });
};



// Cache de Dados do API - TheSpaceDevs (Events and Upcoming Launchs)

module.exports = { APOD, APODModel };
