const pool = require('../config/connection');

function getAllFood(callback) {
  console.log("Getting all foods...");

  pool.query('SELECT * FROM foodData', (error, results) => {
    if (error) throw error;
    callback(results);
  });
}

module.exports = {
  getAllFood,
};