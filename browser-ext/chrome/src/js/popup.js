import "../css/popup.css";
// import Greeting from "./popup/greeting_component.jsx";
import Popup from "./popup/index.js";
import React from "react";
import { render } from "react-dom";

render(<Popup />, window.document.getElementById("app-container"));
