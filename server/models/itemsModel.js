const pool = require('../config/connection');

function getAllItems(callback) {
  pool.query('SELECT * FROM items', (error, results) => {
    if (error) throw error;
    callback(results);
  });
}

// Add more functions for items interactions as needed...

module.exports = {
  getAllItems,
  // Add other functions here...
};