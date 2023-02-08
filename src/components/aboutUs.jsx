import React from "react";
import NavBar from "./navbar";
import { customerLogin } from "../api/auth";
import BackToTopButton from "./backToTopButton";
import Locationhours from "./locationHours";

const AboutUs = ({ setToken }) => {
  return (
    <div>
      <NavBar />
      <BackToTopButton/>
      <main className="story">
      <div className="story-text">
      </div>
      <div className="story-words">
        Mint Modern
        <p>What exactly makes Mint <i>Modern</i>?</p> 
        Partly it's the playful language
        of the menu, which is written entirely in English. Appetizers are
        labeled as "teasers." Spongy steamed buns filled with pork belly are
        called "Tacos". And beyond the dishes now familiar to locals like pho,
        bánh mì or vermicelli bowls, Mint has its own take on chicken and
        waffles along with a burger topped with kimchi and accompanied by sweet
        potato fries.
        <p>
          "We started at a fast food store, Burger Orleans on Gentilly," said Mint's owner Jimmy Tran,
           a dish he created from his family's fast food joint. "That's what brought origins of our Burgers. 
           We make our patties in house. The kimchi that was just the <i>modern</i> touch."
        </p>
       
        <p>What we're are known for:</p> Mint is also unusual among Vietnamese
        restaurants for its long cocktail list that leans toward classics, such
        as Joe's Famous Old Fashions, specialized by the bartender Joe Dupas. The "special"
        cocktails play with ingredients from the Vietnamese pantry, like The Rieu Dieu, with their touch of Lemongrass which is a common ingredient in most Vietnamese Cuisines. 
        (For the record, lemongrass is a almost like sugarcane but instead of sweetness it brings spices and herbal essences).
        <p>
          Open through the afternoon and until after regular dinner hour, Mint
          is the kind of place where one might want to linger over drinks. The
          room is streamlined, contemporary and decorated in a tasteful range of
          grays. The bar is large. And the is crowd lively.
        </p>
      </div>
      </main>
      <Locationhours/>
    </div>
  );
};

export default AboutUs;
