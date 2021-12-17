const { Category, Product } = require("../../models");

const getAllCategories = async(req, res) => {
    try {
        const categories = await Category.findAll({
            include: Product,
        });
        if (!categories.length) {
            return res.status(404).json({
                success: false,
                message: "Oops!! No categories are found",
            });
        } else {
            return res.status(200).json({ success: true, data: categories });
        }
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

const getCategoryById = async(req, res) => {
    try {
        const categoryId = await Category.findByPk(req.params.id, {
            include: Product,
        });
        if (!categoryId) {
            return res.status(404).json({
                success: false,
                message: "Oops!! No category can be found with that ID",
            });
        } else {
            return res.status(200).json({ success: true, category: categoryId });
        }
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

const createCategory = async(req, res) => {
    try {
        const { categoryName } = req.body;

        if (!categoryName) {
            return res
                .status(422)
                .json({ success: false, message: "Oops!! String was not valid" });
        } else {
            const newCategory = await Category.create({
                categoryName: categoryName,
            });

            return res.status(200).json({
                success: true,
                data: newCategory,
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

const updateCategory = async(req, res) => {
    try {
        const { id } = req.params;
        const { categoryName } = req.body;

        const idExists = await Category.findOne({
            where: {
                id: id,
            },
        });

        if (!idExists) {
            return res.status(404).json({
                success: false,
                message: "Oops!! Category does not exist",
            });
        } else {
            const newCategory = await Category.update({
                categoryName: categoryName,
            }, {
                where: {
                    id: id,
                },
            });
            return res.status(200).json({ success: true, data: newCategory });
        }
    } catch (err) {
        return res.status(500).json({ succes: false, error: err.message });
    }
};

const deleteCategory = async(req, res) => {
    try {
        const { id } = req.params;
        const categoryName = await Category.findOne({
            where: {
                id: id,
            },
        });

        if (!categoryName) {
            return res.status(404).json({
                success: false,
                message: "Oops!! Category does not exist",
            });
        } else {
            await Category.destroy({
                where: {
                    id: id,
                },
            });

            return res.status(200).json({
                success: true,
                message: `The ${categoryName.categoryName} category was deleted successfully.`,
            });
        }
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