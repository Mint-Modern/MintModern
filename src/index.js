import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import AboutUs from "./components/aboutUs";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <>
      <div>Hello World!</div>
      <AboutUs />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
