import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />

      {/* <div className="overlay"></div> */}
      <div className="App">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
