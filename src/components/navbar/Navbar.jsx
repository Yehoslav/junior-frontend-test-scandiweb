import { Component } from "react";

import { NavLink } from "react-router-dom";

import "./navbar.scss";
import logo from "../../res/img/logo.svg";
import cart from "./cart-icon.svg";
import CartIcon from "./CartIcon";
import Currency from "./Currency";




class Navbar extends Component {
  render() {
    const { rotated } = this.props
    const rotStyle = rotated? " rotated":""
    return (
      <nav>
        <div className="link-group">
          <NavLink className="link active" to="/store/all">
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
          {/* TODO: The currency and the arrow should be separate entities
           *        the arrow should be animated
           *        the currency icon should change based on the selected currency
           */}
          <div className={"currency" + rotStyle}>
            {/* <img src={currency} alt="Dollar icon" /> */}
            <Currency />
          </div>
          {/* TODO: Maybe create a component for the cart icon (inside this file)  */}
          <div className="round">
            {/* <img src={cart} alt="Cart icon" /> */}
            <CartIcon />
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
