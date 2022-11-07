import { Component } from "react";
import { NavLink } from "react-router-dom";

import MiniCart from "../mini-cart";
import CurrencySelector from "../currency-selector";

import "./navbar.scss";
import logo from "../../res/img/logo.svg";

class Navbar extends Component {

  render() {

    return (
      <nav>
        <div className="link-group">
          <NavLink className="link" to="/store/all">
            <span>All</span>
          </NavLink>
          <NavLink className="link" to="/store/clothes">
            <span>Clothes</span>
          </NavLink>
          <NavLink className="link" to="/store/tech">
            <span>Tech</span>
          </NavLink>
        </div>
        <img className="brand" src={logo} alt="Site logo" />
        <div className="actions">
{/* // FIXME: Make dropdown into a general element that could warp other elements */}
          <CurrencySelector />
          <MiniCart />
        </div>
      </nav>
    );
  }
}




export default Navbar;
