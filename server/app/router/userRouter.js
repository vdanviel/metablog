import express from "express";
import controller from '../controller/userController.js';

const userRouter = express.Router();

//rotas user
userRouter.get('/', async (req, res) => {
    try {

        res.status(200).json(await controller.index())

    } catch (error) {
        
        res.status(200).json({
            status: false,
            message: "Internal server error on router/user.",
            erro: error
        })

    }
});

userRouter.post('/save-photo', (req, res) => {
    upload.single('file')(req, res, function (err) {
        
        if (err instanceof multer.MulterError) {
            // Um erro ocorreu durante o upload
            return res.status(500).json({ error: err.message });
        } else if (err) {
            // Um erro desconhecido ocorreu
            return res.status(500).json({ error: 'Erro ao processar o upload' });
        }

        // Upload foi bem-sucedido
        return res.status(200).json({ message: 'Arquivo enviado com sucesso', file: req.file });
    });
})

export default userRouter;
