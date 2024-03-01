const { queryAsync } = require('../config/connection');

function getAllUserData(callback) {
    console.log("getting all users...")
    pool.query('SELECT * FROM userData', (error, results) => {
        if (error) throw error;
        callback(results);
    });
}

function insertData(data, callback) {

    console.log('Inserting userData:', data)

    const sql = 'INSERT INTO userData (fn, ln, email, cellphone, cellBillable, landline, landlineBillable, longdist, longdistBillable, broadband, broadbandBillable, entertainment, entertainmentBillable, doc_name, doc_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
        ...data
    ];

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
    getAllUserData,
    insertData
};
