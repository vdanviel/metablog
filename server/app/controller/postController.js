//libs/sdk..
import mongodb from "mongodb";

//modules..
import {PostModelInstance, postcoll} from "../model/postModel.js";
import {userModelInstance, usercoll} from "../model/userModel.js";


const controller = {

    async all(user_id, offset, limit) {
        
        try {
            // Verificar se o usuário existe
            const user = await userModelInstance.findbyid(user_id);
    
            if (!user) {
                return {
                    status: false,
                    text: "The user does not exist."
                };
            }        
            
            //pegando os dados dos usuários seguidos..
            const followings_users = await usercoll.find({ nick: { $in: user.following } }).toArray();

            //recuperar o id de cada um desses usuários..
            const followings_ids = []
            followings_users.forEach(data => {
                
                followings_ids.push(new mongodb.ObjectId(data._id));

            });

            //adiciona o id do propio usuario..
            followings_ids.push(new mongodb.ObjectId(user_id));

            //procura os posts pelo "user_id" na collection "post"..
            const posts = await postcoll
            .find({ user_id: { $in: followings_ids } })
            .sort({ created_at: -1 })
            .skip(Number(offset))
            .limit(Number(limit) + 1)
            .toArray();
                
            let more = false;
            
            // Se o número de posts retornados for maior que o limite, então há mais posts
            if (posts.length > limit) {
                more = true;
                posts.pop();  // Remove o último post extra que foi usado para verificar a existência de mais posts
            }
        
            const result = [];

            for (const post of posts) {
                try {
                    const postUser = await userModelInstance.findbyid(post.user_id);
    
                    const obj = {
                        "_id": post._id,
                        "user": postUser,
                        "content": post.content,
                        "media": post.media,
                        "likes": post.likes,
                        "comments": post.comments,
                        "created_at": post.created_at
                    };
    
                    result.push(obj);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
    
            // Retornar os posts que ele pode ver
            return {
                status: true,
                feed: result,
                more: more
            };
    
        } catch (error) {
            return {
                status: false,
                text: "Internal server error on controller/post.",
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

    async publicate(user_id, content, arr_midia) {

        try {
            
            // Verificar se o usuário existe
            const user = await userModelInstance.findbyid(user_id);

            if (!user) {
                return {
                    status: false,
                    text: "The user does not exist."
                };
            } 

            const inserted =
            await PostModelInstance.insert(
                {
                    "user_id":new mongodb.ObjectId(user_id),
                    "content":content,
                    "media": arr_midia,
                    "likes":
                    [
                        //{
                        //  "userId":{"$oid":"668423018b1c61468830160b"},
                        //}
                    ],
                    "comments":
                    [
                        // {
                        //     "userId":{"$oid":"668423018b1c61468830160b"},
                        //     "comment":"Nice post!",
                        //     "createdAt":{"$date":{"$numberLong":"0"}}
                        // }
                    ],
                    "created_at":(new Date().toJSON()),
                }
            );

            if (inserted === false) {

                return {
                    status: false,
                    text: "Something went wrong."
                };

            }else{

                return {
                    status: true,
                    text: "You have succesfully publicate this post."
                };

            }
            
        } catch (error) {
            return {
                status: false,
                text: "Internal server error on controller/post. ",
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

};

export default controller;
