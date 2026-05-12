// Lazy MongoDB client — does not throw at import time so next build works without a live DB
import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGO_URI || process.env.MONGODB_URI || "";

let clientPromise: Promise<MongoClient>;

if (!uri) {
  // No URI configured — clientPromise rejects at runtime when actually awaited
  clientPromise = Promise.reject(
    new Error('Missing environment variable: "MONGO_URI" (or "MONGODB_URI"). Set it to connect to MongoDB.')
  );
  // Prevent unhandled rejection warning during build
  clientPromise.catch(() => {});
} else if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, { keepAlive: true });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri, { keepAlive: true });
  clientPromise = client.connect();
}

export default clientPromise;
