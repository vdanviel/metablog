//libs/dependences/sdks..
import path from "path";
import fs from "node:fs";
import mongodb from "mongodb";

//modules...
import { utils } from "../utils/functions.js";
import {tokenModelInstance, tokencoll} from "../model/tokenModel.js";
import {userModelInstance, usercoll} from "../model/userModel.js";

const controller = {

    async forgetPassword(email) {

        try {
          // Verificar se o usuário existe
          const user = await usercoll.findOne({"email": email});

          if (!user) {
            return {
              status: false,
              text: "User not found."
            };
          }
    
          // Gerar um token aleatório
          const token = utils.generate_random_number(5);

          const now = new Date();
          const expiresAt =  new Date(now.getTime() + (3600 * 1000)); // Token expira em 1 hora
    
          const tokenData = {
            tokenable_type: "controller/tokenController/forgetPassword",
            tokenable_id: (new mongodb.ObjectId(user._id)),
            name: "forget-password",
            token: token,
            created_at: now.toJSON(),
            updated_at: now.toJSON(),
            expires_at: expiresAt.getTime()
          };
    
          // Salvar o token na coleção
          await tokencoll.insertOne(tokenData);
    
          // Enviar o token por email ao usuário
          const emailContent = `${user.name}, your access token is: ${token}`;

            //enviando email perdi a senha..
            //html perdi a senha
            await fs.readFile(path.dirname('../server/app/mail/templates/forget_password.html') + '/forget_password.html', 'utf8', (err, data) => {//procurando o arquivo html para a leitura com fs do nodejs e o path do node js para retornar o DIRETORIO raiz de um arquivo.

                if (err) {
                    console.error(err);
                    return;
                }

                let hmtl = data.toString().replace("{code}", token);

                //enviando..
                utils.send_email(email, hmtl, emailContent);
            });
    
          return {
            status: true,
            text: "Token generated and sent to email successfully."
          };

        } catch (error) {
          return {
            status: false,
            text: "Internal server error on controller/user.",
            error: {
              message: error.message,
              stack: error.stack
            }
          };
        }
    },

    async verifyToken(token) {

        try {
          // Buscar o token na coleção
          const tokenData = await tokencoll.findOne({"token": token});

          if (!tokenData) {
            return {
              status: false,
              text: "Invalid or expired token."
            };
          }
    
          const now = new Date().getTime();
          const tokenTime = new Date(tokenData.expires_at).getTime();

          console.log(now, tokenTime);

          if (now > tokenTime) {
            return {
              status: false,
              text: "Token has expired."
            };
          }
    
          return {
            status: true,
            text: "Token is valid.",
            token_data: tokenData
          };

        } catch (error) {
          return {
            status: false,
            text: "Internal server error on controller/user.",
            error: {
              message: error.message,
              stack: error.stack
            }
          };
        }
    }

};

export default controller;
