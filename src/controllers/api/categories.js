const { Category, Product } = require("../../models");

const getAllCategories = async(req, res) => {
    // find all categories
    // be sure to include its associated Products
    try {
        const categories = await Category.findAll({ include: Product });
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getCategoryById = async(req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products

    try {
        const categoryId = await Category.findByPk(req.params.id, {
            include: Product,
        });
        res.status(200).json(categoryId);
    } catch (err) {
        res.status(500).json(err);
    }
};

const createCategory = (req, res) => {
    // create a new category
    res.send("createCategory");
};

const updateCategory = (req, res) => {
    // update a category by its `id` value
    res.send("updateCategory");
};

const deleteCategory = (req, res) => {
    // delete a category by its `id` value
    res.send("deleteCategory");
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};