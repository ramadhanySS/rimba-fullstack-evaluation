const { body, param, validationResult } = require('express-validator');

exports.validateUser = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('age').isInt({ min: 0 }).withMessage('Age must be a non-negative integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const formattedErrors = errors.array().map(err => ({
          msg: err.msg,
          param: err.param,
          location: err.location,
        }));
        return res.status(400).json({ errors: formattedErrors });
      }
      
    next();
  },
];

exports.validateId = [
  param('id').isUUID().withMessage('Invalid UUID format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];
