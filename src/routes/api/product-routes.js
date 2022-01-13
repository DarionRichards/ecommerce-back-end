const { Router } = require("express");

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
} = require("../../controllers/api/products");

// The `/api/products` endpoint

const router = Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/", createProduct);

router.put("/:id", updateProductById);

router.delete("/:id", deleteProductById);

module.exports = router;