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

APOD.delete = async function(id) {
    return await APODModel.findOneAndDelete({ _id: id });
};


// Cache de Dados do API - TheSpaceDevs (Events and Upcoming Launchs)
const EventsSchema = new mongoose.Schema({
    data: { type: mongoose.Schema.Types.Mixed, required: true }
});
const LaunchsSchema = new mongoose.Schema({
    data: { type: mongoose.Schema.Types.Mixed, required: true }
});

const EventsModel = mongoose.model('Events_api', EventsSchema);
const LaunchsModel = mongoose.model('Launchs_api', LaunchsSchema);

function Events(body) {
    this.body = body;
    this.errors = [];
    this.imagem = null;
}

function Launchs(body) {
    this.body = body;
    this.errors = [];
    this.imagem = null;
}

module.exports = { APOD, APODModel, Events, EventsModel, Launchs, LaunchsModel };
