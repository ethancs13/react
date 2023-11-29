const express = require('express');
// const db = require('./config/db');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3002;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const db = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'por_db'
});

app.post("/login", (req, res) => {
    console.log()
    db.query(`SELECT * FROM users WHERE email='${req.body.email}' AND password='${req.body.password}';`, (err, result) => {

        if (err) {
            console.log(err)
        }
        if (!result[0]) {
            res.send('wrong')
        } else {
            res.send(result)
        }

        
    });
});

app.post("/upload", (req, res) => {
    db.query("INSERT INTO data (email, amount, file) VALUES (?,?,?)", [req.body.email, req.body.amount, req.body.file], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
        console.log(result)
    });
});

app.post('/signup', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    db.query("INSERT INTO users (email, password) VALUES (?,?)", [email, password], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send({email: email})
        }
        console.log(result)
    });
});

app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM users WHERE id= ?", id, (err, result) => {
        if (err) {
            console.log(err)
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});

