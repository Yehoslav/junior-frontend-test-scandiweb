import { Component } from "react";

import { NavLink } from "react-router-dom";

import "./navbar.scss";
import logo from "../../res/img/logo.svg";
import placeholder from "../../res/img/placeholder.png";
import CartIcon from "./CartIcon";
// import Currency from "./Currency";

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
          <Dropdown
            onCurrencySelect={this.selectCurrency}
            currencies={currencies}
            currency={this.state.currency}
          />
          <CartDropdown />
        </div>
      </nav>
    );
  }
}

class CartItem extends Component {
  render() {
    return (
      <div className="row-g4">

        <div className="attributes">
          <div className="font-l">Brand name</div>
          <div className="font-l">Item name</div>
          <div className="font-sb">$50.00</div>
          <div>
            <div className="font-ty">
              Size:
            </div>
            <div className="row-g8">
              <button className="btn-sm btn__sec">XS</button>
              <button className="btn-sm btn__sec">S</button>
              <button className="btn-sm btn__sec sel">M</button>
              <button className="btn-sm btn__sec">L</button>
            </div>
          </div>
        </div>

        <div className="font-m col sb t__center">
          <button className="btn-sm btn__sec">+</button>
          <p>1</p>
          <button className="btn-sm btn__sec">-</button>
        </div>

        <div className="image">
          <img
            width="121px"
            // height="190px"
            src={placeholder}
            alt="Image placeholder"
          />
        </div>

      </div>
    );
  }
}

// FIXME: Make dropdown into a general element that could warp other elements
class CartDropdown extends Component {
  state = {
    showMiniCart: false,
  }

  toggleDropdown = (prop) => {
    this.setState((state) => ({ [prop]: !state[prop] }));
  };

  render() {
    // const { onCurrencySelect, currencies } = this.props;

    const content = (
      <ul className="cart-list font-sm">
        <div>
          <span className="font-b">My bag</span>, 3 items
        </div>
        <div className="item-list">
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <div className="row sb font-sb">
          <div>Total</div>
          <div> $200.00</div>
        </div>
        <div className="row-g12">
          <button className="btn-lg btn__sec font-ty">view bag</button>
          <button className="btn-lg btn__pri font-ty">check out</button>
        </div>
      </ul>
    )

    return (
          <div className="dropdown">
            <button
              onClick={() => this.toggleDropdown("showMiniCart")}
              className="currency"
            >
              <CartIcon />
            </button>
            {this.state.showMiniCart ? content : null}
          </div>
    );
  }
}

// FIXME: Make dropdown into a general element that could warp other elements
class Dropdown extends Component {
  state = {
    showCurrList: false,
  }

  toggleDropdown = (prop) => {
    this.setState((state) => ({ [prop]: !state[prop] }));
  };

  render() {
    const { currency, onCurrencySelect, currencies } = this.props;
    const arrowDir = this.state.showCurrList ? "__up" : "__down";

    const content = (
      <ul className="currency-list">
        {currencies.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => onCurrencySelect(item)}
              className="font font-m currency-btn"
            >
              {item.symbol} {item.name}
            </button>
          </li>
        ))}
      </ul>
    )

    return (
          <div className="dropdown">
            <button
              onClick={() => this.toggleDropdown("showCurrList")}
              // onBlur={this.toggleDropdown}
              className="currency"
            >
              {currency.symbol}{" "}
              <i className={"arrow arrow" + arrowDir} />
            </button>
            {this.state.showCurrList ? (
            content
            ) : null}
          </div>
    );
  }
}

export default Navbar;
