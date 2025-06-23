const { Category } = require("../models/Category");
const { Question } = require("../models/Question");

async function getCategoryId(categoryName) {
  return await Category.find({ categoryName }).distinct("_id");
}

async function recordCategory(categoryName) {
  const existingCategory = await Category.findOne({ name: categoryName });

  if (existingCategory) {
    throw new Error(`${categoryName} category name is already in use`);
  }

  const record = new Category({
    name: categoryName,
  });

  await record.save();

  return record;
}

async function recordQuestion(questionDetails, categoryId) {
  const record = new Question({
    name: questionDetails.name,
    points: Number(questionDetails.points),
    answers: {
      answerOne: questionDetails.answerOne,
      answerTwo: questionDetails.answerTwo,
      answerThree: questionDetails.answerThree,
      answerFour: questionDetails.answerFour,
    },
    correctAnswer: questionDetails.correctAnswer,
    categoryId,
  });

  await record.save();

  return record;
}

module.exports = {
  getCategoryId,
  recordCategory,
  recordQuestion,
};
