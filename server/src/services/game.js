const { Category } = require('../models/Category');
const { Question } = require('../models/Question');

async function getCategory(categoryName) {
  return Category.find({ name: categoryName }).lean();
}

module.exports = {
  getCategory,
};
