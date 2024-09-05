const { Category } = require('../models/Category');
const { Question } = require('../models/Question');

async function getAllCategories() {
  return Category.find({}).lean();
}

async function getCategory(categoryName) {
  return Category.find({ name: categoryName }).lean();
}

module.exports = {
  getAllCategories,
  getCategory
};
