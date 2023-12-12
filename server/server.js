// IMPORTS
// -------------------------------------------
const express = require('express')
const mysql = require('mysql');
const cors = require('cors');

// bcrypt
const bcrypt = require('bcrypt');
const salt = 10;

// utils
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// sequelize
const sequelize = require('./config/connection');

// storage
const multer = require('multer');
// --------------------------------------------


// ------------- app_setup -------------
const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser())

// PORT
const PORT = process.env.PORT || 3001;

// mysql_database_server_setup
// -TODO-
// move to .env file for security
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

// AUTH LOGIC
// ----------------------------------------------------
// logic_to_verify_jwt (json web token)
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are not logged in." });
    } else {
        // -TODO-
        // Change_secret_to_.env_var
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: err });
            } else {
                req.email = decoded.email;
                req.fn = (decoded.fn).charAt(0).toUpperCase() + decoded.fn.slice(1);;
                req.ln = (decoded.ln).charAt(0).toUpperCase() + decoded.ln.slice(1);;
                next();
            };

        });
    };
};
// verify_user_route
app.get('/', verifyUser, (req, res) => {
    const email = req.email;
    const fn = req.fn;
    const ln = req.ln;

    console.log(`${fn} ${ln} has verified their password using ${email}.`)

    return res.json({ status: "Success", email: email, fn: req.fn, ln: req.ln });
});
// AUTH LOGIC
// ----------------------------------------------------



// LOGIN ROUTES
// ----------------------------------------------------
app.post("/login", async (req, res) => {
    // query_to_mysql_db
    db.query(`SELECT * FROM users WHERE email='${req.body.email}';`, async (err, user) => {
        if (err) {
            console.log(err);
            return res.send({ Status: "Error" });
        }

        // User_not_found
        if (user.length === 0) return res.send({ Status: "Unauthorized" });

        // password_from_mysql_db
        const hashedPassword = user[0].password;
        // compare_user_input_to_hashed_password
        bcrypt.compare(req.body.password, hashedPassword, (err, match) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ Status: "Error" });
            }
            // Success
            if (match) {
                console.log('Password Matched Successfully');
                const fn = user[0].fn;
                const ln = user[0].ln;
                const email = user[0].email;
                // sign_token_to_cookies
                const token = jwt.sign({ fn: fn, ln: ln, email: email }, "jwt-secret-key", { expiresIn: '1d' });
                res.cookie('token', token);
                // send 'Success'
                return res.send({ Status: "Success" });
                // Error
            } else {
                console.log('failure');
                return;
            }
        });
    });
});
// LOGIN ROUTES
// ----------------------------------------------------



// MULTER STORAGE
// ----------------------------------------------------
// setup_storage_config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
// set_location_to_storage_config
const uploads = multer({ storage: storage });
// upload POST route to get files
app.post("/upload", uploads.array('files'), (req, res) => {

    if(!req.body.email){
        res.json({ status: "log in first." })
        return;
    }

    // mysql query
    const sql = `INSERT INTO userData (email, doc_name, doc_path) VALUES (?)`;

    // add each file to mysql db
    for (let i = 0; i < req.files.length; i++) {
        db.query(sql, [req.body.email, req.files[i].filename, req.files[i].path], (err, result) => {
            // Fail
            if (err) {
                console.log(err)
            }
        })
    }
        // Success
        res.json({ status: "files received." })
});
// MULTER STORAGE
// ----------------------------------------------------




// Sign up ROUTES
// ----------------------------------------------------
app.post('/signup', (req, res) => {

    // store_email_and_password
    const fn = req.body.fn;
    const ln = req.body.ln;
    const email = req.body.email;
    const password = req.body.password;
    // query_string
    const sql = "INSERT INTO users (fn, ln, email, password) VALUES (?)";
    // hash_password
    bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
            return res.json({ Error: "Error when hashing password --- " + err })
        }
        // query_values
        const values = [fn, ln, email, hash]

        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error(err)
                return res.json({ Error: "Error when inserting data" })
            }
            return res.json({ Status: "Success" });
        })
    })
})
// Sign up ROUTES
// ----------------------------------------------------




// Sign out ROUTES
// ----------------------------------------------------
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: 'Success' })
})
// ----------------------------------------------------


// check for connection
const auth = async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
auth()

// app listen after sequelize sync
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
