const { Category, Product } = require("../../models");

const getAllCategories = async(req, res) => {
    // find all categories
    // be sure to include its associated Products
    try {
        const categories = await Category.findAll({ include: Product });
        return res.status(200).json({ success: true, data: categories });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

const getCategoryById = async(req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products

    try {
        const categoryId = await Category.findByPk(req.params.id, {
            include: Product,
        });
        return res.status(200).json({ success: true, category: categoryId });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

const createCategory = async(req, res) => {
    // create a new category
    try {
        const { categoryName } = req.body;
        console.log(categoryName);

        const newCategory = await Category.create({
            categoryName: categoryName,
        });

        return res.status(200).json({
            success: true,
            data: newCategory,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

const updateCategory = async(req, res) => {
    // update a category by its `id` value
    try {
        const { id } = req.params;
        console.log(id);
        const { categoryName } = req.body;
        console.log(categoryName);

        await Category.update({
            categoryName: categoryName,
        }, {
            where: {
                id: id,
            },
        });

        const newCategory = await Category.findByPk(id);
        console.log(newCategory);

        return res.status(200).json({ success: true, data: updateCategory });
    } catch (err) {
        return res.status(500).json({ succes: false, error: err.message });
    }
};

const deleteCategory = async(req, res) => {
    // delete a category by its `id` value
    try {
        const { id } = req.params;
        console.log(id);

        await Category.destroy({
            where: {
                id: id,
            },
        });

        return res.status(200).json({
            success: true,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};