// db.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db('myDatabase');
        console.log("connected to MongoDB");
    } catch (err) {
        console.error("mongoDB connection error:", err);
    }
}

function getDb() {
    if (!db) throw new Error("database not connected");
    return db;
}

module.exports = { connectToDatabase, getDb };