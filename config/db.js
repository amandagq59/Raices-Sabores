const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'app_foodies',
});

connection.connect((error) => {
  if (error) {
    console.log('Error de conexión');
  } else {
    console.log('Conexión ok');
  }
});

module.exports = connection;