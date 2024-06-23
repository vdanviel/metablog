

//definindo variaveis..
import express from 'express';
import userRouter from './app/router/userRouter.js';

const server = express();

//MIDDLEWARES
//para servidor entender dados json das requisições, temos esse middleware express que entende dados json..
server.use(express.json());

//adicionando headers para cors no servidor..
server.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Content-Type', 'application/json');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

//ROTAS
//user
server.use('/user'. userRouter);


//LIGANDO SERVIDOR
//server.listen() - liga servidor indicando qual porta o servidor vai escutar..
server.listen(('0.0.0.0', 8000), () => {

    console.log("Running!");

});

//PARA SUBIR O SERVIDOR - node index.js (ou nome do arquivo main  [da um exec no arquivo e servidor upa])

/*
    PARA SERVIDOR ATUALIZAR AUTOMATICAMNETE:
    o servidor não vai atualizar automaticamente pois é um servidor manual.
    para isso precisamos instalar a dependencia node moon, que atualiza o servidor automaticamente.
    `npm install -g nodemon`
*/

/*
    PARA NÓS PODERMOS UTILIZAR COMANDOS NO NODE:
    para isso temos que acessar o packege.json da nossa aplicação, e adicionar um comando dentro do objeto "scripts"..
    veja /package.json, nesse caso nós criamos um comando que automatimante via utilizar o nodemon, para faciliztar o processo,
    ao inves de ficar escrvendo o comando
    `nodemon ./server.js` para executar o nodemon no /index.js toda hr, nós só vamos escrever, "node start"
*/