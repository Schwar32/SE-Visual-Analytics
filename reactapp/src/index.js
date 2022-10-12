import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="container-xl p-5 ">
    <div className="row justify-content-center ">
      <App className="col mx-auto" />
      <App className="col mx-auto" />
    </div>
  </div>
);
