const { Router } = require("express");

const { Category, Product } = require("../../models");

const {
    getAllCategories,
    findCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../../controllers/api/categories");

// The `/api/categories` endpoint

const router = Router();

router.get("/", getAllCategories);

router.get("/:id", findCategory);

router.post("/", createCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;