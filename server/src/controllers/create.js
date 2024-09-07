const { Router } = require('express');
const validator = require('validator');
const { body, validationResult } = require('express-validator');
const { parseError } = require('../util');

const { isAdmin } = require('../middlewares/guards');

const {
  createCategoryService,
  createQuestionService,
} = require('../services/create');

const createRouter = Router();

createRouter.post(
  '/category',
  isAdmin(),
  body('name').trim().notEmpty().withMessage('Name is required'),
  async (req, res) => {
    try {
      const validation = validationResult(req);

      if (validation.errors.length) {
        throw validation.errors;
      }

      const result = await createCategoryService(req.body);
      res.json(result);
    } catch (err) {
      const parsed = parseError(err);
      res.status(400).json({ code: 400, message: parsed.errors });
    }
  }
);

createRouter.post(
  '/question/:categoryId',
  isAdmin(),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('points').trim().isIn(['5', '10', '15', '20']).withMessage('Points should be 5, 10, 15 or 20'),
  body('answers[answerOne]').trim().notEmpty().withMessage('Answer One is required'),
  body('answers[answerTwo]').trim().notEmpty().withMessage('Answer Two is required'),
  body('answers[answerThree]').trim().notEmpty().withMessage('Answer Three is required'),
  body('answers[answerFour]').trim().notEmpty().withMessage('Answer Four is required'),
  body('correctAnswer').trim().notEmpty().withMessage('Correct Answer is required'),
  async (req, res) => {
    try {
      const validation = validationResult(req);

      if (validation.errors.length) {
        throw validation.errors;
      }

      if(!validator.isMongoId(req.params.categoryId)){
        throw new Error('Invalid Category');
      }

      const result = await createQuestionService(req.body, req.params.categoryId);
      res.json(result);
    } catch (err) {
      const parsed = parseError(err);
      res.status(400).json({ code: 400, message: parsed.message });
    }
  }
);

module.exports = { createRouter };
