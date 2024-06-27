import express from "express";
import controller from '../controller/userController.js';

//funcs..
import { utils } from "../utils/functions.js";

const userRouter = express.Router();

//rotas user
/* userRouter.get('/', async (req, res) => {

    try {

        res.status(200).json(await controller.index())

    } catch (error) {
        
        res.status(200).json({
            status: false,
            message: "Internal server error on router/user.",
            erro: error
        })

    }

}); */

userRouter.post('/register', async (req, res) => {

    try {

        let required = ['name', 'email', 'bio', 'password'];

        let validating = utils.validate(req.body,required);

        if (validating == true) {
            await controller.register_user(req.body.name, req.body.email, req.body.bio, req.body.password);

            res.status(200).json({
                status: true,
                text: "Você foi registrado com sucesso!"
            });
        }else{

            res.status(400).json({
                status: false,
                text: validating
            });

        }

    } catch (error) {
        
        res.status(200).json({
            status: false,
            message: "Internal server error on router/user.",
            erro: error
        })

    }

})

export default userRouter;
