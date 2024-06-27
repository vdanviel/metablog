import express from "express";
import controller from '../controller/userController.js';

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

        await controller.register_user(req.body.name, req.body.email, req.body.bio, req.body.password);

    } catch (error) {
        
        res.status(200).json({
            status: false,
            message: "Internal server error on router/user.",
            erro: error
        })

    }

})

export default userRouter;
