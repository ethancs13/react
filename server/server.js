const express = require('express')
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const sequelize = require('./config/connection');
const salt = 10;

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'por_db'
})
db.connect((err) => {
    if (err) { console.log(err); return; }
    console.log('Connected to MySQL as ID ' + db.threadId);
})


app.post("/login", async (req, res) => {
    db.query('USE por_db;', (err, selectDB) => {
        console.log(selectDB)
        db.query(`SELECT * FROM users WHERE email='${req.body.email}';`, async (err, final) => {
            if(bcrypt.compare(req.body.password, final[0].password, 10)) {
                return res.send(result)
            }
            if (err) { console.log(err) };

            if (!final[0]) {
                console.log('account not found')
                return res.send('wrong')

            }
            


        });
    })

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

    const sql = "INSERT INTO users (email, password) VALUES (?)";
    bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
            console.log(err)
            return res.json({ Error: "Error when hashing password" })
        }
        const values = [
            email,
            hash
        ]
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error(err)
                return res.json({ Error: "Error when inserting data" })
            }
            return res.json({ Status: "Success" });
        })
    })
})

const auth = async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
auth()


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
