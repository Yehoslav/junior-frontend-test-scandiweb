import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />

      <div className="overlay"></div>
      <Outlet />
    </div>
  );
}

export default App;
