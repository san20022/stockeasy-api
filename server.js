
const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

app.get("/", (req, res) => {
    res.send("StockEasy API is running!");
});

async function startServer() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");

        app.locals.db = client.db("stockeasy_api");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

startServer();
