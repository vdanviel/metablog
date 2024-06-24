import main from "../database/connect.js";

const usercoll = main.collection('user');

class UserModel {
    constructor(collection) {
        this.collection = collection;
    }

    async index() {
        try {
            const all = await this.collection.find().toArray();
            return all;
        } catch (error) {
            const objerr = {
                status: false,
                message: "error - model/user",
                erro: error
            };
            return objerr;
        }
    }

    // Adicione outros métodos conforme necessário
}

const userModelInstance = new UserModel(usercoll);

export default userModelInstance;