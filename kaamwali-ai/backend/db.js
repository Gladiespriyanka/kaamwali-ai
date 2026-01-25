// db.js
import { MongoClient } from 'mongodb';

// Your MongoDB Atlas connection string
const uri =
  'mongodb+srv://gladies:gladiespriyanka@cluster0.glvbn1c.mongodb.net/?appName=Cluster0';

const client = new MongoClient(uri);

let db;

export async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db('kaamwali_ai'); // database name
  }
  return db;
}
