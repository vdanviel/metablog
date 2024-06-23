import { MongoClient } from 'mongodb';
const uri = "mongodb+srv://eucreio119:<password>@metablog.wwccpsr.mongodb.net/?retryWrites=true&w=majority&appName=metablog";

const client = new MongoClient(uri);

// Database Name
const dbName = 'metablog';

async function main() {
  // Use connect method to connect to the server
  await client.connect();

  const db = client.db(dbName);
  
  return db;

}

export default await main()