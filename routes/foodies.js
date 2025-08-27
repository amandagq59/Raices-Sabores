const express = require('express');
const foodiesControllers = require('../controllers/foodiesControllers');
const uploadFile = require('../middleware/multer');
const router = express.Router();


//1) http://localhost:4000/foodies/formRegister (Abre formulario de registro)
router.get('/formfoodies', foodiesControllers.formAddRegister);

//2)http://localhost:4000/foodies/register (Valida formulario de registro)
router.post('/register',uploadFile('foodie'), foodiesControllers.register);

//3)http://localhost:4000/foodies/formlogin (Abre formulario de login)
router.get('/formlogin', foodiesControllers.formLogin);

//4)http://localhost:4000/foodies/login (Valida formulario de login)
router.post('/login', foodiesControllers.loginFoodie);

//5)http://localhost:4000/foodies/profileFoodie/6 (Abre el perfil del foodie)
router.get('/profileFoodie/:id', foodiesControllers.profileFoodie);

//6)http://localhost:4000/foodies/formEditProfileFoodie/5 (abre el formulario del edit)
router.get('/formEditFoodie/:id', foodiesControllers.formEditProfileFoodie);

//7)http://localhost:4000/foodies/editProfileFoodie/6 (Guarda los datos cambiados en bd)
router.post('/editProfileFoodie/:id',uploadFile('foodie'), foodiesControllers.editProfileFoodie);

//8)http://localhost:4000/foodies/editProfileFoodie/3 (Eliminado de forma lógica))
router.get('/deleteLogic/:id', foodiesControllers.deleteLogic);

//9)http://localhost:4000/foodies/editProfileFoodie/3 (Eliminado completo))
router.get('/deleteTotal/:id', foodiesControllers.deleteTotal);

module.exports = router;
