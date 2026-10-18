
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

// POST: crear un producto
router.post("/", createProduct);

// GET: obtener un producto por ID
router.get("/:id", getProductById);

// PUT: actualizar un producto por ID
router.put("/:id", updateProduct);

// DELETE: eliminar un producto por ID
router.delete("/:id", deleteProduct);

module.exports = router;
