import { Component } from "react";

import CartIcon from "./CartIcon";
import CartItem from "../cart-item";

import "./mini-cart.scss";
import { Link } from "react-router-dom";

class MiniCart extends Component {
  state = {
    showMiniCart: false,
  };

  toggleDropdown = (prop) => {
    this.setState((state) => ({ [prop]: !state[prop] }));
  };

  render() {
    const content = (
      <ul className="col-g24 cart-list f-sm">
        <div>
          <span className="fp-b">My bag</span>, 13 items
        </div>
        <div className="item-list">
          <CartItem 
            inMiniCart={true} />
        </div>
        <div className="row sb fp-sb">
          <div>Total</div>
          <div>$200.00</div>
        </div>
        <div className="row-g12">
          <Link 
            to="/cart" 
            style={{width: 140}}
            className="btn__sec t__caps f-ty fp-sb"
          >
            view bag
          </Link>
          <button 
            style={{width: 140, height: 43}}
            className="btn__pri t__caps f-ty fp-sb">check out</button>
        </div>
      </ul>
    );

    return (
      <div className="dropdown">
        <button
          onClick={() => this.toggleDropdown("showMiniCart")}
          className="action"
        >
          <div className="f-ty fp-b num">
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
