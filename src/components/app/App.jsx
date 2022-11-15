import { Outlet } from "react-router-dom";
import {Provider} from 'react-redux';

import "./App.css";
import {store} from '../../lib/store';

import Navbar from "../navbar";


function App() {
  return (
    <Provider store={store}>
      <Navbar />

      <div className="App">
        <Outlet />
      </div>
    </Provider>
  );
}

export default App;
