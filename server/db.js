const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "root",
database:"por_db" 
})

module.exports = db;