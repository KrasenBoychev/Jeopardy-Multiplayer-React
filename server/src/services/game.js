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

// async function updatePoints(userId, data) {
//   const record = await User.findById(userId);

//   if (!record) {
//     throw new ReferenceError('Record not found ' + userId);
//   }

//   record.points = Number(record.points) + Number(data.points);

//   await record.save();

//   return record.points;
// }

module.exports = {
  getAllCategories,
  //   getCategory,
  //   getQuestions,
  getQuestion,
  //   updatePoints,
};
