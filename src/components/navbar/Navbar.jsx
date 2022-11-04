import { Component } from "react";

import { NavLink } from "react-router-dom";

import "./navbar.scss";
import logo from "../../res/img/logo.svg";
import CartIcon from "./CartIcon";
// import Currency from "./Currency";


class Navbar extends Component {
  state = {
    showCurrList: false,
    showMiniCart: false,
    currency: {
      symbol: "$",
      name: "USD",
    },
  }

  toggleDropdown = (prop) => {
    this.setState((state) => ({[prop]: !state[prop]}));
  }

  selectCurrency = (currency) => {
    this.setState({
      showCurrList: false,
      currency,
    })
  }

  render() {
    const { rotated } = this.props
    const rotStyle = rotated? " rotated":""
    const currencies = [
      {symbol: "$", name: "USD"},
      {symbol: "€", name: "EUR"},
      {symbol: "Y", name: "YEN"},
      {symbol: "R", name: "RON"},
      {symbol: "P", name: "RUB"}];

    const arrowDir = this.state.showCurrList? "__up" : "__down";

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
          <div className="dropdown" >
            <button 
              onClick={() => this.toggleDropdown("showCurrList")} 
              // onBlur={this.toggleDropdown}
              className={"currency" + rotStyle}>
              {this.state.currency.symbol} <i className={"arrow arrow" + arrowDir} />
            </button>
            { this.state.showCurrList
              ? <Dropdown 
                  onCurrencySelect={this.selectCurrency} 
                  currencies={currencies} /> 
              : null
          }
          </div>
          {/* TODO: Maybe create a component for the cart icon (inside this file)  */}
          <div className="dropdown">
            <button 
              onClick={() => this.toggleDropdown("showMiniCart")} 
              className={"currency" + rotStyle}>
              <CartIcon  />
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

class Dropdown extends Component {
  render () {
    const {  onCurrencySelect ,currencies } = this.props

    return (
      <ul className="currency-list">
        {currencies.map(item => (
          <li key={item.name}>
            <button 
              onClick={() => onCurrencySelect(item)}
              className="currency-btn">
              {item.symbol} {item.name}</button>

          </li>))}
      </ul>
    )
  }
}

export default Navbar;
