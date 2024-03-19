import React, { useState, useEffect } from "react";
import { Container, Form, Col, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import AddDeleteTableRows from "./addDeleteTables";
import AddDeleteTableRows_food from "./addDeleteTables_food";
import Admin from "./Admin";
import axios from "axios";
import "../css/Home.css"; // Import the Home CSS file

const Home = () => {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [rowsData, setRowsData] = useState([]);
  const [rowsData_food, setRowsData_food] = useState([]);
  const [adminData, setAdminData] = useState([]);

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

  const [billableCC_amnt, setBillableCC_amnt] = useState("");
  const [billableCC, setBillableCC] = useState(true);
  const [nonBillableCC_amnt, setNonBillableCC_amnt] = useState("");
  const [nonBillableCC, setNonBillableCC] = useState(false);
  const [billable_amnt, setBillable_amnt] = useState("");
  const [billable, setBillable] = useState(true);
  const [nonBillable_amnt, setNonBillable_amnt] = useState("");
  const [nonBillable, setNonBillable] = useState(false);

  const [comments, setComments] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // billable
  const [cellBillable, setCellBillable] = useState("");
  const [landlineBillable, setLandlineBillable] = useState("");
  const [distBillable, setDistBillable] = useState("");
  const [broadbandBillable, setBroadbandBillable] = useState("");
  const [entertainmentBillable, setEntertainmentBillable] = useState("");
  const [tollsBillable, setTollsBillable] = useState("");
  const [itemizedBillable, setItemizedBillable] = useState("");
  const [parkingBillable, setParkingBillable] = useState("");
  const [mileageBillable, setMileageBillable] = useState("");

  // food section totals section
  const [onCardBillable, setOnCardBillable] = useState("");
  const [onCard, setOnCard] = useState("");
  const [outPocket, setOutPocket] = useState("");
  const [outPocketBillable, setOutPocketBillable] = useState("");
  const [ccTotal, setCCTotal] = useState("");
  const [oopTotal, setOOPTotal] = useState("");

  const [auth, setAuth] = useState(false);
  const [rootUser, setRootUser] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/").then((res) => {
      if (res.data.status === "Success") {
        setAuth(true);
        setEmail(res.data.email);
        setFn(res.data.fn);
        setLn(res.data.ln);
        navigate("/");
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
  };

  const updateRowsData = function (data) {
    setRowsData(data);
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
      billableCC,
      billableCC_amnt,
      nonBillable,
      nonBillable_amnt,
      nonBillableCC,
      nonBillableCC_amnt,
      billable,
      billable_amnt,
    });

    // Append foodData to formData
    try {
      rowsData_food.forEach((row, index) => {
        formData.append("foodData", JSON.stringify(row));
      });
    } catch (error) {
      console.log("Error getting food row data: ", error);
    }

    // Append rowsData to formData
    try {
      rowsData.forEach((row, index) => {
        formData.append(`rowsData`, JSON.stringify(row));
      });
    } catch (error) {
      console.log("Error getting rows data: ", error);
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
                  <div className="form-content">
                    <h2>Expense Data</h2>
                    <div className="expense-section">
                      {/* Expense left side */}
                      <div className="left-aside">
                        <div className="items">
                          <label htmlFor="cell" className="form-header">
                            Cellphone
                          </label>
                          <div className="input-wrapper">
                            <input
                              className="cell color-billable"
                              name="cell"
                              value={cell}
                              onChange={(e) => setCell(e.target.value)}
                              required
                            />
                            <input
                              className="cellBillable color-notBillable"
                              name="cellBillable"
                              value={cellBillable}
                              onChange={(e) => setCellBillable(e.target.value)}
                              required
                            />
                            <label className="CC" htmlFor="cell-box">
                              CC
                              <input
                                type="checkbox"
                                name="cell-box"
                                className="expense-section-checkbox"
                                onChange={(e) =>
                                  setCellCC(e.target.checked ? 1 : 0)
                                }
                              />
                            </label>
                          </div>
                        </div>

                        <div className="items">
                          <label htmlFor="broadband" className="form-header">
                            Broadband
                          </label>
                          <div className="input-wrapper">
                            <input
                              className="broadband color-billable"
                              name="broadband"
                              value={broadband}
                              onChange={(e) => setBroadband(e.target.value)}
                              required
                            />
                            <input
                              className="broadbandBillable color-notBillable"
                              name="broadbandBillable"
                              value={broadbandBillable}
                              onChange={(e) =>
                                setBroadbandBillable(e.target.value)
                              }
                              required
                            />
                            <label className="CC" htmlFor="cell-box">
                              CC
                              <input
                                type="checkbox"
                                className="expense-section-checkbox"
                                onChange={(e) =>
                                  setBroadbandCC(e.target.checked ? 1 : 0)
                                }
                              />
                            </label>
                          </div>
                        </div>

                        <div className="items">
                          <label
                            htmlFor="business_landline"
                            className="form-header"
                          >
                            Business land line
                          </label>
                          <div className="input-wrapper">
                            <input
                              className="business_landline color-billable"
                              name="business_landline"
                              value={landline}
                              onChange={(e) => setLandline(e.target.value)}
                              required
                            />
                            <input
                              className="landline_billable color-notBillable"
                              name="landline_billable"
                              value={landlineBillable}
                              onChange={(e) =>
                                setLandlineBillable(e.target.value)
                              }
                              required
                            />
                            <label className="CC" htmlFor="cell-box">
                              CC
                              <input
                                type="checkbox"
                                className="expense-section-checkbox"
                                onChange={(e) =>
                                  setLandlineCC(e.target.checked ? 1 : 0)
                                }
                              />
                            </label>
                          </div>
                        </div>

                        <div className="items">
                          <label
                            htmlFor="long_distance"
                            className="form-header"
                          >
                            Long distance
                          </label>
                          <div className="input-wrapper">
                            <input
                              className="long_distance color-billable"
                              name="long_distance"
                              value={dist}
                              onChange={(e) => setDist(e.target.value)}
                              required
                            />
                            <input
                              className="dist_billable color-notBillable"
                              name="dist_billable"
                              value={distBillable}
                              onChange={(e) => setDistBillable(e.target.value)}
                              required
                            />
                            <label className="CC" htmlFor="cell-box">
                              CC
                              <input
                                type="checkbox"
                                className="expense-section-checkbox"
                                onChange={(e) =>
                                  setDistCC(e.target.checked ? 1 : 0)
                                }
                              />
                            </label>
                          </div>
                        </div>

                        <div className="items">
                          <label htmlFor="itemized" className="form-header">
                            Itemized Purchases
                          </label>
                          <div className="input-wrapper">
                            <input
                              className="itemized color-billable"
                              name="itemized"
                              value={itemized}
                              onChange={(e) => setItemized(e.target.value)}
                              required
                            />
                            <input
                              className="itemizedBillable color-notBillable"
                              name="itemizedBillable"
                              value={itemizedBillable}
                              onChange={(e) =>
                                setItemizedBillable(e.target.value)
                              }
                              required
                            />
                            <label className="CC" htmlFor="cell-box">
                              CC
                              <input
                                type="checkbox"
                                className="expense-section-checkbox"
                                onChange={(e) =>
                                  setItemizedCC(e.target.checked ? 1 : 0)
                                }
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Expense right side */}
                      <div className="right-aside">
                        <div className="items">
                          <label
                            htmlFor="entertainment"
                            className="form-header"
                          >
                            Client Entertainment
                          </label>
                          <div className="input-wrapper">
                            <input
                              className="entertainment color-billable"
                              name="entertainment"
                              value={entertainment}
                              onChange={(e) => setEntertainment(e.target.value)}
                              required
                            />
                            <input
                              className="entertainmentBillable color-notBillable"
                              name="entertainmentBillable"
                              value={entertainmentBillable}
                              onChange={(e) =>
                                setEntertainmentBillable(e.target.value)
                              }
                              required
                            />
                            <label className="CC" htmlFor="cell-box">
                              CC
                              <input
                                type="checkbox"
                                className="expense-section-checkbox"
                                onChange={(e) =>
                                  setEntertainmentCC(e.target.checked ? 1 : 0)
                                }
                              />
                            </label>
                          </div>
                        </div>

                        <div className="items">
                          <label htmlFor="parking" className="form-header">
                            Parking
                          </label>
                          <div className="input-wrapper">
                            <input
                              className="parking color-billable"
                              name="parking"
                              value={parking}
                              onChange={(e) => setParking(e.target.value)}
                              required
                            />
                            <input
                              className="parkingBillable color-notBillable"
                              name="parkingBillable"
                              value={parkingBillable}
                              onChange={(e) =>
                                setParkingBillable(e.target.value)
                              }
                              required
                            />
                            <label className="CC" htmlFor="cell-box">
                              CC
                              <input
                                type="checkbox"
                                className="expense-section-checkbox"
                                onChange={(e) =>
                                  setParkingCC(e.target.checked ? 1 : 0)
                                }
                              />
                            </label>
                          </div>
                        </div>

                        <div className="items">
                          <label htmlFor="tolls" className="form-header">
                            Tolls
                          </label>
                          <div className="input-wrapper">
                            <input
                              className="tolls color-billable"
                              name="tolls"
                              value={tolls}
                              onChange={(e) => setTolls(e.target.value)}
                              required
                            />
                            <input
                              className="tollsBillable color-notBillable"
                              name="tollsBillable"
                              value={tollsBillable}
                              onChange={(e) => setTollsBillable(e.target.value)}
                              required
                            />
                            <label className="CC" htmlFor="cell-box">
                              CC
                              <input
                                type="checkbox"
                                className="expense-section-checkbox"
                                onChange={(e) =>
                                  setTollsCC(e.target.checked ? 1 : 0)
                                }
                              />
                            </label>
                          </div>
                        </div>

                        <div className="items">
                          <label htmlFor="mileage" className="form-header">
                            Mileage
                          </label>
                          <div className="input-wrapper">
                            <input
                              className="mileage color-billable"
                              name="mileage"
                              value={mileage}
                              onChange={(e) => setMileage(e.target.value)}
                              required
                            />
                            <input
                              className="mileageBillable color-notBillable"
                              name="mileageBillable"
                              value={mileageBillable}
                              onChange={(e) =>
                                setMileageBillable(e.target.value)
                              }
                              required
                            />
                            <label className="CC" htmlFor="cell-box">
                              CC
                              <input
                                type="checkbox"
                                className="expense-section-checkbox"
                                checked
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* section two (porCC...) */}
                    <div className="por-section-container">
                      <div className="por-section-left">
                        <div className="items">
                          <label htmlFor="billableCC" className="form-header">
                            F&B - billable, CC
                          </label>
                          <div className="input-wrapper">
                            <input
                              className="billableCC-amnt color-billable"
                              name="billableCC-amnt"
                              value={billableCC_amnt}
                              onChange={(e) =>
                                setBillableCC_amnt(e.target.value)
                              }
                              required
                            />
                            <label className="CC" htmlFor="cell-box">
                              CC
                              <input type="checkbox" checked disabled />
                            </label>
                          </div>
                        </div>
                        <div className="items">
                          <label
                            htmlFor="nonBillableCC"
                            className="form-header"
                          >
                            F&B - non-billable, CC
                          </label>
                          <div className="input-wrapper">
                            <input
                              className="nonBillableCC-amnt color-notBillable"
                              name="nonBillableCC-amnt"
                              value={nonBillableCC_amnt}
                              onChange={(e) =>
                                setNonBillableCC_amnt(e.target.value)
                              }
                              required
                            />
                            <label className="CC" htmlFor="cell-box">
                              CC
                              <input type="checkbox" disabled />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="por-section-right">
                        <div className="items">
                          <label htmlFor="billable" className="form-header">
                            F&B - billable
                          </label>
                          <div className="input-wrapper">
                            <input
                              className="billable-amnt color-billable"
                              name="billable-amnt"
                              value={billable_amnt}
                              onChange={(e) => setBillable_amnt(e.target.value)}
                              required
                            />
                            <label className="CC" htmlFor="cell-box">
                              CC
                              <input type="checkbox" checked disabled />
                            </label>
                          </div>
                        </div>
                        <div className="items">
                          <label htmlFor="nonBillable" className="form-header">
                            F&B - non-billable
                          </label>
                          <div className="input-wrapper">
                            <input
                              className="nonBillable-amnt color-notBillable"
                              name="nonBillable-amnt"
                              value={nonBillable_amnt}
                              onChange={(e) =>
                                setNonBillable_amnt(e.target.value)
                              }
                              required
                            />
                            <label className="CC" htmlFor="cell-box">
                              CC
                              <input type="checkbox" disabled />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Food Section */}
                    <h2>Food Expenditures</h2>
                    <div className="food-section">
                      <table className="food-table">
                        <AddDeleteTableRows_food
                          data={rowsData_food || []}
                          update={updateRowsData_food}
                          onChange={(e) => {
                            // Log the FileList object
                            console.log("Selected food Data:", e.target.data);

                            // Convert FileList to an array for easier inspection
                            const foodArray = Array.from(e.target.data);
                            console.log("Food data as Array:", foodArray);

                            setRowsData_food
                          }}
                        />
                      </table>

                      {
                        rowsData_food ?
                        <Container>
                        <Row>
                          <Col className="billable-data">
                            <h3>Billable</h3>
                            <label htmlFor="onCardB">On PoR Card</label>
                            <input
                              type="text"
                              name="onCardB"
                              value={onCardBillable}
                              onChange={(e) =>
                                setOnCardBillable(e.target.value)
                              }
                              required
                            />
                            <label htmlFor="outPocketB">Out of Pocket</label>
                            <input
                              type="text"
                              name="outPocketB"
                              value={outPocketBillable}
                              onChange={(e) =>
                                setOutPocketBillable(e.target.value)
                              }
                              required
                            />
                          </Col>
                          <Col className="nonBillable-data">
                            <h3>Non-Billable</h3>
                            <label htmlFor="onCard">On PoR Card</label>
                            <input
                              type="text"
                              name="onCard"
                              value={onCard}
                              onChange={(e) => setOnCard(e.target.value)}
                              required
                            />
                            <label htmlFor="outPocket">Out of Pocket</label>
                            <input
                              type="text"
                              name="outPocket"
                              value={outPocket}
                              onChange={(e) => setOutPocket(e.target.value)}
                              required
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Row className="totals-data">
                            <h3>Totals</h3>
                            <label htmlFor="ccTotal">CC Total</label>
                            <input
                              type="text"
                              name="ccTotal"
                              value={ccTotal}
                              onChange={(e) => setCCTotal(e.target.value)}
                              required
                            />
                            <label htmlFor="oopTotal">OOP Total</label>
                            <input
                              type="text"
                              name="oopTotal"
                              value={oopTotal}
                              onChange={(e) => setOOPTotal(e.target.value)}
                              required
                            />
                          </Row>
                        </Row>
                      </Container>
                      :
                      <></>
                      }
                    </div>

                    {/* Items Section */}
                    <h2>Items</h2>
                    <div className="items-section">
                      <table className="items-table">
                        <AddDeleteTableRows
                          data={rowsData || []}
                          update={updateRowsData}
                          onChange={(e) => {
                            // Log the FileList object
                            console.log("Selected Files:", e.target.data);

                            // Convert FileList to an array for easier inspection
                            const filesArray = Array.from(e.target.data);
                            console.log("Files as Array:", filesArray);
                          }}
                        />
                      </table>
                    </div>
                  </div>

                  {/* File Drop Area */}
                  <h2>Upload Files</h2>
                  <div className="file-area">
                    <input
                      type="file"
                      className="file-input"
                      name="file-input"
                      id="file-input"
                      onChange={(e) => {
                        // Log the FileList object
                        console.log("Selected Files:", e.target.files);

                        // Convert FileList to an array for easier inspection
                        if (e.target.files[1]) {
                          var filesArray = Array.from(e.target.files);

                          console.log("Files as Array:", filesArray);

                          // Update state with the files
                          setUploadedFiles(filesArray);
                        } else {
                          console.log("Single File:", e.target.files);

                          // Update state with the files
                          setUploadedFiles(e.target.files);
                        }
                      }}
                      multiple
                      required
                    />
                  </div>

                  {/* comment section */}
                  <h2>Comments</h2>
                  <div className="items">
                    <div className="comments-wrapper">
                      <textarea
                        className="comments"
                        type="text"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        required
                      ></textarea>
                    </div>
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
