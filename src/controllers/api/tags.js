const { Tag, Product } = require("../../models");

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

        if (tagName) {
            return res.status(403).json({
                success: false,
                message: "Tag already exists in database.",
            });
        } else {
            const newTag = await Tag.create({
                tagName,
            });
            return res.status(200).json(newTag);
        }
    } catch (error) {
        return res.status(500).json();
    }
};

const updateTagById = (req, res) => {
    // update a tag's name by its `id` value
    res.send("updateTagById");
};

const deleteTagById = (req, res) => {
    // delete on tag by its `id` value
    res.send("deleteTagById");
};

module.exports = {
    getAllTags,
    getTagById,
    createTag,
    updateTagById,
    deleteTagById,
};