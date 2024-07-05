import express from "express";
import controller from '../controller/userController.js';
import jsondata from "../../config.json" assert {type: "json"};

//funcs..
import { utils } from "../utils/functions.js";
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const userRouter = express.Router();//definindo o objeto rota..

const config = JSON.parse(JSON.stringify(jsondata));//arquivo de configurações..

userRouter.post('/register', async (req, res) => {

    try {

        let required = ['name', 'nick', 'email',  'password', 'bio'];

        let validating = utils.validate(req.body,required);

        console.log(req.body);

        if (validating === true) {

            // Validação do nome
            let not_allowed_characters_name = /[!@#$%¨&*()+\-_0-9]/;

            if (not_allowed_characters_name.test(req.body.name)) {
                return res.status(400).json({
                    status: false,
                    text: 'O nome não pode conter caracteres especiais ou números.'
                });
            }

            //VALIDA NICKNAME
            //verifica se há espaço ou qualquer caractere menos _
            let not_allowed_caracters_nick = /[ !@#$%¨&*()+-]/g;

            if (not_allowed_caracters_nick.test(req.body.nick) == true) {
                
                return res.status(400).json({
                    status: false,
                    text: 'Nickname cannot contain spaces or special caracters.'
                });

            }


            let registered = await controller.register_user(req.body.name, req.body.nick, req.body.email, req.body.bio, req.body.password);

            if (registered.status == false) {
                
                return res.status(400).json({
                    status: false,
                    text: registered.text
                });

            }

            return res.status(200).json({
                status: true,
                text: "You've been successfully registeres on Metablog."
            });

        }else{

            return res.status(400).json({
                status: false,
                text: "Please fill in the required fields.",
                missing: validating
            });

        }

    } catch (error) {
        
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: {
                message: error.message,
                stack: error.stack,
                file: error.fileName, // Informações do arquivo onde ocorreu o erro (opcional)
                line: error.lineNumber, // Número da linha onde ocorreu o erro (opcional)
                column: error.columnNumber, // Número da coluna onde ocorreu o erro (opcional)
            }
        });

    }

});

//configurando envio da foto de perfill..
const userPhoto = uuidv4() + ".jpeg";//nome aleatórios para arquivos..

// Configuração do multer para o armazenamento das imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.uploads_local_directory);
    },
    filename: function (req, file, cb) {
        cb(null, userPhoto);
    }
});

const uploaduserphoto = multer({ storage: storage });

// Rota para upload de imagem
userRouter.patch('/upload-photo', uploaduserphoto.single('image'), async (req, res) => {

    try {

        if (!req.file || !req.body.id) {
            return res.status(400).json({
                status: false,
                missing: ['id', 'image'],
                text: "Please fill in the required fields."
            });
        }

        let imgname = config.url.local + "/uploads/" + userPhoto;

        //atualizando no banco de dados..
        let saved = await controller.update_user_photo(req.body.id, imgname)

        if (saved.status == false) {

            return res.status(400).json({
                status: false,
                text: saved.text
            });
            
        }

        return res.status(200).json({
            status: true,
            text: "Your profile picture was sucessfully saved!"
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: {
                message: error.message,
                stack: error.stack
            }
        });
    }
});

userRouter.post('/login', async (req, res) => {

    try {

        let required = ['email', 'password'];

        let validating = utils.validate(req.body,required);

        if(validating == true){

            let login = await controller.login(req.body.email, req.body.password);

            if (login.status == true) {
                
                return res.status(200).json(login);

            }else{

                return res.status(400).json(login);

            }

        }else{

            return res.status(400).json({
                status: false,
                text: "Please fill in the required fields.",
                missing: validating
            });

        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: {
                message: error.message,
                stack: error.stack
            }
        });
    }

});

userRouter.patch('/follow', async (req, res) => {

    try {

        let required = ['id_user', 'id_user_follow'];

        let validating = utils.validate(req.body,required);

        if(validating == true){

            const follow = await controller.follow(req.body.id_user, req.body.id_user_follow);

            if (follow.status == false) {
                
                return res.status(400).json({follow});

            }else{

                return res.status(200).json({follow});

            }

        }else{

            return res.status(400).json({
                status: false,
                text: "Please fill in the required fields.",
                missing: validating
            });

        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: {
                message: error.message,
                stack: error.stack
            }
        });
    }

})

userRouter

export default userRouter;
