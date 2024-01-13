import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AddDeleteTableRows from "./addDeleteTables";
import Admin from "./Admin"
import axios from 'axios';
import '../css/Home.css'; // Import the Home CSS file


const Home = () => {

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [rowsData, setRowsData] = useState([])
  const [adminData, setAdminData] = useState([]);

  const [cell, setCell] = useState('');
  const [landline, setLandline] = useState('');
  const [dist, setDist] = useState('');
  const [broadband, setBroadband] = useState('');
  const [entertainment, setEntertainment] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // billable
  const [cellBillable, setCellBillable] = useState('')
  const [landlineBillable, setLandlineBillable] = useState('')
  const [distBillable, setDistBillable] = useState('')
  const [broadbandBillable, setBroadbandBillable] = useState('')
  const [entertainmentBillable, setEntertainmentBillable] = useState('')

  const [auth, setAuth] = useState(false)
  const [rootUser, setRootUser] = useState(false);
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [fn, setFn] = useState('')
  const [ln, setLn] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then((res) => {
        if (res.data.status === 'Success') {
          setAuth(true);
          setEmail(res.data.email);
          setFn(res.data.fn);
          setLn(res.data.ln);
          navigate('/');
        }
        else if (res.data.status === 'rootUser') {
          setRootUser(true);
          setAuth(true);
          setEmail(res.data.email);
          setFn(res.data.fn);
          setLn(res.data.ln);
          navigate('/');

        } else {
          setRootUser(false)
          setAuth(false);
          setMessage('')
          navigate('/');
        }
      })
  }, [])


  const updateRowsData = function (data) {
    setRowsData(data);

  }
  const updateAdminData = function (data) {
    setAdminData(data);
  }


  // -------------------- Handle Submit Function --------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    // helper function for form creation
    const createFormData = (data, prefix = '') => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        const fieldName = prefix ? `${prefix}[${key}]` : key;

        if (value instanceof FileList) {
          // Handle FileList (uploadedFiles)
          Array.from(value).forEach((file, index) => {
            formData.append(`${fieldName}[${index}]`, file);
          });
        } else if (typeof value === 'object' && value !== null) {
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
      cellphone,
      cellBillable,
      landline,
      landlineBillable,
      dist,
      distBillable,
      broadband,
      broadbandBillable,
      entertainment,
      entertainmentBillable,
    });

    // Append rowsData to formData
    try {
      rowsData.forEach((row, index) => {
        formData.append(`rowsData`, JSON.stringify(row));
      });
    } catch (error) {
      console.log('Error getting rows data: ', error);
    }

    // if more than one file
    if (uploadedFiles.length > 1) {
      // Append uploadedFiles to formData
      try {
        uploadedFiles.forEach((file, index) => {
          formData.append(`files`, file);
          console.log('appended file', file)
        })
      } catch (error) {
        console.log('Error getting uploadedFiles: ', error);
      }
    } else {
      // if one file
      try {
        // Append uploadedFile to formData
        formData.append(`files`, uploadedFiles)
        console.log('appended file', uploadedFiles)
      } catch (error) {
        console.log('Error getting uploadedFile: ', error);
      }
    }


    // Append adminData to formData
    adminData.forEach((element, index) => {
      formData.append(`items`, JSON.stringify(element));
    });

    console.log(...formData);

    // --------------------------------------------------------------

    axios({
      method: 'post',
      url: 'http://localhost:3001/upload',
      data: formData,
    })
      .then((data) => {
        if (data.data.status === "log in first.") {
          alert("Login or Sign up!")
          navigate('/login')
        } else {

          setUploadedFiles([]);
        }
      })
  }
  const handleLogout = () => {
    axios.get('http://localhost:3001/logout')
      .then(res => {
        location.reload(true);
      }).catch(err => console.log(err));
  }


  return (
    <div>
      <main className='main'>
        {
          auth ?
            // if root user
            rootUser ?
              <div>
                <header><h1>Welcome, David Sroka</h1></header>
                <div><button className='btn btn-danger' onClick={handleLogout}>Logout</button></div>
                <div>
                  <Admin data={adminData} update={updateAdminData} />
                </div>
              </div>

              // else
              :

              <div>
                <div>
                  <div><h3>Welcome, <span className='user_name'>{fn}</span></h3></div>
                  <div><button className='btn btn-danger' onClick={handleLogout}>Logout</button></div>

                </div>

                <div className='form-wrapper'>
                  <form encType='multipart/form-data' className='form__container' onSubmit={handleSubmit}>
                    <div className="form-content">
                      <h2>Expense Data</h2>
                      <div className="expense-section">
                        <div className='top-items' >
                          <label htmlFor='cell' className='form-header'>Cellphone</label>
                          <div className='input_wrapper'>
                            <input className='cell color-billable' name='cell' value={cell} onChange={(e) => setCell(e.target.value)} required />
                            <input className='cellBillable color-notBillable' name='cellBillable' value={cellBillable} onChange={(e) => setCellBillable(e.target.value)} required />
                          </div>
                        </div>

                        <div className='top-items' >
                          <label htmlFor='business_landline' className='form-header'>Business land line</label>
                          <div className='input_wrapper'>
                            <input className='business_landline color-billable' name='business_landline' value={landline} onChange={(e) => setLandline(e.target.value)} required />
                            <input className='landline_billable color-notBillable' name='landline_billable' value={landlineBillable} onChange={(e) => setLandlineBillable(e.target.value)} required />
                          </div>

                        </div>

                        <div className='top-items'>
                          <label htmlFor='long_distance' className='form-header'>Long distance</label>
                          <div className="input_wrapper">
                            <input className='long_distance color-billable' name='long_distance' value={dist} onChange={(e) => setDist(e.target.value)} required />
                            <input className='dist_billable color-notBillable' name='dist_billable' value={distBillable} onChange={(e) => setDistBillable(e.target.value)} required />
                          </div>
                        </div>

                        <div className='top-items'>
                          <label htmlFor='broadband' className='form-header'>Broadband</label>
                          <div className="input_wrapper">
                            <input className='broadband color-billable' name='broadband' value={broadband} onChange={(e) => setBroadband(e.target.value)} required />
                            <input className='broadbandBillable color-notBillable' name='broadbandBillable' value={broadbandBillable} onChange={(e) => setBroadbandBillable(e.target.value)} required />
                          </div>
                        </div>

                        <div className='top-items'>
                          <label htmlFor='entertainment' className='form-header'>Client Entertainment</label>
                          <div className="input_wrapper">
                            <input className='entertainment color-billable' name='entertainment' value={entertainment} onChange={(e) => setEntertainment(e.target.value)} required />
                            <input className='entertainmentBillable color-notBillable' name='entertainmentBillable' value={entertainmentBillable} onChange={(e) => setEntertainmentBillable(e.target.value)} required />
                          </div>
                        </div>
                      </div>

                      <h2>Items</h2>
                      <div className="items-section">
                        
                        <table className='items-table'>
                          <AddDeleteTableRows data={rowsData || []} update={updateRowsData} onChange={
                            (e) => {
                              // Log the FileList object
                              console.log('Selected Files:', e.target.data);

                              // Convert FileList to an array for easier inspection
                              const filesArray = Array.from(e.target.data);
                              console.log('Files as Array:', filesArray);
                            }} />
                        </table>
                        
                      </div>
                    </div>

                    <label htmlFor='file-input'></label>
                    <div className='file-area'>
                      <input
                        type='file'
                        className='file-input'
                        name='file-input'
                        id='file-input'
                        onChange={(e) => {
                          // Log the FileList object
                          console.log('Selected Files:', e.target.files);

                          // Convert FileList to an array for easier inspection
                          const filesArray = Array.from(e.target.files);
                          console.log('Files as Array:', filesArray);

                          // Update state with the files
                          setUploadedFiles(filesArray);
                        }}
                        multiple
                        required
                      />

                    </div>
                    <button type='Submit' className='button' onSubmit={handleSubmit}>Submit</button>
                  </form>
                </div>
              </div>
            :
            <div className='login_home'>
              <h3>{message}</h3>
              <Link to='/login' className='btn btn-primary login_home_btn'>Login</Link>
            </div>
        }
      </main>

    </div>
  );
};

export default Home;