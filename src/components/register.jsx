import React, {useState} from "react";
import {registerCustomer} from "../api/auth"
import {Link, useNavigate} from "react-router-dom"; 


const Register = ({ setToken }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const navigate = useNavigate();

    function showAlert() {
        alert("Customer already exist, please login!")
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        const token = await registerCustomer(name, phoneNumber, email, password );

        localStorage.setItem("token", token);

        setToken(token);
    
        (!token ? showAlert()
        : navigate("/myprofile") )
    };

    return (
        <div className="register">
            <h2>REGISTER HERE!</h2>
            <form className="regform" onSubmit={submitHandler}>
                <label htmlFor="name">YOUR NAME HERE</label>
                <input
                    value={name}
                    type={"text"}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                    placeholder="your name"></input>
                <label htmlFor="password">PASSWORD</label>
                <input
                    value={password}
                    minLength={8}
                    type={"password"}
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
            <div className="backlinks">
                <p>Already have an account? <span><Link to='/login' id='backlink'>Log in</Link></span></p>
                <p>Go back to <span><Link to='/' id='backlink'>home</Link></span></p>
            </div> 
        </div>
    );
};

export default Register;