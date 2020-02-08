import React from "react";
import Home from "./home";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div>
      <div className="App" style={{ background: "#E6E8E6" }}>
        <Router>
          <Home />
        </Router>
      </div>
    </div>
  );
}

export default App;
