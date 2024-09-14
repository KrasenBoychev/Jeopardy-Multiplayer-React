const { Category } = require('../models/Category');
const { Question } = require('../models/Question');

async function createCategoryService(data) {
  const existingCategory = await Category.findOne({ name: data.name });

  if (existingCategory) {
    throw new Error(`${data.name} category name is already in use`);
  }

  const record = new Category({
    name: data.name
  });

  await record.save();

  return record;
}

async function createQuestionService(data, categoryId) {
  const record = new Question({
    name: data.name,
    points: Number(data.points),
    answers: {
        answerOne: data.answers.answerOne,
        answerTwo: data.answers.answerTwo,
        answerThree: data.answers.answerThree,
        answerFour: data.answers.answerFour,
    },
    correctAnswer: data.correctAnswer,
    categoryId
  });

  await record.save();

  return record;
}

module.exports = {
  createCategoryService,
  createQuestionService
};
