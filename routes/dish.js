const express = require ('express');
const router = express.Router();
const dishControllers = require ('../controllers/dishControllers');
const uploadFile = require('../middleware/multer');

//1)http:/localhost:4000/dish//addDishByFoodie (Abre el formulario para añadir plato a un foodie)
router.get('/addDishByFoodie', dishControllers.formDishByFoodie);

//2)http:/localhost:4000/dish/addDish (Guarda los datos en bd de los platos añadidos)
router.post('/addDishByFoodie', uploadFile('dish'), dishControllers.addDishByFoodie);

//3)http:/localhost:4000/dish/formEditDish/6 (Abre el formulario de editar plato)
 router.get('/formEditDish/:id', dishControllers.formEditDish);

//4)http:/localhost:4000/dish/editDish/6/7 (Guarda los datos del formulario de editar plato)
 router.post('/editDish/:foodie_id/:dish_id', uploadFile('dish'), dishControllers.editDish);

//5)http:/localhost:4000/dish/profileDish/5 (Abre la información del plato)
router.get('/profileDish/:id', dishControllers.profileDish)

//6)http:/localhost:4000/dish/dishTotal/3/23 (Borra el formulario por completo)
 router.get('/dishTotal/:id/:foodie_id', dishControllers.dishTotal);

//7)http:/localhost:4000/dish/dishLogic/3/2 (Borra el formulario lógicamente)
 router.get('/dishLogic/:id/:foodie_id', dishControllers.dishLogic);

//8)http:/localhost:4000/dish/dishOrderNameAsc (Ordena por nombres de ciudad los platos (ASC));
 router.get('/dishOrderNameAsc', dishControllers.dishOrderNameAsc);

 //9)http:/localhost:4000/dish/dishOrderNameDesc (Ordena por nombres de ciudad los platos (DESC));
 router.get('/dishOrderNameDesc', dishControllers.dishOrderNameDesc);

//10)http:/localhost:4000/dish/allDish (Muestra todos los platos);
 router.get('/allDish', dishControllers.allDish);

 //11)http:/localhost:4000/dish/dishOrderScoreAsc(Ordena por nombres de ciudad los platos(ASC));
 router.get('/dishOrderScoreAsc', dishControllers.dishOrderScoreAsc);

//12)http:/localhost:4000/dish//dishOrderScoreDesc(Ordena por nombres de ciudad los platos(DESC));
 router.get('/dishOrderScoreDesc', dishControllers.dishOrderScoreDesc);



module.exports = router;