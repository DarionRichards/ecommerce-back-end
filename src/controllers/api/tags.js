const { Tag, Product } = require("../../models");
const { findAll } = require("../../models/Category");

const getAllTags = async(req, res) => {
    try {
        const tagData = await Tag.findAll({
            include: Product,
        });

        return res.status(200).json({
            success: true,
            data: tagData,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

const getTagById = async(req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data

    try {
        const { id } = req.params;
        const tagData = await Tag.findByPk(id, {
            include: Product,
        });

        return res.status(200).json(tagData);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

const createTag = async(req, res) => {
    // create a new tag
    try {
        const { tagName } = req.body;

        const tagNameExist = await Tag.findOne({
            where: {
                tagName: tagName,
            },
        });

        if (!tagNameExist) {
            const newTag = await Tag.create({
                tagName,
            });
            return res.status(200).json({
                success: true,
                data: newTag,
            });
        } else {
            return res.status(403).json({
                success: false,
                message: "Tag already exists in database.",
            });
        }
    } catch (error) {
        return res.status(500).json();
    }
};

const updateTagById = async(req, res) => {
    // update a tag's name by its `id` value
    try {
        const { id } = req.params;
        const { tagName } = req.body;

        const tagExists = await Tag.findOne({
            where: {
                id: id,
            },
        });

        if (tagExists) {
            const updatedTag = await Tag.update({
                tagName: tagName,
            }, {
                where: {
                    id: id,
                },
            });

            return res.status(200).json({
                success: true,
                data: updatedTag,
            });
        } else {
            return res.status(403).json({
                success: false,
                message: "This Tag ID already exist",
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
    // delete on tag by its `id` value
    const { id } = req.params;

    try {
        const idExists = await Tag.findOne({
            where: {
                id: id,
            },
        });

        if (idExists) {
            await Tag.destroy({ where: { id } });

            return res.status(200).json({
                success: true,
                message: "Tag was deleted successfully",
            });
        } else {
            return res.status(403).json({
                success: true,
                message: "Tag was not found",
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