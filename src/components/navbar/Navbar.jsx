import { Component } from "react";
import { NavLink } from "react-router-dom";

import MiniCart from "../mini-cart";
import CurrencySelector from "../currency-selector";

import "./navbar.scss";
import logo from "../../res/img/logo.svg";

class Navbar extends Component {

  state = {
    activeDropdown: "",
  };

  toggleDropdown = (prop) => {
    this.setState(({activeDropdown}) => ({
      activeDropdown: (activeDropdown === prop)? "" : prop,
    }));
  };

  render() {
    const { activeDropdown } = this.state;

    return (
      <nav>
        <div className="navbar">
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
            <CurrencySelector 
              showDropdown={activeDropdown === "Currency"}
              onToggleDropdown={() => this.toggleDropdown("Currency")}/>
            <MiniCart 
              showDropdown={activeDropdown === "MiniCart"}
              onToggleDropdown={() => this.toggleDropdown("MiniCart")}/>
          </div>
        </div>
      </nav>
    );
  }
}




export default Navbar;
