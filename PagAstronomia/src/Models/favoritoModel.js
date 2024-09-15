const mongoose = require('mongoose');

const JWImage = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    image_url: [String]
});

const JWInsights = new mongoose.Schema({
    title: String,
    description: [String],
    date: Date,
    type: String,
    image_url: [String]
});

JWImage.buscaObjeto = async function() {
    return await JWImage.find().sort({});
};

JWInsights.buscaObjeto = async function() {
    return await JWInsights.find().sort({});
};

const JW_Photo = mongoose.model('JamesWebb_Photo', JWImage);
const JW_Insight = mongoose.model('JamesWebb_Insight', JWInsights);

module.exports = {
    JW_Photo,
    JW_Insight
}