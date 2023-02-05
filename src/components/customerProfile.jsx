import React, { useReducer } from "react";
import IsAdmin from "./isAdmin";
// import {Link} from "react-router-dom;"
import MyNavbar from "./MyNavbar";


const Customerprofile = ({ setToken, user }) => {
    return (
        <div className="custprof">
            <header>
                <MyNavbar setToken={setToken} />
            </header>
            <h2>Hello there {user.name}!</h2>
            <h2>Add admin status here later</h2>
            Customer Profile here, will add laters
        </div>
    )
}

export default Customerprofile;