const { Router } = require('express');
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
  '/question',
  isAdmin(),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('answerOne').trim().notEmpty().withMessage('Answer One is required'),
  body('answerTwo').trim().notEmpty().withMessage('Answer Two is required'),
  body('answerThree').trim().notEmpty().withMessage('Answer Three is required'),
  body('answerFour').trim().notEmpty().withMessage('Answer Four is required'),
  body('points')
    .trim()
    .custom((value) => {
      const result = [5, 10, 15, 20].includes(value);
      if (!result) {
        throw new Error(
          'Points should be one of the following numbers: 5, 10, 15, 20'
        );
      }
    }),
  async (req, res) => {
    try {
      const validation = validationResult(req);

      if (validation.errors.length) {
        throw validation.errors;
      }

      const result = await createQuestionService(req.body);
      res.json(result);
    } catch (err) {
      const parsed = parseError(err);
      res.status(400).json({ code: 400, message: parsed.errors });
    }
  }
);

module.exports = { createRouter };
