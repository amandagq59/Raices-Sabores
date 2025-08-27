const connection = require('../config/db');
const bcrypt = require('bcrypt');

class IndexControllers {
  showFoodiesList = (req, res) => {
    let sql = 'SELECT * FROM foodie WHERE foodie_is_deleted=0';
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('index', {foodie: result});
      }
    });
  };
}





module.exports = new IndexControllers();