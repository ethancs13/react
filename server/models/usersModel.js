const { queryAsync } = require('../config/connection');

function getUserID(email, callback) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const values = [email];

    queryAsync(sql, values)
        .then(results => {
            callback(null, results);
        })
        .catch(error => {
            console.error('Error executing query:', error);
            callback(error, null);
            throw error;
        });
}

module.exports = {
    getUserID,
    // Add other functions here...
};