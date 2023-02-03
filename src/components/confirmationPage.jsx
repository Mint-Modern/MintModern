import React from "react";
import { Link } from "react-router-dom"

const Confirmationpage = () => {
    return (
        <div>
            <header id="homelink">
                <Link to="/">
                    <img src="https://i.ibb.co/zxB68bW/mint-logo-250x200.png"
                        alt="mint-logo-250x200"
                        className="logo"
                    />
                </Link>
            </header>
            <h1>Thank you!</h1>
            <h2>Your order has been placed.</h2>
            <h3>Go back to <span><Link to='/' id="backlink">home.</Link></span></h3>
        </div>
    )
}

export default Confirmationpage