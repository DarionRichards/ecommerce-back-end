const { Category, Product } = require("../../models");

const getAllCategories = async(req, res) => {
    try {
        const categories = await Category.findAll({
            include: Product,
        });
        // check if categories exists
        if (!categories.length) {
            return res.status(404).json({
                success: false,
                message: "Oops!! No categories are found",
            });
        } else {
            // return found categories
            return res.status(200).json({ success: true, data: categories });
        }
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

const getCategoryById = async(req, res) => {
    try {
        // get ID
        const { id } = req.params;

        const categoryId = await Category.findByPk(id, {
            include: Product,
        });
        // check IF id DOES exists in Category table
        if (!categoryId) {
            return res.status(404).json({
                success: false,
                message: `Oops!! Category with ID: ${id}, does not exists in database`,
            });
        } else {
            // return the category found by ID entered
            return res.status(200).json({ success: true, category: categoryId });
        }
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

const createCategory = async(req, res) => {
    try {
        const { categoryName } = req.body;

        // check IF request body was a valid entry
        if (!categoryName) {
            return res.status(422).json({
                success: false,
                message: `Oops!! String was not valid`,
            });
        } else {
            const categoryExists = await Category.findOne({
                where: {
                    categoryName: categoryName,
                },
            });
            // IF category EXIST in database
            if (categoryExists) {
                return res.status(404).json({
                    success: false,
                    message: `Oops!! ${categoryName} already exists in the database`,
                });
            } else {
                // create the new category
                const newCategory = await Category.create({
                    categoryName: categoryName,
                });

                return res.status(200).json({
                    success: true,
                    data: newCategory,
                });
            }
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

const updateCategoryById = async(req, res) => {
    try {
        const { id } = req.params;
        const { categoryName } = req.body;

        const idExists = await Category.findOne({
            where: {
                id: id,
            },
        });

        // check IF id DOES NOT EXIST
        if (!idExists) {
            return res.status(404).json({
                success: false,
                message: `Oops!! Category with ID: ${id}, can not be found in database`,
            });
        } else {
            // find a category by category_name
            const categoryExists = await Category.findOne({
                where: {
                    categoryName: categoryName,
                },
            });

            // IF category EXISTS
            if (categoryExists) {
                return res.status(404).json({
                    success: false,
                    message: `Oops!! ${categoryName} already exists in the database`,
                });
            } else {
                // IF category DOES NOT exist, update the targeted Category through ID
                const newCategory = await Category.update({
                    categoryName: categoryName,
                }, {
                    where: {
                        id: id,
                    },
                });

                // return the newCategory
                return res.status(200).json({ success: true, data: newCategory });
            }
        }
    } catch (err) {
        return res.status(500).json({ succes: false, error: err.message });
    }
};

const deleteCategoryById = async(req, res) => {
    try {
        const { id } = req.params;
        const idExists = await Category.findOne({
            where: {
                id: id,
            },
        });
        //  check IF id DOES NOT EXIST
        if (!idExists) {
            return res.status(404).json({
                success: false,
                message: `Oops!! Category with ID: ${id}, can not be found in database`,
            });
        } else {
            // get the category name client is deleting
            const { categoryName } = await Category.findOne({
                where: {
                    id: id,
                },
            });
            // DELETE category if ID is a match
            await Category.destroy({
                where: {
                    id: id,
                },
            });

            return res.status(200).json({
                success: true,
                message: `The ${categoryName} category was deleted successfully.`,
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
    updateCategoryById,
    deleteCategoryById,
};