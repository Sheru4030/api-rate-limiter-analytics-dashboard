import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
console.log("MONGODB_URI EXISTS:", !!process.env.MONGODB_URI);

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable in .env.local"
    );
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = {
        conn: null,
        promise: null,
    };
}

export async function connectDB() {
    if (cached!.conn) {
        return cached!.conn;
    }

    if (!cached!.promise) {
        const options = {
            bufferCommands: false,
        };

        cached!.promise = mongoose
            .connect(MONGODB_URI!, options)
            .then((mongoose) => mongoose);
    }

    try {
        cached!.conn = await cached!.promise;
    } catch (error) {
        cached!.promise = null;
        throw error;
    }

    return cached!.conn;
}