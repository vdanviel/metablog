import express from "express";
import controller from '../controller/userController.js';
import jsondata from "../../config.json" assert {type: "json"};

//funcs..
import { utils } from "../utils/functions.js";
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from "node:path";

const userRouter = express.Router();//definindo o objeto rota..

const config = JSON.parse(JSON.stringify(jsondata));//arquivo de configurações..

userRouter.post('/register', async (req, res) => {

    try {

        let required = ['name', 'nick', 'email', 'password', 'bio'];

        let validating = utils.validate(req.body,required);

        if (validating === true) {

            // Validação do nome
            let not_allowed_characters_name = /[!@#$%¨&*()+\-_0-9]/;

            if (not_allowed_characters_name.test(req.body.name)) {
                return res.status(400).json({
                    status: false,
                    text: 'Name cannot cointain any special caracters.'
                });
            }

            //VALIDA NICKNAME
            //verifica se há espaço ou qualquer caractere menos _
            let not_allowed_characters_nick = /[ !@#$%¨&*()+\-áéíóúãõÁÉÍÓÚÃÕ]/;

            if (not_allowed_characters_nick.test(req.body.nick) == true) {
                
                return res.status(400).json({
                    status: false,
                    text: 'Nickname cannot contain spaces or special caracters unless underline.'
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
                text: "You've been successfully registered on Metablog."
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
                file: error.fileName, 
                line: error.lineNumber,
                column: error.columnNumber,
            }
        });

    }

});

userRouter.get('/find/:nick', async (req, res) => {

    try {

        const user = await controller.find(req.params.nick)

        return res.status(200).json(user);

    } catch (error) {
        
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: {
                message: error.message,
                stack: error.stack,
                file: error.fileName, 
                line: error.lineNumber, 
                column: error.columnNumber, 
            }
        });

    }

})

// Configuração do multer para o armazenamento das imagens

const midiaStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const local = path.resolve('../../metablog/server/uploads');
        cb(null, local);
    },
    filename: function (req, file, cb) {
        let uniqueName = uuidv4() + ".jpeg"; // Gerando um nome aleatório único para cada upload
        cb(null, uniqueName);
    }
});

const uploaduserphoto = multer({ storage: midiaStorage });

// Rota para upload de imagem de perfil
userRouter.patch('/upload-photo', uploaduserphoto.single('image'), async (req, res) => {

    try {
        if (!req.file || !req.body.id) {
            return res.status(400).json({
                status: false,
                missing: ['id', 'image'],
                text: "Please fill in the required fields."
            });
        }

        let imgname = config.url.local + "/uploads/" + req.file.filename;

        // Atualizando no banco de dados
        let saved = await controller.update_user_photo(req.body.id, imgname);

        if (saved.status == false) {
            return res.status(400).json(saved);
        }

        return res.status(200).json(saved);

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

// Rota para upload de imagem do banner
userRouter.patch('/upload-banner', uploaduserphoto.single('image'), async (req, res) => {

    try {

        if (!req.file || !req.body.id) {
            return res.status(400).json({
                status: false,
                missing: ['id', 'image'],
                text: "Please fill in the required fields."
            });
        }

        let imgname = config.url.local + "/uploads/" + req.file.filename;

        // Atualizando no banco de dados
        let saved = await controller.update_user_banner(req.body.id, imgname)

        if (saved.status == false) {
            return res.status(400).json(saved);
        }

        return res.status(200).json(saved);

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

userRouter.get('/follows/list/:nick/:offset/:limit', async (req, res) => {

    try {

        const list = await controller.list_follower_following(req.params.nick, req.params.offset, req.params.limit);

        if (list.status == false) {
            
            return res.status(400).json({list});

        }else{

            return res.status(200).json({list});

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

        let required = ['id_user', 'nick'];

        let validating = utils.validate(req.body,required);

        if(validating == true){

            const follow = await controller.follow(req.body.id_user, req.body.nick);

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

});

userRouter.patch('/unfollow', async (req, res) => {

    try {

        let required = ['id_user', 'nick'];

        let validating = utils.validate(req.body,required);

        if(validating == true){

            const follow = await controller.unfollow(req.body.id_user, req.body.nick);

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

});

userRouter.patch('/change-password', async (req, res) => {

    try {

        let required = ['id_user', 'type', 'token', 'password'];

        let validating = utils.validate(req.body,required);

        if(validating == true){

            return res.status(200).json(await controller.resetPassword(req.body.id_user, req.body.type, req.body.token, req.body.password));

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

userRouter.get('/info/:nick/:offset/:limit', async (req, res) => {

    try {
        
        const info = await controller.user_posts(req.params.nick, req.params.offset, req.params.limit);

        return res.status(200).json(info);
        

    } catch (error) {
        
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: {
                message: error.message,
                stack: error.stack,
                file: error.fileName, 
                line: error.lineNumber, 
                column: error.columnNumber, 
            }
        });

    }

});

userRouter.put('/update', async (req, res) => {

    try {

        let required = ['id_user', 'name', 'nick', 'bio'];

        let validating = utils.validate(req.body,required);

        if(validating == true){

            // Validação do nome
            let not_allowed_characters_name = /[!@#$%¨&*()+\-_0-9]/;

            if (not_allowed_characters_name.test(req.body.name)) {
                return res.status(400).json({
                    status: false,
                    text: 'Name cannot cointain any special caracters.'
                });
            }

            //VALIDA NICKNAME
            //verifica se há espaço ou qualquer caractere menos _
            let not_allowed_characters_nick = /[ !@#$%¨&*()+\-áéíóúãõÁÉÍÓÚÃÕ]/;

            if (not_allowed_characters_nick.test(req.body.nick) == true) {
                
                return res.status(400).json({
                    status: false,
                    text: 'Nickname cannot contain spaces or special caracters unless underline.'
                });

            }

            const updated = await controller.update_user(req.body.id_user, req.body.name, req.body.nick, req.body.bio)

            if (updated.status == false) {
                return res.status(400).json(updated);
            }

            return res.status(200).json(updated);

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

userRouter.delete('/delete', async (req, res) => {

    try {

        let required = ['id_user', 'password'];

        let validating = utils.validate(req.body,required);

        if(validating == true){

            const deleted = await controller.deleteAccount(req.body.id_user, req.body.password);

            return res.status(200).json(deleted);

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

export default userRouter;
