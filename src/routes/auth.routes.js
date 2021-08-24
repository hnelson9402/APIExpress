import express from 'express';
import controller from '../controllers/authController.js'
import { validateLogin } from '../config/validate.js';

let router = express.Router();

//login
router.get('/:email/:pass', validateLogin,controller.login);
  
export default router