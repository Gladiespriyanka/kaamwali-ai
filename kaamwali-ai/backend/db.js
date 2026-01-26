// backend/db.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); // this must be BEFORE using process.env

const uri = process.env.MONGODB_URI; // <-- must not be undefined

const client = new MongoClient(uri);
let db;

export async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db('kaamwali_ai');
  }
  return db;
}
