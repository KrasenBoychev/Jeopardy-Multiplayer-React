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
    name: categoryName,
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
    name: questionDetails.questionName,
    points: Number(questionDetails.points),
    answers: {
      answerOne: questionDetails.answerOne,
      answerTwo: questionDetails.answerTwo,
      answerThree: questionDetails.answerThree,
      answerFour: questionDetails.answerFour,
    },
    correctAnswer: questionDetails[`${questionDetails.correctAnswer}`],
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
