import mongodb from "mongodb";
import main from "../database/connect.js";

const postcoll = main.collection('post');

class PostModel {

    constructor(collection) {
        this.collection = collection;
    }

    async index() {
        try {
            const all = await this.collection.find().toArray();
            return all;
        } catch (error) {

            console.error(error);
            return false
        }
    }

    async find(query, shields = null) {
        try {

            let result = null;

            if (shields == null) {

                result = await this.collection.find(query).toArray();

            }else{

                result = await this.collection.find(query).project(shields).toArray();//{ item: 1, status: 1, _id: 0 }

            }

            return result;
        } catch (error) {

            console.error(error);
            return false;
        }
    }

    async findbyid(id) {

        try {
            const result = await this.collection.find({_id: new mongodb.ObjectId(id)}).toArray();

            return result;
        } catch (error) {

            console.error(error);
            return false
        }
    }

    async insert(data) {

        try {

            await this.collection.insertOne(data);

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
            const result = await this.collection.updateOne({_id: new mongodb.ObjectId(id)}, updateDoc);

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

const PostModelInstance = new PostModel(postcoll);

export {PostModelInstance, postcoll};