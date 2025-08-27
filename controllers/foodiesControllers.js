const connection = require('../config/db');
const bcrypt = require('bcrypt');

class FoodiesControllers {

  // 1) Abre el formulario
  formAddRegister = (req, res) => {
    res.render('formRegister');
  };

  //2) Manda los datos a db del formulario de registro (realización de validaciones)
  register = (req, res) => {
    console.log(req.body);
    const {foodie_name, foodie_last_name, foodie_email, 
          foodie_password, rePassword, foodie_description} = req.body;

    if (!foodie_email ||!foodie_password || !rePassword) {
      res.render('formRegister', {message: 'Todos los campos deben rellenarse.'});

    } else if (foodie_password !== rePassword){
       res.render('formRegister', {message: 'Las contraseñas no coinciden.'});
    }else{
      bcrypt.hash(foodie_password, 8, (errHash, hashPassword) => {
        if (errHash) {
          throw errHash;
        } else {
          console.log('La contraseña es: ', hashPassword);
          let sql = `INSERT INTO foodie (foodie_name, foodie_last_name, foodie_email, 
          foodie_password, foodie_description)  VALUES (?,?,?,?,?)`;

          let values = [foodie_name, foodie_last_name, foodie_email, hashPassword, foodie_description ];

          if (req.file) {
            sql = `INSERT INTO foodie (foodie_name, foodie_last_name, foodie_email, 
          foodie_password, foodie_description, foodie_img)  VALUES (?,?,?,?,?,?)`;
            values.push(req.file.filename);
          }

          connection.query(sql, values, (err, result) => {
            if (err) {
              if (err.errno === 1062) {
                res.render('formRegister', {
                  message: 'Email duplicado, prueba con otro por favor.',
                });
              } else {
                throw err;
              }
            } else {
              res.render('formLogin');
            }
          });
        }
      });
    }
  };

  //3) Abre el formulario de Login
  formLogin = (req, res) => {
    res.render('formLogin');
  };
  
  //4) Manda los datos del formulario de login a la db
  loginFoodie = (req, res) => {
    const { foodie_email, foodie_password} = req.body;
    let sql = `SELECT * FROM foodie WHERE foodie_email =? AND foodie_is_deleted = 0`;

    let values = [foodie_email];

    connection.query(sql, values, (errFoodie, resultFoodie) => {
      if (errFoodie) {
        throw errFoodie;
      } else if (!resultFoodie.length) {
        res.render('FormLogin', {message: 'No existe usuario con ese email. Por favor, prueba con otro.'});
      } else {
        let hasedPassword = resultFoodie[0].foodie_password;
        bcrypt.compare(foodie_password, hasedPassword,(errHash, resultCompare) => {
            if (errHash) {
              throw errHash;
            } else {
              if( resultCompare == false){
               res.render('formLogin', {message: 'La contraseña no es válida. Por favor, inténtelo de nuevo'});
              }else {
                let sqlDish = 'SELECT * FROM dish WHERE foodie_id =?'
                connection.query(sqlDish, [resultFoodie[0].foodie_id], (errDish,resultDish)=>{
                  if(errDish){
                    throw errDish;
                  }else{
                    res.render('profileFoodie', { profile: resultFoodie[0], dish: resultDish });

                  }
                });
            }
            }
          }
        );
      }
    });
  };

  //5) Abre el perfil del foodie y se pinta (y del plato)
    profileFoodie = (req, res) => {
    const { id } = req.params;
    let sqlFoodie ='SELECT * FROM foodie WHERE foodie_id = ? AND foodie_is_deleted = 0';
    let valuesFoodie = [id];

    let sqlDish = 'SELECT * FROM dish WHERE foodie_id = ? AND dish_is_deleted = 0';
    let valuesDish = [id];

    connection.query(sqlFoodie, valuesFoodie, (errFoodie, resultFoodie) => {
      if (errFoodie) {
        throw errFoodie;
      } else {
        connection.query(sqlDish, valuesDish, (errDish, resultDish) => {
          if (errDish) {
            throw errDish;
          } else {
            console.log(resultDish);
            res.render('profileFoodie', {profile: resultFoodie[0], dish: resultDish});
           
          }
        });
      }
    });
  };
  

  //6) Abre el formulario para editar perfiles
  formEditProfileFoodie = (req, res) => {
    const { id } = req.params;
    let sql ='SELECT * FROM foodie WHERE  foodie_id = ? AND foodie_is_deleted = 0';
    let value = [id];
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('formEditProfileFoodie', { foodieEdit: result[0] });
      }
    });
  };

  //7) Manda los datos editados a la db
  editProfileFoodie = (req, res) => {
    const { foodie_name, foodie_last_name, foodie_description } = req.body;
    const { id } = req.params;

    let sql =`UPDATE foodie SET foodie_name = ?, foodie_last_name = ?, 
    foodie_description = ? WHERE foodie_id =?`;

    let value = [foodie_name, foodie_last_name, foodie_description, id];

    if (req.file) {
      sql =`UPDATE foodie SET foodie_name = ?, foodie_last_name = ?, 
      foodie_description = ?, foodie_img = ? WHERE foodie_id =?`;

      value = [foodie_name, foodie_last_name, foodie_description, req.file.filename, id,];
    };

    connection.query(sql, value, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/foodies/profileFoodie/${id}`);
      }
    });
  };

  //8) Borra lógicamente
  deleteLogic = (req, res) => {
    const { id } = req.params;
    let sql = `UPDATE foodie LEFT JOIN dish
              ON foodie.foodie_id = dish.foodie_id
              SET foodie.foodie_is_deleted = 1, dish.dish_is_deleted =1
              WHERE foodie.foodie_id =?`;
 
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect('/');
      }
    });
  };

  //9) Borra totalmente
  deleteTotal = (req, res) => {
    const { id } = req.params;
    let sql = 'DELETE FROM foodie WHERE foodie_id = ?';
    let value = [id];
    connection.query(sql, value, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect('/');
      }
    });
  };
}

module.exports = new FoodiesControllers();
