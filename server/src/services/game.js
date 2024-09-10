const { Category } = require('../models/Category');
const { Question } = require('../models/Question');
const { User } = require('../models/User');

// async function getTopPlayers() {
//   return User.find({ name: categoryName }).lean();
// }

async function getAllCategories() {
  return Category.find({}).lean();
}

async function getCategory(categoryName) {
  return Category.find({ name: categoryName }).lean();
}

async function getQuestions(categoriesIDs) {
  return Question.find({ categoryId: { $in: categoriesIDs } }).lean();
}

async function updatePoints(userId, data) {
  const record = await User.findById(userId);

  if (!record) {
    throw new ReferenceError('Record not found ' + userId);
  }

  record.points = Number(record.points) + Number(data.points);

  await record.save();

  return record;
}

module.exports = {
  getAllCategories,
  getCategory,
  getQuestions,
  updatePoints,
};
