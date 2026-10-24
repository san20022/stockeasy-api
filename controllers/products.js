
const { ObjectId } = require("mongodb");
const { validateProduct } = require("../models/product");

// GET: obtener todos los productos
async function getAllProducts(req, res) {
    try {
        const db = req.app.locals.db;
        const products = await db.collection("products").find().toArray();

        res.status(200).json(products);
    } catch (error) {
        console.error("Get all products error:", error.message);
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
        console.error("Get product by ID error:", error.message);
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
        console.error("Create product error:", error.message);
        res.status(500).json({ error: "Failed to create product." });
    }
}

// PUT: actualizar un producto existente
async function updateProduct(req, res) {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid product ID." });
        }

        const validationError = validateProduct(req.body);

        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        const db = req.app.locals.db;
        const result = await db.collection("products").updateOne(
            { _id: new ObjectId(req.params.id) },
            {
                $set: {
                    name: req.body.name.trim(),
                    quantity: req.body.quantity,
                    price: req.body.price,
                    category: req.body.category.trim(),
                },
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Product not found." });
        }

        return res.status(204).send();
    } catch (error) {
        console.error("Update product error:", error.message);
        res.status(500).json({ error: "Failed to update product." });
    }
}

// DELETE: eliminar un producto
async function deleteProduct(req, res) {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid product ID." });
        }

        const db = req.app.locals.db;
        const result = await db.collection("products").deleteOne({
            _id: new ObjectId(req.params.id),
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Product not found." });
        }

        res.status(200).json({
            message: "Product deleted successfully.",
        });
    } catch (error) {
        console.error("Delete product error:", error.message);
        res.status(500).json({ error: "Failed to delete product." });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
