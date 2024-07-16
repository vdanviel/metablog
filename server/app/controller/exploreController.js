import mongodb from "mongodb";
import { PostModelInstance, postcoll } from "../model/postModel.js";
import { userModelInstance, usercoll } from "../model/userModel.js";

const controller = {

    async search(searchParam, page = 1, limit = 10) {
        try {
            const searchRegex = new RegExp(searchParam, 'i');
    
            const userCriteria = {
                $or: [
                    { name: { $regex: searchRegex } },
                    { bio: { $regex: searchRegex } },
                    { nick: { $regex: searchRegex } }
                ]
            };
    
            const postCriteria = {
                content: { $regex: searchRegex }
            };
    
            const skip = (page - 1) * limit;
    
            const users = await usercoll.find(userCriteria, {
                projection: {
                    password: 0,
                    email: 0
                }
            })
            .skip(skip)
            .limit(limit)
            .toArray();
    
            let posts = await postcoll.find(postCriteria, {
                projection: {
                    password: 0,
                    email: 0
                }
            })
            .skip(skip)
            .limit(limit)
            .toArray();
    
            // Obter usuários associados aos posts
            const userIds = [...new Set(posts.map(post => post.user_id))];
            const usersMap = await usercoll.find({ _id: { $in: userIds } }, {
                projection: {
                    password: 0,
                    email: 0
                }
            }).toArray();
    
            const usersMapById = usersMap.reduce((acc, user) => {
                acc[user._id] = user;
                return acc;
            }, {});
    
            // Adicionar dados do usuário aos posts
            posts = posts.map(post => ({
                ...post,
                user: usersMapById[post.user_id]
            }));
    
            const results = {
                users,
                posts
            };
    
            return results;
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
    }

};

export default controller;
