import React from "react";
// import {Link} from "react-router-dom;"
// need to import my navbar here

const Customerprofile = ({ setToken, customer }) => {
    return (
        <div className="custprof">
            <header>
                <MyNavbar setToken={setToken} />
            </header>
            <h2>Hello there, {customer}!</h2>
            Customer Profile here, will add laters
        </div>
    )
}

export default Customerprofile;