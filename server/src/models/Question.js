const { Schema, model, Types } = require('mongoose');

const QuestionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    answers: {
        answerOne: {
            type: String,
            correct: Boolean,
            required: true
        },
        answerTwo: {
            type: String,
            correct: Boolean,
            required: true
        },
        answerThree: {
            type: String,
            correct: Boolean,
            required: true
        },
        answerFour: {
            type: String,
            correct: Boolean,
            required: true
        }
    },
    points: {
        type: Number,
        enum : [5, 10, 15, 20],
        required: true
    },
    categoryId: {
        type: Types.ObjectId,
        ref: 'Category',
    }
});

const Question = model('questions', QuestionSchema);
Question.createIndexes();

module.exports = { Question };