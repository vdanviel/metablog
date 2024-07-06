import mongodb from "mongodb";

import PostModelInstance from "../model/postModel.js";
import userModelInstance from "../model/userModel.js";
import jsondata from "../../config.json" assert {type: "json"};

const config = JSON.parse(JSON.stringify(jsondata));

const controller = {

    async all(user_id) {

        try {
            // Verificar se o usuário existe..
            const user = await userModelInstance.findbyid(user_id);
    
            if (!user) {
                return {
                    status: false,
                    text: "The user does not exist."
                };
            }

            //buscando somente os posts dos usuarios que elx segue..
            const posts = await PostModelInstance.find({"user_id": {"$in": user.following } });

            const result = [];

            for (const post of posts) {

                try {
                    const user = await userModelInstance.findbyid(post.user_id);
                    
                    const obj = {
                        "_id": post._id,
                        "user": user,
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

            console.log(result);

            // Os posts que ele pode ver
            return {
                status: true,
                user: user,
                feed: result,
            };
    
        } catch (error) {
            return {
                status: false,
                text: "Internal server error on controller/post.",
                erro: error
            };
        }
        
    },

    async publicate(user_id, content, arr_midia) {
        try {
    
            const inserted =
            await PostModelInstance.insert(
                {
                    "user_id":(new mongodb.ObjectId(user_id)),
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
                text: "Internal server error on controller/user. " + error,
                error: {
                    message: error.message,
                    stack: error.stack
                }
            };
        }
    },

};

export default controller;
