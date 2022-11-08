import { Component } from "react";

import CartIcon from "./CartIcon";
import CartItem from "../cart-item";

import "./mini-cart.scss";

class MiniCart extends Component {
  state = {
    showMiniCart: false,
  };

  toggleDropdown = (prop) => {
    this.setState((state) => ({ [prop]: !state[prop] }));
  };

  render() {
    const content = (
      <ul className="cart-list font-sm">
        <div>
          <span className="font-b">My bag</span>, 13 items
        </div>
        <div className="item-list">
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
    );

    return (
      <div className="dropdown">
        <button
          onClick={() => this.toggleDropdown("showMiniCart")}
          className="currency"
        >
          <div className="font-ty font-b num">
            9+
          </div>
          <CartIcon />
        </button>
        {this.state.showMiniCart ? content : null}
      </div>
    );
  }
}

export default MiniCart;
