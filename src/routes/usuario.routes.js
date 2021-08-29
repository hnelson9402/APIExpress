import express from 'express'
import controller from '../controllers/userController.js'
import validate from '../config/validate.js';

let router = express.Router();

//show all users
router.get('/',validate.token, controller.index);

//show one user specific
//router.get('/:keyToken/:cedula',token.validateByParams,controller.user);

//save new user
//router.post('/', validate.formUser,controller.save);

//Reset password
//router.patch('/resetPassword',validate.resetPassword,controller.resetPassword)
  
export default router