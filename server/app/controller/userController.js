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
                text: "Internal server error on controller/user.",
                erro: error
            }
        }
    },

    async register_user(name, email, bio, password) {

        try {

            //verificar se existe um email com o mesmo valor..

            let existed_email = {"email": email};

            let existed = await userModelInstance.find(existed_email);

            await existed;

            // Verificar se algum usuário foi encontrado
            if (existed.length > 0) {
                return {
                    status: false,
                    text: "Alguém já utiliza o email.",
                };
            }

            // Encrypt
            let cipherpassword = CryptoJS.AES.encrypt(password, config.crytokey).toString();

            const info = {
                name: name,
                email: email,
                bio: bio,
                password: cipherpassword,
                photo: null
            }

            const registered = await userModelInstance.insert(info);

            if (!registered) {
                return {
                    status: false,
                    text: "Não foi possível cadastrar usuário.",
                };
            }

            return registered;

        } catch (error) {
            return {
                status: false,
                text: "Internal server error on controller/user. " + error,
                error: {
                    message: error.message,
                    stack: error.stack
                }
            }
        }
    },

    async update_user_photo(id, url_photo) {
        try {

            // Verifica se o usuário existe antes de atualizar a foto
            const user = await userModelInstance.findbyid(id);
            
            if (!user) {
                return {
                    status: false,
                    text: "Usuário não encontrado."
                };
            }
    
            // Atualiza a foto do usuário
            const updated = await userModelInstance.update(id, { "photo": url_photo });

            if (!updated) {
                return {
                    status: false,
                    text: "Não foi possível salvar foto em nossas coletas de dados.",
                };
            }

            return updated;
            
        } catch (error) {
            return {
                status: false,
                text: "Internal server error on controller/user. " + error,
                error: {
                    message: error.message,
                    stack: error.stack
                }
            };
        }
    },
    
    async login(email, password){

        try {
            
            //verificar se existe um email com o mesmo valor..

            let existed_email = {"email": email};

            let existed = await userModelInstance.find(existed_email);

            // Verificar se algum usuário foi encontrado
            if (existed.length > 0) {

                var bytes  = CryptoJS.AES.decrypt(existed[0].password, config.crytokey);
                var original_password = bytes.toString(CryptoJS.enc.Utf8);

                if (original_password == password) {
                    
                    return {
                        status: true,
                        text: "Autenticação realizada com sucesso!",
                        data: existed
                    };

                }else{

                    return {
                        status: false,
                        text: "A senha está incorreta.",
                    };

                }

            }else{
                return {
                    status: false,
                    text: "Email inválido.",
                };
            }

        } catch (error) {
            return {
                status: false,
                text: "Internal server error on controller/user. " + error,
                error: {
                    message: error.message,
                    stack: error.stack
                }
            };
        }

    }

};

export default controller;
