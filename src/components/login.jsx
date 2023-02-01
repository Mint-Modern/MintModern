import React, { useState } from "react";
import { customerLogin } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ token, setToken }) => {
  const [customerNameLogin, setCustomerNameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const navigate = useNavigate();

  return (
    <div className="login">
      <h2 className="header">Back for more?</h2>
      <h4 className="witty">And honestly, we don't blame you!</h4>
        <form className="usepassforms"
          onSubmit={async (e) => {
            try {
              e.preventDefault();
              const data = await customerLogin(
                customerNameLogin,
                passwordLogin
              );
              const token = data.token;
              setToken(token);
              localStorage.setItem("token", token);
              {
                token ? navigate("/") : console.log("No Token!");
              }
            } catch (error) {
              console.error(error);
            }
            // location.reload();
          }}
        >
          <input
            value={customerNameLogin}
            type="text"
            placeholder="username"
            minLength={3}
            onChange={(e) => setCustomerNameLogin(e.target.value)}
          ></input>
          <input
            value={passwordLogin}
            type="password"
            placeholder="password"
            minLength={8}
            onChange={(e) => setPasswordLogin(e.target.value)}
          ></input>
          <button type="submit">Login</button>
        </form>
        <div className="backlinks">
					<p>Don't have an account? <span><Link to='/register' id="backlink">Join us!</Link></span></p>
					<p>Go back to <span><Link to='/' id="backlink">home</Link></span></p>
				</div>
    </div>
  );
};

export default Login;
