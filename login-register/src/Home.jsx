import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './App.css';


const Home = (props) => {

  axios.defaults.withCredentials = true;


  const navigate = useNavigate();

  const [amount, setAmount] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [auth, setAuth] = useState(false)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then((res) => {
        if (res.data.status === 'Success') {
          setAuth(true);
          setName(res.data.name)
          navigate('/');
        } else {
          setAuth(false);
          setMessage(res.data.Error)
          navigate('/');
        }
      })
  }, [])

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop: (acceptedFiles) => {
  //     setUploadedFiles(acceptedFiles);
  //   },
  // });

  const setUploaded = function(file) {
    setUploadedFiles(file.target.files);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', name)
    formData.append('amount', amount)
    console.log(uploadedFiles)

    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append('files', uploadedFiles[i])
    }
    console.log(...formData)

    axios({
      method: "post",
      url: "http://localhost:3001/upload",
      data: formData,
    })
      .then((data) => {
        setAmount('');
        setUploadedFiles([]);
        console.log(data)
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
      <nav>
        {
          auth ?
            <div>
              <h3>You are authorized --- {name}</h3>
              <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
            :
            <div>
              <h3>{message}</h3>
              <h3>Login Now</h3>
              <Link to="/login" className="btn btn-primary">Login</Link>
            </div>
        }
      </nav>
      <form enctype="multipart/form-data" className='container' onSubmit={handleSubmit}>
        <label htmlFor="amount-input">Enter Amount</label>
        <input className='amount-input' name="amount-input" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='$120' />

        {/* <div className='drag-drop-area' {...getRootProps()}> */}
          <label htmlFor="file-input"></label>
          {/* <input type="file" className='file-input' name="file-input" id='file-input' {...getInputProps()} />
          <p>Drag and drop files here or click to browse.</p>
          <ul>
            {uploadedFiles.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul> */}
          <input type="file" className='file-input' name="file-input" id='file-input' onChange={setUploaded} multiple />
        {/* </div> */}
        <button type="Submit" className='button'>Submit</button>
      </form>
    </div>
  );
};

export default Home;