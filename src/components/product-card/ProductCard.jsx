import { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./product-card.scss";
import { fetchProduct } from "../../lib/cartSlice";
// import placeholder from "../../res/img/placeholder.png";

import { CartIcon } from "../mini-cart";

class ProductCard extends Component {
  render() {
    const { globCurrency, id, name, gallery, prices, addProduct, products } =
      this.props;

    const {
      currency: { symbol },
      amount,
    } = prices.filter(
      (item) => item.currency.symbol === globCurrency.symbol
    )[0];

    return (
      <div className="card">
        <div className="image">
          <img src={gallery[0]} alt="Placeholder" />
        </div>
        <button
          onClick={() => {
            const item = products.find((item) => item.id === id);
            if (!item) return addProduct(id);
            return () => console.log(`${id} already in cart`);
          }}
          className="add-btn"
        >
          <CartIcon />
        </button>
        <Link to={`/product/${id}`} className="fp-l">
          {name}
        </Link>
        <div className="fp-m">
          {symbol}
          {amount}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    globCurrency: state.currency,
    products: state.cart.products,
  };
};

const mapDispatchToProsp = (dispatch) => {
  return {
    addProduct: (productId) => dispatch(fetchProduct(productId)),
  };
};

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gallery: PropTypes.arrayOf(PropTypes.string),
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      currency: PropTypes.shape({
        symbol: PropTypes.string.isRequired,
      }),
    })
  ),
};

export default connect(mapStateToProps, mapDispatchToProsp)(ProductCard);
