import React from "react";
import Locationhours from "./locationHours";
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
                    <img className="news right1" src="https://bloximages.newyork1.vip.townnews.com/nola.com/content/tncms/custom/image/f71e6f56-592d-11ec-a612-630a4da3e8bf.png?resize=200%2C200" />
                    <div className="single-art">
                        <h3 className="sh">
                            "New Orleans' Top 10 Hamburgers"
                            <a className="xlink" href="https://www.nola.com/entertainment_life/eat-drink/new-orleans-top-10-hamburgers-brett-anderson-names-the-best-one-in-the-city/article_67af4b8c-8567-582c-bd44-380464a9f6f6.html" 
                            target="_blank">
                                Read more here</a>
                        </h3>
                        <h3 className="sh">
                            "Mint Modern Vietnamese Features Asian-Southern Fusion"
                            <a className="xlink" href="https://www.nola.com/entertainment_life/eat-drink/new-orleans-top-10-hamburgers-brett-anderson-names-the-best-one-in-the-city/article_67af4b8c-8567-582c-bd44-380464a9f6f6.html" 
                            target="_blank">
                            Read more here</a>
                        </h3>
                    </div>
                </div>
                {/* <img className="pagebreak" src="https://i.imgur.com/4iU2x96.png" /> */}
                <div className="nola">
                    <img className="news left1" src="https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_163,q_75,w_163/v1/clients/neworleans/YT_Black_NO_Stacked_163px_f81c08b1-b159-4877-9d59-7503dd46a52e.jpg" />
                    <div className="single-art last1">
                        <h3 className="sh">
                            "Top Asian-Owned Eateries to Try in New Orleans"
                            <a className="xlink" href="https://www.neworleans.com/blog/post/top-asian-owned-eateries-to-try-in-new-orleans/" 
                            target="_blank">
                            Read more here</a>
                        </h3>
                        <h3 className="sh">
                            "Best Spots for Vietnamese Food"
                            <a className="xlink" href="https://www.neworleans.com/blog/post/best-spots-for-vietnamese-food/" 
                            target="_blank">
                            Read more here</a>
                        </h3>
                    </div>
                </div>
            </div>
            <Locationhours/>
        </div>
    )
}   

export default Pressarticles