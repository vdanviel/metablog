    import mongodb from "mongodb";
    import main from "../database/connect.js";

    const usercoll = main.collection('user');
    
    class UserModel {

        constructor(collection) {
            this.collection = collection;
        }

        async index() {
            try {
                const all = await this.collection.find();
                return all;
            } catch (error) {

                console.error(error);
                return false
            }
        }

        async find(query, shields = null) {
            try {
    
                if (shields == null) {
                    const result = await this.collection.find(query).toArray();
                    return result;
                }else{
                    const result = await this.collection.find(query).project(shields)//{ item: 1, status: 1, _id: 0 }
                    return result;
                }            
    
            } catch (error) {
    
                console.error(error);
                return false
            }
        }

        async findbyid(id) {

            try {
                const result = await this.collection.findOne({_id: new mongodb.BSON.ObjectId(id)});

                return result;
            } catch (error) {

                console.error(error);
                return false
            }
        }

        async insert(data) {

            try {

                this.collection.insertOne(data);

                return true;

            } catch (error) {

                console.error(error);
                return false
            }

        }

        async update(id, data) {

            //target - a referencia do documento q vc quer achar.. exemplo {_id: "ObjectId(jjhskjdfhsldkjfjsdlk)"}
            try{

                // Update the first document that matches the filter
                const result = await this.collection.updateOne({"_id": new mongodb.ObjectId(id)}, data);

                if (result.modifiedCount > 0) {

                    return true;

                }else{

                    return false;

                }

            } catch (error) {

                console.error(error);
                return false;
            }

        }

        async delete(query) {

            try{
    
                const result = await this.collection.deleteOne(query);
    
                if (result.deletedCount === 1) {
                    return true;
                } else {
                    return false;
                }
    
            } catch (error) {
    
                console.error(error);
                return false;
            }
    
        }
    }

    const userModelInstance = new UserModel(usercoll);

    export default userModelInstance;