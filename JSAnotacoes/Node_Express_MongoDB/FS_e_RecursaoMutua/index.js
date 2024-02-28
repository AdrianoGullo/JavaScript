const fs = require('fs').promises;
const path = require('path');

/*Outra forma:
fs.readdir(path.resolve(__dirname))
    .then(files => console.log(files))
    .catch(e => console.log(e));
    */

async function readdir(rootDir){
    rootDir = rootDir || path.resolve(__dirname);
    const files = await fs.readdir(rootDir);
    walk(files, rootDir);
};

async function walk(files, rootDir){
    for (let file of files){
        const fileFullPath = path.resolve(rootDir, file);
        const stats = await fs.stat(fileFullPath);

        if(/\.git/g.test(fileFullPath)) continue;

        if(stats.isDirectory()){
            readdir(fileFullPath);
            continue;
        }

        console.log(file, stats.isDirectory());
    }
};

readdir('/Users/didig/javascript/JSAnotacoes/Node_Express_MongoDB');