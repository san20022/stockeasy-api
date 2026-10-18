
const express = require("express");
const { MongoClient } = require("mongodb");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const productRoutes = require("./routes/products");
app.use("/products", productRoutes);

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
