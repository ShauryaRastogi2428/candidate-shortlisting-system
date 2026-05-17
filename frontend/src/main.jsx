import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";
import "./App.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <div className="fade-in">

      <div className="blur-circle blue"></div>

      <div className="blur-circle purple"></div>

      <App />

    </div>

  </React.StrictMode>

);