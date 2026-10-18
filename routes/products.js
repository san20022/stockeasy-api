
const express = require("express");
const router = express.Router();

const {
    getAllProducts,
    getProductById,
    createProduct,
} = require("../controllers/products");

// GET: obtener todos los productos
router.get("/", getAllProducts);

// GET: obtener un producto por ID
router.get("/:id", getProductById);

// POST: crear un producto
router.post("/", createProduct);

module.exports = router;
