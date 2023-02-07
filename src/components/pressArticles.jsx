import React from "react";
import NavBar from "./navbar";

const Pressarticles = () => {
    return (
        <div>
            <NavBar />
            <h2 className="greeting">
            <img
                src="https://i.ibb.co/CQdWn1w/Page-Break-Left-1-2.png"
                alt="Page-Break-Left-1-2"
                border="0"
                />
            As featured on
            <img
                src="https://i.ibb.co/x1VqQK5/Page-Break-Right-1-2.png"
                alt="Page-Break-Right-1-2"
                border="0"
                />
            </h2>
            <div className="articles">
                <div className="nola">
                    <img className="news right" src="https://bloximages.newyork1.vip.townnews.com/nola.com/content/tncms/custom/image/f71e6f56-592d-11ec-a612-630a4da3e8bf.png?resize=200%2C200" />
                    <div className="single-art">
                        <h3 className="sh">
                        "New Orleans' Top 10 Hamburgers"
                        </h3>
                            <a className="sub" href="https://www.nola.com/entertainment_life/eat-drink/new-orleans-top-10-hamburgers-brett-anderson-names-the-best-one-in-the-city/article_67af4b8c-8567-582c-bd44-380464a9f6f6.html" 
                            target="_blank">
                            Read more here</a>
                        <h3 className="sh">
                        "Mint Modern Vietnamese Features Asian-Southern Fusions"
                        </h3>
                            <a className="sub" href="https://www.nola.com/entertainment_life/eat-drink/new-orleans-top-10-hamburgers-brett-anderson-names-the-best-one-in-the-city/article_67af4b8c-8567-582c-bd44-380464a9f6f6.html" 
                            target="_blank">
                            Read more here</a>
                    </div>
                </div>
                <div className="nola">
                    <div className="single-art">
                        <img className="news left" src="https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_163,q_75,w_163/v1/clients/neworleans/YT_Black_NO_Stacked_163px_f81c08b1-b159-4877-9d59-7503dd46a52e.jpg" />
                        <h3 className="sh">
                        "Top Asian-Owned Eateries to Try in New Orleans"
                        </h3>
                            <a className="sub" href="https://www.neworleans.com/blog/post/top-asian-owned-eateries-to-try-in-new-orleans/" 
                            target="_blank">
                            Read more here</a>
                        <h3 className="sh">
                        "Best Spots for Vietnamese Food"
                        </h3>
                            <a className="sub" href="https://www.neworleans.com/blog/post/best-spots-for-vietnamese-food/" 
                            target="_blank">
                            Read more here</a>
                    </div>
                </div>
            </div>
        </div>
    )
}   

export default Pressarticles