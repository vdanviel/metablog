import userModelInstance from "../model/userModel.js";

const controller = {

    async index() {
        try {
            const users = await userModelInstance.index();
            return users;
        } catch (error) {
            return {
                status: false,
                message: "Internal server error on controller/user.",
                erro: error
            }
        }
    },

    async register_user(name, email, bio, password) {
        try {

            

        } catch (error) {
            return {
                status: false,
                message: "Internal server error on controller/user.",
                erro: error
            }
        }
    },
    
};

export default controller;
