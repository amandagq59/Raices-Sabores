const connection = require('../config/db');
const bcrypt = require('bcrypt');

class DishControllers {
  //1)Abre el formulario para añadir platos
  formDishByFoodie = (req, res) => {
    let sql =
      'SELECT foodie_id, foodie_name, foodie_last_name FROM foodie WHERE foodie_is_deleted = 0';
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('addDishByFoodie', { result });
      }
    });
  };

  //2)Guarda los datos de los platos en bd
  addDishByFoodie = (req, res) => {
    const {
      dish_name,
      dish_review,
      dish_score,
      dish_ingredients,
      dish_restaurant_name,
      dish_restaurant_city,
      foodie_id,
    } = req.body;

    let sql = ` INSERT INTO dish (dish_name, dish_review, dish_score, 
    dish_ingredients, dish_restaurant_name, dish_restaurant_city, foodie_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    let values = [
      dish_name,
      dish_review,
      dish_score,
      dish_ingredients,
      dish_restaurant_name,
      dish_restaurant_city,
      foodie_id,
    ];

    if (req.file != undefined) {
      sql = `INSERT INTO dish (dish_name, dish_review, dish_score, 
      dish_ingredients, dish_restaurant_name, dish_restaurant_city, foodie_id, dish_img) 
      VALUES (?, ?, ?, ?, ?, ?, ?,?)`;
      values.push(req.file.filename);
    }

    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/foodies/profileFoodie/${foodie_id}`);
      }
    });
  };

  //3)Abre el formulario de eddición con los datos de db

  formEditDish = (req, res) => {
    const { id } = req.params;

    let sql = 'SELECT * FROM dish WHERE dish_id=?';
    let values = [id];

    connection.query(sql, values, (err, result) => {
      console.log('****', result);
      if (err) {
        throw err;
      } else {
        res.render('formEditDish', { dishEdit: result[0] });
      }
    });
  };

  //7) Manda los datos editados a la db
  editDish = (req, res) => {
    const {
      dish_name,
      dish_review,
      dish_score,
      dish_ingredients,
      dish_restaurant_name,
      dish_restaurant_city,
    } = req.body;

    const { foodie_id, dish_id } = req.params;

    let sql = `UPDATE dish SET dish_name =?, dish_review =?, dish_score =?, 
    dish_ingredients =?, dish_restaurant_name =?, dish_restaurant_city =? 
    WHERE foodie_id =? AND dish_id =?`;

    let value = [
      dish_name,
      dish_review,
      dish_score,
      dish_ingredients,
      dish_restaurant_name,
      dish_restaurant_city,
      foodie_id,
      dish_id,
    ];

    if (req.file) {
      sql = `UPDATE dish SET dish_name =?, dish_review =?, dish_score =?, 
      dish_ingredients =?, dish_restaurant_name =?, dish_restaurant_city =?, 
      dish_img=? WHERE foodie_id =? AND dish_id =?`;

      value = [
        dish_name,
        dish_review,
        dish_score,
        dish_ingredients,
        dish_restaurant_name,
        dish_restaurant_city,
        req.file.filename,
        foodie_id,
        dish_id,
      ];
    }

    connection.query(sql, value, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/foodies/profileFoodie/${foodie_id}`);
      }
    });
  };

  //5) Abre el perfil del plato seleccionado
  profileDish = (req, res) => {
    const { id } = req.params;

    let sql = 'SELECT * FROM dish WHERE dish_id =? AND dish_is_deleted = 0';
    let values = [id];

    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(result);
        res.render('profileDish', { dish: result[0] });
      }
    });
  };

  //6) Borra totalmente
  dishTotal = (req, res) => {
    const { id, foodie_id } = req.params;
    let sql = 'DELETE FROM dish WHERE dish_id = ?';
    let value = [id];
    connection.query(sql, value, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/foodies/profileFoodie/${foodie_id}`);
      }
    });
  };

  //7)Borra lógicamente
  dishLogic = (req, res) => {
    const { id, foodie_id } = req.params;
    let sql = `UPDATE dish 
              SET  dish.dish_is_deleted =1
              WHERE dish.dish_id =?`;

    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/foodies/profileFoodie/${foodie_id}`);
      }
    });
  };


 //8)Ordena platos por nombre de descendente ascendente
  dishOrderNameAsc = (req, res) => {
    const { dish_restaurant_city } = req.params;
    let sql = 'SELECT * FROM dish ORDER BY dish_restaurant_city Asc';
    let values = { dish_restaurant_city };

    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('dishOrderNameAsc', { dishName: result });
      }
    });
  };

   //)9)Ordena platos por nombre de restaurante descendente

  dishOrderNameDesc = (req, res) => {
    const { dish_restaurant_city } = req.params;
    let sql = 'SELECT * FROM dish ORDER BY dish_restaurant_city Desc';
    let values = { dish_restaurant_city };

    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('dishOrderNameDesc', { dishName: result });
      }
    });
  };


  //10)Pinta todos los platos
  allDish = (req, res) => {
    let sql = 'SELECT * FROM dish';

    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('allDish', { dishName: result });
      }
    });
  };

   //11)Ordena por puntuación de menor a mayor
  dishOrderScoreAsc = (req, res) => {
    const { dish_score } = req.params;
    let sql = 'SELECT * FROM dish ORDER BY dish_score ASC';
    let values = { dish_score };

    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('dishOrderScoreAsc', { dishScore: result });
      }
    });
  };

  //11)Ordena por puntuación de mayor a menor

  dishOrderScoreDesc = (req, res) => {
    const { dish_score } = req.params;
    let sql = 'SELECT * FROM dish ORDER BY dish_score DESC';
    let values = { dish_score };

    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('dishOrderScoreDesc', { dishScore: result });
      }
    });
  };
}

module.exports = new DishControllers();
