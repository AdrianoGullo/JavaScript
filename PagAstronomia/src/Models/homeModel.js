const mongoose = require('mongoose');

//Modelagem dos dados
const homeSchema = new mongoose.Schema({
    titulo: String,
    data: Number,
    objetivo: { type: String, required: true},
});

const homeModel = mongoose.model('Home', homeSchema);

module.exports = homeModel;
