// import models
const Category = require("./Category");
const Product = require("./Product");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Categories have many Products
Category.hasMany(Product, {
    foreignKey: "category_id",
});

// Products belongsTo Category
Product.belongsTo(Category, {
    foreignKey: "category_id",
    onDelete: "CASCADE",
});

// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)

module.exports = {
    Category,
    Product,
    Tag,
    ProductTag,
};