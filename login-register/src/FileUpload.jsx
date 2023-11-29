import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';



const FileUpload = (props) => {

  const [ amount, setAmount ] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
    },
  });
  //TO DO : Customize and Style this Drag and Drop to Upload box as you want🧑‍💻😊

  const handleSubmit = (e) => {
    
    e.preventDefault();
    axios.post('http://localhost:3002/upload', { email: props.user, amount: amount, file: JSON.stringify(uploadedFiles) })
      .then((data) => {
        setAmount('');
        setUploadedFiles([]);
      })
  }

  return (
    <form className='container' onSubmit={handleSubmit}>
      <label htmlFor="amount-input">Enter Amount</label>
      <input className='amount-input' name="amount-input" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='$120' />

      <div className='drag-drop-area' {...getRootProps()}>
        <label htmlFor="file-input"></label>
        <input className='file-input' name="file-input" id='file-input' {...getInputProps()} />
        <p>Drag and drop files here or click to browse.</p>
        <ul>
          {uploadedFiles.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      </div>
      <button type="Submit" className='button'>Submit</button>
    </form>
  );
};

export default FileUpload;