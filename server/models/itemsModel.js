const pool = require('../config/connection');

function getAllItems(callback) {
  console.log("Getting all items...");

  pool.query('SELECT * FROM items', (error, results) => {
    if (error) throw error;
    callback(results);
  });
}

module.exports = {
  getAllItems,
};