import userModelInstance from "../model/userModel.js";

const controller = {
    async index(req, res) {
        try {
            const users = await userModelInstance.index();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    },

    // Outros métodos do controller
};

export default controller;
