const express = require('express')
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const sequelize = require('./config/connection');
const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser())

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

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are not logged in." });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: err });
            } else {
                req.email = decoded.name;
                next();
            }
        })
    }
}

app.get('/', verifyUser, (req, res) => {
    const email = req.email;
    console.log(email)
    return res.json({ status: "Success", name: email});
})

app.post("/login", async (req, res) => {
    db.query(`SELECT * FROM users WHERE email='${req.body.email}';`, async (err, user) => {
        if (err) {
            console.log(err);
            return res.send({ Status: "Error" });
        }

        if (user.length === 0) {
            // User not found
            return res.send({ Status: "Unauthorized" });
        }

        const hashedPassword = user[0].password;

        bcrypt.compare(req.body.password, hashedPassword, (err, match) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ Status: "Error" });
            }

            if (match) {
                console.log('Password Matched Successfully');
                // name works
                const name = user[0].email;

                const token = jwt.sign({ name: name }, "jwt-secret-key", { expiresIn: '1d' });
                res.cookie('token', token);
                return res.send({ Status: "Success" });

            } else {
                console.log('failure');
                return;
            }
        });
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

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: 'Success'})
})

// const auth = async function () {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }
// auth()


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
