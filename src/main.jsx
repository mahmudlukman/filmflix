import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/app/store";
import App from "./App.jsx";
import { ToggleColorMode } from "./utils/ToggleColorMode";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToggleColorMode>
        <Provider store={store}>
          <App />
        </Provider>
      </ToggleColorMode>
    </BrowserRouter>
  </React.StrictMode>
);
