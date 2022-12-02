const express = require("express")

const router = express.Router();
const TodosController=require('../controllers/TodosController')
const RegisterController = require ('../controllers/RegisterController');
const loginController = require("../controllers/LoginController");
const auth = require ("../config/auth")


router.post('/todos' , TodosController.create)
router.get('/todos' , TodosController.index)
router.get('/todos/:id' , TodosController.show)
router.delete('/todos/:id' , TodosController.destroy)
router.post('/register' , RegisterController.register);
router.post('/login' ,loginController.login);
router.get ('/userDetails' ,loginController.userDetails )

module.exports=router;
