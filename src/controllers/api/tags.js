const getAllTags = (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    res.send("getAllTags");
};

const getTagById = (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    res.send("getTagById");
};

const createTag = (req, res) => {
    // create a new tag
    res.send("createTag");
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