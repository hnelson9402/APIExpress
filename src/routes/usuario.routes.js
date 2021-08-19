import express from 'express'
import controller from '../controllers/userController.js'

let router = express.Router();

//show all users
router.get('/', controller.index);

//show one user specific
router.get('/',(req, res) => {  
});


// define the about route
router.get('/about', (req, res) => {
  res.send('About usuario');
});

router.get('/id/:id', (req, res) => {
    const {id} = req.params;
    res.send(`About usuario : ${id}`);
});
  
export default router