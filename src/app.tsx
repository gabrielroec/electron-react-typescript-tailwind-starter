import React from "react";
import * as ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
// import Welcome from "./pages/welcome/Welcome";

import MainPage from "./pages/main/MainPage";
import Welcome from "./pages/welcome/Welcome";

const App = () => (
  <HashRouter>
    <Routes>
      <Route element={<Layout />}>
        {/* <Route path="/" element={<Welcome />} /> */}

        <Route path="/" element={<Welcome />} />
        <Route path="/main" element={<MainPage />} />
      </Route>
    </Routes>
  </HashRouter>
);

function render() {
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(<App />);
}

render();
