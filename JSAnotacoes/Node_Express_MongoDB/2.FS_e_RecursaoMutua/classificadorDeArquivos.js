const fs = require('fs').promises;
const path = require('path');

/*Outra forma:
fs.readdir(path.resolve(__dirname))
    .then(files => console.log(files))
    .catch(e => console.log(e));
    */

async function readdir(rootDir){                                //atraves de um diretório raiz, percorrer todos seus arquivos
    rootDir = rootDir || path.resolve(__dirname);
    const files = await fs.readdir(rootDir);
    walk(files, rootDir);
};

async function walk(files, rootDir){
    for (let file of files){
        const fileFullPath = path.resolve(rootDir, file);
        const stats = await fs.stat(fileFullPath);

        if(/\.git/g.test(fileFullPath)) continue;                   //excluindo pastas de git e node_modelus
        if(/\.node_modules/g.test(fileFullPath)) continue;

        if(stats.isDirectory()){                                    //Se for uma pasta, lista os arquivos dela
            readdir(fileFullPath);
            continue;
        }

        if(!/\.css$/g.test(fileFullPath)) continue;                 //expressão para procurar apenas os arquivos .css

        console.log(file, stats.isDirectory());
    }
};

readdir('/Users/didig/javascript/JSAnotacoes/Node_Express_MongoDB');