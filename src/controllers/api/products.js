const { Product, Category, Tag, ProductTag } = require("../../models");
const { update } = require("../../models/Category");

const getAllProducts = async(req, res) => {
    // find all products
    // be sure to include its associated Category and Tag data
    try {
        const data = await Product.findAll({
            include: {
                model: Category,
                model: Tag,
            },
        });
        return res.status(200).json({
            success: true,
            data: data,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

const getProductById = async(req, res) => {
    // find a single product by its `id`
    // be sure to include its associated Category and Tag data
    try {
        const { id } = req.params;
        console.log(id);

        const productData = await Product.findByPk(id);

        console.log(productData);
        return res.status(200).json({
            success: true,
            data: productData,
        });
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
        console.log("Tag Payload:", tagIds);

        // update product with name, price & stock
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

        // get current tags related to productId
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

        console.log("Current Product Tags:", currentProductTags);
        console.log("New Tags:", newProductTags);

        const productTagsToRemove = currentProductTags
            .filter((tagId) => !tagIds.includes(tagId))
            .map((tagId) => tagId);

        console.log("Product Tags to be Removed:", productTagsToRemove);

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
            return res.status(500).json({
                success: false,
                message: "Product does not exits",
            });
        }

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
            message: "Product and Product Tags deleted successfully",
        });
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