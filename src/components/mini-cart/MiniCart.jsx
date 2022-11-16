import { Component } from "react";
import { connect } from "react-redux";
import {
  increaseProductAmmount,
  decreaseProductAmmount,
} from "../../lib/cartSlice";

import CartIcon from "./CartIcon";
import CartItem from "../cart-item";

import "./mini-cart.scss";
import { Link } from "react-router-dom";

class MiniCart extends Component {
  render() {
    const { currency, products, status, onToggleDropdown } = this.props;
    const { increaseAmount, decreaseAmount } = this.props;

    const totalPrice = () => {
      if (products) {
        return products.reduce((previous, current) => {
          return (
            previous +
            current.prices.find(
              (item) => item.currency.symbol === currency.symbol
            ).amount *
              current.amount
          );
        }, 0);
      }
      return 0;
    };

    const content = (
      <>
        <ul className="col-g24 cart-list f-sm">
          <div>
            <span className="fp-b">My bag</span>, {products.length} items
          </div>
          <div className="item-list">
            {products ? (
              products.map((item) => (
                <CartItem
                  key={item.id}
                  name={item.name}
                  price={item.prices.find(
                    (price) => price.currency.symbol === currency.symbol
                  )}
                  brand={item.brand}
                  loading={status === "loading"}
                  amount={item.amount}
                  onIncrease={() => increaseAmount(item.id)}
                  onDecrease={() => decreaseAmount(item.id)}
                  productImg={item.gallery[0]}
                  attributes={item.attributes}
                  inMiniCart={true}
                />
              ))
            ) : (
              <h3>No items</h3>
            )}
          </div>
          <div className="row sb fp-sb">
            <div>Total</div>
            <div>
              {currency.symbol}
              {totalPrice()}
            </div>
          </div>
          <div className="row-g12">
            <Link
              to="/cart"
              onClick={() => onToggleDropdown("showMiniCart")}
              style={{ width: 140 }}
              className="btn__sec t__caps f-ty fp-sb"
            >
              view bag
            </Link>
            <button
              onClick={() => onToggleDropdown("showMiniCart")}
              style={{ width: 140, height: 43 }}
              className="btn__pri t__caps f-ty fp-sb"
            >
              check out
            </button>
          </div>
        </ul>
        <div
          onClick={() => onToggleDropdown("showMiniCart")}
          className="overlay"
        ></div>
      </>
    );

    return (
      <div className="dropdown">
        <button onClick={onToggleDropdown} className="action">
          <div className="f-ty fp-b num">
            {products.length > 9 ? "9+" : products.length}
          </div>
          <CartIcon />
        </button>
        {this.props.showDropdown ? content : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.cart.products,
    status: state.cart.status,
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseAmount: (id) => dispatch(increaseProductAmmount(id)),
    decreaseAmount: (id) => dispatch(decreaseProductAmmount(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
