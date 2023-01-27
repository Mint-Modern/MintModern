import React from "react";
import Teasers from "./teasers";
import Baguette from "./baguette";
import Pho from "./phoSoup";
import Drinks from "./drinks";
import HouseSpecials from "./houseSpecials";
import Rice from "./rice";
import VermicelliBowl from "./vermicelliBowl";
import Desserts from "./desserts";

const FullMenu = ({ products }) => {
  return (
    <>
      <h1>Menu</h1>
      <Teasers products={products} />
      <Baguette products={products} />
      <Drinks products={products} />
      <HouseSpecials products={products} />
      <Pho products={products} />
      <Rice products={products} />
      <VermicelliBowl products={products} />
      <Desserts products={products} />
    </>
  );
};

export default FullMenu;
