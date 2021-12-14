// import models
const Category = require("./Category");
const Product = require("./Product");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Categories have many Products
Category.hasMany(Product, {
    foreignKey: "categoryId",
});

// Products belongsTo Category
Product.belongsTo(Category, {
    foreignKey: "categoryId",
    onDelete: "CASCADE",
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
    through: ProductTag,
    foreignKey: "productId",
    onDelete: "CASCADE",
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
    through: ProductTag,
    foreignKey: "tagId",
    onDelete: "CASCADE",
});

module.exports = {
    Category,
    Product,
    Tag,
    ProductTag,
};