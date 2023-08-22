import React from "react";
import ReactDOM from "react-dom/client";

import { GlobalStyles } from "./GlobalStyles";
import App from "./app/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <GlobalStyles />
  </React.StrictMode>,
);
