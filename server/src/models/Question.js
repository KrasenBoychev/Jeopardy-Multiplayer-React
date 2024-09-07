const { Schema, model, Types } = require('mongoose');

const QuestionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    enum: [5, 10, 15, 20],
    required: true,
  },
  answers: {
    answerOne: {
      type: String,
      required: true,
    },
    answerTwo: {
      type: String,
      required: true,
    },
    answerThree: {
      type: String,
      required: true,
    },
    answerFour: {
      type: String,
      required: true,
    },
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Types.ObjectId,
    ref: 'Category',
  },
});

const Question = model('questions', QuestionSchema);
Question.createIndexes();

module.exports = { Question };
