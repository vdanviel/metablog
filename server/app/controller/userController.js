import userModelInstance from "../model/userModel.js";
import jsondata from "../../config.json" assert {type: "json"};

const config = JSON.parse(JSON.stringify(jsondata));

//libs..
import CryptoJS from "crypto-js";

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

            // Encrypt
            let cipherpassword = CryptoJS.AES.encrypt(password, config.crytokey).toString();

            console.log(originalText); // 'my message'

            const info = {
                name: name,
                email: email,
                bio: bio,
                password: cipherpassword
            }

            const registered = await userModelInstance.insert(info);

            return registered;

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
