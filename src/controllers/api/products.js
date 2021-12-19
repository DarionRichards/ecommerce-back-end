const { Product, Category, Tag, ProductTag } = require("../../models");
const { capitalizeString } = require("../../utils/capitalizeString");

const getAllProducts = async(req, res) => {
    try {
        const productData = await Product.findAll({
            include: {
                model: Category,
                model: Tag,
            },
        });
        //  check IF ANY product EXISTS
        if (!productData.length) {
            return res.status(404).json({
                success: false,
                message: "No Products exists in database",
            });
        } else {
            // otherwise return products
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

        // find product by ID
        const product = await Product.findByPk(id);

        // IF product DOES NOT EXIST
        if (!product) {
            return res.status(404).json({
                success: false,
                message: `Product with ID: ${id}, does not exist in database`,
            });
        } else {
            // IF product DOES EXIST
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

        // check if valid string
        if (!productName) {
            return res.status(422).json({
                success: false,
                message: "Oops!! The product name was not valid",
            });
        } else {
            const camelCaseProduct = capitalizeString(productName);

            // find product by product_name
            const productExists = await Product.findOne({
                where: {
                    productName: camelCaseProduct,
                },
            });

            // IF product EXISTS
            if (productExists) {
                return res.status(404).json({
                    success: false,
                    message: `Oops!! ${productName} already exists in database`,
                });
            } else {
                // create a new Product
                const newProduct = await Product.create({ productName: camelCaseProduct, price, stock }, {
                    include: {
                        model: Category,
                    },
                });

                // check IF updated product has associated TAGS to create
                if (tagIds.length) {
                    // go over each Tag from bodu and relate new Product ID
                    const productTagIdArr = tagIds.map((tagId) => {
                        return {
                            productId: newProduct.id,
                            tagId,
                        };
                    });
                    // create a new ProductTag using productTagIdArr(ProductIDs and TagIDs)
                    await ProductTag.bulkCreate(productTagIdArr);
                }

                // return if product was created successfully
                return res.status(200).json({
                    success: true,
                    productData: newProduct,
                    tagIds,
                });
            }
        }
    } catch (err) {
        return res.status(500).json(err.message);
    }
};

const updateProductById = async(req, res) => {
    try {
        const { id } = req.params;
        const { productName, price, stock, tagIds } = req.body;

        const productExists = await Product.findByPk(id);

        // IF Product DOES NOT EXIST
        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: `Product with ID: ${id} can not be updated, does not exist in databse`,
            });
        } else {
            // IF Product EXISTS

            // update records where product_id === id
            await Product.update({
                productName,
                price,
                stock,
            }, {
                where: {
                    id: id,
                },
            });

            // find EACH current associated product tags from ProductTag model
            const associatedProductTags = await ProductTag.findAll({
                where: { productId: id },
            });
            const currentProductTags = associatedProductTags.map(({ tagId }) => tagId);

            // remove currentProductTags that do not match NEW tagIds from req.body
            const newProductTags = tagIds
                .filter((tagId) => !currentProductTags.includes(tagId))
                .map((tagId) => {
                    return {
                        productId: id,
                        tagId,
                    };
                });

            // store Tags in array which are to be destroyed
            const productTagsToRemove = currentProductTags
                .filter((tagId) => !tagIds.includes(tagId))
                .map((tagId) => tagId);

            // destroy uneccessary related tags to new product
            await ProductTag.destroy({
                where: {
                    productId: id,
                    tagId: productTagsToRemove,
                },
            });

            // create the new related tags
            await ProductTag.bulkCreate(newProductTags);

            // find the recently updated product
            const updatedProduct = await Product.findByPk(id);

            // return if product was updated successfully
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

        // find product from Product model by ID
        const productExists = await Product.findByPk(id);

        // IF product DOES NOT EXIST
        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: `Product with ID: ${id} can not be updated, does not exist in database`,
            });
        } else {
            //  IF product EXISTS

            // destroy product by ID
            await Product.destroy({
                where: {
                    id: id,
                },
            });

            // destroy associated ProductTags where product_id === req.body.id
            await ProductTag.destroy({
                where: {
                    productId: id,
                },
            });

            // return product_name that was deleted
            return res.status(200).json({
                success: true,
                message: `${productExists.productName} and associated Product Tags were deleted successfully`,
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