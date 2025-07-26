// /src/lib/mongodb.js

import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

// Connect to the database (MongoClient automatically manages connections)
export async function connectToDatabase() {
  // Automatically connects to MongoDB, no need for isConnected() anymore
  await client.connect(); // This ensures the client is connected when this function is invoked

  const db = client.db();
  return { db, client };
}
