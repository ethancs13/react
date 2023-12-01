const express = require('express');
const db = require('./db');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.post("/login", (req, res) => {
    db.query(`SELECT * FROM users WHERE email='${req.body.email}' AND password='${req.body.password}';`, (err, result) => {

        if (err) { console.log(err) };

        if (!result[0]) {
            res.send('wrong')
        } else {
            if(result[0].sid) {
                console.log(sid)
            }
            db.query(`SELECT sid FROM Sessions;`,
            (err, result) => {
                if (err) {
                    console.log(err)
                }
                // Print out sid's
                console.log(result[0].sid)
            });
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
            res.send({ email: email })
        }
        console.log(result)
    });
});


    
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)    
});

