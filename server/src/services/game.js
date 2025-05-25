const { default: mongoose } = require("mongoose");
const { Category } = require("../models/Category");
const { Question } = require("../models/Question");
const { User } = require("../models/User");
const ObjectId = mongoose.Types.ObjectId;

function getAllCategories() {
  return Category.find({}).lean();
}

// async function getCategory(categoryName) {
//   return Category.find({ name: categoryName }).lean();
// }

// async function getQuestions(categoriesIDs) {
//   return Question.find({ categoryId: { $in: categoriesIDs } }).lean();
// }

function getQuestion(categoryId, points) {
  return Question.aggregate([
    { $match: { categoryId: new mongoose.Types.ObjectId(categoryId), points } },
    { $sample: { size: 1 } },
  ]);
}

async function updatePoints(username, points) {
  return await User.updateOne(
    { username },
    { $inc: { "gameDetails.points": points } }
  );
}

module.exports = {
  getAllCategories,
  //   getCategory,
  //   getQuestions,
  getQuestion,
  updatePoints,
};
