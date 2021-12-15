const { Product, Category, Tag, ProductTag } = require("../../models");

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
const updateProductById = (req, res) => {
    // update product data
    // Product.update(req.body, {
    //         where: {
    //             id: req.params.id,
    //         },
    //     })
    //     .then((product) => {
    //         // find all associated tags from ProductTag
    //         return ProductTag.findAll({ where: { product_id: req.params.id } });
    //     })
    //     .then((productTags) => {
    //         // get list of current tag_ids
    //         const productTagIds = productTags.map(({ tag_id }) => tag_id);
    //         // create filtered list of new tag_ids
    //         const newProductTags = req.body.tagIds
    //             .filter((tag_id) => !productTagIds.includes(tag_id))
    //             .map((tag_id) => {
    //                 return {
    //                     product_id: req.params.id,
    //                     tag_id,
    //                 };
    //             });
    //         // figure out which ones to remove
    //         const productTagsToRemove = productTags
    //             .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
    //             .map(({ id }) => id);

    //         // run both actions
    //         return Promise.all([
    //             ProductTag.destroy({ where: { id: productTagsToRemove } }),
    //             ProductTag.bulkCreate(newProductTags),
    //         ]);
    //     })
    //     .then((updatedProductTags) => res.json(updatedProductTags))
    //     .catch((err) => {
    //         // console.log(err);
    //         res.status(400).json(err);
    //     });
    res.send("updateProductById");
};

const deleteProductById = (req, res) => {
    // delete one product by its `id` value
    res.send("deleteProductById");
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
};