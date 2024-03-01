const { queryAsync } = require('../config/connection');

function getUserID(email, callback) {

  console.log("Getting user ID for: " + email);

  const sql = 'SELECT * FROM users WHERE email = ?';
  const values = [email];

  queryAsync(sql, values)
    .then(results => {
      callback(null, results);  // Pass results to the callback
    })
    .catch(error => {
      console.error('Error executing query:', error);
      callback(error, null);  // Pass error to the callback
      throw error;
    });
}

module.exports = {
  getUserID,
};
