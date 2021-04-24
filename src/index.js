import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { TotalStorage } from "./components/context/storage";

import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
 <React.StrictMode>
  <BrowserRouter>
   <TotalStorage>
    <App />
   </TotalStorage>
  </BrowserRouter>
 </React.StrictMode>,
 document.getElementById("root")
);
