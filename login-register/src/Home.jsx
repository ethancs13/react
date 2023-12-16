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
  const [cellBillable, setCellBillable] = useState(false)
  const [landlineBillable, setLandlineBillable] = useState(false)
  const [distBillable, setDistBillable] = useState(false)
  const [broadbandBillable, setBroadbandBillable] = useState(false)
  const [entertainmentBillable, setEntertainmentBillable] = useState(false)

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

  const setUploaded = function (file) {
    setUploadedFiles(file.target.files);
  }

  const updateRowsData = function (data) {
    setRowsData(data);
  }
  const updateAdminData = function (data) {
    setAdminData(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fn', fn)
    formData.append('ln', ln)
    formData.append('email', email)
    formData.append('cellphone', cellphone)
    formData.append('cellBillable', cellBillable)
    formData.append('landline', landline)
    formData.append('landlineBillable', landlineBillable)
    formData.append('longdist', dist)
    formData.append('longdistBillable', distBillable)
    formData.append('broadband', broadband)
    formData.append('broadbandBillable', broadbandBillable)
    formData.append('entertainment', entertainment)
    formData.append('entertainmentBillable', entertainmentBillable)
    console.log(rowsData)

    // check for undefined billable
    for (let j = 0; j < rowsData.length; j++) {
      const row = rowsData[j];
      let state = row.billable;

      state ? state = state : state = false;
    }

    for (let f = 0; f < rowsData.length; f++) {
      formData.append('rowsData', JSON.stringify(rowsData[f]))
    }

    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append('files', uploadedFiles[i])
    }

    for (let l = 0; l < adminData.length; l++) {
      const element = adminData[l];
      formData.append('items', JSON.stringify(element))
    }
    
    console.log(...formData)

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
                        <div className='cellphone__container'>
                          <div className='input_wrapper'>
                            <label htmlFor='cellphone' className='cellphone__header'>Cellphone</label>
                            <input className='cellphone' name='cellphone' value={cellphone} onChange={(e) => setCell(e.target.value)} />
                          </div>

                          {/* checkbox */}
                          <div className='checkbox__container'>
                            <label htmlFor='billable' >Billable </label>
                            <input type='checkbox' className='billable' name='billable' onClick={(e) => setCellBillable(cellBillable ? false : true)} />
                          </div>
                        </div>

                        <div className='landline__container'>
                          <div className='input_wrapper'>
                            <label htmlFor='business_landline' className='business_landline__header'>Business land line</label>
                            <input className='business_landline' name='business_landline' value={landline} onChange={(e) => setLandline(e.target.value)} />
                          </div>

                          {/* checkbox */}
                          <div className='checkbox__container'>
                            <label htmlFor='billable' >Billable </label>
                            <input type='checkbox' className='billable' name='billable' onChange={(e) => setLandlineBillable(landlineBillable ? false : true)} />
                          </div>
                        </div>

                        <div className='longdist__container'>
                          <div className="input_wrapper">
                            <label htmlFor='long_distance' className='long_distance__header'>Long distance</label>
                            <input className='long_distance' name='long_distance' value={dist} onChange={(e) => setDist(e.target.value)} />
                          </div>

                          {/* checkbox */}
                          <div className='checkbox__container'>
                            <label htmlFor='billable' >Billable </label>
                            <input type='checkbox' className='billable' name='billable' onChange={(e) => setDistBillable(distBillable ? false : true)} />
                          </div>
                        </div>

                        <div className='broadband__container'>
                          <div className="input_wrapper">
                            <label htmlFor='broadband' className='broadband__header'>Broadband</label>
                            <input className='broadband' name='broadband' value={broadband} onChange={(e) => setBroadband(e.target.value)} />
                          </div>

                          {/* checkbox */}
                          <div className='checkbox__container'>
                            <label htmlFor='billable' >Billable </label>
                            <input type='checkbox' className='billable' name='billable' onChange={(e) => setBroadbandBillable(broadbandBillable ? false : true)} />
                          </div>
                        </div>



                        <div className='entertainment__container'>
                          <div className="input_wrapper">
                            <label htmlFor='entertainment' className='entertainment__header'>Client Entertainment</label>
                            <input className='entertainment' name='entertainment' value={entertainment} onChange={(e) => setEntertainment(e.target.value)} />
                          </div>

                          {/* checkbox */}
                          <div className='checkbox__container'>
                            <label htmlFor='billable' >Billable </label>
                            <input type='checkbox' className='billable' name='billable' onChange={(e) => setEntertainmentBillable(entertainmentBillable ? false : true)} />
                          </div>
                        </div>
                      </div>


                      <div className="right_aside">

                        <table className='itemized__container'>
                          <AddDeleteTableRows data={rowsData} update={updateRowsData} />
                        </table>


                      </div>
                    </div>

                    <label htmlFor='file-input'></label>
                    <div className='file-area'>
                      <input type='file' className='file-input' name='file-input' id='file-input' onChange={setUploaded} multiple />
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