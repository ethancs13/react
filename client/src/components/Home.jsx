import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AddDeleteTableRows from "./addDeleteTables";
import AddDeleteTableRows_food from "./addDeleteTables_food";
import Admin from "./Admin";
import axios from "axios";
import "../css/Home.css"; // Import the Home CSS file

const Home = () => {
  // must have permissions
  axios.defaults.withCredentials = true;

  // change route
  const navigate = useNavigate();

  // row data - food data - admin data
  const [rowsData, setRowsData] = useState([]);
  const [rowsData_food, setRowsData_food] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [totalsData, setTotalsData] = useState([]);

  // data useState's
  const [cell, setCell] = useState("");
  const [cellCC, setCellCC] = useState("");
  const [landline, setLandline] = useState("");
  const [landlineCC, setLandlineCC] = useState("");
  const [dist, setDist] = useState("");
  const [distCC, setDistCC] = useState("");
  const [broadband, setBroadband] = useState("");
  const [broadbandCC, setBroadbandCC] = useState("");
  const [entertainment, setEntertainment] = useState("");
  const [entertainmentCC, setEntertainmentCC] = useState("");
  const [tolls, setTolls] = useState("");
  const [tollsCC, setTollsCC] = useState("");
  const [itemized, setItemized] = useState("");
  const [itemizedCC, setItemizedCC] = useState("");
  const [parking, setParking] = useState("");
  const [parkingCC, setParkingCC] = useState("");
  const [mileage, setMileage] = useState("");

  // billable Totals - useState
  const [billableCC_amnt, setBillableCC_amnt] = useState("");
  const [billableCC, setBillableCC] = useState(true);
  const [nonBillableCC_amnt, setNonBillableCC_amnt] = useState("");
  const [nonBillableCC, setNonBillableCC] = useState(false);
  const [billable_amnt, setBillable_amnt] = useState("");
  const [billable, setBillable] = useState(true);
  const [nonBillable_amnt, setNonBillable_amnt] = useState("");
  const [nonBillable, setNonBillable] = useState(false);

  // comment section - useState
  const [comments, setComments] = useState("");
  // file useState -  for uploading receipts to server
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // billable - useState
  const [cellBillable, setCellBillable] = useState("");
  const [landlineBillable, setLandlineBillable] = useState("");
  const [distBillable, setDistBillable] = useState("");
  const [broadbandBillable, setBroadbandBillable] = useState("");
  const [entertainmentBillable, setEntertainmentBillable] = useState("");
  const [tollsBillable, setTollsBillable] = useState("");
  const [itemizedBillable, setItemizedBillable] = useState("");
  const [parkingBillable, setParkingBillable] = useState("");
  const [mileageBillable, setMileageBillable] = useState("");

  const [auth, setAuth] = useState(false);
  const [rootUser, setRootUser] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");

  useEffect(() => {
    // get user info from local storage if available. 
    // If not redirect to login page
    axios.get("http://localhost:3001/").then((res) => {
      if (res.data.status === "Success") {
        // update auth
        setAuth(true);
        setEmail(res.data.email);
        setFn(res.data.fn);
        setLn(res.data.ln);
        // reload
        navigate("/");
        // if  the user is a root user show additional fields
      } else if (res.data.status === "rootUser") {
        setRootUser(true);
        setAuth(true);
        setEmail(res.data.email);
        setFn(res.data.fn);
        setLn(res.data.ln);
        navigate("/");
      } else {
        setRootUser(false);
        setAuth(false);
        setMessage("");
        navigate("/");
      }
    });
  }, []);

  const updateRowsData_food = function (data) {
    setRowsData_food(data);
    console.log(rowsData_food)
  };

  const updateTotalsData = function (data) {
    setTotalsData(data);
  }

  const updateRowsData = function (data) {
    setRowsData(data);
    console.log(rowsData)
  };
  const updateAdminData = function (data) {
    setAdminData(data);
  };

  // -------------------- Handle Submit Function --------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    // helper function for form creation
    const createFormData = (data, prefix = "") => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        const fieldName = prefix ? `${prefix}[${key}]` : key;

        if (value instanceof FileList) {
          // Handle FileList (uploadedFiles)
          Array.from(value).forEach((file, index) => {
            formData.append(`${fieldName}[${index}]`, file);
          });
        } else if (typeof value === "object" && value !== null) {
          // Handle nested objects (rowsData, adminData)
          createFormData(value, fieldName);
        } else {
          // Handle primitive values (fn, ln, email, etc.)
          formData.append(fieldName, value);
        }
      });
      return formData;
    };

    const formData = createFormData({
      fn,
      ln,
      email,
      cell,
      cellBillable,
      landline,
      landlineBillable,
      dist,
      distBillable,
      broadband,
      broadbandBillable,
      entertainment,
      entertainmentBillable,
      parking,
      parkingBillable,
      tolls,
      tollsBillable,
      mileage,
      mileageBillable,
      billableCC,
      billableCC_amnt,
      nonBillable,
      nonBillable_amnt,
      nonBillableCC,
      nonBillableCC_amnt,
      billable,
      billable_amnt,
      comments
    });

    // Append foodData to formData
    try {
      rowsData_food.forEach((row, index) => {
        formData.append("foodData", JSON.stringify(row));
      });
    } catch (error) {
      console.log("Error appending foodData to formData: ", error);
    }

    // Append rowsData to formData
    try {
      rowsData.forEach((row, index) => {
        formData.append(`rowsData`, JSON.stringify(row));
      });
    } catch (error) {
      console.log("Error appending rowsData to formData: ", error);
    }

    // if more than one file
    if (uploadedFiles.length >= 2) {
      // Append uploadedFiles to formData
      try {
        uploadedFiles.forEach((file, index) => {
          formData.append(`files`, file);
          console.log("appended file", file);
        });
      } catch (error) {
        console.log("Error getting uploadedFiles: ", error);
      }
    } else {
      // if one file
      try {
        // Append uploadedFile to formData
        formData.append(`files`, uploadedFiles);
        console.log("appended file", formData);
      } catch (error) {
        console.log("Error getting uploadedFile: ", error);
      }
    }

    // Append adminData to formData
    adminData.forEach((element, index) => {
      formData.append(`items`, JSON.stringify(element));
    });

    console.log(...formData);

    // --------------------------------------------------------------

    axios({
      method: "post",
      url: "http://localhost:3001/upload",
      data: formData,
    }).then((data) => {
      if (data.data.status === "log in first.") {
        alert("Login or Sign up!");
        navigate("/login");
      } else {
        console.log("post success", uploadedFiles);
        setUploadedFiles([]);
      }
    });
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:3001/logout")
      .then((res) => {
        location.reload(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <main className="main">
        {auth ? (
          // if root user
          rootUser ? (
            <div>
              <header>
                <h1>Welcome, David Sroka</h1>
              </header>
              <div>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
              <div>
                <Admin data={adminData} update={updateAdminData} />
              </div>
            </div>
          ) : (
            // else
            <div>
              <div>
                <div>
                  <h3 className="home-greeting">
                    Welcome, <span>{fn}</span>
                  </h3>
                </div>
                <div>
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>

              <div className="form-wrapper">
                <form
                  encType="multipart/form-data"
                  className="form__container"
                  onSubmit={handleSubmit}
                >
                  <div class="user_name_container">
                    <p>Name</p>
                    <p>{fn}</p>
                  </div>
                  <div class="expense_period_container">
                    <p>Expense Period</p>
                    <input type="month"></input>
                  </div>
                  <div class="grid-container">
                    {/* <!-- Header Row  */}
                    <div></div>
                    <div class="grid-header">
                      <p>Billable?</p>
                    </div>
                    <div class="grid-header">
                      <p>PoR CC used?</p>
                    </div>
                    <div class="grid-header">
                      <p>Amount</p>
                    </div>
                    {/* <!-- First Row  */}
                    <div class="grid-item">
                      <p>Cell Phone</p>
                    </div>
                    <div class="grid-item"><input type="text"></input></div>
                    <div class="grid-item"><input type="text"></input></div>
                    <div class="grid-item"><input type="text" readonly></input></div>
                    {/* <!-- Second Row  */}
                    <div class="grid-item">
                      <p>Broadband</p>
                    </div>
                    <div class="grid-item"><input type="text"></input></div>
                    <div class="grid-item"><input type="text"></input></div>
                    <div class="grid-item"><input type="text" readonly></input></div>
                    {/* <!-- Third Row  */}
                    <div class="grid-item">
                      <p>Parking</p>
                    </div>
                    <div class="grid-item"><input type="text"></input></div>
                    <div class="grid-item"><input type="text"></input></div>
                    <div class="grid-item"><input type="text" readonly></input></div>
                    {/* <!-- Fourth Row  */}
                    <div class="grid-item">
                      <p>Food & Beverage</p>
                    </div>
                    <div class="grid-item"><input type="text"></input></div>
                    <div class="grid-item"><input type="text"></input></div>
                    <div class="grid-item"><input type="text" readonly></input></div>
                    {/* <!-- Fifth Row  */}
                    <div class="grid-item">
                      <p>Mileage</p>
                    </div>
                    <div class="grid-item"><input type="text"></input></div>
                    <div class="grid-item"><input type="text"></input></div>
                    <div class="grid-item"><input type="text" readonly></input></div>
                    {/* <!-- Sixth Row  */}
                    <div class="grid-item">
                      <p>Itemized Purchases</p>
                    </div>
                    <div class="grid-item"><input type="text"></input></div>
                    <div class="grid-item"><input type="text"></input></div>
                    <div class="grid-item"><input type="text" readonly></input></div>
                  </div>
                  <button
                    type="Submit"
                    className="button"
                    onSubmit={handleSubmit}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )
        ) : (
          <div>
            <h3>{message}</h3>
            <Link to="/login" className="btn btn-primary login_home_btn">
              Login
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
