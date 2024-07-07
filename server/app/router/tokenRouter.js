import express from "express";

//secure data..
import jsondata from "../../config.json" assert {type: "json"};
const config = JSON.parse(JSON.stringify(jsondata));//arquivo de configurações..

//modules..
import { utils } from "../utils/functions.js";
import controller from '../controller/tokenController.js';

const tokenRouter = express.Router();//definindo o objeto rota..

tokenRouter.post('/forget-password', async (req, res) => {

    let required = ['email'];
    let validating = utils.validate(req.body, required);

    if (validating == true) {
        
         return res.status(200).json(await controller.forgetPassword(req.body.email));

    }else{

        return res.status(400).json({
            status: false,
            text: "Please fill in the required fields.",
            missing: validating
        });

    }



});

tokenRouter.get('/verify-forget-password/:token', async (req, res) => {

    let required = ['token'];
    let validating = utils.validate(req.params, required);

    if (validating == true) {
        
         return res.status(200).json(await controller.verifyToken(req.params.token));

    }else{

        return res.status(400).json({
            status: false,
            text: "Please fill in the required fields.",
            missing: validating
        });

    }



});

export default tokenRouter;
