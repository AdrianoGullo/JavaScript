const mongoose = require('mongoose');

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

APOD.apagarBanco = async function() {
    return await APODModel.deleteMany({});
};


// Cache de Dados do API - TheSpaceDevs (Events and Upcoming Launchs)
const EventsSchema = new mongoose.Schema({
    data: { type: mongoose.Schema.Types.Mixed, required: true},
    createdAt: { type: Date, default: Date.now, expires: '1d' } // Configura o índice de expiração para 1 dia
});
const LaunchsSchema = new mongoose.Schema({
    data: { type: mongoose.Schema.Types.Mixed, required: true},
    createdAt: { type: Date, default: Date.now, expires: '1d' } // Configura o índice de expiração para 1 dia
});

const EventsModel = mongoose.model('events_api', EventsSchema);
const LaunchsModel = mongoose.model('launchs_api', LaunchsSchema);

function Events(body) {
    this.body = body;
    this.errors = [];
    this.imagem = null;
}

Events.buscaObjeto = async function() {
    return await EventsModel.find().sort({ date: -1 });
};

function Launchs(body) {
    this.body = body;
    this.errors = [];
    this.imagem = null;
}

Launchs.buscaObjeto = async function() {
    return await LaunchsModel.find().sort({ date: -1 });
};


// Cache de dados para as fotos do Home para os Rovers de Marte
const MarsSchema = new mongoose.Schema({
    data: { type: mongoose.Schema.Types.Mixed, required: true }
});

const MarsModel = mongoose.model('Mars_api', MarsSchema);

function Mars(body) {
    this.body = body;
    this.errors = [];
    this.imagem = null;
}

Mars.buscaObjeto = async function() {
    return await MarsModel.find().sort({ date: -1 });
};


/// API do JamesWeb - Cache de imagens
const JamesWebbSchema = new mongoose.Schema({
    data: { type: mongoose.Schema.Types.Mixed, required: true},
    createdAt: { type: Date, default: Date.now, expires: '1d' } // Configura o índice de expiração para 1 dia
});

const JamesWebbModel = mongoose.model('jamesWebb_api', JamesWebbSchema);

function JamesWebb(body) {
    this.body = body;
    this.errors = [];
    this.imagem = null;
}

JamesWebb.buscaObjeto = async function() {
    return await JamesWebbModel.find().sort({ date: -1 });
};

module.exports = { APOD, APODModel, Events, EventsModel, Launchs, LaunchsModel, Mars, MarsModel, JamesWebb, JamesWebbModel};