const { default: mongoose } = require("mongoose");
const { Category } = require("../models/Category");
const { Question } = require("../models/Question");
const { User } = require("../models/User");

function getAllCategories() {
  return Category.find({}).lean();
}

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
  getQuestion,
  updatePoints,
};
