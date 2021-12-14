const { Router } = require("express");

const { Tag, Product, ProductTag } = require("../../models");

const {
    getAllTags,
    getTagById,
    createTag,
    updateTagById,
    deleteTagById,
} = require("../../controllers/api/tags");

// The `/api/tags` endpoint

const router = Router();

router.get("/", getAllTags);

router.get("/:id", getTagById);

router.post("/", createTag);

router.put("/:id", updateTagById);

router.delete("/:id", deleteTagById);

module.exports = router;