import React from "react";
import Weather from "./components/Weather";
import "./App.css";
function App() {
  return (
    <>
      <div className="fondo"></div>
      <div className="content">
        <h1>WEATHERALLER</h1>
        <Weather />
      </div>
    </>
  );
}
export default App;
