import React from "react";
import Home from "./home";
import Nav from "./nav";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div>
      <div className="App" style={{ background: "#E6E8E6" }}>
        <Router>
          <Nav />
          <Home />
        </Router>
      </div>
    </div>
  );
}

export default App;
