import React, { useState } from "react";
import FileUpload from "./FileUpload";
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";

function App() {

  const [currentForm, setCurrentForm] = useState('login');
  const [currentUser, setCurrentUser] = useState('')

  const toggleForm = (formName) => {
    console.log()
    setCurrentForm(formName);
  }

  const updateUser = (user) => {
    console.log(user)
    setCurrentUser(user);
  }

  return (
    <div className="App">
      {
        currentForm === "fileupload" ? <FileUpload onFormSwitch={toggleForm} user={currentUser}/> :
        currentForm === "login" ? <Login onFormSwitch={toggleForm} onLogin={updateUser}/> : <Register onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default App;
