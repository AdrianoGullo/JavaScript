const fs = require('fs').promises;

// fs.writeFile(caminhoArquivo, json, { flag: 'w', encoding: 'utf8'});          //interessante para arquivos de armazenamento, como logs
//flag 'w' apaga e escreve novamente no arquivo, flag 'a' escreve novamente sem apagar o que já estava


//Outra abordagem:
module.exports = (caminho, dados)=> {
    fs.writeFile(caminho, dados, {flag: 'w'});
}
