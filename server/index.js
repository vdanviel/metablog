//CONEXÃO AO MONGO
//hnQZQXyvuZOphg4r

//definindo variaveis..
const express = require('express');//chamando express para montar o servidor..
const fs = require('fs');//usando node file system para manipular o json..
const server = express();//a var "server" recebe a lib express com todas as suas dependencias...
const uuidv4 = require('uuid').v4;//uuid para ids unicos..
const save_path = 'saves/application.json';//caminho de onde vai ficasr os dados da aplicação..

//MIDDLEWARES
//para servidor entender dados json das requisições, temos esse middleware express que entende dados json..
server.use(express.json());

//adicionando headers para cors no servidor..
server.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Content-Type', 'application/json'),
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

//ROTAS

//rota teste..
server.get('/', (request, response) => {

    response.send(true);

});

//salvar professor em um json..
server.post('/teacher/save', (request, response) => {

    // Validação de dados
    if (!request.body.name || !request.body.email || !request.body.password || request.body.name === "" || request.body.email === "" || request.body.password === "") {
        response.json({
            "missing_shields": {
                name: !request.body.name || request.body.name === "",
                email: !request.body.email || request.body.email === "",
                password: !request.body.password || request.body.password === ""
            }
        });
        return false;
    }

    //lendo arquivo e me mando de volta
    fs.readFile(save_path, function(err, data) {

        if (err) {
            response.status(500).send(err);
            return false;
        }

        try {
            
            const saves = JSON.parse(data);

            //formando o objeto do novo professor..
            let teacher = {
                id: uuidv4(),
                name: request.body.name,
                email: request.body.email,
                password: request.body.password,
                date_created: new Date()
            }
    
            //adicionando professor no array dos saves..
            saves.teachers.push(teacher);

            fs.writeFile(save_path, JSON.stringify(saves), function (err) {                
                if (err) {
                    response.status(500).send(err);
                    return false;
                }
            });

            response.json({"success": new Date()})

            return true;

        } catch (error) {
            
            console.error(error);
            response.status(500).send(error)
            return false;

        }

    });

    //response.json(success);

});

server.post('/reservation/save', (request, response) => {

    // Validação de dados
    if (
        !request.body.name ||
        !request.body.init_date ||
        !request.body.final_date ||
        !request.body.reason ||
        !request.body.period ||
        request.body.name === "" ||
        request.body.init_date === "" ||
        request.body.final_date === "" ||
        request.body.reason === "" ||
        request.body.period === "" 
    ) {
        response.json({
            "missing_shields": {
                name: !request.body.name || request.body.name === "",
                init_date: !request.body.init_date || request.body.init_date === "",
                final_date: !request.body.final_date || request.body.final_date === "",
                reason: !request.body.final_date || request.body.final_date === "",
                period: !request.body.final_date || request.body.final_date === ""
            }
        });
        return false;
    }

    //lendo arquivo e me mando de volta
    fs.readFile(save_path, function(err, data) {

        if (err) {
            response.status(500).send(err);
            return false;
        }

        try {
            
            const saves = JSON.parse(data);

            //formando o objeto do novo professor..
            let teacher = {
                id: uuidv4(),
                name: request.body.name,
                email: request.body.email,
                password: request.body.password,
                date_created: new Date()
            }
    
            //adicionando professor no array dos saves..
            saves.teachers.push(teacher);

            fs.writeFile(save_path, JSON.stringify(saves), function (err) {                
                if (err) {
                    response.status(500).send(err);
                    return false;
                }
            });

            response.json({"success": new Date()})

            return true;

        } catch (error) {
            
            console.error(error);
            response.status(500).send(error)
            return false;

        }

    });

    //response.json(success);

});

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