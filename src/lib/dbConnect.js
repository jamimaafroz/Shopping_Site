import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionObj = {
  userCollection: "Users",
  productCollection: "products",
  orderCollection: "orders",
};

export default function dbConnect(CollectionName) {
  const uri = process.env.DB_URI;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  return client.db(process.env.DB_NAME).collection(CollectionName);
}
