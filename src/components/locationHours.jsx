import React from "react";
import NavBar from "./navbar";

const Locationhours = () => {
    return (
        <div>
            <NavBar />
            <h2 className="greeting">
            <img
                src="https://i.ibb.co/CQdWn1w/Page-Break-Left-1-2.png"
                alt="Page-Break-Left-1-2"
                border="0"
                />
            Location & Hours
            <img
                src="https://i.ibb.co/x1VqQK5/Page-Break-Right-1-2.png"
                alt="Page-Break-Right-1-2"
                border="0"
                />
            </h2>
            <div className="locpage">
                <img src="https://i.ibb.co/LznSrFQ/IMG-1061.jpg" alt="IMG-1061"
                    className="loc left1" />
                <div className="location">
                    <h3>
                    5100 Freret St., New Orleans, LA 70115
                    </h3>
                    <a className="sub" href="https://goo.gl/maps/ZMvAxeNfmHaBRaXJ8" target="_blank">Open on Google Maps</a>
                </div>
                <div className="hours">

                </div>
            </div>
        </div>
    )
}

export default Locationhours