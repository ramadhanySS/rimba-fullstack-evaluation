const express = require('express');
const { validateUser, validateId } = require('../../middlewares/validation');
const logger = require('../../middlewares/logger');
const userController = require('./controllers');

const router = express.Router();

router.use(logger);

router.get('/', userController.index);
router.get('/:id', validateId, userController.indexById);
router.post('/', validateUser, userController.store);
router.put('/:id', validateId, validateUser, userController.update);
router.delete('/:id', validateId, userController.destroy);

module.exports = router;
