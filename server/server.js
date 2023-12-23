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
const { promisify } = require('util');

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

const queryAsync = promisify(db.query).bind(db);

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

    if (email === 'test@test.com') {
        console.log('root user logged in')
        return res.json({ status: "rootUser", email: email, fn: req.fn, ln: req.ln });
    }

    return res.json({ status: "Success", email: email, fn: req.fn, ln: req.ln });
});
// AUTH LOGIC
// ----------------------------------------------------



// LOGIN ROUTES
// ----------------------------------------------------
app.post("/login", async (req, res) => {
    try {
        const user = await queryAsync(`SELECT * FROM users WHERE email='${req.body.email}';`);
        if (user.length === 0) return res.send({ Status: "Unauthorized" });

        const hashedPassword = user[0].password;
        const match = await bcrypt.compare(req.body.password, hashedPassword);

        if (match) {
            console.log('Password Matched Successfully');
            const fn = user[0].fn;
            const ln = user[0].ln;
            const email = user[0].email;
            const token = jwt.sign({ fn: fn, ln: ln, email: email }, "jwt-secret-key", { expiresIn: '1d' });
            res.cookie('token', token);
            return res.send({ Status: "Success" });
        } else {
            console.log('Failure');
            return res.status(401).send({ Status: "Unauthorized" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ Status: "Error" });
    }
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
app.post("/upload", uploads.array('files'), async (req, res) => {
    if (!req.body.email) {
        res.json({ status: "log in first." });
        return;
    }

    const itemData = req.body.items;
    console.log('Item Data:', itemData);

    const rowsData = req.body.rowsData;
    console.log('Rows Data:', rowsData);

    const filesData = req.body.files;
    console.log('Files Data:', filesData);

    // mysql query
    const sql = `INSERT INTO userData (fn, ln, email, cellphone, cellBillable, landline, landlineBillable, longdist, longdistBillable, broadband, broadbandBillable, entertainment, entertainmentBillable, doc_name, doc_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // query for userData items           userData ID
    const itemsQuery = `INSERT INTO items ( entry_id, fn, ln, email, item, date, subTotal, cityTax, taxPercent, total, source, shippedFrom, shippedTo, billable) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?) `;

    // -------------------------------

    // data array
    const data = [
        req.body.fn,
        req.body.ln,
        req.body.email,
        req.body.cellphone,
        req.body.cellBillable,
        req.body.landline,
        req.body.landlineBillable,
        req.body.dist,
        req.body.distBillable,
        req.body.broadband,
        req.body.broadbandBillable,
        req.body.entertainment,
        req.body.entertainmentBillable,
    ];

    // add each file to mysql db
    // try {
    //     for (let i = 0; i < req.files.length; i++) {
    //         const result = await queryAsync(sql, [...data, req.files[i].filename, req.files[i].path]);
    //         console.log("Insert into userData successful:", result);
    //     }
    // } catch (error) {
    //     console.log('failed for multiple files');
    //     const result = await queryAsync(sql, [...data, req.files.filename, req.files.path]);
    //     console.log("Insert into userData successful:", result);
    // }



    // ------------------------------------------

    // data array for items
    const itemsData = [
        req.body.fn,
        req.body.ln,
        req.body.email
    ]
    // add each item to mysql db
    // Perform SELECT query to get the latest userData
    try {
        console.log('before userData query', req.files)
        for (let i = 0; i < req.files.length; i++) {
            const result = await queryAsync(sql, [...data, req.files[i].filename, req.files[i].path]);
            console.log("Insert into userData successful:", result);
        }

        const userDataResult = await queryAsync('SELECT * FROM userData ORDER BY id DESC LIMIT 1;');

        // Before accessing the property, check if the variable is defined
        if (userDataResult && userDataResult.length > 0) {
            // Now you can safely access properties of userDataResult
            var latestUserData = userDataResult[0];
            console.log('userData Success', latestUserData)
        } else {
            console.error("userDataResult is undefined or empty");
        }

        // let parsedData = []
        // for (const jsonString of req.body.rowsData) {
        //     try {
        //         parsedData.push(JSON.parse(jsonString));
        //         console.log('Parsed Data:', parsedData);
        //         // Continue with your logic using parsedData...
        //     } catch (error) {
        //         console.error('Error parsing JSON:', error);
        //     }
        // }
        let parsedData = [...latestUserData]
        console.log(parsedData)

        for (let i = 0; i < parsedData.length; i++) {
            const result = await queryAsync(itemsQuery, [
                latestUserData.id,
                ...itemsData,
                parsedData[i].item,
                parsedData[i].date,
                parsedData[i].subTotal,
                parsedData[i].cityTax,
                parsedData[i].taxPercent,
                parsedData[i].total,
                parsedData[i].source,
                parsedData[i].shippedFrom,
                parsedData[i].shippedTo,
                parsedData[i].billable
            ]);
            console.log(result)
        }
        // Success
        res.json({ status: "files received." })

    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ status: "Error" });
    }
});


// // MULTER STORAGE
// // ----------------------------------------------------






// FETCH DATA FROM BACKEND
// ----------------------------------------------------

app.get('/fetch', (req, res) => {

    const sql = `SELECT * FROM users;`;

    db.query(sql, (err, result) => {

        console.log(result);

        res.send(result)

        if (err) {
            console.error(err)
        }
    })
})

// initial fetch for users
app.post('/fetch/info', (req, res) => {
    console.log('Request Body:', req.body);

    const userId = req.body.email + 1;

    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Query Result:', result);
            res.json(result);
        }
    });

    // fetch data from specific user

    app.get('/fetch/info/:email', (req, res) => {
        console.log('Request Body:', req.body);

        const userEmail = req.params.email;

        db.query(`SELECT * FROM userData WHERE email=${userEmail}`, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Query Result:', result);
                res.json(result)
            }
        })
    })
})


// FETCH DATA FROM BACKEND
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
