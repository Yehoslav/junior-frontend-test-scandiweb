import { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./product-card.scss";
// import placeholder from "../../res/img/placeholder.png";

import { CartIcon } from "../mini-cart";

class ProductCard extends Component {
  render() {
    const { id, name, gallery, prices } = this.props;
    console.dir(prices);

    const {
      currency: { symbol },
      amount,
    } = prices.filter((item) => item.currency.symbol === "$")[0];

    return (
      <div className="card">
        <div className="image">
          <img src={gallery[0]} alt="Placeholder" />
        </div>
        <button className="add-btn">
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

export default ProductCard;
