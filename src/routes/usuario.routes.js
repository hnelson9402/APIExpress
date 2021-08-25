import express from 'express'
import controller from '../controllers/userController.js'
import validateFormUser from '../config/validate.js';
import token from './../db/token.js';

let router = express.Router();

//show all users
router.get('/:keyToken',token.validateByParams, controller.index);

//show one user specific
router.get('/:keyToken/:cedula',token.validateByParams,controller.user);

//save new user
router.post('/', validateFormUser,controller.save);
  
export default router