import { MongoClient } from "mongodb";
const connectionString = "mongodb://localhost:27018/maybe";
let client;

async function getDb() {
  if (!client || !client.isConnected()) {
    client = await MongoClient.connect(connectionString, {
      authSource: "admin",
      directConnection: true,
      readPreference: "secondary",
    });
    console.log("mongo db connected successfully!!");
  }
  return client.db();
}

export async function getCollection(collectionName) {
  const db = await getDb();
  return db.collection(collectionName);
}
