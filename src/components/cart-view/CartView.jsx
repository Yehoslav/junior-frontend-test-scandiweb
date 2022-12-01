import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { round, totalPrice } from "../../utils/funcs.js";
import "./cart-view.scss";

import CartItem from "../cart-item";
import {
  increaseProductAmmount,
  decreaseProductAmmount,
} from "../../lib/cartSlice";


class CartView extends Component {
  render() {
    const { symbol, products } = this.props;
    const { onIncreaseAmount, onDecreaseAmount } = this.props;

    const items =
      products.length > 0 ? (
        products.map((item) => (
          <>
            <CartItem
              key={item.id}
              {...item}
              price={item.prices.find(
                (price) => price.currency.symbol === symbol
              )}
              onIncrease={() => onIncreaseAmount(item.id)}
              onDecrease={() => onDecreaseAmount(item.id)}
            />
            <hr />
          </>
        ))
      ) : (
        <div className="f-24">
          <h3>There are no items in the cart :(</h3>
          <p>Check our <Link to="/store/all">latest products</Link>.</p>
          <hr />
        </div>
      );

    return (
      <div className="col-g8">
        <h1 className="t_upper fp-b f-32">Cart</h1>
        <hr />
        {items}
        <div className="col-g8 hug">
          <div className="grid f-24">
            <div>Tax 21%:</div>
            <div className="fp-b">
              {symbol}
              {round(totalPrice(products, symbol) * 0.21, 2)}
            </div>
            <div>Quantity:</div>
            <div className="fp-b">
              {products.reduce((previous, current) => {
                return previous + current.amount;
              }, 0)}
            </div>
            <div>Total:</div>
            <div className="fp-b">
              {symbol}
              {totalPrice(products, symbol)}
            </div>
          </div>
          <button
            style={{ height: 43 }}
            className="btn btn__pri f-14 t__upper ws"
          >
            Order
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.cart.products,
  symbol: state.currency.globalCurrency.symbol,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onIncreaseAmount: (id) => dispatch(increaseProductAmmount(id)),
    onDecreaseAmount: (id) => dispatch(decreaseProductAmmount(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartView);
