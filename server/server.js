// IMPORTS
// -------------------------------------------
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// bcrypt
const bcrypt = require("bcrypt");
const salt = 10;

// utils
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { promisify } = require("util");

// storage
const multer = require("multer");
const { parse } = require("path");
// --------------------------------------------

//models
const userDataModel = require("./models/userDataModel");
const itemsModel = require("./models/itemsModel");
const userModel = require("./models/usersModel");
const foodModel = require("./models/foodModel");

// ------------- app_setup -------------
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());

// PORT
const PORT = process.env.PORT || 3001;

// mysql_database_server_setup
// -TODO-
// move to .env file for security
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "por_db",
});
db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected to MySQL as ID " + db.threadId);
});

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
        req.fn = decoded.fn.charAt(0).toUpperCase() + decoded.fn.slice(1);
        req.ln = decoded.ln.charAt(0).toUpperCase() + decoded.ln.slice(1);
        next();
      }
    });
  }
};
// verify_user_route
app.get("/", verifyUser, (req, res) => {
  const email = req.email;
  const fn = req.fn;
  const ln = req.ln;
  let name = fn;
  ln ? (name += " " + ln) : (name += "");

  console.log(`${name} has verified their password using ${email}.`);

  if (email === "test@test.com") {
    console.log("root user logged in");
    return res.json({
      status: "rootUser",
      email: email,
      fn: req.fn,
      ln: req.ln,
    });
  }

  return res.json({ status: "Success", email: email, fn: req.fn, ln: req.ln });
});
// AUTH LOGIC
// ----------------------------------------------------

