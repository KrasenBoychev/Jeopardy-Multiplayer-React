const { Category } = require('../models/Category');
const { Question } = require('../models/Question');

async function createCategoryService(data) {
  const record = new Category({
    name: data.name
  });

  await record.save();

  return record;
}

//add Category when creating Question
async function createQuestionService(data, categoryId) {
  const record = new Question({
    name: data.name,
    answers: {
        answerOne: data.answerOne,
        answerTwo: data.answerTwo,
        answerThree: data.answerThree,
        answerFour: data.answerFour,
        correctAnswer: data.correctAnswer
    },
    points: data.points
  });

  await record.save();

  return record;
}

module.exports = {
  createCategoryService,
  createQuestionService,
};
