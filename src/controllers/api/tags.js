const { Tag, Product } = require("../../models");

const getAllTags = async(req, res) => {
    try {
        // find Tags in database and include associated Products
        const tagData = await Tag.findAll({
            include: Product,
        });

        // IF Tags DOES NOT EXIST
        if (!tagData.length) {
            return res.status(404).json({
                success: false,
                message: "Oops!! No Tags not exist in database",
            });
        } else {
            // return the Tags found
            return res.status(200).json({
                success: true,
                data: tagData,
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

const getTagById = async(req, res) => {
    try {
        const { id } = req.params;

        // find Tag by ID, include associated Products
        const tagData = await Tag.findByPk(id, {
            include: Product,
        });

        // IF TagID DOES NOT EXIST
        if (!tagData) {
            return res.status(404).json({
                success: false,
                message: `Oops!! The Tag with ID:${id}, does not exist in the database`,
            });
        } else {
            // return the Tag and associated Products
            return res.status(200).json({
                success: true,
                data: tagData,
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

const createTag = async(req, res) => {
    try {
        const { tagName } = req.body;

        const lowerCaseTagName = tagName.toLowerCase();

        // find Tag by tag_name
        const tagNameExist = await Tag.findOne({
            where: {
                tagName: lowerCaseTagName,
            },
        });

        // IF Tag EXISTS
        if (tagNameExist) {
            return res.status(422).json({
                success: false,
                message: `Oops!! ${tagName} already exists in database.`,
            });
        } else {
            // IF Tag DOES NOT EXIST
            // create the new Tag
            const newTag = await Tag.create({
                tagName: lowerCaseTagName,
            });

            // return the new tag
            return res.status(200).json({
                success: true,
                data: newTag,
            });
        }
    } catch (error) {
        return res.status(500).json();
    }
};

const updateTagById = async(req, res) => {
    try {
        const { id } = req.params;
        const { tagName } = req.body;

        // find Tag by tag_name
        const tagExists = await Tag.findOne({
            where: {
                tagName: tagName,
            },
        });

        // IF Tag EXISTS
        if (tagExists) {
            return res.status(422).json({
                success: false,
                message: `Oops!! The tag ${tagName} already exist in database`,
                data: tagExists,
            });
        } else {
            // IF Tag DOES NOT EXIST in database
            // update to new Tag
            await Tag.update({
                tagName: tagName,
            }, {
                where: {
                    id: id,
                },
            });

            // get the new updated Tag from database
            const updatedTag = await Tag.findByPk(id);

            // return the updated Tag
            return res.status(200).json({
                success: true,
                data: updatedTag,
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

const deleteTagById = async(req, res) => {
    const { id } = req.params;

    try {
        // check if Tag exists by ID
        const idExists = await Tag.findOne({
            where: {
                id: id,
            },
        });

        // IF Tag DOES NOT EXIST
        if (!idExists) {
            return res.status(404).json({
                success: false,
                message: `Oops!! Tag was not found by ID: ${id}`,
            });
        } else {
            // IF Tag EXISTS
            // get the targeted Tags name
            const { tagName } = await Tag.findOne({
                where: {
                    id: id,
                },
            });

            // destroy Tag WHERE id === id
            await Tag.destroy({ where: { id } });

            // return the deleted Tag name
            return res.status(200).json({
                success: true,
                message: `Wahoo!! The tag ${tagName} was deleted successfully`,
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
    getAllTags,
    getTagById,
    createTag,
    updateTagById,
    deleteTagById,
};