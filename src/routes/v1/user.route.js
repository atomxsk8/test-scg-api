const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get([validate(userValidation.getUsers), auth()], userController.getUsers)
  .post([validate(userValidation.createUser), auth()], userController.createUser)

router
  .route('/getMe')
  .get([validate(userValidation.getUsers), auth()], userController.getMe)

router
  .route('/:userId')
  .get([validate(userValidation.getUser), auth()], userController.getUser)
  .patch([validate(userValidation.updateUser), auth()], userController.updateUser)
  .delete([validate(userValidation.deleteUser), auth()], userController.deleteUser);



module.exports = router;