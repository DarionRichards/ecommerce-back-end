const { Tag, Product } = require("../../models");

const getAllTags = async(req, res) => {
    try {
        const tagData = await Tag.findAll({
            include: Product,
        });

        if (!tagData.length) {
            return res.status(404).json({
                success: false,
                message: "Oops!! No Tags not exist in database",
            });
        } else {
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
        const tagData = await Tag.findByPk(id, {
            include: Product,
        });

        if (!tagData) {
            return res.status(404).json({
                success: false,
                message: `Oops!! The Tag with ID:${id}, does not exist in the database`,
            });
        } else {
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

        const tagNameExist = await Tag.findOne({
            where: {
                tagName: tagName,
            },
        });

        if (tagNameExist) {
            return res.status(422).json({
                success: false,
                message: `Oops!! ${tagName} already exists in database.`,
            });
        } else {
            const newTag = await Tag.create({
                tagName,
            });
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

        const tagExists = await Tag.findOne({
            where: {
                tagName: tagName,
            },
        });

        if (tagExists) {
            return res.status(422).json({
                success: false,
                message: `Oops!! The tag ${tagName} already exist in database`,
                data: tagExists,
            });
        } else {
            await Tag.update({
                tagName: tagName,
            }, {
                where: {
                    id: id,
                },
            });

            const updatedTag = await Tag.findByPk(id);

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
        const idExists = await Tag.findOne({
            where: {
                id: id,
            },
        });

        if (!idExists) {
            return res.status(404).json({
                success: false,
                message: `Oops!! Tag was not found by ID: ${id}`,
            });
        } else {
            const { tagName } = await Tag.findOne({
                where: {
                    id: id,
                },
            });

            await Tag.destroy({ where: { id } });

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