//-----Curso JavaScript-----//
//-------ANOTAÇÕES-3--------//
//********SEÇÃO-09**********//

//JavaScript Tooling e ES6 Modules - Módulos

//Babel auxilia ao seu código a funcionar em todos os navegadores (transpilador)
// https://babeljs.io/

/*//Webpack (Boilerplate)
// https://webpack.js.org/

//npm install --save-dev @babel/core @babel/cli @babel/preset-env babel-loader webpack webpack-cli renegerator-runtime core-sj@3
//comando que cria pasta node_modules e arquivo package.json, configurar entrada, local de saida e scripts paras o json.

//Das pastas, uma source = src (fonte, 'main') e outra public/assets/js (output)
//no src main -> index.js é onde desenvolvo o código
//com o package.json configurado -> 'npm run carregarWebpack' (ou o nome colocado no json nos scripts para "webpack -w")
//será gerado em public/assets/js/ (no output) os arquivos com o nome colocado em "filename:" no json. No meu caso, bundle.js e bundle.js.map

//Dentro de public/assets, um arquivo html (index.html) pode ser criado para acompanhar bundle.js como script e ser executado.
//Toda vez que houver alteração em index.js na src, ao usar npm run carregarWebpack bundle.js será atualizado também.
//Em caso de Live Server, o "-w" em "webpack -w" serve para o json sempre acompanhar o index.js e ir atualizando o bundle.js simultaneamente. Ctrl+C para terminar

//As alterações no arquivo .js devem ser realizadas somente no arquivo da pasta src, não deve-se alterar pelos arquivos na pasta public

//Templete de Webpack está na pasta Aula116_Webpack, sem a pasta node_modules, para instalar e utilizar: "npm install" (vai instalar de acordo com o arquivo json)
*/

//ES6 Modules - Import/Export
    //metodos de import em "index.js"
    //metodos de export em "modulo1.js"
    //Com o modulos, é possível trabalhar com uma variável privada ao não exportar ela, não alterando o escopo global
    //Se colocar algo como export default, ao usar "import qualquerNome from '.modulo1'" vai importar a variável/função default, apenas 1 default por modulo.
    //Ler documentação, as vezes há mudanças na sintaxe
