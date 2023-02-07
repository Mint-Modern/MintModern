import React from "react";
import NavBar from "./navbar";
import { customerLogin } from "../api/auth";

const AboutUs = ({ setToken }) => {
  return (
    <div>
      <NavBar />
      <h2 className="aboutus">Our Story!</h2>
      <p className="story">(PUT PICTURES ON RIGHT SIDE, TRANSITIONING --)</p>
      <div className="story">
        With its name, Mint Modern Vietnamese Bistro & Bar declares its
        membership in the new breed of New Orleans' Vietnamese restaurants, such
        as Ba Chi Canteen or Namese.
        <p>What exactly makes Mint <i>modern</i>?</p> Partly it's the playful language
        of the menu, which is written entirely in English. Appetizers are
        labeled as "teasers." Spongy steamed buns filled with pork belly are
        called "sliders." And beyond the dishes now familiar to locals like pho,
        bánh mì or vermicelli bowls, Mint has its own take on chicken and
        waffles along with a burger topped with kimchi and accompanied by sweet
        potato fries.
        <p>
          "We eat ground beef and stuff like that," said Mint's owner Jimmy Tran
          about the spicy burger, a dish he often made at home. "That's pretty
          much like what we like, the younger generation."
        </p>
        5100 Freret St., New Orleans, 504.218.5534
        <p>What they are known for:</p> Mint is also unusual among Vietnamese
        restaurants for its long cocktail list that leans toward classics, such
        as a whiskey sour, a vieux carré or a Singapore sling. The "special"
        cocktails play with ingredients from the Vietnamese pantry, like the
        Fishy Surprise with whiskey, Drambuie, grapefruit juice and fish sauce
        (For the record, fish sauces sinks to the bottom of a cocktail and hits
        you hard on that last sip.).
        <p>
          Open through the afternoon and until after regular dinner hour, Mint
          is the kind of place where one might want to linger over drinks. The
          room is streamlined, contemporary and decorated in a tasteful range of
          grays. The bar is large. And the is crowd lively.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
