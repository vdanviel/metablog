//libs/sdks..
import CryptoJS from "crypto-js";
import { ObjectId } from "mongodb";
import path from "path";
import fs from "node:fs";

//modules..
import {userModelInstance, usercoll} from "../model/userModel.js";
import {tokenModelInstance, tokencoll} from "../model/tokenModel.js";
import { utils } from "../utils/functions.js";

//secure data
import jsondata from "../../config.json" assert {type: "json"};
const config = JSON.parse(JSON.stringify(jsondata));

const controller = {

    async all() {
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

    async find(id){

        try {
            const user = await userModelInstance.findbyid(id);
            return user;
        } catch (error) {
            return {
                status: false,
                text: "Internal server error on controller/user.",
                erro: error
            }
        }
        
    },

    async register_user(name, nick, email, bio, password) {

        try {

            //verificar se existe um email com o mesmo valor..
            let emailexisted = await userModelInstance.find({"email": email});

            // Verificar se algum usuário foi encontrado
            if (emailexisted.length > 0) {
                return {
                    status: false,
                    text: "Someone uses this Email already.",
                };
            }

            //verificar se existe um nick com o mesmo valor..
            let nickexisted = await userModelInstance.find({"nick": nick});

            // Verificar se algum usuário foi encontrado
            if (nickexisted.length > 0) {
                return {
                    status: false,
                    text: "Someone uses this Nickname already.",
                };
            }

            // Encrypt
            let cipherpassword = CryptoJS.AES.encrypt(password, config.crytokey).toString();

            const info = {
                name: name,
                nick: nick,
                email: email,
                followers: [],
                following: [],
                bio: bio,
                password: cipherpassword,
                photo: null
            }

            const registered = await userModelInstance.insert(info);

            if (!registered) {
                return {
                    status: false,
                    text: "It wasn't possible to save your data in ours databases. Try again later.",
                };
            }

            //enviando email de boas vindas..
            //html de boas vindas
            await fs.readFile(path.dirname('../server/app/mail/templates/welcome.html') + '/welcome.html', 'utf8', (err, data) => {//procurando o arquivo html para a leitura com fs do nodejs e o path do node js para retornar o DIRETORIO raiz de um arquivo.

                if (err) {
                    console.error(err);
                    return;
                }

                //enviando..
                utils.send_email(email, data.toString(), `Welcome to Metablog ${name}!`);
            });


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
                    text: "User not found."
                };
            }
    
            // Atualiza a foto do usuário
            const updated = await userModelInstance.update(id, {$set: { "photo": url_photo }});

            if (!updated) {
                return {
                    status: false,
                    text: "It wasn't possible to save the photo in ours databases. Try again later.",
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
                        text: "Authenticated sucessfully.",
                        user: JSON.stringify(existed[0])
                    };

                }else{

                    return {
                        status: false,
                        text: "The password is incorrect.",
                    };

                }

            }else{
                return {
                    status: false,
                    text: "This email doesn't exist on Metablog.",
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

    },

    async follow(follower_id, following_id){

        try {
            
            // Verificar se os usuários existem
            const follower = await userModelInstance.findbyid(follower_id);
            const following = await userModelInstance.findbyid(following_id);

            if (!follower || !following) {
                
                return {
                    status: false,
                    text: "The user does not exists."
                };

            }

            
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
            //equals() - https://www.mongodb.com/docs/atlas/atlas-search/equals/#std-label-equals-ref (leia a primeira parte)
            //variavel que verifica no array de usuario sendo seguidos se ja existe algum com o id do usuario trajeto a ser seguido..
            let compare = follower.following.some(id => id.equals(following._id));

            //se usuário já segue o following..
            if (compare) {

                //vetar
                return {
                    status: false,
                    text: `You follow @${following.nick} already.`
                };

            }

            //https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push
            //usuario seguidor recebe quem está seguindo..
            const handleing_follower = await userModelInstance.update(follower_id, { $push: { following: new ObjectId(following_id) }})

            //usuario seguido recebe o seguidor..
            const handleing_following = await userModelInstance.update(following_id, { $push: { followers: new ObjectId(follower_id) }})
            
            if (handleing_follower == false || handleing_following == false) {
                
                return {
                    status: false,
                    text: "It wasn't possible to follow the user."
                };

            }            

            return {
                status: true,
                text: `You've successfully followed @${following.nick}!`,

            }

        } catch (error) {
            return {
                status: false,
                text: "Internal server error on controller/post.",
                erro: error
            }
        }

    },

    async resetPassword(id_user, type, token, newPassword) {

        try {
          // Buscar o token na coleção
          const tokenData = await tokencoll.findOne({"token": token });
    
          if (!tokenData) {
            return {
              status: false,
              text: "Invalid or expired token."
            };
          }

          if (tokenData.tokenable_id !== id_user, tokenData.tokenable_type !== type) {
            return {
                status: false,
                text: "Invalid token."
              };
          }
    
          const now = new Date();
          if (new Date(tokenData.expires_at) < now) {
            return {
              status: false,
              text: "Token has expired."
            };
          }
    
          // Verificar se o usuário existe
          const user = await userModelInstance.findbyid(tokenData.tokenable_id);

          if (!user) {
            return {
              status: false,
              text: "User not found."
            };
          }
    
          // Encrypt the new password
          let cipherPassword = CryptoJS.AES.encrypt(newPassword, config.crytokey).toString();
    
          // Atualizar a senha do usuário
          const updated = await userModelInstance.update(id_user, { $set: { "password": cipherPassword } });

          if (!updated) {
            return {
              status: false,
              text: "It wasn't possible to update the password. Try again later.",
            };
          }
    
          // Remover o token da coleção após a atualização da senha***
          await tokenModelInstance.delete({"token": token});
    
          return {
            status: true,
            text: "Password updated successfully."
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
