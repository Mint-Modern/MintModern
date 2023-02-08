import React from "react";
import { useEffect, useState } from "react";

function BackToTopButton() {
    const [backToTopButton, setBackToTopButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100) {
                setBackToTopButton(true)
            } else{ setBackToTopButton(false)
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    return <div className="back-to-top-button">
        {backToTopButton && (
            <button 
              title="back up top"  
              className="back-top"
              onClick={scrollUp}
            >
                <img src="https://i.ibb.co/GcpgVZj/mint-backup-logo.png" alt="mint-backup-logo" className="back-top-button"/>
               </button>
        )
        }
    </div>
}

export default BackToTopButton;