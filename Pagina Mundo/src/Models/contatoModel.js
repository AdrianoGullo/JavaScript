const mongoose = require('mongoose');
const validator = require('validator');

//Modelagem dos dados
const contatoSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    sobrenome: { type: String, required: false, default:''},
    email: { type: String, required: false, default:''},
    telefone: { type: String, required: false, default:''},
    criadoEm: { type: Date, default: Date.now},
});

const contatoModel = mongoose.model('contato', contatoSchema);

function Contato(body){
    this.body = body;
    this.errors = [];
    this.contato = null;
};

Contato.prototype.register = async function(){
    this.valida();
    if(this.errors.length > 0) return;
    this.contato = await contatoModel.create(this.body);
};

Contato.prototype.valida = function(){
    this.cleanUp();
    //O email precisa ser válido
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido.');
    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório');
    if(!this.body.email && !this.body.telefone) this.errors.push('Precisa-se do email e/ou telefone para cadastrar.');
}

Contato.prototype.cleanUp = function(){
    for(const key in this.body){
        if (typeof this.body[key] !== 'string'){
            this.body[key] = '';
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone,
    };
};

Contato.buscaPorId = async function(id){
    if(typeof id !== 'string') return;
    const user = await contatoModel.findById(id);
    return user;
};

Contato.prototype.edit = async function(id){
    if(typeof id !== 'string') return;
    this.valida();
    if(this.errors.length > 0) return;
    this.contato = await contatoModel.findByIdAndUpdate(id, this.body, {new: true});
};

Contato.buscaContatos = async function(){
    const users = await contatoModel.find()
        .sort({criadoEm: -1});
    return users;
};

Contato.delete = async function(id){
    if(typeof id !== 'string') return;
    const user = await contatoModel.findOneAndDelete({_id: id});
    return user;
};

module.exports = Contato;
