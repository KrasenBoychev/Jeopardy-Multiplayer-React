const { Category } = require('../models/Category');
const { Question } = require('../models/Question');

async function getAllCategories() {
  return Category.find({}).lean();
}

async function getCategory(categoryName) {
  return Category.find({ name: categoryName }).lean();
}

async function getQuestions(categoriesIDs) {
  return Question.find({ categoryId: { $in: categoriesIDs } }).lean();
}

module.exports = {
  getAllCategories,
  getCategory,
  getQuestions,
};
