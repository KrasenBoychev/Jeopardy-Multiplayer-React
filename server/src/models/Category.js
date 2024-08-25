const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

const Category = model('categories', CategorySchema);
Category.createIndexes();

module.exports = { Category };
