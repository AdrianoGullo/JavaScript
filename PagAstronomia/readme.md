# Planeta Astronômico

O Planeta Astronômico é um site dedicado à divulgação de informações sobre astronomia, explorando o vasto cosmos e os mistérios do universo. Ainda em desenvolvimento, a ideia do site é oferecer uma jornada pelo espaço sideral, incluindo notícias, imagens impressionantes, artigos informativos e muito mais.
Este projeto é uma iniciativa pessoal para praticar minhas habilidades em desenvolvimento, além de fornecer um recurso informativo para amantes do espaço.

## Pré-requisitos

Antes de começar, tenha o Node.js e o npm (gerenciador de pacotes do Node.js) instalados -> [clique aqui](https://nodejs.org/).

## Instalação

1. Clone este repositório.
2. Execute `npm install` para instalar as dependências.

## Configuração

### MongoDB

1. Entre na sua conta [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Crie um novo cluster e siga as instruções para configurá-lo.
3. Obtenha sua URI de conexão do MongoDB.

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```
connectionSting = sua_uri_deConexão_doMongoDB
NASA_API = sua_APIKEY_da_NASA
```

Substitua `sua_uri_deConexão_doMongoDB` pela URI de conexão do seu cluster MongoDB.

## Features Planejadas

Features planejadas ou em desenvolvimento:

- [ ] Organização página de fotos de Marte (marsPag)
- [ ] Lista de eventos/lançamentos na página 'Events' - Mesmo API já usado na home
- [ ] Sistema de favoritos para os usuários favoritarem qualquer foto ou noticia/lançamento que achar interessante
- [ ] Página 'Favorites' - Lista relacionado ao tipo de favorito e mostrando os favoritos do usuário (excluir, compartilhar, abrir informações)
- [ ] Página 'Simulations' - Adicionar hub de jogos para brincar com simulações (orbitSimulation, por exemplo)
- [ ] Sistema de admin - Pode escrever novos posts
- [ ] Página 'SpaceCraft' - Infos sobre as naves espaciais em lista
- [ ] Página 'Weather' - Infos do API da NASA, fazer um tratamento de dados e pensar na melhor forma para mostrar as informações que o usuário quer saber.

Fique à vontade para sugerir novas features ou contribuir com código para implementar essas!

## Uso

1. Execute `npm start` para iniciar o servidor.
2. Execute `npm run dev` para iniciar o webpack em modo de desenvolvimento.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma nova branch (`git checkout -b feature/nome-da-feature`).
3. Faça commit das suas alterações (`git commit -am 'Adicione uma nova feature'`).
4. Faça push para a branch (`git push origin feature/nome-da-feature`).
5. Crie um novo Pull Request.
