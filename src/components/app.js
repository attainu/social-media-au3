import React from "react";
import Home from "./home";
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
