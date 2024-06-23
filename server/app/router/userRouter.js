import express from "express";
import controller from '../controller/userController.js';

const userRouter = express.Router();

userRouter.get('/', (req, res) => controller.index(req, res));

export default userRouter;
