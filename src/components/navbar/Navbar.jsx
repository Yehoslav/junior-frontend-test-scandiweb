import { Component } from "react";
import { NavLink } from "react-router-dom";

import MiniCart from "../mini-cart";
import CurrencySelector from "../currency-selector";

import "./navbar.scss";
import logo from "../../res/img/logo.svg";

class Navbar extends Component {
  state = {
    currency: {
      symbol: "$",
      name: "USD",
    },
  };

  selectCurrency = (currency) => {
    this.setState({
      showCurrList: false,
      currency,
    });
  };

  render() {
    const currencies = [
      { symbol: "$", name: "USD" },
      { symbol: "€", name: "EUR" },
      { symbol: "Y", name: "YEN" },
      { symbol: "R", name: "RON" },
      { symbol: "P", name: "RUB" },
    ];

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
{/* // FIXME: Make dropdown into a general element that could warp other elements */}
          <CurrencySelector
            onCurrencySelect={this.selectCurrency}
            currencies={currencies}
            currency={this.state.currency}
          />
          <MiniCart />
        </div>
      </nav>
    );
  }
}




export default Navbar;
