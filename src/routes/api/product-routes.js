const { Router } = require("express");

const { Product, Category, Tag, ProductTag } = require("../../models");

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
} = require("../../controllers/api/products");

// The `/api/products` endpoint

const router = Router();

// get all products
router.get("/", getAllProducts);

// get one product
router.get("/:id", getProductById);

// create new product
router.post("/", createProduct);

// update product
router.put("/:id", updateProductById);

router.delete("/:id", deleteProductById);

module.exports = router;