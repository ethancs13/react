import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AddDeleteTableRows from "./addDeleteTables";
import Admin from "./Admin"
import axios from 'axios';
import './App.css';


const Home = () => {

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [rowsData, setRowsData] = useState([])
  const [adminData, setAdminData] = useState([]);

  const [cellphone, setCell] = useState('');
  const [landline, setLandline] = useState('');
  const [dist, setDist] = useState('');
  const [broadband, setBroadband] = useState('');
  const [entertainment, setEntertainment] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // billable
  const [cellBillable, setCellBillable] = useState(0)
  const [landlineBillable, setLandlineBillable] = useState(0)
  const [distBillable, setDistBillable] = useState(0)
  const [broadbandBillable, setBroadbandBillable] = useState(0)
  const [entertainmentBillable, setEntertainmentBillable] = useState(0)

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
          setMessage(res.data.Error)
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
        })
      } catch (error) {
        console.log('Error getting uploadedFiles: ', error);
      }
    } else {
      // if one file
      try {
        // Append uploadedFile to formData
        formData.append(`files`, uploadedFiles)
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
      <nav className='nav'>
        {
          auth ?
            // if root user
            rootUser ?
              <div>
                <header><h1>Welcome, David Sroka</h1></header>
                <div><button className='btn btn-danger' onClick={handleLogout}>Logout</button></div>
                <table>
                  <tbody>
                    < Admin data={adminData} update={updateAdminData} />
                  </tbody>
                </table>
              </div>

              // else
              :

              <div>
                <div>
                  <div><h3>Welcome, <span className='user_name'>{fn}</span></h3></div>
                  <div><button className='btn btn-danger' onClick={handleLogout}>Logout</button></div>

                </div>

                <div className='form__wrapper'>
                  <form encType='multipart/form-data' className='form__container' onSubmit={handleSubmit}>

                    <div className="form__content">
                      <div className="left_aside">
                        <div className='cellphone__container top-items' >
                          <div className='input_wrapper'>
                            <label htmlFor='cellphone' className='cellphone__header'>Cellphone</label>
                            <input className='cellphone' name='cellphone' value={cellphone} onChange={(e) => setCell(e.target.value)} required />
                          </div>

                          {/* checkbox */}
                          <div className='checkbox__container top-items'>
                            <label htmlFor='billable' >Billable </label>
                            <input type='checkbox' className='billable' name='billable' checked={cellBillable === 1} onChange={(e) => setCellBillable(cellBillable ? 0 : 1)} />
                          </div>
                        </div>

                        <div className='landline__container top-items' >
                          <div className='input_wrapper'>
                            <label htmlFor='business_landline' className='business_landline__header'>Business land line</label>
                            <input className='business_landline' name='business_landline' value={landline} onChange={(e) => setLandline(e.target.value)} required />
                          </div>

                          {/* checkbox */}
                          <div className='checkbox__container top-items' >
                            <label htmlFor='billable' >Billable </label>
                            <input type='checkbox' className='billable' name='billable' onChange={(e) => setLandlineBillable(landlineBillable ? 0 : 1)} />
                          </div>
                        </div>

                        <div className='longdist__container top-items'> 
                          <div className="input_wrapper">
                            <label htmlFor='long_distance' className='long_distance__header'>Long distance</label>
                            <input className='long_distance' name='long_distance' value={dist} onChange={(e) => setDist(e.target.value)} required />
                          </div>

                          {/* checkbox */}
                          <div className='checkbox__container top-items'> 
                            <label htmlFor='billable' >Billable </label>
                            <input type='checkbox' className='billable' name='billable' onChange={(e) => setDistBillable(distBillable ? 0 : 1)} />
                          </div>
                        </div>

                        <div className='broadband__container top-items'> 
                          <div className="input_wrapper">
                            <label htmlFor='broadband' className='broadband__header'>Broadband</label>
                            <input className='broadband' name='broadband' value={broadband} onChange={(e) => setBroadband(e.target.value)} required />
                          </div>

                          {/* checkbox */}
                          <div className='checkbox__container top-items'> 
                            <label htmlFor='billable' >Billable </label>
                            <input type='checkbox' className='billable' name='billable' onChange={(e) => setBroadbandBillable(broadbandBillable ? 0 : 1)} />
                          </div>
                        </div>



                        <div className='entertainment__container top-items'> 
                          <div className="input_wrapper">
                            <label htmlFor='entertainment' className='entertainment__header'>Client Entertainment</label>
                            <input className='entertainment' name='entertainment' value={entertainment} onChange={(e) => setEntertainment(e.target.value)} required />
                          </div>

                          {/* checkbox */}
                          <div className='checkbox__container top-items'> 
                            <label htmlFor='billable' >Billable </label>
                            <input type='checkbox' className='billable' name='billable' onChange={(e) => setEntertainmentBillable(entertainmentBillable ? 0 : 1)} />
                          </div>
                        </div>
                      </div>


                      <div className="right_aside">

                        <table className='itemized__container'>
                          <AddDeleteTableRows data={rowsData} update={updateRowsData} onChange={
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
              {/* <h3>{message}</h3> */}
              <Link to='/login' className='btn btn-primary login_home_btn'>Login</Link>
            </div>
        }
      </nav>

    </div>
  );
};

export default Home;