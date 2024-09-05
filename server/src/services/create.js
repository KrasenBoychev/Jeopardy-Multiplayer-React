const { Category } = require('../models/Category');
const { Question } = require('../models/Question');

async function createCategoryService(data) {
  const record = new Category({
    name: data.name
  });

  await record.save();

  return record;
}

async function createQuestionService(data, categoryId) {
  const record = new Question({
    name: data.name,
    answers: {
        answerOne: data.answers.answerOne,
        answerTwo: data.answers.answerTwo,
        answerThree: data.answers.answerThree,
        answerFour: data.answers.answerFour,
        correctAnswer: data.answers.correctAnswer
    },
    points: Number(data.points),
    categoryId
  });

  await record.save();

  return record;
}

module.exports = {
  createCategoryService,
  createQuestionService
};
