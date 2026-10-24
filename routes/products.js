
const express = require("express");
const router = express.Router();

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/products");

// GET: obtener todos los productos
router.get("/", getAllProducts);

// GET: obtener un producto por ID
router.get("/:id", getProductById);

// POST: crear un producto
router.post("/", createProduct);

// PUT: actualizar un producto
router.put("/:id", updateProduct);

// DELETE: eliminar un producto
router.delete("/:id", deleteProduct);

module.exports = router;
