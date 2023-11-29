import React, { useState } from "react";
import axios from 'axios';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [currentUser, setCurrentUser] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3002/login', { email: email, password: pass })
            .then((data) => {
                // console.log(data.data)

                if (data.data !== 'wrong') {
                    console.log('Hello ' + data.data[0].email)
                    // setCurrentUser(data.data[0].email)
                    setEmail('');
                    setPass('');
                    props.onFormSwitch('fileupload')
                } else {
                    alert('WRONG')
                    return;
                }
                // if (email === '' || pass === '') {
                //     alert('Incorrect')
                // }



            })

    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => { props.onFormSwitch('register'); props.onLogin(email) }} >Don't have an account? Register here.</button>
        </div>
    )
}