import express from 'express'
import controller from '../controllers/userController.js'

let router = express.Router();

//show all users
router.get('/', controller.index);

//show one user specific
router.get('/:cedula',controller.user);
  
export default router