const path = require("path");
const caminhoArquivo = path.resolve(__dirname, 'teste.json');
const escreverFile = require('./Modules FileSystem/escreverJSON.js');
const lerFile = require('./Modules FileSystem/lerJSON.js');


//Para escrever arquivo JSON:
/* const pessoas = [
    {nome: 'Julio'},
    {nome: 'Adriano'},
    {nome: 'Didi'},
    {nome: 'Gullo'},
    {nome: 'Tólio'},
];

const json = JSON.stringify(pessoas, '', 2);
escreverFile(caminhoArquivo, json);      */


//Para ler arquivo JSON:
async function ler (caminho) {
    const dados = await lerFile(caminho);
    console.log(dados);                     //[{"nome: "Julio"}, ....]
    renderizaDados(dados);
};

function renderizaDados(dados){             
    dados = JSON.parse(dados);
    dados.forEach(element => {              //{nome: 'Julio'}\n {nome: 'Adriano'}\n
        console.log(element);               
    });
    dados.forEach(element => {              //Julio Adriano ...
        console.log(element.nome);               
    });
}

ler(caminhoArquivo);