import { MongoClient, ServerApiVersion } from 'mongodb';
import jsondata from "../../config.json" assert {type: "json"};

const config = JSON.parse(JSON.stringify(jsondata));

const uri = `mongodb+srv://eucreio119:${config.mongo.password}@metablog.wwccpsr.mongodb.net/?retryWrites=true&w=majority&appName=metablog`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Database Name
const dbName = 'metablog';

async function main() {
  // Use connect method to connect to the server
  await client.connect();

  const db = client.db(dbName);
  
  return db;

}

export default await main()