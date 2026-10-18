
const { ObjectId } = require("mongodb");
const { validateProduct } = require("../models/Product");

// GET: obtener todos los productos
async function getAllProducts(req, res) {
    try {
        const db = req.app.locals.db;
        const products = await db.collection("products").find().toArray();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve products." });
    }
}

// GET: obtener un producto por ID
async function getProductById(req, res) {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid product ID." });
        }

        const db = req.app.locals.db;
        const product = await db.collection("products").findOne({
            _id: new ObjectId(req.params.id),
        });

        if (!product) {
            return res.status(404).json({ error: "Product not found." });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve product." });
    }
}

// POST: crear un producto
async function createProduct(req, res) {
    try {
        const validationError = validateProduct(req.body);

        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        const db = req.app.locals.db;
        const product = {
            name: req.body.name.trim(),
            quantity: req.body.quantity,
            price: req.body.price,
            category: req.body.category.trim(),
        };

        const result = await db.collection("products").insertOne(product);

        res.status(201).json({
            message: "Product created successfully.",
            productId: result.insertedId,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to create product." });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
};
