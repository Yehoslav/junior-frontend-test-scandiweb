import { Component } from "react";

import { NavLink } from "react-router-dom";

import "./navbar.scss";
import logo from "../../res/img/logo.svg";
import CartIcon from "./CartIcon";
import Currency from "./Currency";


class Navbar extends Component {
  state = {
    showDropdown: false,
  }

  toggleDropdown = () => {
    this.setState(({showDropdown}) => ({showDropdown: !showDropdown}));
  }

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
          <div 
            className="dropdown"
          onClick={this.toggleDropdown}>
            <div className={"currency" + rotStyle}>
              {/* <img src={currency} alt="Dollar icon" /> */}
              <Currency />
            
            </div>
              {/** FIXME: Extract the currency list as a separate component*/}
            { this.state.showDropdown? 
            <ul className="currency-list">
              <li><button className="currency-btn">USD</button></li>
              <li><button className="currency-btn">EUR</button></li>
              <li><button className="currency-btn">YEN</button></li>
              {/* <li><button className="currency-btn">RUB</button></li> */}
              </ul> : null
          }
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