// LOGIN ROUTES
// ----------------------------------------------------
app.post("/login", async (req, res) => {
  try {
    const [user] = await queryAsync("SELECT * FROM users WHERE email = ?", [
      req.body.email,
    ]);

    if (!user) {
      return res.send({ Status: "Unauthorized" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (match) {
      console.log("Password Matched Successfully");
      const fn = user.fn;
      const ln = user.ln;
      const email = user.email;
      const token = jwt.sign(
        { fn: fn, ln: ln, email: email },
        "jwt-secret-key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.send({ Status: "Success" });
    } else {
      console.log("Failure");
      return res.send({ Status: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: "Error", Error: "Database error" });
  }
});
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
  },
});
// set_location_to_storage_config
const uploads = multer({ storage: storage });

// upload POST route to get files
app.post("/upload", uploads.array("files"), async (req, res) => {
  if (!req.body.email) {
    res.json({ status: "log in first." });
    return;
  }

  const rowsData = req.body.rowsData;
  console.log("Rows Data:", rowsData);

  const foodData = req.body.foodData;
  console.log("Food Data:", foodData);

  if (req.files) {
    // for multiple files
    var filesData = req.files;
  } else {
    // for one file
    var filesData = req.body.files;
  }
  console.log("Files Data:", filesData);

  console.log("Totals data: ", req.body);

  // -------------------------------

  // data array
  const dataInsert = [
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
    req.body.parking,
    req.body.parkingBillable,
    req.body.tolls,
    req.body.tollsBillable,
    req.body.mileage,
    req.body.mileageBillable,
    req.body.comments,
  ];

  // -------------------- Foods ------------------
  const foodInsert = [req.body.fn, req.body.ln, req.body.email];

  // -------------------- Items ------------------
  // data array for items
  const itemsInsert = [req.body.fn, req.body.ln, req.body.email];

  // -------------------- Totals -----------------
  const totalsInsert = [
    req.body.fbCC,
    req.body.fbCCBillable,
    req.body.fb,
    req.body.fbBillable,
    req.body.billOnCard,
    req.body.billOOP,
    req.body.CCtotal,
    req.body.OOPtotal,
  ];

  // main logic for insert
  try {
    // Fetch user ID
    const userID = await new Promise((resolve, reject) => {
      userModel.getUserID(req.body.email, (error, results) => {
        if (error) {
          console.error("Error getting user ID:", error);
          reject(error);
        } else {
          console.log("User ID retrieved successfully:", results);
          resolve(results[0].id); // Assuming the user ID is in the 'id' column
        }
      });
    });

    // --------------- Parse rows data -------------

    // Parse item data
    console.log(JSON.parse(rowsData));
    // if more than one
    if (JSON.parse(rowsData)[0]) {
      var items_ParsedData = req.body.rowsData
        .map((jsonString) => {
          try {
            return JSON.parse(jsonString);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
          }
        })
        .filter((parsed) => parsed !== null);

      console.log("Parsed Data:", items_ParsedData);
      // if one
    } else {
      var items_ParsedData = JSON.parse(rowsData);
      console.log("Parsed Data:", items_ParsedData);
    }

    // Parse food data
    // if more than one
    if (JSON.parse(foodData)[1]) {
      var food_ParsedData = req.body.foodData
        .map((jsonString) => {
          try {
            return JSON.parse(jsonString);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
          }
        })
        .filter((parsed) => parsed !== null);

      console.log("Parsed Data:", food_ParsedData);
      // if one
    } else {
      var food_ParsedData = JSON.parse(foodData);
      console.log("Parsed Data:", food_ParsedData);
    }

    // insert items data
    const itemsDataInsert = await new Promise((resolve, reject) => {
      console.log("data hh insert: ", items_ParsedData);
      console.log(items_ParsedData);
      if (items_ParsedData.length) {
        for (let i = 0; i < items_ParsedData.length; i++) {
          itemsModel.insertItem(
            [
              userID,
              ...itemsInsert,
              items_ParsedData[i].item,
              items_ParsedData[i].date,
              items_ParsedData[i].subTotal,
              items_ParsedData[i].cityTax,
              items_ParsedData[i].taxPercent,
              items_ParsedData[i].total,
              items_ParsedData[i].source,
              items_ParsedData[i].shippedFrom,
              items_ParsedData[i].shippedTo,
              items_ParsedData[i].billable,
            ],
            (error, results) => {
              if (error) {
                console.error("Error inserting food data:", error);
                reject(error);
              } else {
                console.log("Food Data inserted successfully:", results);
                resolve(results);
              }
            }
          );
        }
      } else {
        itemsModel.insertItem(
          [
            userID,
            ...itemsInsert,
            items_ParsedData.item,
            items_ParsedData.date,
            items_ParsedData.subTotal,
            items_ParsedData.cityTax,
            items_ParsedData.taxPercent,
            items_ParsedData.total,
            items_ParsedData.source,
            items_ParsedData.shippedFrom,
            items_ParsedData.shippedTo,
            items_ParsedData.billable,
          ],
          (error, results) => {
            if (error) {
              console.error("Error inserting food data:", error);
              reject(error);
            } else {
              console.log("Food Data inserted successfully:", results);
              resolve(results);
            }
          }
        );
      }
    });
    console.log("data insert: ", itemsDataInsert);

    // insert food data
    const foodDataInsert = await new Promise((resolve, reject) => {
      if (food_ParsedData.length >= 1) {
        for (let i = 0; i < food_ParsedData.length; i++) {
          foodModel.insertFood(
            [
              userID,
              food_ParsedData[i].date,
              food_ParsedData[i].amount,
              food_ParsedData[i].restaurant,
              food_ParsedData[i].persons,
              food_ParsedData[i].title,
              food_ParsedData[i].reason,
              food_ParsedData[i].billable,
              food_ParsedData[i].PoRCC,
            ],
            (error, results) => {
              if (error) {
                console.error("Error inserting food data:", error);
                reject(error);
              } else {
                console.log("Food Data inserted successfully:", results);
                resolve(results);
              }
            }
          );
        }
      }
    });

    // Parse data
    const parsedData = (req.body.data || [])
      .map((jsonString) => {
        try {
          return JSON.parse(jsonString);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          return null;
        }
      })
      .filter((parsed) => parsed !== null);

    console.log("Parsed Data:", parsedData);

    // Insert data
    for (let i = 0; i < parsedData.length; i++) {
      const result = userDataModel.insertData([userID, ...parsedData]);
      console.log("Items Inserted Successfully.", result);
    }

    // Success
    res.json({ status: "received." });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ status: "Error" });
  }
});

// // MULTER STORAGE
// // ----------------------------------------------------

// FETCH DATA FROM BACKEND
// ----------------------------------------------------

// Fetch all users
app.get("/fetch", (req, res) => {
  const sql = "SELECT * FROM users;";

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

// Fetch user information by email
app.get("/fetch/info/:email", (req, res) => {
  const userEmail = req.params.email;

  db.query(
    "SELECT * FROM userData WHERE email = ?",
    [userEmail],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Query Result:", result);
        res.json(result);
      }
    }
  );
});

// FETCH DATA FROM BACKEND
// ----------------------------------------------------

// Sign up ROUTES
// ----------------------------------------------------
app.post("/signup", (req, res) => {
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
      return res.json({ Error: "Error when hashing password --- " + err });
    }
    // query_values
    const values = [fn, ln, email, hash];

    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ Error: "Error when inserting data" });
      }
      return res.json({ Status: "Success" });
    });
  });
});
// Sign up ROUTES
// ----------------------------------------------------

// Sign out ROUTES
// ----------------------------------------------------
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});
// ----------------------------------------------------

app.listen(PORT, () => console.log("Now listening"));
