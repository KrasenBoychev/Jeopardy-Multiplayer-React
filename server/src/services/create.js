const { Category } = require("../models/Category");
const { Question } = require("../models/Question");

async function getCategoryId(categoryName) {
  return await Category.find({ name: categoryName }).distinct("_id");
}

async function checkCategory(categoryName) {
  const existingCategory = await Category.findOne({ name: categoryName });
  return existingCategory;
}

async function recordCategory(categoryName) {
  const record = new Category({
    name: categoryName.trim(),
  });

  await record.save();

  return record;
}

async function checkQuestion(questionName) {
  const existingQuestion = await Question.findOne({ name: questionName });
  return existingQuestion;
}

async function recordQuestion(questionDetails, categoryId) {
  const record = new Question({
    name: questionDetails.questionName.trim(),
    points: Number(questionDetails.points),
    answers: {
      answerOne: questionDetails.answerOne.trim(),
      answerTwo: questionDetails.answerTwo.trim(),
      answerThree: questionDetails.answerThree.trim(),
      answerFour: questionDetails.answerFour.trim(),
    },
    correctAnswer: questionDetails[`${questionDetails.correctAnswer}`].trim(),
    categoryId,
  });

  await record.save();

  return record;
}

module.exports = {
  getCategoryId,
  checkCategory,
  checkQuestion,
  recordCategory,
  recordQuestion,
};
