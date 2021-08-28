import express from 'express';
import controller from '../controllers/authController.js'
import validate from '../config/validate.js';

let router = express.Router();

//login
router.get('/:email/:pass', validate.login,controller.login);
  
export default router