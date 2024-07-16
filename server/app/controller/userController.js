//libs/sdks..
import CryptoJS from "crypto-js";
import mongodb from "mongodb";
import path from "path";
import fs from "node:fs";

//modules..
import {userModelInstance, usercoll} from "../model/userModel.js";
import {tokenModelInstance, tokencoll} from "../model/tokenModel.js";
import { postcoll, PostModelInstance } from "../model/postModel.js";
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
            error: {
                message: error.message,
                stack: error.stack,
                file: error.fileName, 
                line: error.lineNumber, 
                column: error.columnNumber, 
            }
          };
        }
    },

    async find(nick){

        try {

            const query = { nick: nick };

            const options = {

                sort:
                {
                    "_id": -1
                },

                projection: 
                { 
                    password: 0,
                    email: 0
                }

            };

            // Execute query
            const user = await usercoll.findOne(query, options);

            // verificar se usuario exite
            if (!user) {
                return {
                    status: false,
                    text: "User not found."
                };
            }

            //a qnt de posts desse usuário..
            const posts_count = await postcoll.countDocuments({user_id: new mongodb.ObjectId(user._id)});
                        
            //a qnt de usuários que esse usuário segue..
            const followers_count = user.followers.length;

            //a qnt de usuários que seguem esse usuário..
            const following_count = user.following.length;

            Object.assign(user, {posts_count: posts_count});
            Object.assign(user, {followers_count: followers_count});
            Object.assign(user, {following_count: following_count});

            return user;

        } catch (error) {
          return {
            status: false,
            text: "Internal server error on controller/user.",
            error: {
                message: error.message,
                stack: error.stack,
                file: error.fileName, 
                line: error.lineNumber, 
                column: error.columnNumber, 
            }
          };
        }
        
    },

    async list_follower_following(nick, offset, limit) {
        try {
            const query = { nick: nick };
    
            const user = await usercoll.findOne(query);
    
            if (!user) {
                return {
                    status: false,
                    text: "User not found."
                };
            }
    
            const options = {
                sort: { "name": -1 },
                projection: {
                    _id:0,
                    password: 0,
                    email: 0,
                    banner: 0
                }
            };
    
            // Apply offset and limit
            const following_profiles = await usercoll.find({ "nick": { $in: user.following } }, options)
                .skip(Number(offset))
                .limit(Number(limit))
                .toArray();

            const followers_profiles = await usercoll.find({ "nick": { $in: user.followers } }, options)
                .skip(Number(offset))
                .limit(Number(limit))
                .toArray();
    
            return {
                status: true,
                following: following_profiles,
                followers: followers_profiles
            };
    
        } catch (error) {
            return {
                status: false,
                text: "Internal server error on controller/user.",
                error: {
                    message: error.message,
                    stack: error.stack,
                    file: error.fileName, 
                    line: error.lineNumber, 
                    column: error.columnNumber, 
                }
            };
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
                photo: null,
                banner: null
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
                    stack: error.stack,
                    file: error.fileName, 
                    line: error.lineNumber, 
                    column: error.columnNumber, 
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
            const updated = await usercoll.updateOne({_id: new mongodb.ObjectId(id)}, {$set: { "photo": url_photo }});

            if (updated.modifiedCount < 1) {

                let err = JSON.stringify(updated)

                return {
                    status: false,
                    text: "It wasn't possible to save the photo in ours databases. Try again later.",
                    reason: err
                };
            }

            return updated;
            
        } catch (error) {
            return {
                status: false,
                text: "Internal server error on controller/user. " + error,
                error: {
                    message: error.message,
                    stack: error.stack,
                    file: error.fileName, 
                    line: error.lineNumber, 
                    column: error.columnNumber, 
                }
            };
        }
    },

    async update_user_banner(id, url_banner) {
        try {

            // Verifica se o usuário existe antes de atualizar a foto
            const user = await usercoll.findOne({"_id": new mongodb.ObjectId(id)});
            
            if (!user) {
                return {
                    status: false,
                    text: "User not found."
                };
            }
    
            // Atualiza a foto do banner
            const updated = await usercoll.updateOne(
                { _id: new mongodb.ObjectId(id) }, 
                { $set: { banner: url_banner } }
            );

            if (updated.modifiedCount < 1) {
                return {
                    status: false,
                    text: "It wasn't possible to save the photo in ours databases. Try again later.",
                    reason: updated
                };
            }

            return updated;
            
        } catch (error) {
            return {
                status: false,
                text: "Internal server error on controller/user. " + error,
                error: {
                    message: error.message,
                    stack: error.stack,
                    file: error.fileName, 
                    line: error.lineNumber, 
                    column: error.columnNumber, 
                }
            };
        }
    },    

    async user_posts(nickname,offset,limit) {

        try {

            //usuario encontrado pelo nick..
            const existed = await usercoll.findOne({nick: nickname}, {projection: {password:0}});

            if (!existed) {
                
                return {
                    status: false,
                    text: "There's no such user."
                }

            }

            //os posts desse usuário..
            const posts = await postcoll.find({user_id: new mongodb.ObjectId(existed._id)}).skip(Number(offset)).limit(Number(limit) + 1).sort({created_at: -1}).toArray();
            
            let more = false;

            if (posts.length > limit) {
                more = true;
                posts.pop();
            }

            return {
                status: true,
                posts: posts,
                more_posts: more
            }

        } catch (error) {
            return {
                status: false,
                text: "Internal server error on controller/user.",
                error: {
                    message: error.message,
                    stack: error.stack,
                    file: error.fileName, 
                    line: error.lineNumber, 
                    column: error.columnNumber, 
                }
            }

        }

    },

    async login(email, password) {
        try {
            // Verificar se existe um email ou nick com o mesmo valor..
            let existed = await usercoll.findOne({
                $or: [
                    { "email": email },
                    { "nick": email }
                ]
            });
    
            // Verificar se algum usuário foi encontrado
            if (existed) {
                var original_password = CryptoJS.AES.decrypt(existed.password, config.crytokey).toString(CryptoJS.enc.Utf8);
    
                if (original_password == password) {
                    let user = await usercoll.findOne(
                        {
                            $or: [
                                { "email": email },
                                { "nick": email }
                            ]
                        },
                        { projection: { password: 0, email: 0 } }
                    );
    
                    return {
                        status: true,
                        text: "Authenticated successfully.",
                        user: JSON.stringify(user)
                    };
                } else {
                    return {
                        status: false,
                        text: "The password is incorrect."
                    };
                }
            } else {
                return {
                    status: false,
                    text: "This email or nick doesn't exist on Metablog."
                };
            }
        } catch (error) {
            return {
                status: false,
                text: "Internal server error on controller/user. " + error,
                error: {
                    message: error.message,
                    stack: error.stack,
                    file: error.fileName,
                    line: error.lineNumber,
                    column: error.columnNumber
                }
            };
        }
    },
    
    async follow(follower_id, following_nickname) {
        try {
            // Verificar se os usuários existem
            const follower = await userModelInstance.findbyid(follower_id);
            const following = await usercoll.findOne({ nick: following_nickname });
    
            if (!follower || !following) {
                return {
                    status: false,
                    text: "The user does not exist."
                };
            }
    
            // Verificar se o usuário já segue o seguinte
            let compare = follower.following.some(nick => nick == following.nick);
    
            if (compare) {
                return {
                    status: false,
                    text: `You already follow @${following.nick}.`
                };
            }
    
            // Atualizar o seguidor com o usuário seguido
            const handleing_follower = await userModelInstance.update(follower_id, { $push: { following: following.nick } });
    
            // Atualizar o usuário seguido com o seguidor
            const handleing_following = await userModelInstance.update(following._id, { $push: { followers: follower.nick } });
    
            if (!handleing_follower || !handleing_following) {
                return {
                    status: false,
                    text: "It wasn't possible to follow the user."
                };
            }
    
            return {
                status: true,
                text: `You've successfully followed @${following.nick}!`
            };
    
        } catch (error) {
            return {
                status: false,
                text: "Internal server error on controller/user.",
                error: {
                    message: error.message,
                    stack: error.stack,
                    file: error.fileName,
                    line: error.lineNumber,
                    column: error.columnNumber
                }
            };
        }
    },

    async unfollow(follower_id, following_nickname) {
        try {
            // Verificar se os usuários existem
            const follower = await userModelInstance.findbyid(follower_id);
            const following = await usercoll.findOne({ nick: following_nickname });
    
            if (!follower || !following) {
                return {
                    status: false,
                    text: "The user does not exist."
                };
            }
    
            // Verificar se o usuário realmente segue o outro usuário
            let compare = follower.following.some(nick => nick == following.nick);
    
            if (!compare) {
                return {
                    status: false,
                    text: `You don't follow @${following.nick}.`
                };
            }
    
            // Remover o usuário seguido da lista de seguidores do seguidor
            const handleing_follower = await userModelInstance.update(follower_id, { $pull: { following: following.nick } });
    
            // Remover o seguidor da lista de seguidores do usuário seguido
            const handleing_following = await userModelInstance.update(following._id, { $pull: { followers: follower.nick } });
    
            if (!handleing_follower || !handleing_following) {
                return {
                    status: false,
                    text: "It wasn't possible to unfollow the user."
                };
            }
    
            return {
                status: true,
                text: `You've successfully unfollowed @${following.nick}.`
            };
        } catch (error) {
            return {
                status: false,
                text: "Internal server error on controller/user.",
                error: {
                    message: error.message,
                    stack: error.stack,
                    file: error.fileName,
                    line: error.lineNumber,
                    column: error.columnNumber
                }
            };
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
                    stack: error.stack,
                    file: error.fileName, 
                    line: error.lineNumber, 
                    column: error.columnNumber, 
                }
            }
          
        }
    },

    async deleteAccount(id_user, password) {
        try {
            const user = await usercoll.findOne({ "_id": new mongodb.ObjectId(id_user) });
    
            if (!user) {
                return {
                    status: false,
                    text: "User not found."
                };
            }
    
            const original_password = CryptoJS.AES.decrypt(user.password, config.crytokey).toString(CryptoJS.enc.Utf8);
    
            if (original_password !== password) {
                return {
                    status: false,
                    text: "The password is invalid."
                };
            }
    
            // Primeiro, verifica se o usuário possui posts
            const userPostsCount = await postcoll.countDocuments({ "user_id": new mongodb.ObjectId(id_user) });
    
            if (userPostsCount > 0) {
                // Se o usuário tiver posts, tenta deletar os posts
                const posts_deleted = await postcoll.deleteMany({ "user_id": new mongodb.ObjectId(id_user) });
    
                // Se os posts foram deletados com sucesso
                if (posts_deleted.deletedCount > 0) {
                    // Tenta deletar o usuário
                    const deleted = await usercoll.deleteOne({ "_id": new mongodb.ObjectId(id_user) });
    
                    // Se o usuário foi deletado com sucesso
                    if (deleted.deletedCount > 0) {
                        return {
                            status: true,
                            text: "Account and posts deleted successfully."
                        };
                    } else {
                        return {
                            status: false,
                            text: "Error on deleting account.",
                            reason: deleted
                        };
                    }
                } else {
                    return {
                        status: false,
                        text: "Error on deleting posts.",
                        reason: posts_deleted
                    };
                }
            } else {
                // Se o usuário não tiver posts, tenta deletar apenas o usuário
                const deleted = await usercoll.deleteOne({ "_id": new mongodb.ObjectId(id_user) });
    
                // Se o usuário foi deletado com sucesso
                if (deleted.deletedCount > 0) {
                    return {
                        status: true,
                        text: "Account deleted successfully."
                    };
                } else {
                    return {
                        status: false,
                        text: "Error on deleting account.",
                        reason: deleted
                    };
                }
            }
        } catch (error) {
            return {
                status: false,
                text: "Internal server error on controller/user.",
                error: {
                    message: error.message,
                    stack: error.stack,
                    file: error.fileName, 
                    line: error.lineNumber, 
                    column: error.columnNumber, 
                }
            }
        }
    },

    async update_user(id_user, name, nick, bio) {
        try {

            // Verifica se o usuário existe antes de atualizar a foto
            const user = await userModelInstance.findbyid(id_user);

            if (!user) {
                return {
                    status: false,
                    text: "User not found."
                };
            }

            //verificar se existe um nick com o mesmo valor..
            let nickexisted = await userModelInstance.find({"nick": nick});

            // Verificar se algum usuário foi encontrado
            if (nickexisted.length > 0) {

                if (nickexisted[0]._id == id_user) {
                    
                    null;

                } else{

                    return {
                        status: false,
                        text: "Someone uses this Nickname already.",
                    };

                }

            }
            
            // Create a filter for movies with the title "Random Harvest"
            const filter = {"_id": new mongodb.ObjectId(id_user)};

            // Specify the update to set a value for the plot field
            const updateDoc = {
                $set: {
                    name: name,
                    nick: nick,
                    bio: bio
                }
            };

            // Atualiza a foto do usuário
            const updated = await usercoll.updateOne(filter, updateDoc);

            if (updated.modifiedCount < 1) {
                return {
                    status: false,
                    text: "Error on updating the account.",
                    reason:updated
                };
            }else{

                return {
                    status: true,
                    text: "Account successfully updated!"
                }

            }
            
        } catch (error) {
            return {
                status: false,
                text: "Internal server error on controller/user. " + error,
                error: {
                    message: error.message,
                    stack: error.stack,
                    file: error.fileName, 
                    line: error.lineNumber, 
                    column: error.columnNumber, 
                }
            };
        }
    }

};

export default controller;
