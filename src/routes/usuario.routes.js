import express from 'express'
import controller from '../controllers/userController.js'
import validate from '../config/validate.js';

let router = express.Router();

//show all users
router.get('/',validate.token, controller.index);

//show one user specific
router.get('/:cedula',validate.token,controller.user);

//save new user
router.post('/', validate.formUser,controller.save);

//update user password
router.patch('/password' , validate.updatePassword,controller.updatePassword)

//Reset password
router.patch('/reset-password',validate.resetPassword,controller.resetPassword)

//update rol and status
router.patch('/update-user',validate.updateUser,controller.updateUser)
  
export default router