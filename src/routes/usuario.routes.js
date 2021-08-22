import express from 'express'
import controller from '../controllers/userController.js'
import validateFormUser from '../config/validate.js';

let router = express.Router();

//show all users
router.get('/', controller.index);

//show one user specific
router.get('/:cedula',controller.user);

//save new user
router.post('/', validateFormUser,controller.save);
  
export default router