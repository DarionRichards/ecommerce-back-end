const { Product, Category, Tag, ProductTag } = require("../../models");

const getAllProducts = async(req, res) => {
    try {
        const productData = await Product.findAll({
            include: {
                model: Category,
                model: Tag,
            },
        });
        if (!productData.length) {
            return res.status(404).json({
                success: false,
                message: "No Products exists in database",
            });
        } else {
            return res.status(200).json({
                success: true,
                data: productData,
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

const getProductById = async(req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product does not exist in database",
            });
        } else {
            return res.status(200).json({
                success: true,
                data: product,
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

const createProduct = async(req, res) => {
    try {
        const { productName, price, stock, tagIds } = req.body;

        const newProduct = await Product.create({ productName, price, stock }, {
            include: {
                model: Category,
            },
        });

        if (tagIds.length) {
            const productTagIdArr = tagIds.map((tagId) => {
                return {
                    productId: newProduct.id,
                    tagId,
                };
            });
            await ProductTag.bulkCreate(productTagIdArr);
        }

        return res.status(200).json({
            success: true,
            productData: newProduct,
            tagIds,
        });
    } catch (err) {
        return res.status(500).json(err.message);
    }
};
const updateProductById = async(req, res) => {
    try {
        const { id } = req.params;
        const { productName, price, stock, tagIds } = req.body;

        const productExists = await Product.findByPk(id);

        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: "Product does not exist in databse",
            });
        } else {
            await Product.update({
                productName,
                price,
                stock,
            }, {
                where: {
                    id: id,
                },
            });
            const updatedProduct = await Product.findByPk(id);

            const associatedProductTags = await ProductTag.findAll({
                where: { productId: id },
            });
            const currentProductTags = associatedProductTags.map(({ tagId }) => tagId);

            const newProductTags = tagIds
                .filter((tagId) => !currentProductTags.includes(tagId))
                .map((tagId) => {
                    return {
                        productId: id,
                        tagId,
                    };
                });

            const productTagsToRemove = currentProductTags
                .filter((tagId) => !tagIds.includes(tagId))
                .map((tagId) => tagId);

            await ProductTag.destroy({
                where: {
                    productId: id,
                    tagId: productTagsToRemove,
                },
            });
            await ProductTag.bulkCreate(newProductTags);

            return res.status(200).json({
                success: true,
                data: updatedProduct,
                currentProductTags,
                newProductTags,
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

const deleteProductById = async(req, res) => {
    try {
        const { id } = req.params;

        const productExists = await Product.findByPk(id);

        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: "Product does not exist in database",
            });
        } else {
            await Product.destroy({
                where: {
                    id: id,
                },
            });

            await ProductTag.destroy({
                where: {
                    productId: id,
                },
            });

            return res.status(200).json({
                success: true,
                message: "Product and associated Product Tags were deleted successfully",
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
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
};