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

        let required = ['name', 'email',  'password', 'bio'];

        let validating = utils.validate(req.body,required);

        console.log(req.body);

        if (validating === true) {
            let registered = await controller.register_user(req.body.name, req.body.email, req.body.bio, req.body.password);

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
userRouter.post('/upload-photo', uploaduserphoto.single('image'), async (req, res) => {

    try {

        if (!req.file || !req.body.id) {
            return res.status(400).json({
                status: false,
                missing: ['id', 'iamge'],
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

})

export default userRouter;
