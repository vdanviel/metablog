import express from "express";

//secure data..
import jsondata from "../../config.json" assert {type: "json"};
const config = JSON.parse(JSON.stringify(jsondata));//arquivo de configurações..

//modules..
import { utils } from "../utils/functions.js";
import controller from '../controller/postController.js';

//libs..
import multer from 'multer';
import path from "node:path";
import { v4 as uuidv4 } from 'uuid';

const postRouter = express.Router();//definindo o objeto rota..

//configurando o envio dos arquivos..
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploads_local_directory);
    },
    filename: (req, file, cb) => {

        //criando nome aleatório para o arquivo local q será salvo..
        const serverfilename = uuidv4() + path.extname(file.originalname);

        cb(null, serverfilename);
    }
});

const upload = multer({ storage: storage });

// Rota para publicar
postRouter.post('/', upload.array('medias', 10), async (req, res) => {
    try {

        if (!req.body.id_user || !req.body.content || req.body.id_user == "" || req.body.content == "") {
            return res.status(400).json({
                status: false,
                missing: {
                    requested: ['id_user', 'content'],
                    optional: ['medias']
                },
                text: "Please fill in the required fields."
            });
        }

        //criando array de urls http que vão ter o caminho para as midas e serão registradas no bd..
        let midiaurls = [];

        req.files.forEach(file => {
            
            midiaurls.push(config.url.local + "/uploads/" + file.filename);

        });

        // Chamar a função do controlador para registrar a publicação
        let result = await controller.publicate(req.body.id_user, req.body.content, midiaurls);


        if (result.status == false) {
            return res.status(400).json({
                status: false,
                text: result.text
            });
        }

        return res.status(200).json({
            status: true,
            text: result.text
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

//rota feed
postRouter.get('/all/:id_user/:offset/:limit', async (req, res) => {
    
    try {
        
        let required = ['id_user', 'offset', 'limit'];

        let validating = utils.validate(req.params,required);

        if(validating == true){

            const feed = await controller.all(req.params.id_user, req.params.offset, req.params.limit);

            return res.status(200).json(feed);

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

export default postRouter;
