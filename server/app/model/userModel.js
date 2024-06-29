    import pkg from "mongodb";
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

        async find(query) {
            try {
                const result = await this.collection.find(query).toArray();
                return result;
            } catch (error) {

                console.error(error);
                return false
            }
        }

        async findbyid(id) {

            try {
                const result = await this.collection.find({_id: new pkg.BSON.ObjectId(id)}).toArray();

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
                // Specify the update to set a value for the plot field
                const updateDoc = {
                    "$set": data
                };

                // Update the first document that matches the filter
                const result = await this.collection.updateOne({_id: new pkg.ObjectId(id)}, updateDoc);

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
    }

    const userModelInstance = new UserModel(usercoll);

    export default userModelInstance;