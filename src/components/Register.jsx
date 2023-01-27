import { useState } from "react";
import React from "react";
// import {registerCustomer} from "api/auth"; << change from where auth.js is
// import {NavLink, useNavigate} from "react-router-dom"; << only one person needs to install in dependencies


const Register = ({ setToken }) => {
    const [customer, setCustomer] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    // function showAlert() {
    //     alert("Customer already exist, please login!")
    // }

    const submitHandler = async (event) => {
        event.preventDefault();

        const token = await registerCustomer(customer, password, email, phoneNumber);

        localStorage.setItem("token", token);

        setToken(token);
    
        // (!token ? showAlert()
        // : navigate("/myprofile") )
    };

    return (
        <div className="register">
            <h2>REGISTER HERE!</h2>
            <form className="regform" onSubmit={submitHandler}>
                <label htmlFor="customer">YOUR NAME HERE</label>
                <input
                    value={username}
                    type={"text"}
                    onChange={(event) => {
                        setCustomer(event.target.value);
                    }}
                    placeholder="your name"></input>
                <label htmlFor="password">PASSWORD</label>
                <input
                    value={password}
                    minLength={8}
                    type={"text"}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                    placeholder="password"></input>
                <label htmlFor="email">EMAIL</label>
                <input
                    value={email}
                    type={"email"}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                    placeholder="email address"></input>
                <label htmlFor="phoneNumber">PHONE NUMBER</label>
                <input
                    value={phoneNumber}
                    type={"number"}
                    onChange={(event) => {
                        setPhoneNumber(event.target.value);
                    }}
                    placeholder="phone number"></input>
                <button type="submit">REGISTER</button>
            </form>
            {/* <div className="backlinks">
                <p>Already have an account? <span><NavLink to='/login' id='backlink'>Log in</NavLink></span></p>
                <p>Go back to <span><NavLink to='/' id='backlink'>home</NavLink></span></p>
            </div> */} 
            {/* We will uncomment this when we get the links and routes working */}
        </div>
    );
};

export default Register;