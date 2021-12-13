const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

const schema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        reference: {
            model: "Product",
            key: "id",
        },
    },
    tagId: {
        type: DataTypes.INTEGER,
        reference: {
            model: "tag",
            key: "id",
        },
    },
};

const options = {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
};

ProductTag.init(schema, options);

module.exports = ProductTag;