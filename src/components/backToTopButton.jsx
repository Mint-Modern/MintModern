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
              className="back-top"
              onClick={scrollUp}
            >
                ^
            </button>
        )
        }
    </div>
}

export default BackToTopButton;